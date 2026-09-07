-- ==============================================================================
-- MedBill.fyi Reference Data Seed Script
-- Populates reference tables with standard benchmarks, CARC codes, and revenue codes.
-- ==============================================================================

-- 1. Procedures
INSERT INTO ref_procedures (code, code_type, name, plain_english, category, medicare_rate, fair_price_low, fair_price_avg, fair_price_high, notes)
VALUES
('99213', 'CPT', 'Office/outpatient visit, established patient, 20-29 min', 'Routine follow-up visit with a doctor for an existing, stable medical condition.', 'Doctor Visit', 92.05, 85.00, 130.00, 250.00, 'Frequently overbilled as 99214 or 99215 if the visit was brief.'),
('99214', 'CPT', 'Office/outpatient visit, established patient, 30-39 min', 'Intermediate visit addressing multiple conditions, medication adjustments, or worsening symptoms.', 'Doctor Visit', 133.20, 120.00, 185.00, 350.00, 'Most common evaluation & management code in the US.'),
('99215', 'CPT', 'Office/outpatient visit, established patient, 40-54 min', 'Comprehensive high-complexity visit with high medical decision-making risk.', 'Doctor Visit', 187.60, 170.00, 260.00, 500.00, 'Check medical notes to confirm at least 40 minutes or high medical risk was documented.'),
('99283', 'CPT', 'Emergency department visit, moderate severity', 'ER physician evaluation for moderate symptoms requiring urgent attention (e.g., minor trauma, simple infection).', 'Emergency', 81.50, 150.00, 450.00, 1200.00, 'Professional fee for the ER doctor only; hospital facility fees appear separately under Revenue Code 0450.'),
('99284', 'CPT', 'Emergency department visit, high severity without immediate threat', 'ER evaluation for high-severity illness requiring tests, imaging, or IV medications (e.g., severe abdominal pain, chest pain workup).', 'Emergency', 140.20, 280.00, 750.00, 2200.00, 'Very common ER code, frequently inflated by hospital coding algorithms.'),
('99285', 'CPT', 'Emergency department visit, high severity with immediate threat', 'ER physician evaluation for life-threatening or organ-threatening emergencies.', 'Emergency', 206.80, 400.00, 1100.00, 3500.00, 'Often billed even when the patient walked in and was discharged safely within a couple of hours.'),
('73721', 'CPT', 'MRI lower extremity other than joint without contrast (Knee/Leg)', 'Knee or lower leg MRI without IV contrast dye.', 'Imaging', 242.10, 250.00, 550.00, 2800.00, 'Huge variation between independent imaging centers ($300-$500) vs hospital outpatient facilities ($2,000+).'),
('72148', 'CPT', 'MRI lumbar spine without contrast', 'Lower back MRI scan without contrast dye.', 'Imaging', 248.50, 260.00, 600.00, 3200.00, 'Often billed with unbundled reading/professional component (modifier 26) and technical component (modifier TC).'),
('71250', 'CPT', 'CT scan thorax/chest without contrast', 'Computed tomography (CT) scan of the chest without IV dye.', 'Imaging', 182.40, 200.00, 450.00, 2400.00, 'Commonly ordered in ER for shortness of breath or trauma.'),
('80053', 'CPT', 'Comprehensive metabolic panel (CMP)', 'Routine blood test checking 14 biomarkers: kidney, liver, electrolyte, and blood sugar balance.', 'Laboratory', 14.20, 18.00, 45.00, 350.00, 'Hospital labs often bill 10x-25x the commercial Quest/Labcorp rate.'),
('85025', 'CPT', 'Complete blood count (CBC) with automated differential', 'Standard blood test measuring red blood cells, white blood cells, and platelets.', 'Laboratory', 10.80, 12.00, 35.00, 280.00, 'Essential baseline lab test.'),
('80061', 'CPT', 'Lipid panel', 'Blood cholesterol test checking HDL, LDL, total cholesterol, and triglycerides.', 'Laboratory', 17.50, 20.00, 50.00, 250.00, 'Often covered at 100% under ACA preventive care mandate with diagnosis Z00.00.'),
('45378', 'CPT', 'Colonoscopy, diagnostic, flexible', 'Examination of the large bowel with a flexible camera.', 'Surgery', 395.00, 600.00, 1250.00, 4500.00, 'If performed as screening (HCPCS G0121/G0105), it should be 100% covered without deductible/coinsurance.'),
('29881', 'CPT', 'Arthroscopy, knee, surgical; with meniscectomy', 'Minimally invasive knee scope surgery to trim or remove a torn meniscus.', 'Surgery', 580.00, 1200.00, 2800.00, 9500.00, 'Surgeon fee only; ambulatory surgical center (ASC) fee or hospital facility fee is separate.'),
('A0427', 'HCPCS', 'Ambulance service, advanced life support, emergency, level 1 (ALS1)', 'Emergency ambulance dispatch equipped with paramedic level life-support care.', 'Transportation', 490.00, 650.00, 1200.00, 3800.00, 'Ambulance ground services are protected under state surprise billing laws in several states.')
ON CONFLICT (code) DO UPDATE 
SET medicare_rate = EXCLUDED.medicare_rate,
    fair_price_low = EXCLUDED.fair_price_low,
    fair_price_avg = EXCLUDED.fair_price_avg,
    fair_price_high = EXCLUDED.fair_price_high;

-- 2. CARC Codes (Denial / Adjustment Codes)
INSERT INTO ref_carc_codes (code, group_prefix, title, official_definition, plain_english_summary, patient_action_tip, is_balance_bill_alert)
VALUES
('1', 'PR', 'Deductible Amount', 'Deductible Amount.', 'You are being billed this amount because you have not reached your annual insurance deductible yet.', 'Log into your health insurance portal to confirm your deductible balance on the date of service.', FALSE),
('2', 'PR', 'Coinsurance Amount', 'Coinsurance Amount.', 'Your insurance plan paid their contracted percentage (e.g., 80%), and this is your required patient share (e.g., 20%).', 'Verify that your plan''s coinsurance percentage matches what is billed on your EOB.', FALSE),
('3', 'PR', 'Copayment Amount', 'Co-payment Amount.', 'The fixed dollar amount (e.g., $25 or $50) your plan requires for this type of visit or service.', 'Make sure you were not already charged this copay at check-in.', FALSE),
('45', 'CO', 'Charge exceeds fee schedule / maximum allowable amount', 'Charge exceeds fee schedule/maximum allowable or contracted/legislated fee arrangement.', 'The hospital billed more than the maximum amount permitted by their contract with your insurer. The hospital must write off this difference.', 'DO NOT PAY THIS AMOUNT. In-network healthcare providers are legally forbidden from balance billing you for this write-off.', TRUE),
('96', 'PR', 'Non-covered charge(s)', 'Non-covered charge(s). At least one Remark Code must be provided.', 'Your health plan denied coverage because this procedure, drug, or supply is excluded from your policy benefits.', 'Ask your doctor''s office to request a peer-to-peer review or submit an appeal showing medical necessity.', FALSE),
('97', 'CO', 'The benefit for this service is included in the payment for another service', 'The benefit for this service is included in the payment/allowance for another service/procedure that has already been adjudicated.', 'This is unbundling or an inclusive service. The insurer considers this step part of the primary procedure and won''t pay separately.', 'The provider cannot pass this fee to you if they are in-network. Verify that the provider wrote it off.', TRUE),
('197', 'PR', 'Precertification/authorization/notification absent', 'Precertification/authorization/notification/pre-treatment absent.', 'Prior authorization was required from your insurer before this service was performed, but none was obtained.', 'If the doctor was in-network, obtaining prior auth is usually the provider''s contractual responsibility, not yours. Dispute this with billing.', TRUE),
('253', 'PR', 'Assessment of injury/illness is pending investigation of third party liability', 'Sequestration - reduction in federal payment amount, or third party liability investigation.', 'The insurance company paused payment to see if another insurer (auto insurance, worker''s comp) is responsible.', 'Call your insurer immediately to complete their simple accident/injury questionnaire so they can release payment.', FALSE)
ON CONFLICT (code) DO NOTHING;

-- 3. RARC Codes
INSERT INTO ref_rarc_codes (code, title, plain_english_summary)
VALUES
('M1', 'X-ray not taken within specified time', 'Imaging was not performed within the required timeframe mandated by payer guidelines.'),
('M24', 'Missing/incomplete/invalid number of miles traveled', 'Ambulance mileage claim is missing or calculated incorrectly.'),
('N130', 'Consult plan benefit documents/guidelines for information about restrictions for this service', 'This procedure has strict frequency or eligibility limitations under your specific plan document.'),
('N381', 'Consult our provider directory for in-network physicians', 'The rendering physician was processed as out-of-network.'),
('MA01', 'Alert: If you do not agree with approved amounts and you cannot resolve with contractor, you may appeal', 'Standard notification indicating you have the legal right to file a formal appeal within 180 days.')
ON CONFLICT (code) DO NOTHING;

-- 4. Revenue Codes (UB-04 Hospital Charges)
INSERT INTO ref_revenue_codes (code, category, description)
VALUES
('0450', 'Emergency Room', 'General Emergency Room facility fee'),
('0451', 'Emergency Room', 'Emergency Room - EMTALA emergency medical screening'),
('0456', 'Emergency Room', 'Emergency Room - Urgent care center visit'),
('0250', 'Pharmacy', 'General hospital inpatient/outpatient pharmacy medications'),
('0258', 'Pharmacy', 'IV Solutions / sterile saline / hydration'),
('0270', 'Medical/Surgical Supplies', 'General medical supplies and dressings'),
('0272', 'Medical/Surgical Supplies', 'Sterile supplies (bandages, tubing, surgical kits)'),
('0300', 'Laboratory', 'General clinical laboratory diagnostic testing'),
('0320', 'Radiology', 'Diagnostic X-ray and imaging'),
('0350', 'CT Scan', 'Computed Tomography (CT) scan facility charge'),
('0360', 'Operating Room', 'General Operating Room services'),
('0370', 'Anesthesia', 'General anesthesia equipment and facility service'),
('0730', 'EKG/ECG', 'Electrocardiogram monitoring services'),
('0762', 'Observation Room', 'Outpatient observation bed care (hours-based)')
ON CONFLICT (code) DO NOTHING;

-- 5. Insurance Payers
INSERT INTO ref_insurance_payers (id, name, payer_id, plan_types, support_phone, dispute_portal_url)
VALUES
('aetna', 'Aetna', '60054', ARRAY['HMO', 'PPO', 'POS', 'HDHP'], '1-800-872-3862', 'https://www.aetna.com/individuals-families/member-rights-resources/appeals-complaints.html'),
('cigna', 'Cigna Healthcare', '62308', ARRAY['HMO', 'PPO', 'EPO', 'Open Access Plus'], '1-800-997-1654', 'https://www.cigna.com/individuals-families/member-guide/appeals-and-grievances'),
('uhc', 'UnitedHealthcare', '87726', ARRAY['HMO', 'PPO', 'Choice Plus', 'HDHP'], '1-877-842-3210', 'https://www.myuhc.com/member/appeals'),
('bcbs', 'Blue Cross Blue Shield Association', '00000', ARRAY['PPO', 'HMO', 'BlueCard PPO', 'Federal Employee Program (FEP)'], '1-800-676-2583', 'https://www.bcbs.com/contact-us'),
('humana', 'Humana', '61101', ARRAY['Medicare Advantage', 'PPO', 'HMO'], '1-800-457-4708', 'https://www.humana.com/member/grievances-appeals'),
('kaiser', 'Kaiser Permanente', '94135', ARRAY['HMO', 'Deductible HMO'], '1-800-464-4000', 'https://healthy.kaiserpermanente.org/support/appeals-grievances'),
('medicare', 'Medicare (Original CMS Part A & B)', '00400', ARRAY['Part A (Hospital)', 'Part B (Medical)'], '1-800-633-4227', 'https://www.medicare.gov/claims-appeals/how-do-i-file-an-appeal')
ON CONFLICT (id) DO NOTHING;
