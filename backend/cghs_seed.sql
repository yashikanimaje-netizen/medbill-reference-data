-- ==============================================================================
-- MedBill.fyi - CGHS, Hospitals, NPPA & IRDAI Reference Data Seed Script
-- Populates CGHS procedure benchmarks, Hospital directory, Drug caps & Consumables
-- ==============================================================================

-- 1. CGHS Procedures & Diagnostics (Rates in INR ₹)
INSERT INTO ref_cghs_procedures (cghs_code, procedure_name, category, cghs_nabh_rate_inr, cghs_non_nabh_rate_inr, private_hospital_typical_rate_inr, plain_english, billing_alert)
VALUES
('CGHS-001', 'Consultation OPD - General / Specialist', 'Consultation', 350.00, 300.00, 1200.00, 'Outpatient doctor consultation fee for a specialist or super-specialist.', 'Private hospitals often charge ₹1,000 to ₹2,500. Under CGHS empanelment, ceiling is ₹350.'),
('CGHS-002', 'Consultation Inpatient (IPD) - Daily visit by Specialist', 'Consultation', 350.00, 300.00, 2000.00, 'Doctor''s daily bedside visit while admitted in the hospital.', 'Watch out for multiple doctors billing daily visits on the same bill without documented consultation notes.'),
('CGHS-010', 'ICU Bed Charges (Per Day, including Monitoring & Nursing)', 'Inpatient & Room Rent', 5400.00, 4500.00, 25000.00, 'Intensive Care Unit (ICU/ICCU) room rent per day.', 'CGHS ICU rate is ALL-INCLUSIVE of monitor, nursing charges, and duty doctor charges. Private hospitals unbundle and charge nursing + monitor separately.'),
('CGHS-011', 'General Ward Bed Charges (Per Day)', 'Inpatient & Room Rent', 1500.00, 1000.00, 4500.00, 'Standard shared room or general ward bed charge per day.', 'Check for IRDAI proportionate deduction if your insurance policy has a 1% room rent cap.'),
('CGHS-012', 'Semi-Private Room Bed Charges (Per Day)', 'Inpatient & Room Rent', 3000.00, 2000.00, 8500.00, 'Twin-sharing room hospital bed charge per day.', 'Nursing and RMO charges must not exceed standard tariff limits.'),
('CGHS-030', 'Complete Blood Count (CBC / Hemogram with ESR)', 'Laboratory/Pathology', 155.00, 135.00, 650.00, 'Standard blood test measuring hemoglobin, TLC, DLC, platelets, and ESR.', 'Private hospital in-house labs often charge 3x to 5x of the CGHS/NABL ceiling.'),
('CGHS-035', 'Lipid Profile (Cholesterol, HDL, LDL, Triglycerides)', 'Laboratory/Pathology', 230.00, 200.00, 1200.00, 'Blood test checking heart health and cholesterol levels.', 'Often billed at ₹1,000+ in private hospital packages.'),
('CGHS-040', 'Liver Function Test (LFT) / Bilirubin, SGOT, SGPT, Alk Phos', 'Laboratory/Pathology', 260.00, 225.00, 1400.00, 'Diagnostic panel evaluating liver health and enzyme levels.', 'Individual enzymes are sometimes unbundled and billed separately.'),
('CGHS-045', 'Kidney Function Test (KFT) / Renal Profile (Urea, Creatinine, Electrolytes)', 'Laboratory/Pathology', 260.00, 225.00, 1350.00, 'Blood test measuring kidney performance and electrolytes.', 'Essential baseline lab test.'),
('CGHS-050', 'HbA1c (Glycosylated Hemoglobin)', 'Laboratory/Pathology', 150.00, 130.00, 750.00, '3-month average blood glucose test for diabetes management.', 'Standard outpatient test.'),
('CGHS-110', 'X-Ray Chest PA View', 'Radiology & Imaging', 140.00, 120.00, 800.00, 'Standard chest X-ray.', 'Digital X-Ray film charges are legally included in this fee.'),
('CGHS-120', 'Ultrasound Whole Abdomen and Pelvis (USG)', 'Radiology & Imaging', 500.00, 435.00, 2200.00, 'Abdominal sonography scan.', 'Private hospitals often bill Upper Abdomen and Pelvis separately (unbundling).'),
('CGHS-130', 'CT Scan Head / Brain (Plain)', 'Radiology & Imaging', 1100.00, 950.00, 4500.00, 'Computed Tomography brain scan without contrast dye.', 'Hospitals frequently inflate CT scan charges for emergency trauma admissions.'),
('CGHS-140', 'MRI Brain / Knee / Spine (Plain without Contrast)', 'Radiology & Imaging', 2500.00, 2200.00, 9500.00, 'Magnetic resonance imaging (MRI) scan of brain, knee, or lumbar spine.', 'Private hospitals often charge ₹8,000 to ₹14,000, nearly 4x the CGHS benchmark.'),
('CGHS-200', 'Hemodialysis (Single Session)', 'Nephrology', 1500.00, 1300.00, 3500.00, 'Kidney dialysis session for removing toxins from the blood.', 'CGHS rate includes dialyzer tubing and standard anticoagulant medication.'),
('CGHS-300', 'Normal Delivery (Vaginal Delivery Package)', 'Maternity & Obstetrics', 12000.00, 10000.00, 65000.00, 'Standard childbirth delivery package including labor room and obstetrician fees.', 'Check for separate charges for baby pediatric assessment and nursery.'),
('CGHS-301', 'Caesarean Section (C-Section Delivery Package)', 'Maternity & Obstetrics', 18000.00, 15000.00, 110000.00, 'Surgical birth delivery package.', 'Package should cover OT charges, surgeon fee, and standard post-op stay.'),
('CGHS-400', 'Cataract Surgery with Foldable IOL (Phacoemulsification, Single Eye)', 'Ophthalmology', 14000.00, 12000.00, 45000.00, 'Eye lens replacement surgery for cataract removal.', 'The CGHS package covers the surgery and standard hydrophilic/hydrophobic lens. Premium toric/multifocal lenses have additional approved copays.'),
('CGHS-500', 'Laparoscopic Cholecystectomy (Gallbladder Removal)', 'General Surgery', 23000.00, 19500.00, 95000.00, 'Keyhole surgery to remove infected or stone-filled gallbladder.', 'Private hospitals often charge consumables, trocars, and harmonic scalpel tips separately.'),
('CGHS-600', 'Coronary Angiography (CAG)', 'Cardiology', 7000.00, 6000.00, 2200.00, 'Diagnostic catheter test checking blood flow through heart arteries.', 'Contrast dye and catheter charges are included in standard packages.'),
('CGHS-601', 'Coronary Angioplasty (PTCA with 1 Drug-Eluting Stent, Package)', 'Cardiology', 65000.00, 55000.00, 220000.00, 'Heart stent insertion to open blocked cardiac blood vessels.', 'NPPA (National Pharmaceutical Pricing Authority) legally caps DES stents at approx ₹38,000 + GST. Hospitals cannot charge more for the stent itself.'),
('CGHS-610', 'Coronary Artery Bypass Graft (CABG / Open Heart Bypass Surgery)', 'Cardiology', 140000.00, 125000.00, 450000.00, 'Heart bypass surgery for severe multi-vessel blockages.', 'Package includes pre-op workup, surgical team fees, ICU care (up to 3 days), and ward stay.'),
('CGHS-700', 'Total Knee Replacement (TKR - Unilateral, Single Knee)', 'Orthopaedics', 90000.00, 80000.00, 275000.00, 'Knee joint replacement surgery using a titanium/cobalt-chromium implant.', 'Implant prices are strictly capped by NPPA. Verify that the hospital does not inflate implant costs under separate consumable heads.')
ON CONFLICT (cghs_code) DO NOTHING;

-- 2. Major Hospitals Master (ROHINI & NABH Status)
INSERT INTO ref_hospitals (id, name, city, state, rohini_code, is_nabh_accredited, bed_capacity, tier, markup_risk, notes)
VALUES
('max_saket_delhi', 'Max Super Speciality Hospital, Saket', 'New Delhi', 'Delhi', '8900010012341', TRUE, 530, 'Tier 1', 'Extreme', 'Premium tertiary care. Frequently charges 5x-8x of CGHS benchmark on ICU and investigations.'),
('medanta_gurugram', 'Medanta - The Medicity', 'Gurugram', 'Haryana', '8900010012342', TRUE, 1250, 'Tier 1', 'High', 'Multi-super-specialty institute. Extensive cashless empanelment with all major TPAs.'),
('fortis_fmri_gurugram', 'Fortis Memorial Research Institute (FMRI)', 'Gurugram', 'Haryana', '8900010012343', TRUE, 1000, 'Tier 1', 'Extreme', 'Flagship Fortis center. High consumable and administrative charge markups.'),
('ganga_ram_delhi', 'Sir Ganga Ram Hospital', 'New Delhi', 'Delhi', '8900010012344', TRUE, 675, 'Tier 1', 'Moderate', 'Trust-run premier hospital. Moderate rates compared to corporate chains.'),
('apollo_greams_chennai', 'Apollo Hospitals, Greams Road', 'Chennai', 'Tamil Nadu', '8900010012345', TRUE, 600, 'Tier 1', 'High', 'Main Apollo flagship. Known for cardiology and organ transplants.'),
('manipal_old_airport_blr', 'Manipal Hospital, Old Airport Road', 'Bengaluru', 'Karnataka', '8900010012346', TRUE, 650, 'Tier 1', 'High', 'Leading Bengaluru quaternary care center. High ICU day tariffs.'),
('apollo_bannerghatta_blr', 'Apollo Hospitals, Bannerghatta Road', 'Bengaluru', 'Karnataka', '8900010012347', TRUE, 250, 'Tier 1', 'High', 'JCI and NABH accredited. Strict pre-auth documentation needed.'),
('narayana_cardiac_blr', 'Narayana Institute of Cardiac Sciences', 'Bengaluru', 'Karnataka', '8900010012348', TRUE, 800, 'Tier 1', 'Moderate', 'Pioneer in affordable cardiac surgery packages. Closely follows benchmark tariffs.'),
('kokilaben_mumbai', 'Kokilaben Dhirubhai Ambani Hospital', 'Mumbai', 'Maharashtra', '8900010012349', TRUE, 750, 'Tier 1', 'Extreme', 'High room rent rates that often trigger insurance 1% room rent proportionate deduction.'),
('lilavati_mumbai', 'Lilavati Hospital & Research Centre', 'Mumbai', 'Maharashtra', '8900010012350', TRUE, 314, 'Tier 1', 'High', 'Premier Mumbai medical center. Prominent cashless network across TPAs.'),
('apollo_jubilee_hyd', 'Apollo Hospitals, Jubilee Hills', 'Hyderabad', 'Telangana', '8900010012351', TRUE, 550, 'Tier 1', 'High', 'Major specialty center in Hyderabad.'),
('aig_gachibowli_hyd', 'AIG Hospitals (Asian Institute of Gastroenterology)', 'Hyderabad', 'Telangana', '8900010012352', TRUE, 800, 'Tier 1', 'Moderate', 'Global center for GI procedures and endoscopy.'),
('fortis_anandapur_kolkata', 'Fortis Hospital, Anandapur', 'Kolkata', 'West Bengal', '8900010012353', TRUE, 400, 'Tier 1', 'High', 'Prominent Kolkata tertiary facility.'),
('ruby_hall_pune', 'Ruby Hall Clinic, Sasoon Road', 'Pune', 'Maharashtra', '8900010012354', TRUE, 600, 'Tier 1', 'Moderate', 'Major medical institution in Pune with full NABH accreditation.'),
('city_care_nursing_home', 'City Care Hospital & Maternity Center (Community Hospital)', 'Jaipur', 'Rajasthan', '8900010012355', FALSE, 45, 'Tier 2', 'Low', 'Non-NABH community clinic. Eligible for CGHS Non-NABH rates (15% lower ceiling).'),
('lifeline_clinic_lucknow', 'LifeLine Multispeciality Nursing Home', 'Lucknow', 'Uttar Pradesh', '8900010012356', FALSE, 30, 'Tier 2', 'Low', 'Non-NABH facility. Standard tariff structure.')
ON CONFLICT (id) DO NOTHING;

-- 3. NPPA Medicines Price Caps
INSERT INTO ref_nppa_medicines (drug_code, generic_name, strength, category, nppa_ceiling_price_inr, hospital_typical_mrp_inr, usage, billing_alert)
VALUES
('NPPA-MED-001', 'Paracetamol IV Infusion', '10 mg/ml (100 ml bottle)', 'Analgesic / Antipyretic', 40.50, 250.00, 'Intravenous pain and fever relief post-surgery or during acute illness.', 'Hospitals frequently bill ₹200 to ₹350 for Paracetamol IV. NPPA ceiling is ~₹40.50 + GST.'),
('NPPA-MED-002', 'Pantoprazole Injection (IV)', '40 mg vial', 'Gastrointestinal / Antacid', 53.20, 280.00, 'Prevents stress ulcers and acidity in admitted patients.', 'Administered to almost every admitted patient daily; hospitals inflate price up to 5x.'),
('NPPA-MED-003', 'Ceftriaxone Injection', '1 gm vial', 'Antibiotic', 62.80, 350.00, 'Broad-spectrum antibiotic for bacterial infections, pneumonia, and surgical prophylaxis.', 'Commonly billed with separate reconstitution and syringe charges.'),
('NPPA-MED-004', 'Meropenem Injection', '1 gm vial', 'Critical Care Antibiotic', 920.00, 3200.00, 'Heavy-duty antibiotic used in ICU for severe sepsis or resistant infections.', 'High-value injection given multiple times a day; check that doses billed match the nurse administration chart.'),
('NPPA-MED-005', 'Enoxaparin Injection (Low Molecular Weight Heparin)', '40 mg / 0.4 ml pre-filled syringe', 'Anticoagulant / Blood Thinner', 440.00, 1100.00, 'Prevents blood clots (DVT) after major surgery or in immobile ICU patients.', 'NPPA ceiling applies to branded pre-filled syringes.'),
('NPPA-MED-006', 'Normal Saline (Sodium Chloride 0.9%)', '500 ml IV bottle', 'IV Fluid / Hydration', 24.50, 120.00, 'Routine intravenous hydration and medication diluent.', 'Hospitals often bill multiple bottles daily at ₹100-₹150 each plus separate IV set fees.'),
('NPPA-MED-007', 'Ondansetron Injection', '2 mg/ml (2 ml ampoule)', 'Anti-emetic / Anti-nausea', 12.80, 85.00, 'Prevents vomiting and nausea caused by surgery or chemotherapy.', 'Very cheap generic drug frequently marked up 6x-7x on hospital invoices.'),
('NPPA-MED-008', 'Human Insulin (Regular)', '40 IU/ml (10 ml vial)', 'Antidiabetic', 155.00, 380.00, 'Controls high blood sugar in diabetic inpatients.', 'Hospitals sometimes charge full vial price per single injection dose.')
ON CONFLICT (drug_code) DO NOTHING;

-- 4. IRDAI Consumables Master
INSERT INTO ref_irdai_consumables (item_code, item_name, category, is_payable_standard_policy, payable_with_consumables_rider, typical_hospital_bill_range_inr, is_hospital_overhead, patient_advice)
VALUES
('IRDAI-CON-001', 'Surgical / Examination Gloves', 'Personal Protective Equipment', FALSE, TRUE, '₹500 - ₹3,500', TRUE, 'Non-payable by standard insurance. If billed excessively (e.g. 50 pairs for a 2-day stay), demand an itemized usage log from the nursing desk.'),
('IRDAI-CON-002', 'PPE Kits / Gowns / Masks', 'Personal Protective Equipment', FALSE, TRUE, '₹1,200 - ₹6,000', TRUE, 'In non-infectious routine cases, hospitals cannot bill multiple PPE kits per day. Covered if you have a Consumables Rider.'),
('IRDAI-CON-003', 'Admission Kit / Welcome Kit / Toiletries', 'Administrative & Comfort', FALSE, FALSE, '₹500 - ₹2,000', TRUE, 'Completely non-payable by insurers. You have the right to refuse the optional welcome kit upon hospital admission.'),
('IRDAI-CON-004', 'Hand Sanitizer / Spirit / Betadine Solution', 'Antiseptic & Disinfectant', FALSE, TRUE, '₹300 - ₹1,500', TRUE, 'General disinfectants are considered hospital infrastructure overhead, not an individual patient prescription.'),
('IRDAI-CON-005', 'Syringes, Needles & Cannula (IV Cannula)', 'Medical Consumables', FALSE, TRUE, '₹400 - ₹2,500', FALSE, 'Disallowed under standard policies but fully covered under Consumables Add-on / Care Shield / Star Care riders.'),
('IRDAI-CON-006', 'Documentation Charges / Medical Record Fee / Admin Charges', 'Hospital Overhead', FALSE, FALSE, '₹500 - ₹3,000', TRUE, 'Illegal under Consumer Protection Act precedents to charge patients for generating their own medical bill and discharge summary.'),
('IRDAI-CON-007', 'Thermometer / Spirometer', 'Patient Care Devices', FALSE, TRUE, '₹400 - ₹1,200', FALSE, 'If billed, ensure the hospital hands over the physical device to you upon discharge, as you purchased it.'),
('IRDAI-CON-008', 'Dietitian Charges / Patient Food & Beverage', 'Nutrition & Dietary', TRUE, TRUE, '₹500 - ₹2,500', TRUE, 'Patient diet prescribed by doctor IS payable as part of room rent. Attendant/visitor food is strictly non-payable.')
ON CONFLICT (item_code) DO NOTHING;

-- 5. Indian Insurers & TPAs
INSERT INTO ref_indian_insurers_tpas (id, name, type, irdai_reg_no, toll_free, cashless_email, grievance_portal, common_network)
VALUES
('star_health', 'Star Health and Allied Insurance', 'Standalone Health Insurer', '129', '1800-425-2255', 'support@starhealth.in', 'https://www.starhealth.in/grievance-redressal', '14,000+ Hospitals across India'),
('hdfc_ergo', 'HDFC ERGO General Insurance', 'General Insurer', '146', '022-6234-6234', 'care@hdfcergo.com', 'https://www.hdfcergo.com/customer-care/grievances', '12,000+ Hospitals'),
('care_health', 'Care Health Insurance (formerly Religare)', 'Standalone Health Insurer', '148', '1800-102-4488', 'customerfirst@careinsurance.com', 'https://www.careinsurance.com/grievance-redressal.html', '19,000+ Hospitals'),
('icici_lombard', 'ICICI Lombard General Insurance', 'General Insurer', '115', '1800-2666', 'customersupport@icicilombard.com', 'https://www.icicilombard.com/grievance-redressal', '10,000+ Hospitals'),
('niva_bupa', 'Niva Bupa Health Insurance (formerly Max Bupa)', 'Standalone Health Insurer', '145', '1860-500-8888', 'customercare@nivabupa.com', 'https://www.nivabupa.com/customer-service/grievance-redressal.html', '10,000+ Hospitals'),
('new_india', 'The New India Assurance Company (Public Sector / GIPSA)', 'Public Sector Insurer', '190', '1800-209-1415', 'tech.support@newindia.co.in', 'https://www.newindia.co.in/grievance', 'All GIPSA PPN Network Hospitals'),
('medi_assist_tpa', 'Medi Assist Insurance TPA Pvt Ltd', 'Third Party Administrator (TPA)', '003', '1800-425-9449', 'info@mediassist.in', 'https://www.mediassist.in/grievance/', 'Largest TPA network in India'),
('vidal_health_tpa', 'Vidal Health Insurance TPA', 'Third Party Administrator (TPA)', '016', '1800-425-8885', 'customerservice@vidalhealthtpa.com', 'https://www.vidalhealthtpa.com/', '11,000+ Hospitals'),
('paramount_tpa', 'Paramount Health Services & Insurance TPA', 'Third Party Administrator (TPA)', '006', '022-6662-0808', 'contact@paramounttpa.com', 'https://www.paramounttpa.com/Home/Grievance.aspx', 'Leading Corporate & Retail TPA'),
('irdai_bima_bharosa', 'IRDAI Bima Bharosa (National Insurance Grievance Portal)', 'Regulatory Escalation Body', 'GOVT-IRDAI', '155255 / 1800-4254-732', 'complaints@irdai.gov.in', 'https://bimabharosa.irdai.gov.in/', 'Official statutory forum for escalating rejected or unfairly deducted claims')
ON CONFLICT (id) DO NOTHING;

-- 6. Common Indian Claim Deductions & Guidelines
INSERT INTO ref_indian_claim_deductions (rule_id, title, description, legal_basis, dispute_strategy)
VALUES
('proportionate_deduction', 'Proportionate Deduction on Associated Medical Expenses', 'If room rent exceeds the policy cap (e.g. 1% of Sum Insured), the insurer slashes all associated medical costs (surgeon fees, nursing, OT) by the same ratio.', 'IRDAI Health Insurance Regulations', 'Verify whether your policy allows proportionate deduction on surgeon fees; IRDAI states ICU rooms do not attract proportionate deduction unless explicitly capped.'),
('non_medical_consumables', 'Deduction of Non-Medical Expenses (Gloves, Sanitizer, Cotton, Admin Fees)', 'Hospitals bill thousands for gloves, syringes, and PPE kits which TPAs routinely mark as non-payable.', 'IRDAI Master Circular (Annexure I non-payable list)', 'Check if patient has a Consumables Rider/Add-on. If billed excessively by hospital, demand a detailed itemized store ledger.'),
('cghs_standard_pricing_ruling', 'Overcharging Beyond Standard CGHS Benchmark', 'Hospitals charging 5x to 10x of CGHS rates without clinical justification.', 'Supreme Court of India Directive (Feb 2024 on Clinical Establishments Act)', 'Use CGHS rate comparison as evidence when filing grievance with State Clinical Establishments Council or District Consumer Commission.')
ON CONFLICT (rule_id) DO NOTHING;
