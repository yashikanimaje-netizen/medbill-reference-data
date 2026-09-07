# MedBill.fyi - Complete Reference Data Package

This repository contains the comprehensive reference data for **MedBill.fyi**, supporting both **Indian Healthcare (CGHS, NPPA & IRDAI)** and **Global / US Healthcare (CMS Medicare & CPT)** standards.

---

## 📁 Repository Structure

```text
medbill-reference-data/
├── backend/
│   ├── cghs_schema.sql         # Database schema for CGHS rates, Hospitals, NPPA medicines & TPAs
│   ├── cghs_seed.sql           # SQL INSERT seeds for procedures, hospitals, drugs & consumables
│   ├── schema.sql              # Database schema for US (CPT / Medicare / CARC)
│   ├── seed.sql                # SQL INSERT seeds for US benchmarks
│   ├── external-apis.md        # Guide for CMS NPPES Doctor/Hospital verification API
│   └── data/
│       ├── cghs_rates.json     # CGHS NABH vs Non-NABH benchmark rates & typical private charges (₹)
│       ├── hospitals.json      # Major Indian hospital chains with NABH status & ROHINI codes
│       ├── nppa_medicines.json # NPPA NLEM essential medicines government ceiling prices (₹)
│       ├── irdai_consumables.json # IRDAI non-payable consumables list & patient advocacy rules
│       ├── indian_insurers_tpas.json # Star Health, HDFC ERGO, Medi Assist TPA, IRDAI Bima Bharosa
│       ├── procedures.json     # US CPT/HCPCS codes & Medicare rates ($)
│       ├── carc_codes.json     # EOB claim denial/adjustment reason codes
│       ├── rarc_codes.json     # Remittance remark codes
│       ├── revenue_codes.json  # UB-04 Hospital revenue codes
│       └── payers.json         # US Insurance payers
├── frontend/
│   ├── cghs_constants.ts       # Indian Insurers, TPAs, Popular Hospitals, CGHS city tiers & deductions
│   ├── cghs_types.ts           # TypeScript interfaces for CGHS audits, Hospitals & Medicines in INR (₹)
│   ├── constants.ts            # US dropdown options, bill types, dispute reasons
│   ├── types.ts                # TypeScript interfaces for procedure & CARC models
│   └── mock_api_responses.json # Mock responses for offline UI development
└── README.md                   # Complete reference & handoff documentation
```

---

## 🇮🇳 Indian Healthcare Reference Datasets

### 1. CGHS Rate Master (`backend/data/cghs_rates.json`)
* National benchmark rates fixed by the Ministry of Health & Family Welfare (MoHFW).
* Differentiates **NABH-accredited** vs **Non-NABH** hospitals.
* Covers ICU per-day caps, consultations, lab panels, MRI/CT scans, C-Sections, Angioplasty (PTCA), and Knee Replacements (TKR).

### 2. Major Hospitals Registry (`backend/data/hospitals.json`)
* Master list of prominent hospital chains across Delhi, Mumbai, Bengaluru, Hyderabad, Chennai, Kolkata, Pune (Apollo, Max, Fortis, Manipal, Medanta, Narayana Health).
* Automatically provides the hospital's **NABH Accreditation status** and **ROHINI Code** so the app selects the right CGHS rate tier automatically.

### 3. NPPA Drug Price Caps (`backend/data/nppa_medicines.json`)
* Government ceiling prices fixed by the National Pharmaceutical Pricing Authority under NLEM.
* Audits the **In-Hospital Pharmacy** bill (Paracetamol IV, Pantoprazole, Ceftriaxone, Meropenem, Enoxaparin, Normal Saline).

### 4. IRDAI Consumables Master (`backend/data/irdai_consumables.json`)
* Categorizes hospital consumables (gloves, PPE, syringes, welcome kits, admin charges).
* Details whether items are non-payable, covered with a Consumables Rider, or an illegal hospital overhead charge.

### 5. Insurers & TPAs (`backend/data/indian_insurers_tpas.json`)
* Star Health, HDFC ERGO, Care, ICICI Lombard, Niva Bupa, Medi Assist TPA, Vidal Health, and the statutory **IRDAI Bima Bharosa** portal.

---

## 🛠️ Backend Setup (India)
```bash
# PostgreSQL
psql -U <username> -d medbill_db -f backend/cghs_schema.sql
psql -U <username> -d medbill_db -f backend/cghs_seed.sql
```

## 🎨 Frontend Usage (India)
```typescript
import { 
  INDIAN_HEALTH_INSURERS, 
  INDIAN_TPAS, 
  POPULAR_INDIAN_HOSPITALS,
  CGHS_CITY_TIERS 
} from '../reference-data/frontend/cghs_constants';

import { 
  CGHSProcedureReference, 
  HospitalReference,
  NPPAMedicineReference, 
  IRDAIConsumableReference 
} from '../reference-data/frontend/cghs_types';
```
