/**
 * MedBill.fyi - Reference Data TypeScript Interfaces
 * Single source of truth for frontend components and state models.
 */

export type ProcedureCategory = 
  | 'Doctor Visit' 
  | 'Imaging' 
  | 'Emergency' 
  | 'Surgery' 
  | 'Laboratory' 
  | 'Transportation'
  | 'Hospital Facility';

export type ClaimGroupPrefix = 'PR' | 'CO' | 'OA' | 'CR' | 'PI';

export interface ProcedureReference {
  code: string;
  codeType: 'CPT' | 'HCPCS' | 'DRG';
  name: string;
  plainEnglish: string;
  category: ProcedureCategory;
  medicareRate: number;
  fairPriceLow: number;
  fairPriceAvg: number;
  fairPriceHigh: number;
  notes?: string;
}

export interface CarcCodeReference {
  code: string;
  groupPrefix: ClaimGroupPrefix;
  title: string;
  officialDefinition: string;
  plainEnglishSummary: string;
  patientActionTip: string;
  isBalanceBillAlert: boolean;
}

export interface RarcCodeReference {
  code: string;
  title: string;
  plainEnglishSummary: string;
}

export interface RevenueCodeReference {
  code: string;
  category: string;
  description: string;
}

export interface InsurancePayerReference {
  id: string;
  name: string;
  payerId: string;
  planTypes: string[];
  supportPhone: string;
  disputePortalUrl: string;
}

export interface ProviderSearchResult {
  npi: string;
  displayName: string;
  specialty: string;
  address: string;
  phone: string | null;
}

export interface BillAnalysisComparison {
  procedureCode: string;
  procedureName: string;
  chargedAmount: number;
  medicareBenchmark: number;
  fairMarketAvg: number;
  markupPercent: number;        // e.g. +350%
  status: 'FAIR' | 'ELEVATED' | 'EXTREME_MARKUP';
  potentialSavings: number;
}
