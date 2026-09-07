-- ==============================================================================
-- MedBill.fyi - CGHS & Indian Healthcare Reference Schema
-- Standard benchmarks based on MoHFW, NPPA, IRDAI & ROHINI Registry
-- ==============================================================================

-- 1. CGHS Procedures & Diagnostic Investigations
CREATE TABLE IF NOT EXISTS ref_cghs_procedures (
    id SERIAL PRIMARY KEY,
    cghs_code VARCHAR(20) NOT NULL UNIQUE,      -- e.g. 'CGHS-001', 'CGHS-140'
    procedure_name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,             -- 'Consultation', 'Inpatient & Room Rent', 'Laboratory/Pathology', 'Radiology & Imaging', etc.
    cghs_nabh_rate_inr NUMERIC(10, 2) NOT NULL, -- Rate for NABH-accredited hospitals
    cghs_non_nabh_rate_inr NUMERIC(10, 2) NOT NULL, -- Rate for non-NABH hospitals
    private_hospital_typical_rate_inr NUMERIC(10, 2) NOT NULL, -- Average private corporate hospital charge
    plain_english TEXT NOT NULL,
    billing_alert TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_ref_cghs_code ON ref_cghs_procedures(cghs_code);
CREATE INDEX IF NOT EXISTS idx_ref_cghs_category ON ref_cghs_procedures(category);

-- 2. Hospitals Master Registry (ROHINI & NABH Status)
CREATE TABLE IF NOT EXISTS ref_hospitals (
    id VARCHAR(50) PRIMARY KEY,                 -- 'max_saket_delhi', 'apollo_greams_chennai'
    name VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    rohini_code VARCHAR(20),
    is_nabh_accredited BOOLEAN NOT NULL DEFAULT TRUE,
    bed_capacity INT,
    tier VARCHAR(20) DEFAULT 'Tier 1',
    markup_risk VARCHAR(20) DEFAULT 'High',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_ref_hospitals_city ON ref_hospitals(city);
CREATE INDEX IF NOT EXISTS idx_ref_hospitals_nabh ON ref_hospitals(is_nabh_accredited);

-- 3. NPPA Essential Medicines Price Caps (NLEM)
CREATE TABLE IF NOT EXISTS ref_nppa_medicines (
    drug_code VARCHAR(20) PRIMARY KEY,          -- 'NPPA-MED-001'
    generic_name VARCHAR(255) NOT NULL,
    strength VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    nppa_ceiling_price_inr NUMERIC(10, 2) NOT NULL,
    hospital_typical_mrp_inr NUMERIC(10, 2) NOT NULL,
    usage TEXT NOT NULL,
    billing_alert TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. IRDAI Non-Payable Consumables Master
CREATE TABLE IF NOT EXISTS ref_irdai_consumables (
    item_code VARCHAR(20) PRIMARY KEY,          -- 'IRDAI-CON-001'
    item_name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    is_payable_standard_policy BOOLEAN NOT NULL DEFAULT FALSE,
    payable_with_consumables_rider BOOLEAN NOT NULL DEFAULT TRUE,
    typical_hospital_bill_range_inr VARCHAR(50),
    is_hospital_overhead BOOLEAN NOT NULL DEFAULT TRUE,
    patient_advice TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Indian Health Insurers & Third Party Administrators (TPAs)
CREATE TABLE IF NOT EXISTS ref_indian_insurers_tpas (
    id VARCHAR(50) PRIMARY KEY,                 -- 'star_health', 'hdfc_ergo', 'medi_assist_tpa', etc.
    name VARCHAR(150) NOT NULL,
    type VARCHAR(50) NOT NULL,                  -- 'Standalone Health Insurer', 'General Insurer', 'TPA', 'Regulatory Escalation Body'
    irdai_reg_no VARCHAR(30),
    toll_free VARCHAR(50),
    cashless_email VARCHAR(100),
    grievance_portal VARCHAR(255),
    common_network VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Common Indian Claim Deductions & IRDAI Rules
CREATE TABLE IF NOT EXISTS ref_indian_claim_deductions (
    rule_id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    legal_basis TEXT NOT NULL,                  -- 'IRDAI Master Circular 2024', 'Supreme Court CGHS Directive', 'Consumer Protection Act'
    dispute_strategy TEXT NOT NULL
);
