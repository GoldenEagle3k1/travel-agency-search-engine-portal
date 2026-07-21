-- ============================================================
-- SKYWAYS — TRAVEL AGENT PORTAL SCHEMA
-- Run this in Supabase SQL Editor AFTER the main schema.sql
-- ============================================================

-- ============================================================
-- TABLE: travel_agents  (B2B agency accounts)
-- ============================================================
CREATE TABLE IF NOT EXISTS travel_agents (
    agent_id       SERIAL        PRIMARY KEY,
    supabase_uid   UUID          UNIQUE,
    agency_name    VARCHAR(120)  NOT NULL,
    contact_name   VARCHAR(100)  NOT NULL,
    email          VARCHAR(120)  NOT NULL UNIQUE,
    phone          VARCHAR(25),
    city           VARCHAR(80),
    country_id     INT           REFERENCES countries(country_id),
    agent_status   VARCHAR(20)   DEFAULT 'Active'
                   CHECK (agent_status IN ('Active', 'Suspended', 'Pending')),
    created_at     TIMESTAMPTZ   DEFAULT NOW()
);

COMMENT ON TABLE travel_agents IS 'Non-IATA travel agent B2B accounts';

-- ============================================================
-- TABLE: agent_wallets  (one wallet per agent)
-- ============================================================
CREATE TABLE IF NOT EXISTS agent_wallets (
    wallet_id      SERIAL        PRIMARY KEY,
    agent_id       INT           NOT NULL UNIQUE REFERENCES travel_agents(agent_id) ON DELETE CASCADE,
    balance        NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (balance >= 0),
    currency       CHAR(3)       DEFAULT 'PKR',
    updated_at     TIMESTAMPTZ   DEFAULT NOW()
);

COMMENT ON TABLE agent_wallets IS 'Prepaid wallet balance for each travel agent';

-- ============================================================
-- TABLE: agent_transactions  (wallet audit trail)
-- ============================================================
CREATE TABLE IF NOT EXISTS agent_transactions (
    txn_id         SERIAL        PRIMARY KEY,
    agent_id       INT           NOT NULL REFERENCES travel_agents(agent_id) ON DELETE CASCADE,
    txn_type       VARCHAR(20)   NOT NULL CHECK (txn_type IN ('TopUp', 'Deduction', 'Refund')),
    amount         NUMERIC(12,2) NOT NULL CHECK (amount > 0),
    balance_after  NUMERIC(12,2) NOT NULL,
    note           TEXT,
    created_by     UUID,
    created_at     TIMESTAMPTZ   DEFAULT NOW()
);

COMMENT ON TABLE agent_transactions IS 'Wallet top-ups, deductions (holds), and refunds';

-- ============================================================
-- TABLE: ticket_requests  (approval workflow core)
-- ============================================================
CREATE TABLE IF NOT EXISTS ticket_requests (
    request_id     SERIAL        PRIMARY KEY,
    agent_id       INT           NOT NULL REFERENCES travel_agents(agent_id) ON DELETE CASCADE,
    -- Duffel offer snapshot stored at time of submission
    offer_id       VARCHAR(100),
    offer_snapshot JSONB         NOT NULL,
    passenger_data JSONB         NOT NULL,
    trip_type      VARCHAR(20)   NOT NULL CHECK (trip_type IN ('one-way', 'round-trip', 'multi-city')),
    total_amount   NUMERIC(12,2) NOT NULL CHECK (total_amount > 0),
    currency       CHAR(3)       DEFAULT 'PKR',
    request_status VARCHAR(20)   DEFAULT 'Pending'
                   CHECK (request_status IN ('Pending', 'Approved', 'Rejected', 'Issued')),
    admin_note     TEXT,
    submitted_at   TIMESTAMPTZ   DEFAULT NOW(),
    reviewed_at    TIMESTAMPTZ,
    reviewed_by    UUID,
    booking_id     INT           REFERENCES bookings(booking_id)
);

COMMENT ON TABLE ticket_requests IS 'Agent ticket requests awaiting owner approval';

-- ============================================================
-- TABLE: agent_notifications  (real-time notification inbox)
-- ============================================================
CREATE TABLE IF NOT EXISTS agent_notifications (
    notif_id       SERIAL        PRIMARY KEY,
    agent_id       INT           NOT NULL REFERENCES travel_agents(agent_id) ON DELETE CASCADE,
    title          VARCHAR(200)  NOT NULL,
    message        TEXT          NOT NULL,
    notif_type     VARCHAR(30)   CHECK (notif_type IN ('TicketApproved', 'TicketRejected', 'WalletTopUp', 'SystemAlert')),
    request_id     INT           REFERENCES ticket_requests(request_id),
    is_read        BOOLEAN       DEFAULT FALSE,
    created_at     TIMESTAMPTZ   DEFAULT NOW()
);

COMMENT ON TABLE agent_notifications IS 'Notification inbox for travel agents';

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_travel_agents_uid     ON travel_agents(supabase_uid);
CREATE INDEX IF NOT EXISTS idx_travel_agents_email   ON travel_agents(email);
CREATE INDEX IF NOT EXISTS idx_travel_agents_status  ON travel_agents(agent_status);

CREATE INDEX IF NOT EXISTS idx_agent_wallets_agent   ON agent_wallets(agent_id);

CREATE INDEX IF NOT EXISTS idx_agent_txns_agent      ON agent_transactions(agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_txns_type       ON agent_transactions(txn_type);
CREATE INDEX IF NOT EXISTS idx_agent_txns_date       ON agent_transactions(created_at);

CREATE INDEX IF NOT EXISTS idx_ticket_req_agent      ON ticket_requests(agent_id);
CREATE INDEX IF NOT EXISTS idx_ticket_req_status     ON ticket_requests(request_status);
CREATE INDEX IF NOT EXISTS idx_ticket_req_submitted  ON ticket_requests(submitted_at);

CREATE INDEX IF NOT EXISTS idx_agent_notifs_agent    ON agent_notifications(agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_notifs_read     ON agent_notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_agent_notifs_date     ON agent_notifications(created_at);
