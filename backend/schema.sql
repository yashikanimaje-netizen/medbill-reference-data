-- ==============================================================================
-- MedBill.fyi Reference Data Schema
-- Dialect: PostgreSQL (compatible with SQLite / MySQL with minor type adjustments)
-- ==============================================================================

-- 1. Procedures & Services (CPT / HCPCS / DRG)
CREATE TABLE IF NOT EXISTS ref_procedures (
    id SERIAL PRIMARY KEY,
    code VARCHAR(10) NOT NULL UNIQUE,
    code_type VARCHAR(10) NOT NULL,            -- 'CPT', 'HCPCS', 'DRG'
    name VARCHAR(255) NOT NULL,
    plain_english TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,             -- 'Doctor Visit', 'Imaging', 'Emergency', 'Surgery', 'Laboratory'
    medicare_rate NUMERIC(10, 2) NOT NULL,     -- Medicare allowable benchmark rate
    fair_price_low NUMERIC(10, 2) NOT NULL,    -- 25th percentile fair market rate
    fair_price_avg NUMERIC(10, 2) NOT NULL,    -- 50th percentile / typical negotiated rate
    fair_price_high NUMERIC(10, 2) NOT NULL,   -- Typical hospital chargemaster billed rate
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_ref_procedures_code ON ref_procedures(code);
CREATE INDEX IF NOT EXISTS idx_ref_procedures_category ON ref_procedures(category);

-- 2. Claim Adjustment Reason Codes (CARC)
CREATE TABLE IF NOT EXISTS ref_carc_codes (
    code VARCHAR(10) PRIMARY KEY,              -- '1', '2', '45', '96', etc.
    group_prefix VARCHAR(5) NOT NULL,          -- 'CO' (Contractual), 'PR' (Patient Resp), 'CR', 'OA', 'PI'
    title VARCHAR(255) NOT NULL,
    official_definition TEXT NOT NULL,
    plain_english_summary TEXT NOT NULL,
    patient_action_tip TEXT NOT NULL,
    is_balance_bill_alert BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Remittance Advice Remark Codes (RARC)
CREATE TABLE IF NOT EXISTS ref_rarc_codes (
    code VARCHAR(10) PRIMARY KEY,              -- 'M1', 'N130', 'MA01', etc.
    title VARCHAR(255) NOT NULL,
    plain_english_summary TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Hospital Revenue Codes (UB-04 Facility Billing)
CREATE TABLE IF NOT EXISTS ref_revenue_codes (
    code VARCHAR(4) PRIMARY KEY,               -- '0450', '0250', '0360', etc.
    category VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Insurance Payers Directory
CREATE TABLE IF NOT EXISTS ref_insurance_payers (
    id VARCHAR(50) PRIMARY KEY,                -- 'aetna', 'uhc', 'cigna', etc.
    name VARCHAR(150) NOT NULL,
    payer_id VARCHAR(50),
    plan_types TEXT[],                         -- ['HMO', 'PPO', 'HDHP', 'EPO']
    support_phone VARCHAR(30),
    dispute_portal_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
