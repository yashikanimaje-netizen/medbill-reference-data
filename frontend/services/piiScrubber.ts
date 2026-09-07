/**
 * MedBill.fyi - PII Redaction & Anonymization Engine
 * Complies with India's Digital Personal Data Protection (DPDP) Act 2023.
 * Automatically scrubs Personally Identifiable Information (PII) before bill analysis.
 */

export interface ScrubResult {
  anonymizedText: string;
  detectedPIICount: number;
  scrubbedFields: {
    aadhaarNumbers: number;
    phoneNumbers: number;
    panCards: number;
    emails: number;
    patientIdentifiers: number;
  };
}

// Regex patterns for Indian PII detection
const PATTERNS = {
  // Indian 12-digit Aadhaar number with optional spaces or hyphens: e.g. 1234 5678 9012 or 1234-5678-9012
  aadhaar: /\b[2-9]{1}[0-9]{3}[\s\-]?[0-9]{4}[\s\-]?[0-9]{4}\b/g,

  // Indian 10-digit mobile number, with optional country code +91 or 0
  phone: /(?:\+91[\s\-]?)?(?:91[\s\-]?)?(?:[6-9]\d{9})\b/g,

  // Permanent Account Number (PAN): 5 letters, 4 digits, 1 letter (e.g. ABCDE1234F)
  pan: /\b[A-Z]{5}[0-9]{4}[A-Z]{1}\b/g,

  // Email address
  email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,

  // Patient UHID / MRN / Registration Number
  uhid: /\b(?:UHID|MRN|IPD|OPD|REG|PATIENT\s*ID)[\s:#\-_]*([A-Za-z0-9\/-]{5,20})/gi,

  // Patient Name prefixes (Mr., Mrs., Miss, Master, Dr., Smt.)
  patientNamePrefix: /(?:Patient\s*(?:Name)?[\s:#]+)?(?:Mr\.|Mrs\.|Ms\.|Dr\.|Smt\.|Master)\s+([A-Za-z\s]{3,30})(?=\s*[\n,\r]|\s*(?:Age|Sex|Gender|Bed|DOB))/gi,

  // Age & Gender combined identifiers
  ageGender: /\b(?:Age|Sex|Gender)[\s:#]+(?:\d{1,3}\s*(?:Y|Yrs|Years)?)?[\s\/\-]*(?:Male|Female|M|F|Other)\b/gi
};

/**
 * Scrubs raw bill OCR text or form data of all patient PII.
 */
export function scrubMedicalBillText(rawText: string): ScrubResult {
  let text = rawText;
  let aadhaarCount = 0;
  let phoneCount = 0;
  let panCount = 0;
  let emailCount = 0;
  let patientIdCount = 0;

  // 1. Scrub Aadhaar
  text = text.replace(PATTERNS.aadhaar, () => {
    aadhaarCount++;
    return '[REDACTED_AADHAAR_XXXX]';
  });

  // 2. Scrub Mobile Numbers
  text = text.replace(PATTERNS.phone, () => {
    phoneCount++;
    return '[REDACTED_PHONE_XXXX]';
  });

  // 3. Scrub PAN Cards
  text = text.replace(PATTERNS.pan, () => {
    panCount++;
    return '[REDACTED_PAN_XXXX]';
  });

  // 4. Scrub Emails
  text = text.replace(PATTERNS.email, () => {
    emailCount++;
    return '[REDACTED_EMAIL]';
  });

  // 5. Scrub UHID / Registration numbers
  text = text.replace(PATTERNS.uhid, () => {
    patientIdCount++;
    return 'UHID: [REDACTED_ID]';
  });

  // 6. Scrub Patient Name Prefix lines
  text = text.replace(PATTERNS.patientNamePrefix, () => {
    patientIdCount++;
    return 'Patient: [ANONYMOUS_PATIENT]';
  });

  const detectedPIICount = aadhaarCount + phoneCount + panCount + emailCount + patientIdCount;

  return {
    anonymizedText: text,
    detectedPIICount,
    scrubbedFields: {
      aadhaarNumbers: aadhaarCount,
      phoneNumbers: phoneCount,
      panCards: panCount,
      emails: emailCount,
      patientIdentifiers: patientIdCount
    }
  };
}
