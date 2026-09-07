import React, { useState, useMemo } from 'react';
import { 
  ALL_DIAGNOSTIC_TESTS, 
  DIAGNOSTIC_CATEGORIES, 
  CITIES_SELECTION 
} from '../cghs_constants';
import { FairPriceBadge } from './FairPriceBadge';

export interface CenterPricingData {
  name: string;
  providerType: 'home' | 'labs' | 'hospitals' | 'cghs';
  city: string;
  cityLabel: string;
  distanceText: string;
  price: number;
  phone: string;
  hours: string;
  chargeStatus: 'fair' | 'moderate' | 'overpriced';
  chargeLabel: '✓ FAIRLY CHARGED' | '⚠️ MODERATELY OVERCHARGED' | '🚨 HEAVILY OVERCHARGED';
  chargeSubtext: string;
  isNabl: boolean;
  tag: string;
}

const TEST_CENTER_DIRECTORY: Record<string, CenterPricingData[]> = {
  mri_knee: [
    { name: 'Narayana Diagnostics & Imaging', providerType: 'labs', city: 'bengaluru', cityLabel: 'Bengaluru / Bangalore', distanceText: '2.4 km away', price: 2800, phone: '080-6750-6800', hours: '7 AM - 10 PM', chargeStatus: 'fair', chargeLabel: '✓ FAIRLY CHARGED', chargeSubtext: 'Within 12% of CGHS government ceiling rate', isNabl: true, tag: 'NABL / NABH Center' },
    { name: 'Dr Lal PathLabs & MRI Hub', providerType: 'labs', city: 'delhi_ncr', cityLabel: 'Delhi NCR & Gurugram', distanceText: '3.1 km away', price: 3500, phone: '011-3988-5050', hours: '8 AM - 8 PM', chargeStatus: 'fair', chargeLabel: '✓ FAIRLY CHARGED', chargeSubtext: 'Safe to book — Fair private market rate', isNabl: true, tag: 'NABL Diagnostic Chain' },
    { name: 'City Imaging & Scan Center', providerType: 'labs', city: 'delhi_ncr', cityLabel: 'Delhi NCR', distanceText: '4.5 km away', price: 3200, phone: '011-4560-1200', hours: '8 AM - 9 PM', chargeStatus: 'fair', chargeLabel: '✓ FAIRLY CHARGED', chargeSubtext: 'Empaneled rate aligned with CGHS baseline', isNabl: true, tag: 'CGHS Empaneled Lab' },
    { name: 'Apollo Clinic & Diagnostic Center', providerType: 'labs', city: 'bengaluru', cityLabel: 'Bengaluru', distanceText: '4.0 km away', price: 5200, phone: '080-2630-4050', hours: '8 AM - 8 PM', chargeStatus: 'moderate', chargeLabel: '⚠️ MODERATELY OVERCHARGED', chargeSubtext: '108% higher than CGHS baseline benchmark', isNabl: true, tag: 'Outpatient Clinic' },
    { name: 'Max Super Speciality Hospital', providerType: 'hospitals', city: 'delhi_ncr', cityLabel: 'Delhi NCR (Saket)', distanceText: '6.5 km away', price: 9500, phone: '011-2651-5050', hours: 'Open 24/7', chargeStatus: 'overpriced', chargeLabel: '🚨 HEAVILY OVERCHARGED', chargeSubtext: '280% markup (+₹7,000 corporate hospital premium)', isNabl: true, tag: 'Corporate Hospital Lab' },
    { name: 'Fortis Memorial Research Institute (FMRI)', providerType: 'hospitals', city: 'delhi_ncr', cityLabel: 'Gurugram / NCR', distanceText: '5.2 km away', price: 10200, phone: '0124-496-2200', hours: 'Open 24/7', chargeStatus: 'overpriced', chargeLabel: '🚨 HEAVILY OVERCHARGED', chargeSubtext: '308% markup (+₹7,700 overcharge)', isNabl: true, tag: 'Tertiary Quaternary Hospital' }
  ],
  cbc: [
    { name: 'Thyrocare Technologies (Doorstep Collection)', providerType: 'home', city: 'all', cityLabel: 'Pan-India Home Collection', distanceText: 'Doorstep Sample Pickup', price: 200, phone: '022-3090-0000', hours: '6 AM - 11 AM Pickup', chargeStatus: 'fair', chargeLabel: '✓ FAIRLY CHARGED', chargeSubtext: 'Near CGHS benchmark rate', isNabl: true, tag: 'Doorstep Collection' },
    { name: 'Dr Lal PathLabs', providerType: 'labs', city: 'delhi_ncr', cityLabel: 'Delhi NCR', distanceText: '1.0 km away', price: 320, phone: '011-3988-5050', hours: '7 AM - 9 PM', chargeStatus: 'fair', chargeLabel: '✓ FAIRLY CHARGED', chargeSubtext: 'Standard certified blood panel fee', isNabl: true, tag: 'NABL Certified' },
    { name: 'Max Super Speciality Hospital', providerType: 'hospitals', city: 'delhi_ncr', cityLabel: 'Delhi NCR', distanceText: '6.0 km away', price: 650, phone: '011-2651-5050', hours: 'Open 24/7', chargeStatus: 'overpriced', chargeLabel: '🚨 HEAVILY OVERCHARGED', chargeSubtext: '320% markup on routine blood panel', isNabl: true, tag: 'Hospital In-House Lab' }
  ],
  lipid_profile: [
    { name: 'Thyrocare Home Sample Collection', providerType: 'home', city: 'all', cityLabel: 'Doorstep Service', distanceText: 'Home Sample Pickup', price: 350, phone: '022-3090-0000', hours: '6 AM - 11 AM', chargeStatus: 'fair', chargeLabel: '✓ FAIRLY CHARGED', chargeSubtext: 'Within fair private market threshold', isNabl: true, tag: 'Doorstep Pickup' },
    { name: 'Dr Lal PathLabs', providerType: 'labs', city: 'delhi_ncr', cityLabel: 'Delhi NCR', distanceText: '1.2 km away', price: 550, phone: '011-3988-5050', hours: '7 AM - 9 PM', chargeStatus: 'moderate', chargeLabel: '⚠️ MODERATELY OVERCHARGED', chargeSubtext: '139% markup on lipid testing', isNabl: true, tag: 'NABL Lab' },
    { name: 'Medanta - The Medicity', providerType: 'hospitals', city: 'delhi_ncr', cityLabel: 'Gurugram / NCR', distanceText: '4.8 km away', price: 1350, phone: '0124-414-1414', hours: 'Open 24/7', chargeStatus: 'overpriced', chargeLabel: '🚨 HEAVILY OVERCHARGED', chargeSubtext: '486% markup (+₹1,120 overcharge)', isNabl: true, tag: 'Corporate Hospital' }
  ]
};

export const TestComparison: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTestId, setSelectedTestId] = useState<string>('mri_knee');
  const [selectedCity, setSelectedCity] = useState<string>('delhi_ncr');
  const [pricingFilter, setPricingFilter] = useState<'all' | 'fair' | 'overpriced'>('all');
  const [providerTypeFilter, setProviderTypeFilter] = useState<string>('all');

  const availableTests = useMemo(() => {
    if (selectedCategory === 'all') return ALL_DIAGNOSTIC_TESTS;
    return ALL_DIAGNOSTIC_TESTS.filter(t => t.category === selectedCategory);
  }, [selectedCategory]);

  const activeTest = useMemo(() => {
    return ALL_DIAGNOSTIC_TESTS.find(t => t.id === selectedTestId) || ALL_DIAGNOSTIC_TESTS[0];
  }, [selectedTestId]);

  const rawCenters = useMemo(() => {
    return TEST_CENTER_DIRECTORY[selectedTestId] || TEST_CENTER_DIRECTORY['mri_knee'];
  }, [selectedTestId]);

  const filteredCenters = useMemo(() => {
    return rawCenters.filter(center => {
      if (selectedCity !== 'all' && center.city !== selectedCity && center.city !== 'all') return false;
      if (providerTypeFilter !== 'all' && center.providerType !== providerTypeFilter) return false;
      if (pricingFilter === 'fair' && center.chargeStatus !== 'fair') return false;
      if (pricingFilter === 'overpriced' && center.chargeStatus === 'fair') return false;
      return true;
    });
  }, [rawCenters, selectedCity, providerTypeFilter, pricingFilter]);

  const savings = useMemo(() => {
    if (rawCenters.length === 0) return 0;
    const highestPrice = Math.max(...rawCenters.map(c => c.price));
    const lowestPrice = Math.min(...rawCenters.map(c => c.price));
    return Math.max(0, highestPrice - lowestPrice);
  }, [rawCenters]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    const firstMatching = category === 'all' 
      ? ALL_DIAGNOSTIC_TESTS[0] 
      : ALL_DIAGNOSTIC_TESTS.find(t => t.category === category);
    if (firstMatching) setSelectedTestId(firstMatching.id);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6 bg-slate-50 min-h-screen">
      <header className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h1 className="text-2xl font-bold text-slate-900">Diagnostic Center Auditor</h1>
        <p className="text-slate-500 mt-1">Compare private prices against official CGHS benchmarks.</p>
      </header>

      <section className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-wrap gap-4 items-center">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Category</label>
          <select value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm">
            {DIAGNOSTIC_CATEGORIES.map(cat => <option key={cat.id} value={cat.id}>{cat.label}</option>)}
          </select>
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">City</label>
          <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm">
            {CITIES_SELECTION.map(city => <option key={city.id} value={city.id}>{city.label}</option>)}
          </select>
        </div>
      </section>

      <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex justify-between items-center text-emerald-800">
        <p className="text-sm font-medium">CGHS Benchmark Ceiling: <span className="font-bold text-lg">₹{activeTest.cghsBenchmark.toLocaleString('en-IN')}</span></p>
        {savings > 0 && <p className="text-xs">Potential savings: <strong>₹{savings.toLocaleString('en-IN')}</strong></p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCenters.map((center, idx) => (
          <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-slate-900">{center.name}</h3>
                <FairPriceBadge status={center.chargeStatus} size="sm" />
              </div>
              <p className="text-xs text-slate-500 mb-2">{center.cityLabel} • {center.distanceText}</p>
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-100">
              <span className="text-xl font-bold text-slate-900">₹{center.price.toLocaleString('en-IN')}</span>
              <button className="text-xs bg-slate-900 text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-slate-700">Book Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
