/**
 * MedBill.fyi - Frontend UI Constants & Static Options
 * Dropdown data, status badges, and quick-picker options.
 */

export const INSURANCE_PAYERS = [
  { value: 'aetna', label: 'Aetna', payerId: '60054' },
  { value: 'bcbs', label: 'Blue Cross Blue Shield', payerId: '00000' },
  { value: 'cigna', label: 'Cigna Healthcare', payerId: '62308' },
  { value: 'humana', label: 'Humana', payerId: '61101' },
  { value: 'kaiser', label: 'Kaiser Permanente', payerId: '94135' },
  { value: 'medicare', label: 'Medicare (Part A / B)', payerId: '00400' },
  { value: 'medicaid', label: 'Medicaid (State)', payerId: 'MEDICAID' },
  { value: 'uhc', label: 'UnitedHealthcare', payerId: '87726' },
  { value: 'uninsured', label: 'Uninsured / Self-Pay', payerId: 'SELF_PAY' },
  { value: 'other', label: 'Other Insurance Provider', payerId: 'OTHER' },
] as const;

export const BILL_TYPES = [
  { value: 'er', label: 'Emergency Room Visit' },
  { value: 'inpatient', label: 'Inpatient Hospital Stay' },
  { value: 'outpatient_surgery', label: 'Outpatient Surgery / Procedure' },
  { value: 'office_visit', label: 'Doctor / Specialist Clinic Visit' },
  { value: 'imaging', label: 'Imaging (MRI, CT, X-Ray, Ultrasound)' },
  { value: 'lab_work', label: 'Lab Tests / Blood Work' },
  { value: 'ambulance', label: 'Ambulance / Medical Transport' },
] as const;

export const COMMON_PROCEDURES_QUICK_SELECT = [
  { code: '99214', name: 'Office Doctor Visit (Level 4)', category: 'Doctor Visit' },
  { code: '99284', name: 'Emergency Room High Severity', category: 'Emergency' },
  { code: '73721', name: 'Knee MRI Scan', category: 'Imaging' },
  { code: '72148', name: 'Lumbar Spine (Back) MRI', category: 'Imaging' },
  { code: '71250', name: 'Chest CT Scan', category: 'Imaging' },
  { code: '80053', name: 'Comprehensive Metabolic Panel (Blood)', category: 'Laboratory' },
  { code: '45378', name: 'Diagnostic Colonoscopy', category: 'Surgery' },
  { code: 'A0427', name: 'ALS Emergency Ambulance', category: 'Transportation' },
] as const;

export const DISPUTE_REASONS = [
  { id: 'balance_billing', label: 'Illegal Balance Billing (No Surprises Act violation)' },
  { id: 'unbundling', label: 'Unbundled Charges (Billed separately for inclusive services)' },
  { id: 'upcoding', label: 'Upcoding (Billed for a higher complexity level than received)' },
  { id: 'duplicate_charge', label: 'Duplicate Billing / Charged twice for same test' },
  { id: 'service_not_rendered', label: 'Service or medication never received' },
  { id: 'fair_market_excess', label: 'Grossly Excessive Charge (Exceeds 400% of Medicare benchmark)' },
] as const;

export const US_STATES = [
  { code: 'AL', name: 'Alabama' }, { code: 'AK', name: 'Alaska' },
  { code: 'AZ', name: 'Arizona' }, { code: 'AR', name: 'Arkansas' },
  { code: 'CA', name: 'California' }, { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' }, { code: 'DE', name: 'Delaware' },
  { code: 'FL', name: 'Florida' }, { code: 'GA', name: 'Georgia' },
  { code: 'HI', name: 'Hawaii' }, { code: 'ID', name: 'Idaho' },
  { code: 'IL', name: 'Illinois' }, { code: 'IN', name: 'Indiana' },
  { code: 'IA', name: 'Iowa' }, { code: 'KS', name: 'Kansas' },
  { code: 'KY', name: 'Kentucky' }, { code: 'LA', name: 'Louisiana' },
  { code: 'ME', name: 'Maine' }, { code: 'MD', name: 'Maryland' },
  { code: 'MA', name: 'Massachusetts' }, { code: 'MI', name: 'Michigan' },
  { code: 'MN', name: 'Minnesota' }, { code: 'MS', name: 'Mississippi' },
  { code: 'MO', name: 'Missouri' }, { code: 'MT', name: 'Montana' },
  { code: 'NE', name: 'Nebraska' }, { code: 'NV', name: 'Nevada' },
  { code: 'NH', name: 'New Hampshire' }, { code: 'NJ', name: 'New Jersey' },
  { code: 'NM', name: 'New Mexico' }, { code: 'NY', name: 'New York' },
  { code: 'NC', name: 'North Carolina' }, { code: 'ND', name: 'North Dakota' },
  { code: 'OH', name: 'Ohio' }, { code: 'OK', name: 'Oklahoma' },
  { code: 'OR', name: 'Oregon' }, { code: 'PA', name: 'Pennsylvania' },
  { code: 'RI', name: 'Rhode Island' }, { code: 'SC', name: 'South Carolina' },
  { code: 'SD', name: 'South Dakota' }, { code: 'TN', name: 'Tennessee' },
  { code: 'TX', name: 'Texas' }, { code: 'UT', name: 'Utah' },
  { code: 'VT', name: 'Vermont' }, { code: 'VA', name: 'Virginia' },
  { code: 'WA', name: 'Washington' }, { code: 'WV', name: 'West Virginia' },
  { code: 'WI', name: 'Wisconsin' }, { code: 'WY', name: 'Wyoming' }
] as const;
