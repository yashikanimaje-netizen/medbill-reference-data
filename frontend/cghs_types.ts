/**
 * MedBill.fyi - Indian Healthcare & CGHS TypeScript Interfaces
 */

export type CGHSCategory =
  | 'Consultation'
  | 'Inpatient & Room Rent'
  | 'Laboratory/Pathology'
  | 'Radiology & Imaging'
  | 'Nephrology'
  | 'Maternity & Obstetrics'
  | 'Ophthalmology'
  | 'General Surgery'
  | 'Cardiology'
  | 'Orthopaedics';

export type HospitalAccreditation = 'nabh' | 'non_nabh' | 'nabl_lab';

export interface CGHSProcedureReference {
  cghsCode: string;
  procedureName: string;
  category: CGHSCategory;
  cghsNabhRateInr: number;
  cghsNonNabhRateInr: number;
  privateHospitalTypicalRateInr: number;
  plainEnglish: string;
  billingAlert?: string;
}

export interface HospitalReference {
  id: string;
  name: string;
  city: string;
  state: string;
  rohiniCode?: string;
  isNabhAccredited: boolean;
  bedCapacity?: number;
  tier: 'Tier 1' | 'Tier 2' | 'Tier 3';
  markupRisk: 'Low' | 'Moderate' | 'High' | 'Extreme';
  notes?: string;
}

export interface NPPAMedicineReference {
  drugCode: string;
  genericName: string;
  strength: string;
  category: string;
  nppaCeilingPriceInr: number;
  hospitalTypicalMrpInr: number;
  usage: string;
  billingAlert?: string;
}

export interface IRDAIConsumableReference {
  itemCode: string;
  itemName: string;
  category: string;
  isPayableStandardPolicy: boolean;
  payableWithConsumablesRider: boolean;
  typicalHospitalBillRangeInr: string;
  isHospitalOverhead: boolean;
  patientAdvice: string;
}

export interface IndianPayerReference {
  id: string;
  name: string;
  type: 'Standalone Health Insurer' | 'General Insurer' | 'Third Party Administrator (TPA)' | 'Regulatory Escalation Body';
  irdaiRegNo: string;
  tollFree: string;
  cashlessEmail: string;
  grievancePortal: string;
  commonNetwork: string;
}

export interface IndianBillAuditLineItem {
  code: string;
  description: string;
  chargedAmountInr: number;
  benchmarkRateInr: number;
  markupMultiple: string;         // e.g. "4.2x Benchmark"
  status: 'REASONABLE' | 'MODERATE_MARKUP' | 'EXTREME_MARKUP';
  disputeTip: string;
}

export interface DiagnosticCenterPricing {
  centerName: string;
  city: string;
  type: string;
  accreditation: string;
  priceInr: number;
  markupMultiplier: string;
  verdict: string;
  chargeStatus: 'fair' | 'moderate' | 'overpriced';
  chargeLabel: '✓ FAIRLY CHARGED' | '⚠️ MODERATELY OVERCHARGED' | '🚨 HEAVILY OVERCHARGED';
  distance: string;
}

export interface DiagnosticTestItem {
  id: string;
  name: string;
  category: 'mri' | 'blood' | 'usg' | 'cardiac';
  categoryLabel: string;
  cghsBenchmark: number;
  description: string;
  preparationAdvice?: string;
}

export interface BillItemAudit {
  id: string | number;
  name: string;
  category: 'Inpatient' | 'Imaging' | 'Pharmacy' | 'Consumables' | 'Laboratory' | 'Consultation' | 'Surgery';
  hospitalPrice: number;
  benchmarkPrice: number;
  badgeText: string;
  badgeType: 'fair' | 'high' | 'extreme' | 'nppa' | 'consumable';
  overchargeAmount: number;
  markupPercentage: number;
  disputeClause?: string;
}

export interface BillAuditSummary {
  totalBilled: number;
  totalBenchmark: number;
  totalOvercharge: number;
  markupPercentage: number;
  verdict: 'FAIR' | 'MODERATE_MARKUP' | 'HEAVILY_OVERPRICED';
  verdictTitle: string;
  verdictDescription: string;
  itemCount: number;
}


