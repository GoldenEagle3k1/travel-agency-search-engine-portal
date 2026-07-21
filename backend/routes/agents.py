from flask import Blueprint, request, jsonify
from functools import wraps
import sys, os, json
from datetime import datetime, timezone
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from config import supabase, supabase_admin, DEBUG
from routes.auth import require_auth, require_admin

agents_bp = Blueprint("agents", __name__)


# ── Agent auth middleware ─────────────────────────────────────────────────────
def require_agent(f):
    """Verify JWT and confirm user is a registered travel agent."""
    @wraps(f)
    def decorated(*args, **kwargs):
        header = request.headers.get("Authorization", "")
        if not header.startswith("Bearer "):
            return jsonify({"error": "Missing Authorization header"}), 401
        token = header.split(" ", 1)[1]
        try:
            user_resp = supabase_admin.auth.get_user(token)
            user = user_resp.user
            request.user = user
            agent = supabase_admin.table("travel_agents").select("*").eq("supabase_uid", user.id).execute()
            if not agent.data:
                return jsonify({"error": "Agent profile not found"}), 403
            request.agent = agent.data[0]
        except Exception as e:
            return jsonify({"error": "Invalid or expired token", "detail": str(e)}), 401
        return f(*args, **kwargs)
    return decorated


def _send_notification(agent_id: int, title: str, message: str, notif_type: str, request_id=None):
    """Insert a notification row for an agent."""
    payload = {
        "agent_id": agent_id,
        "title": title,
        "message": message,
        "notif_type": notif_type,
    }
    if request_id:
        payload["request_id"] = request_id
    try:
        supabase_admin.table("agent_notifications").insert(payload).execute()
    except Exception as e:
        import logging; logging.error(f"Notification insert error: {e}")


# ────────────────────────────────────────────────────────────────────────────
# AGENT REGISTRATION & LOGIN
# ────────────────────────────────────────────────────────────────────────────

@agents_bp.route("/register", methods=["POST"])
def agent_register():
    """Register a new travel agent account."""
    data = request.get_json() or {}
    required = ["email", "password", "agency_name", "contact_name"]
    missing = [f for f in required if not data.get(f)]
    if missing:
        return jsonify({"error": f"Missing: {', '.join(missing)}"}), 400
    try:
        # Create Supabase Auth user
        auth_resp = supabase_admin.auth.admin.create_user({
            "email": data["email"],
            "password": data["password"],
            "email_confirm": True,
        })
        uid = auth_resp.user.id

        # Create travel_agents row
        agent_data = {
            "supabase_uid": uid,
            "agency_name": str(data["agency_name"]).strip()[:120],
            "contact_name": str(data["contact_name"]).strip()[:100],
            "email": data["email"],
            "phone": data.get("phone"),
            "city": data.get("city"),
            "country_id": data.get("country_id"),
        }
        agent_resp = supabase_admin.table("travel_agents").insert(agent_data).execute()
        agent_id = agent_resp.data[0]["agent_id"]

        # Create wallet with 0 balance
        supabase_admin.table("agent_wallets").insert({
            "agent_id": agent_id,
            "balance": 0,
            "currency": "PKR",
        }).execute()

        _send_notification(agent_id, "Welcome to SkyWays Agent Portal!",
                           "Your account is active. Add balance to your wallet to start booking.",
                           "SystemAlert")

        return jsonify({"message": "Agent registered successfully", "agent": agent_resp.data[0]}), 201
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": "Registration failed", "detail": str(e)}), 400


@agents_bp.route("/login", methods=["POST"])
def agent_login():
    """Login as travel agent — returns JWT + agent profile + wallet."""
    data = request.get_json() or {}
    email = data.get("email", "").strip()
    password = data.get("password", "")
    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400
    try:
        session = supabase.auth.sign_in_with_password({"email": email, "password": password})
        user = session.user
        token = session.session.access_token

        agent = supabase_admin.table("travel_agents").select("*").eq("supabase_uid", user.id).execute()
        if not agent.data:
            return jsonify({"error": "This account is not registered as a travel agent"}), 403

        agent_data = agent.data[0]
        wallet = supabase_admin.table("agent_wallets").select("*").eq("agent_id", agent_data["agent_id"]).execute()
        unread = supabase_admin.table("agent_notifications").select("notif_id", count="exact").eq("agent_id", agent_data["agent_id"]).eq("is_read", False).execute()

        return jsonify({
            "message": "Login successful",
            "access_token": token,
            "agent": agent_data,
            "wallet": wallet.data[0] if wallet.data else {},
            "unread_count": unread.count or 0,
        }), 200
    except Exception as e:
        return jsonify({"error": "Login failed", "detail": str(e)}), 401


# ────────────────────────────────────────────────────────────────────────────
# AGENT PROFILE & WALLET
# ────────────────────────────────────────────────────────────────────────────

@agents_bp.route("/profile", methods=["GET"])
@require_agent
def agent_profile():
    agent = request.agent
    wallet = supabase_admin.table("agent_wallets").select("*").eq("agent_id", agent["agent_id"]).execute()
    return jsonify({"agent": agent, "wallet": wallet.data[0] if wallet.data else {}}), 200


@agents_bp.route("/wallet", methods=["GET"])
@require_agent
def agent_wallet():
    """Get wallet balance + last 20 transactions."""
    agent_id = request.agent["agent_id"]
    wallet = supabase_admin.table("agent_wallets").select("*").eq("agent_id", agent_id).execute()
    txns = supabase_admin.table("agent_transactions").select("*").eq("agent_id", agent_id).order("created_at", desc=True).limit(20).execute()
    return jsonify({
        "wallet": wallet.data[0] if wallet.data else {},
        "transactions": txns.data or [],
    }), 200


# ────────────────────────────────────────────────────────────────────────────
# TICKET REQUESTS (AGENT → OWNER APPROVAL FLOW)
# ────────────────────────────────────────────────────────────────────────────

@agents_bp.route("/ticket-requests", methods=["POST"])
@require_agent
def submit_ticket_request():
    """
    Submit a ticket request for owner approval.
    Body: { offer_id, offer_snapshot, passenger_data, trip_type, total_amount, currency }
    Deducts balance from wallet as a hold and creates Pending request.
    """
    agent = request.agent
    agent_id = agent["agent_id"]
    data = request.get_json() or {}

    required = ["offer_snapshot", "passenger_data", "trip_type", "total_amount"]
    missing = [f for f in required if not data.get(f)]
    if missing:
        return jsonify({"error": f"Missing fields: {', '.join(missing)}"}), 400

    total_amount = float(data["total_amount"])
    currency = data.get("currency", "PKR")

    # Check wallet balance
    wallet = supabase_admin.table("agent_wallets").select("*").eq("agent_id", agent_id).execute()
    if not wallet.data:
        return jsonify({"error": "Wallet not found"}), 404
    balance = float(wallet.data[0]["balance"])

    if balance < total_amount:
        return jsonify({
            "error": f"Insufficient wallet balance. Required: {currency} {total_amount:.2f}, Available: {currency} {balance:.2f}"
        }), 402

    try:
        # Deduct from wallet immediately (held)
        new_balance = round(balance - total_amount, 2)
        supabase_admin.table("agent_wallets").update({
            "balance": new_balance,
            "updated_at": datetime.now(timezone.utc).isoformat(),
        }).eq("agent_id", agent_id).execute()

        # Record transaction
        supabase_admin.table("agent_transactions").insert({
            "agent_id": agent_id,
            "txn_type": "Deduction",
            "amount": total_amount,
            "balance_after": new_balance,
            "note": f"Hold for ticket request — {data.get('trip_type', '')} booking",
        }).execute()

        # Create ticket request
        req_resp = supabase_admin.table("ticket_requests").insert({
            "agent_id": agent_id,
            "offer_id": data.get("offer_id"),
            "offer_snapshot": data["offer_snapshot"],
            "passenger_data": data["passenger_data"],
            "trip_type": data["trip_type"],
            "total_amount": total_amount,
            "currency": currency,
        }).execute()
        request_row = req_resp.data[0]
        request_id = request_row["request_id"]

        return jsonify({
            "message": "Ticket request submitted! The owner will review and approve shortly.",
            "request": request_row,
            "new_balance": new_balance,
        }), 201

    except Exception as e:
        import logging; logging.error(f"Submit request error: {e}")
        msg = str(e) if DEBUG else "Failed to submit request."
        return jsonify({"error": msg}), 500


@agents_bp.route("/ticket-requests", methods=["GET"])
@require_agent
def list_ticket_requests():
    """List all ticket requests for the logged-in agent."""
    agent_id = request.agent["agent_id"]
    page = int(request.args.get("page", 1))
    limit = min(int(request.args.get("limit", 20)), 50)
    offset = (page - 1) * limit
    try:
        resp = supabase_admin.table("ticket_requests").select("*").eq("agent_id", agent_id).order("submitted_at", desc=True).limit(limit).offset(offset).execute()
        return jsonify({"requests": resp.data or [], "count": len(resp.data or [])}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@agents_bp.route("/ticket-requests/<int:request_id>", methods=["GET"])
@require_agent
def get_ticket_request(request_id):
    """Get full details of a single ticket request (only own requests)."""
    agent_id = request.agent["agent_id"]
    try:
        resp = supabase_admin.table("ticket_requests").select("*").eq("request_id", request_id).eq("agent_id", agent_id).execute()
        if not resp.data:
            return jsonify({"error": "Request not found"}), 404
        row = resp.data[0]
        # If a booking_id is linked, fetch the booking details too
        booking = None
        if row.get("booking_id"):
            b = supabase_admin.table("vw_booking_details").select("*").eq("booking_id", row["booking_id"]).execute()
            booking = b.data[0] if b.data else None
        return jsonify({"request": row, "booking": booking}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ────────────────────────────────────────────────────────────────────────────
# AGENT NOTIFICATIONS
# ────────────────────────────────────────────────────────────────────────────

@agents_bp.route("/notifications", methods=["GET"])
@require_agent
def get_notifications():
    agent_id = request.agent["agent_id"]
    try:
        resp = supabase_admin.table("agent_notifications").select("*").eq("agent_id", agent_id).order("created_at", desc=True).limit(50).execute()
        return jsonify({"notifications": resp.data or []}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@agents_bp.route("/notifications/unread-count", methods=["GET"])
@require_agent
def unread_count():
    agent_id = request.agent["agent_id"]
    try:
        resp = supabase_admin.table("agent_notifications").select("notif_id", count="exact").eq("agent_id", agent_id).eq("is_read", False).execute()
        return jsonify({"unread_count": resp.count or 0}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@agents_bp.route("/notifications/<int:notif_id>/read", methods=["PUT"])
@require_agent
def mark_read(notif_id):
    agent_id = request.agent["agent_id"]
    supabase_admin.table("agent_notifications").update({"is_read": True}).eq("notif_id", notif_id).eq("agent_id", agent_id).execute()
    return jsonify({"message": "Marked as read"}), 200


@agents_bp.route("/notifications/read-all", methods=["PUT"])
@require_agent
def mark_all_read():
    agent_id = request.agent["agent_id"]
    supabase_admin.table("agent_notifications").update({"is_read": True}).eq("agent_id", agent_id).eq("is_read", False).execute()
    return jsonify({"message": "All notifications marked as read"}), 200


# ────────────────────────────────────────────────────────────────────────────
# ADMIN: TICKET REQUEST APPROVAL QUEUE
# ────────────────────────────────────────────────────────────────────────────

@agents_bp.route("/admin/requests", methods=["GET"])
@require_admin
def admin_list_requests():
    """List all ticket requests — admin view with agent info."""
    status_filter = request.args.get("status", "Pending")
    try:
        query = supabase_admin.table("ticket_requests").select(
            "*, travel_agents(agency_name, contact_name, email, phone)"
        ).order("submitted_at", desc=True)
        if status_filter and status_filter != "all":
            query = query.eq("request_status", status_filter)
        resp = query.limit(100).execute()
        return jsonify({"requests": resp.data or []}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@agents_bp.route("/admin/requests/<int:req_id>", methods=["GET"])
@require_admin
def admin_get_request(req_id):
    """Get full details of a single ticket request."""
    try:
        resp = supabase_admin.table("ticket_requests").select(
            "*, travel_agents(agency_name, contact_name, email, phone)"
        ).eq("request_id", req_id).execute()
        if not resp.data:
            return jsonify({"error": "Request not found"}), 404
        return jsonify({"request": resp.data[0]}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@agents_bp.route("/admin/requests/<int:req_id>/approve", methods=["POST"])
@require_admin
def admin_approve_request(req_id):
    """
    Approve a ticket request.
    The wallet deduction already happened on submission; on approval we mark as Issued.
    """
    uid = request.user.id
    try:
        resp = supabase_admin.table("ticket_requests").select("*").eq("request_id", req_id).execute()
        if not resp.data:
            return jsonify({"error": "Request not found"}), 404
        row = resp.data[0]
        if row["request_status"] != "Pending":
            return jsonify({"error": f"Request is already {row['request_status']}"}), 400

        now = datetime.now(timezone.utc).isoformat()

        # Update request status
        supabase_admin.table("ticket_requests").update({
            "request_status": "Approved",
            "reviewed_at": now,
            "reviewed_by": uid,
        }).eq("request_id", req_id).execute()

        # Send notification to agent
        offer = row.get("offer_snapshot") or {}
        route = f"{offer.get('origin_iata', '?')} → {offer.get('dest_iata', '?')}"
        _send_notification(
            row["agent_id"],
            "✅ Ticket Request Approved!",
            f"Your ticket request for {route} (PKR {row['total_amount']:.2f}) has been approved. Your ticket is being issued.",
            "TicketApproved",
            request_id=req_id,
        )

        return jsonify({"message": "Request approved. Agent has been notified."}), 200
    except Exception as e:
        import logging; logging.error(f"Approve error: {e}")
        msg = str(e) if DEBUG else "Approval failed."
        return jsonify({"error": msg}), 500


@agents_bp.route("/admin/requests/<int:req_id>/reject", methods=["POST"])
@require_admin
def admin_reject_request(req_id):
    """
    Reject a ticket request and refund the held wallet balance.
    Body: { reason: str }
    """
    uid = request.user.id
    body = request.get_json() or {}
    reason = str(body.get("reason", "No reason provided")).strip()[:500]

    try:
        resp = supabase_admin.table("ticket_requests").select("*").eq("request_id", req_id).execute()
        if not resp.data:
            return jsonify({"error": "Request not found"}), 404
        row = resp.data[0]
        if row["request_status"] != "Pending":
            return jsonify({"error": f"Request is already {row['request_status']}"}), 400

        agent_id = row["agent_id"]
        amount = float(row["total_amount"])
        now = datetime.now(timezone.utc).isoformat()

        # Refund wallet
        wallet = supabase_admin.table("agent_wallets").select("balance").eq("agent_id", agent_id).execute()
        old_balance = float(wallet.data[0]["balance"]) if wallet.data else 0
        new_balance = round(old_balance + amount, 2)

        supabase_admin.table("agent_wallets").update({
            "balance": new_balance,
            "updated_at": now,
        }).eq("agent_id", agent_id).execute()

        supabase_admin.table("agent_transactions").insert({
            "agent_id": agent_id,
            "txn_type": "Refund",
            "amount": amount,
            "balance_after": new_balance,
            "note": f"Refund for rejected ticket request #{req_id}",
            "created_by": uid,
        }).execute()

        # Update request
        supabase_admin.table("ticket_requests").update({
            "request_status": "Rejected",
            "admin_note": reason,
            "reviewed_at": now,
            "reviewed_by": uid,
        }).eq("request_id", req_id).execute()

        # Notify agent
        offer = row.get("offer_snapshot") or {}
        route = f"{offer.get('origin_iata', '?')} → {offer.get('dest_iata', '?')}"
        _send_notification(
            agent_id,
            "❌ Ticket Request Rejected",
            f"Your ticket request for {route} was rejected. Reason: {reason}. PKR {amount:.2f} has been refunded to your wallet.",
            "TicketRejected",
            request_id=req_id,
        )

        return jsonify({"message": "Request rejected. Wallet refunded. Agent notified.", "refunded_amount": amount}), 200
    except Exception as e:
        import logging; logging.error(f"Reject error: {e}")
        msg = str(e) if DEBUG else "Rejection failed."
        return jsonify({"error": msg}), 500


# ────────────────────────────────────────────────────────────────────────────
# ADMIN: WALLET TOP-UP (manual credit)
# ────────────────────────────────────────────────────────────────────────────

@agents_bp.route("/admin/agents", methods=["GET"])
@require_admin
def admin_list_agents():
    """List all travel agents."""
    try:
        resp = supabase_admin.table("travel_agents").select(
            "*, agent_wallets(balance, currency)"
        ).order("created_at", desc=True).execute()
        return jsonify({"agents": resp.data or []}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@agents_bp.route("/admin/agents/<int:agent_id>/topup", methods=["POST"])
@require_admin
def admin_topup_wallet(agent_id):
    """Manually add balance to an agent's wallet."""
    uid = request.user.id
    body = request.get_json() or {}
    amount = float(body.get("amount", 0))
    note = str(body.get("note", "Manual top-up")).strip()[:200]

    if amount <= 0:
        return jsonify({"error": "Amount must be positive"}), 400
    try:
        wallet = supabase_admin.table("agent_wallets").select("balance").eq("agent_id", agent_id).execute()
        if not wallet.data:
            return jsonify({"error": "Wallet not found"}), 404
        old_balance = float(wallet.data[0]["balance"])
        new_balance = round(old_balance + amount, 2)

        supabase_admin.table("agent_wallets").update({
            "balance": new_balance,
            "updated_at": datetime.now(timezone.utc).isoformat(),
        }).eq("agent_id", agent_id).execute()

        supabase_admin.table("agent_transactions").insert({
            "agent_id": agent_id,
            "txn_type": "TopUp",
            "amount": amount,
            "balance_after": new_balance,
            "note": note,
            "created_by": uid,
        }).execute()

        _send_notification(
            agent_id,
            "💰 Wallet Topped Up",
            f"PKR {amount:.2f} has been added to your wallet. New balance: PKR {new_balance:.2f}",
            "WalletTopUp",
        )

        return jsonify({"message": "Wallet topped up successfully", "new_balance": new_balance}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
