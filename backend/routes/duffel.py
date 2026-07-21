from flask import Blueprint, request, jsonify
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from config import DEBUG

duffel_bp = Blueprint("duffel", __name__)


def _get_client():
    from duffel_client import get_duffel_client
    return get_duffel_client()


# ── GET /api/duffel/search ────────────────────────────────────────────────────
@duffel_bp.route("/search", methods=["GET"])
def search():
    """
    Search flights via Duffel API.
    Query params:
      origin, destination, date           — required (one-way / first leg)
      return_date                         — for round-trip
      legs                                — JSON-encoded list for multi-city
                                            e.g. [{"origin":"LHR","destination":"DXB","date":"2026-08-01"},...]
      passengers   (default 1)
      cabin_class  (default economy)
    """
    origin      = request.args.get("origin", "").upper()
    destination = request.args.get("destination", "").upper()
    date        = request.args.get("date", "")
    return_date = request.args.get("return_date", "")
    passengers  = int(request.args.get("passengers", 1))
    cabin_class = request.args.get("cabin_class", "economy")
    legs_json   = request.args.get("legs", "")  # multi-city override

    if legs_json:
        # Multi-city: caller provides full slices list
        import json
        try:
            slices = json.loads(legs_json)
        except (ValueError, TypeError):
            return jsonify({"error": "Invalid legs JSON"}), 400
    else:
        if not origin or not destination or not date:
            return jsonify({"error": "origin, destination, and date are required"}), 400
        slices = [{"origin": origin, "destination": destination, "departure_date": date}]
        if return_date:
            slices.append({"origin": destination, "destination": origin, "departure_date": return_date})

    try:
        client = _get_client()
        offers = client.search_flights(slices, passengers=passengers, cabin_class=cabin_class)
        return jsonify({"offers": offers, "count": len(offers)}), 200
    except Exception as e:
        import logging; logging.error(f"Duffel search error: {e}")
        msg = str(e) if DEBUG else "Flight search failed. Please try again."
        return jsonify({"error": msg}), 500


# ── GET /api/duffel/offer/<offer_id> ─────────────────────────────────────────
@duffel_bp.route("/offer/<offer_id>", methods=["GET"])
def get_offer(offer_id):
    """Fetch the latest details for a specific Duffel offer."""
    try:
        client = _get_client()
        offer = client.get_offer(offer_id)
        return jsonify({"offer": offer}), 200
    except Exception as e:
        import logging; logging.error(f"Duffel get_offer error: {e}")
        msg = str(e) if DEBUG else "Failed to retrieve offer."
        return jsonify({"error": msg}), 500


# ── GET /api/duffel/places ────────────────────────────────────────────────────
@duffel_bp.route("/places", methods=["GET"])
def places():
    """
    Airport / city autocomplete powered by Duffel Places API.
    Query param: query (min 2 chars)
    """
    query = request.args.get("query", "").strip()
    if len(query) < 2:
        return jsonify({"places": []}), 200
    try:
        client = _get_client()
        results = client.search_places(query)
        return jsonify({"places": results}), 200
    except Exception as e:
        import logging; logging.error(f"Duffel places error: {e}")
        msg = str(e) if DEBUG else "Autocomplete failed."
        return jsonify({"error": msg}), 500
