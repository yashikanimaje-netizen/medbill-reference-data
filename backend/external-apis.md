# External Reference Data: CMS NPPES Doctor & Hospital Lookup API

## Overview
Instead of maintaining a massive 10GB+ registry of all US healthcare providers, **MedBill.fyi** queries the official **CMS NPPES Registry API** in real-time. It is completely **free**, requires **no API key**, and is the official US government source.

## Base Endpoint
```http
GET https://npiregistry.cms.hhs.gov/api/?version=2.1
```

## Common Query Parameters
| Parameter | Description | Example |
| :--- | :--- | :--- |
| `version` | Always set to `2.1` | `2.1` |
| `enumeration_type` | `NPI-1` for Individual Doctors, `NPI-2` for Hospitals/Facilities | `NPI-1` |
| `number` | Exact 10-digit NPI number (if user entered it from their bill) | `1234567890` |
| `first_name` | Doctor first name (supports wildcard `*`) | `Sarah` |
| `last_name` | Doctor last name or facility name | `Johnson` |
| `organization_name` | Hospital / Facility name (for `NPI-2`) | `Stanford Health` |
| `state` | 2-letter state code | `CA` |
| `postal_code` | 5-digit zip code | `94305` |
| `limit` | Max results (1 - 200, default 10) | `10` |

---

## Example 1: Search for an Individual Doctor (NPI-1)
```bash
curl -X GET "https://npiregistry.cms.hhs.gov/api/?version=2.1&enumeration_type=NPI-1&first_name=Sarah&last_name=Smith&state=CA&limit=5"
```

## Example 2: Search for a Hospital or Clinic (NPI-2)
```bash
curl -X GET "https://npiregistry.cms.hhs.gov/api/?version=2.1&enumeration_type=NPI-2&organization_name=Cedar*&state=CA&limit=5"
```

---

## Backend Proxy Implementation Example (Node.js / Express)
Do not call the NPPES API directly from the client frontend (to avoid CORS and enable caching). Instead, add this proxy route to your backend:

```typescript
import axios from 'axios';
import { Request, Response } from 'express';

export async function searchProvider(req: Request, res: Response) {
  try {
    const { name, state, isFacility } = req.query;
    
    const params: Record<string, string> = {
      version: '2.1',
      limit: '10'
    };

    if (isFacility === 'true') {
      params.enumeration_type = 'NPI-2';
      params.organization_name = `${name}*`;
    } else {
      params.enumeration_type = 'NPI-1';
      params.last_name = `${name}*`;
    }

    if (state) params.state = String(state);

    const response = await axios.get('https://npiregistry.cms.hhs.gov/api/', { params });
    
    // Normalize into MedBill.fyi schema
    const results = (response.data.results || []).map((item: any) => {
      const basic = item.basic;
      const isInd = item.enumeration_type === 'NPI-1';
      return {
        npi: item.number,
        displayName: isInd ? `Dr. ${basic.first_name} ${basic.last_name} ${basic.credential || ''}`.trim() : basic.organization_name,
        specialty: item.taxonomies?.find((t: any) => t.primary)?.desc || 'General Practice',
        address: item.addresses?.[0] ? `${item.addresses[0].address_1}, ${item.addresses[0].city}, ${item.addresses[0].state} ${item.addresses[0].postal_code}` : 'Address not listed',
        phone: item.addresses?.[0]?.telephone_number || null
      };
    });

    return res.json({ success: true, count: results.length, data: results });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Provider registry unavailable' });
  }
}
```
