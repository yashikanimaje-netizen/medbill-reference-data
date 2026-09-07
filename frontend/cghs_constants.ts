/**
 * MedBill.fyi - Indian Healthcare & CGHS Constants
 * Dropdown options, city tiers, hospital accreditation, deduction types, and consumables categories.
 */

export const INDIAN_HEALTH_INSURERS = [
  { value: 'star_health', label: 'Star Health and Allied Insurance' },
  { value: 'hdfc_ergo', label: 'HDFC ERGO General Insurance' },
  { value: 'care_health', label: 'Care Health Insurance (Religare)' },
  { value: 'icici_lombard', label: 'ICICI Lombard General Insurance' },
  { value: 'niva_bupa', label: 'Niva Bupa Health Insurance' },
  { value: 'aditya_birla', label: 'Aditya Birla Health Insurance' },
  { value: 'bajaj_allianz', label: 'Bajaj Allianz General Insurance' },
  { value: 'tata_aig', label: 'Tata AIG General Insurance' },
  { value: 'new_india', label: 'The New India Assurance (Public Sector)' },
  { value: 'national_insurance', label: 'National Insurance Company' },
  { value: 'oriental_insurance', label: 'Oriental Insurance Company' },
  { value: 'united_india', label: 'United India Insurance' },
  { value: 'other', label: 'Other Insurer' },
] as const;

export const INDIAN_TPAS = [
  { value: 'medi_assist', label: 'Medi Assist TPA' },
  { value: 'vidal_health', label: 'Vidal Health TPA' },
  { value: 'paramount', label: 'Paramount Health TPA' },
  { value: 'mdindia', label: 'MDIndia Health Insurance TPA' },
  { value: 'heritage', label: 'Heritage Health TPA' },
  { value: 'raksha', label: 'Raksha TPA' },
  { value: 'direct_inhouse', label: 'In-House Claim Settlement (No TPA)' },
] as const;

export const CGHS_CITY_TIERS = [
  { code: 'delhi_ncr', name: 'Delhi / NCR (Tier 1)' },
  { code: 'mumbai', name: 'Mumbai / Thane (Tier 1)' },
  { code: 'bengaluru', name: 'Bengaluru / Bangalore (Tier 1)' },
  { code: 'hyderabad', name: 'Hyderabad (Tier 1)' },
  { code: 'chennai', name: 'Chennai (Tier 1)' },
  { code: 'kolkata', name: 'Kolkata (Tier 1)' },
  { code: 'pune', name: 'Pune (Tier 1)' },
  { code: 'ahmedabad', name: 'Ahmedabad (Tier 2)' },
  { code: 'tier_2', name: 'Other Tier 2 Cities (Jaipur, Lucknow, Chandigarh, etc.)' },
  { code: 'tier_3', name: 'Tier 3 / Semi-Urban Towns' },
] as const;

export const HOSPITAL_ACCREDITATION_TYPES = [
  { value: 'nabh', label: 'NABH Accredited Hospital (Eligible for Full CGHS Rate)' },
  { value: 'non_nabh', label: 'Non-NABH Hospital (15% Lower Standard Rate)' },
  { value: 'nabl_lab', label: 'NABL Certified Pathology Lab' },
] as const;

export const POPULAR_INDIAN_HOSPITALS = [
  { id: 'max_saket_delhi', label: 'Max Super Speciality Hospital, Saket (New Delhi)', isNabh: true },
  { id: 'medanta_gurugram', label: 'Medanta - The Medicity (Gurugram)', isNabh: true },
  { id: 'fortis_fmri_gurugram', label: 'Fortis Memorial Research Institute (Gurugram)', isNabh: true },
  { id: 'ganga_ram_delhi', label: 'Sir Ganga Ram Hospital (New Delhi)', isNabh: true },
  { id: 'manipal_old_airport_blr', label: 'Manipal Hospital, Old Airport Road (Bengaluru)', isNabh: true },
  { id: 'apollo_bannerghatta_blr', label: 'Apollo Hospitals, Bannerghatta Road (Bengaluru)', isNabh: true },
  { id: 'narayana_cardiac_blr', label: 'Narayana Institute of Cardiac Sciences (Bengaluru)', isNabh: true },
  { id: 'kokilaben_mumbai', label: 'Kokilaben Dhirubhai Ambani Hospital (Mumbai)', isNabh: true },
  { id: 'lilavati_mumbai', label: 'Lilavati Hospital (Mumbai)', isNabh: true },
  { id: 'apollo_jubilee_hyd', label: 'Apollo Hospitals, Jubilee Hills (Hyderabad)', isNabh: true },
  { id: 'aig_gachibowli_hyd', label: 'AIG Hospitals (Hyderabad)', isNabh: true },
  { id: 'apollo_greams_chennai', label: 'Apollo Hospitals, Greams Road (Chennai)', isNabh: true },
  { id: 'fortis_anandapur_kolkata', label: 'Fortis Hospital, Anandapur (Kolkata)', isNabh: true },
  { id: 'ruby_hall_pune', label: 'Ruby Hall Clinic (Pune)', isNabh: true },
  { id: 'city_care_nursing_home', label: 'City Care Hospital & Maternity (Jaipur - Non-NABH)', isNabh: false },
] as const;

export const INDIAN_COMMON_BILL_DEDUCTIONS = [
  { id: 'room_rent_capping', label: 'Proportionate Deduction due to Room Rent Capping (1% Rule)' },
  { id: 'non_medical_items', label: 'Non-Payable Consumables (Gloves, PPE, Sanitizer, Syringes)' },
  { id: 'copay_applied', label: 'Mandatory Co-Payment (e.g. 10% or 20% Zone/Age copay)' },
  { id: 'unreasonable_charges', label: 'Reasonable & Customary Charges (R&C) clause deduction' },
  { id: 'admission_not_justified', label: 'Hospitalization not medically necessary (OPD converted to IPD)' },
  { id: 'cghs_excess', label: 'Hospital billed excessive rate compared to CGHS / GIPSA PPN tariff' },
] as const;

export const CONSUMABLE_CATEGORIES = [
  'Personal Protective Equipment',
  'Administrative & Comfort',
  'Antiseptic & Disinfectant',
  'Medical Consumables',
  'Hospital Overhead',
  'Patient Care Devices',
  'Nutrition & Dietary'
] as const;

export const DIAGNOSTIC_CATEGORIES = [
  { id: 'all', label: 'All Tests' },
  { id: 'mri', label: 'MRI & CT Scans' },
  { id: 'blood', label: 'Blood & Pathology' },
  { id: 'usg', label: 'Ultrasound' },
  { id: 'cardiac', label: 'Cardiac & Heart' }
] as const;

export const CITIES_SELECTION = [
  { id: 'all', label: 'All India (Pan-India)' },
  { id: 'delhi_ncr', label: 'Delhi / NCR & Gurugram' },
  { id: 'bengaluru', label: 'Bengaluru / Bangalore' },
  { id: 'mumbai', label: 'Mumbai & Thane' },
  { id: 'hyderabad', label: 'Hyderabad' },
  { id: 'chennai', label: 'Chennai' },
  { id: 'kolkata', label: 'Kolkata' },
  { id: 'pune', label: 'Pune' },
  { id: 'jaipur', label: 'Jaipur (Tier 2)' }
] as const;

export const ALL_DIAGNOSTIC_TESTS = [
  { id: 'mri_knee', name: 'MRI Knee Joint (Plain)', category: 'mri', categoryLabel: 'MRI & CT Scans', cghsBenchmark: 2500, description: 'Evaluation of ligaments, meniscus, and articular cartilage of the knee joint.' },
  { id: 'mri_brain', name: 'MRI Brain / Head (Plain & Contrast)', category: 'mri', categoryLabel: 'MRI & CT Scans', cghsBenchmark: 3000, description: 'High-resolution neuroimaging for neurological symptoms, stroke, and headaches.' },
  { id: 'mri_spine', name: 'MRI Lumbar Spine (LS Spine)', category: 'mri', categoryLabel: 'MRI & CT Scans', cghsBenchmark: 2500, description: 'Diagnostic scan for disc herniation, sciatica, and chronic lower back pain.' },
  { id: 'ct_chest', name: 'HRCT Chest (High Resolution CT)', category: 'mri', categoryLabel: 'MRI & CT Scans', cghsBenchmark: 1800, description: 'Gold standard thoracic scan for pulmonary fibrosis, pneumonia, and lung lesions.' },
  { id: 'ct_head', name: 'CT Scan Head / Brain (Plain)', category: 'mri', categoryLabel: 'MRI & CT Scans', cghsBenchmark: 1100, description: 'Emergency non-contrast scan for trauma, hemorrhage, and acute intracranial pathology.' },
  { id: 'cbc', name: 'Complete Blood Count (CBC + ESR)', category: 'blood', categoryLabel: 'Blood & Pathology', cghsBenchmark: 155, description: 'Primary hematology panel evaluating hemoglobin, platelets, and white blood cells.' },
  { id: 'lipid_profile', name: 'Lipid Profile (Full Cholesterol Panel)', category: 'blood', categoryLabel: 'Blood & Pathology', cghsBenchmark: 230, description: 'Assesses total cholesterol, HDL, LDL, VLDL, and triglycerides for cardiovascular risk.' },
  { id: 'lft', name: 'Liver Function Test (LFT Panel)', category: 'blood', categoryLabel: 'Blood & Pathology', cghsBenchmark: 250, description: 'Comprehensive panel measuring bilirubin, SGOT, SGPT, ALP, and total protein.' },
  { id: 'kft', name: 'Kidney Function Test (KFT / RFT with Electrolytes)', category: 'blood', categoryLabel: 'Blood & Pathology', cghsBenchmark: 250, description: 'Measures blood urea, serum creatinine, uric acid, sodium, and potassium.' },
  { id: 'hba1c', name: 'HbA1c (Glycosylated Hemoglobin)', category: 'blood', categoryLabel: 'Blood & Pathology', cghsBenchmark: 160, description: 'Standard 3-month glycemic control monitoring for diabetic management.' },
  { id: 'thyroid_tsh', name: 'Thyroid Profile (T3, T4, Ultra TSH)', category: 'blood', categoryLabel: 'Blood & Pathology', cghsBenchmark: 220, description: 'Endocrine panel for diagnosing hypothyroidism, hyperthyroidism, and goiter.' },
  { id: 'usg_abdomen', name: 'Ultrasound Whole Abdomen & Pelvis (USG)', category: 'usg', categoryLabel: 'Ultrasound', cghsBenchmark: 500, description: 'Sonographic imaging of liver, gallbladder, pancreas, kidneys, spleen, and bladder.' },
  { id: 'usg_pelvis', name: 'USG Pelvis / Lower Abdomen (TVS / TAS)', category: 'usg', categoryLabel: 'Ultrasound', cghsBenchmark: 400, description: 'Pelvic sonography for gynecological, uterine, and ovarian evaluation.' },
  { id: 'ecg', name: '12-Lead Electrocardiogram (ECG)', category: 'cardiac', categoryLabel: 'Cardiac & Heart', cghsBenchmark: 100, description: 'Routine cardiac electrical tracing for arrhythmia and ischemic evaluation.' },
  { id: 'echo_2d', name: '2D Echocardiography with Color Doppler', category: 'cardiac', categoryLabel: 'Cardiac & Heart', cghsBenchmark: 1200, description: 'Cardiovascular ultrasound assessing ejection fraction and valvular morphology.' }
] as const;

export const SAMPLE_BILL_ITEMS_PRESET = [
  { id: 1, name: 'ICU Bed Charges (2 Days)', category: 'Inpatient', hospitalPrice: 52000, benchmarkPrice: 10800, badgeText: '4.8x Overcharge', badgeType: 'extreme' },
  { id: 2, name: 'MRI Knee Joint (Plain)', category: 'Imaging', hospitalPrice: 9500, benchmarkPrice: 2500, badgeText: '3.8x Markup', badgeType: 'high' },
  { id: 3, name: 'Paracetamol IV Infusion (4 bottles)', category: 'Pharmacy', hospitalPrice: 1000, benchmarkPrice: 162, badgeText: 'NPPA Cap Exceeded', badgeType: 'nppa' },
  { id: 4, name: 'Surgical Gloves & PPE Kits (10 pairs)', category: 'Consumables', hospitalPrice: 4200, benchmarkPrice: 0, badgeText: 'Non-Payable Overhead', badgeType: 'consumable' },
  { id: 5, name: 'Complete Blood Count (CBC)', category: 'Laboratory', hospitalPrice: 650, benchmarkPrice: 155, badgeText: '4.2x Markup', badgeType: 'high' }
] as const;

