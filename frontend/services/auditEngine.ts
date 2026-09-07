/**
 * MedBill.fyi - Audit Engine
 * Evaluates Indian healthcare bills and pre-diagnostic tests against:
 * 1. CGHS NABH / Non-NABH benchmark tariffs (MoHFW)
 * 2. NPPA DPCO drug ceiling prices (NLEM)
 * 3. IRDAI non-payable items guidelines (Circular Ref: IRDAI/HLT/REG/CIR/177/06/2020)
 */

import { 
  BillItemAudit, 
  BillAuditSummary, 
  DiagnosticCenterPricing 
} from '../cghs_types';

export interface FairPriceVerdict {
  chargeStatus: 'fair' | 'moderate' | 'overpriced';
  chargeLabel: '✓ FAIRLY CHARGED' | '⚠️ MODERATELY OVERCHARGED' | '🚨 HEAVILY OVERCHARGED';
  markupMultiplier: number;
  markupPercentage: number;
  overchargeInr: number;
  verdictText: string;
}

/**
 * Calculates fair price verdict for any diagnostic test or hospital procedure.
 * - Fair: <= 1.5x of CGHS Benchmark rate
 * - Moderate: > 1.5x and <= 2.5x of CGHS Benchmark rate
 * - Overpriced: > 2.5x of CGHS Benchmark rate
 */
export function calculateFairPriceVerdict(hospitalPrice: number, benchmarkPrice: number): FairPriceVerdict {
  if (benchmarkPrice <= 0) {
    return {
      chargeStatus: 'overpriced',
      chargeLabel: '🚨 HEAVILY OVERCHARGED',
      markupMultiplier: 99.9,
      markupPercentage: 100,
      overchargeInr: hospitalPrice,
      verdictText: '100% Non-Payable overhead or non-medical charge'
    };
  }

  const multiplier = Number((hospitalPrice / benchmarkPrice).toFixed(1));
  const overchargeInr = Math.max(0, hospitalPrice - benchmarkPrice);
  const markupPercentage = Math.round((overchargeInr / benchmarkPrice) * 100);

  if (multiplier <= 1.5) {
    return {
      chargeStatus: 'fair',
      chargeLabel: '✓ FAIRLY CHARGED',
      markupMultiplier: multiplier,
      markupPercentage,
      overchargeInr,
      verdictText: multiplier <= 1.0 
        ? 'At or below government CGHS ceiling rate' 
        : `Within acceptable private market margin (${markupPercentage}% markup)`
    };
  } else if (multiplier <= 2.5) {
    return {
      chargeStatus: 'moderate',
      chargeLabel: '⚠️ MODERATELY OVERCHARGED',
      markupMultiplier: multiplier,
      markupPercentage,
      overchargeInr,
      verdictText: `Moderately higher than standard benchmark (+${markupPercentage}% markup)`
    };
  } else {
    return {
      chargeStatus: 'overpriced',
      chargeLabel: '🚨 HEAVILY OVERCHARGED',
      markupMultiplier: multiplier,
      markupPercentage,
      overchargeInr,
      verdictText: `Severe inflation detected (${multiplier}x CGHS benchmark ceiling)`
    };
  }
}

/**
 * Recalculates audit summary for a list of billed line items
 */
export function calculateBillSummary(items: BillItemAudit[]): BillAuditSummary {
  const totalBilled = items.reduce((sum, item) => sum + item.hospitalPrice, 0);
  const totalBenchmark = items.reduce((sum, item) => sum + item.benchmarkPrice, 0);
  const totalOvercharge = Math.max(0, totalBilled - totalBenchmark);
  const markupPercentage = totalBenchmark > 0 
    ? Math.round((totalOvercharge / totalBenchmark) * 100) 
    : 0;

  let verdict: 'FAIR' | 'MODERATE_MARKUP' | 'HEAVILY_OVERPRICED' = 'FAIR';
  let verdictTitle = 'Fairly Billed';
  let verdictDescription = 'Overall invoice charges are reasonably aligned with CGHS government benchmark ceilings.';

  if (markupPercentage > 150) {
    verdict = 'HEAVILY_OVERPRICED';
    verdictTitle = 'Fair Price Verdict: Heavily Overpriced';
    verdictDescription = `This bill is priced ${markupPercentage}% higher than standard government-approved CGHS tariffs & NPPA drug price caps.`;
  } else if (markupPercentage > 30) {
    verdict = 'MODERATE_MARKUP';
    verdictTitle = 'Fair Price Verdict: Moderate Markup Detected';
    verdictDescription = `Several line items exceed standard tariffs by ${markupPercentage}%. Review individual lines for dispute potential.`;
  }

  return {
    totalBilled,
    totalBenchmark,
    totalOvercharge,
    markupPercentage,
    verdict,
    verdictTitle,
    verdictDescription,
    itemCount: items.length
  };
}

/**
 * Filter diagnostic centers based on user search criteria
 */
export interface DiagnosticFilterOptions {
  city: string;
  providerType: 'all' | 'cghs' | 'labs' | 'home' | 'hospitals';
  chargeStatus: 'all' | 'fair' | 'overpriced';
}

export function filterDiagnosticCenters(
  centers: DiagnosticCenterPricing[],
  options: DiagnosticFilterOptions
): DiagnosticCenterPricing[] {
  return centers.filter(center => {
    // 1. City filter
    if (options.city !== 'all') {
      const cityMatches = center.city.toLowerCase().includes(options.city.toLowerCase()) || 
                          center.city === 'all' || 
                          center.city === 'Pan-India';
      if (!cityMatches) return false;
    }

    // 2. Provider Type filter
    if (options.providerType !== 'all') {
      const typeMatches = center.type.toLowerCase().includes(options.providerType.toLowerCase());
      if (!typeMatches) return false;
    }

    // 3. Fair-Price Charge Status filter
    if (options.chargeStatus === 'fair') {
      if (center.chargeStatus !== 'fair') return false;
    } else if (options.chargeStatus === 'overpriced') {
      if (center.chargeStatus === 'fair') return false;
    }

    return true;
  });
}

/**
 * Generates an official IRDAI / Hospital grievance notice letter
 */
export function generateDisputeNotice(
  hospitalName: string,
  insurerName: string,
  items: BillItemAudit[],
  summary: BillAuditSummary
): string {
  const dateStr = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const disputedLines = items
    .filter(i => i.hospitalPrice > i.benchmarkPrice)
    .map(i => ` - ${i.name} [${i.category}]: Hospital Billed ₹${i.hospitalPrice.toLocaleString('en-IN')} vs Govt Ceiling ₹${i.benchmarkPrice.toLocaleString('en-IN')} (Excess: ₹${(i.hospitalPrice - i.benchmarkPrice).toLocaleString('en-IN')})`)
    .join('\n');

  return `FORMAL NOTICE OF BILLING DISPUTE & AUDIT VARIANCE
Date: ${dateStr}

To:
The Medical Superintendent / Patient Grievance Officer
${hospitalName}

CC:
1. Grievance Redressal Officer, ${insurerName}
2. Insurance Regulatory and Development Authority of India (IRDAI Bima Bharosa Portal)
3. National Pharmaceutical Pricing Authority (NPPA Grievance Cell)

SUBJECT: Representation Regarding Inflated Billing, Non-Adherence to CGHS/NPPA Ceilings & Non-Payable Deductions

Dear Sir / Madam,

This communication serves as a formal representation regarding the itemized medical bill issued by ${hospitalName}. Upon independent reference auditing against Central Government Health Scheme (CGHS) benchmark tariffs, National Pharmaceutical Pricing Authority (NPPA) ceiling caps, and IRDAI Non-Payable Circulars, several material variances were detected:

1. SUMMARY OF AUDITED CHARGES:
   - Total Amount Billed: ₹${summary.totalBilled.toLocaleString('en-IN')}
   - Fair Government Benchmark Rate: ₹${summary.totalBenchmark.toLocaleString('en-IN')}
   - Calculated Excess Variance: ₹${summary.totalOvercharge.toLocaleString('en-IN')} (+${summary.markupPercentage}% Markup)

2. SPECIFIC LINE-ITEM DISCREPANCIES:
${disputedLines || '   - Excessive room tariff markups and consumable overheads billed separately.'}

3. REGULATORY BASIS OF DISPUTE:
   a. Supreme Court of India directives mandating standardization of hospital rates across clinical establishments.
   b. Drugs (Prices Control) Order, 2013 (DPCO) Section 28 - Punitive liability for charging above NPPA ceiling prices for scheduled formulations.
   c. IRDAI Guidelines on Standardization in Health Insurance (Circular Ref: IRDAI/HLT/REG/CIR/177/06/2020) prohibiting separate billing of standard hospital operating consumables.

In view of the above discrepancies, you are requested to:
1. Reissue a rectified, fair invoice aligned with recognized benchmark ceilings.
2. Waive non-admissible consumable charges billed contrary to IRDAI guidelines.
3. Provide an itemized justification within 7 working days, failing which this matter will be formally escalated to the District Consumer Commission and IRDAI Bima Bharosa.

Yours faithfully,
Patient Representative / Policyholder
(Generated via MedBill.fyi Fair-Rate Verification System)
`;
}
