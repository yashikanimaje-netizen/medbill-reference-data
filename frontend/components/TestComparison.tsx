import React, { useState, useMemo } from 'react';
import { 
  ALL_DIAGNOSTIC_TESTS, 
  DIAGNOSTIC_CATEGORIES, 
  CITIES_SELECTION 
} from '../cghs_constants';
import { DiagnosticTestItem } from '../cghs_types';
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
  badge: string;
  isNabl: boolean;
  tag: string;
}

// Sample dataset of diagnostic providers mapped by test ID
const TEST_CENTER_DIRECTORY: Record<string, CenterPricingData[]> = {
  mri_knee: [
    {
      name: 'Narayana Diagnostics & Imaging',
      providerType: 'labs',
      city: 'bengaluru',
      cityLabel: 'Bengaluru / Bangalore',
      distanceText: '2.4 km away',
      price: 2800,
      phone: '080-6750-6800',
      hours: '7 AM - 10 PM',
      chargeStatus: 'fair',
      chargeLabel: '✓ FAIRLY CHARGED',
      chargeSubtext: 'Within 12% of CGHS government ceiling rate',
      badge: '🟢 1.1x Fair Price',
      isNabl: true,
      tag: 'NABL / NABH Center'
    },
    {
      name: 'Dr Lal PathLabs & MRI Hub',
      providerType: 'labs',
      city: 'delhi_ncr',
      cityLabel: 'Delhi NCR & Gurugram',
      distanceText: '3.1 km away',
      price: 3500,
      phone: '011-3988-5050',
      hours: '8 AM - 8 PM',
      chargeStatus: 'fair',
      chargeLabel: '✓ FAIRLY CHARGED',
      chargeSubtext: 'Safe to book — Fair private market rate',
      badge: '🟢 1.4x Fair Price',
      isNabl: true,
      tag: 'NABL Diagnostic Chain'
    },
    {
      name: 'City Imaging & Scan Center',
      providerType: 'labs',
      city: 'delhi_ncr',
      cityLabel: 'Delhi NCR',
      distanceText: '4.5 km away',
      price: 3200,
      phone: '011-4560-1200',
      hours: '8 AM - 9 PM',
      chargeStatus: 'fair',
      chargeLabel: '✓ FAIRLY CHARGED',
      chargeSubtext: 'Empaneled rate aligned with CGHS baseline',
      badge: '🟢 1.3x Fair Price',
      isNabl: true,
      tag: 'CGHS Empaneled Lab'
    },
    {
      name: 'Apollo Clinic & Diagnostic Center',
      providerType: 'labs',
      city: 'bengaluru',
      cityLabel: 'Bengaluru',
      distanceText: '4.0 km away',
      price: 5200,
      phone: '080-2630-4050',
      hours: '8 AM - 8 PM',
      chargeStatus: 'moderate',
      chargeLabel: '⚠️ MODERATELY OVERCHARGED',
      chargeSubtext: '108% higher than CGHS baseline benchmark',
      badge: '🟡 2.1x Moderate Markup',
      isNabl: true,
      tag: 'Outpatient Clinic'
    },
    {
      name: 'Max Super Speciality Hospital',
      providerType: 'hospitals',
      city: 'delhi_ncr',
      cityLabel: 'Delhi NCR (Saket)',
      distanceText: '6.5 km away',
      price: 9500,
      phone: '011-2651-5050',
      hours: 'Open 24/7',
      chargeStatus: 'overpriced',
      chargeLabel: '🚨 HEAVILY OVERCHARGED',
      chargeSubtext: '280% markup (+₹7,000 corporate hospital premium)',
      badge: '🔴 3.8x Severe Markup',
      isNabl: true,
      tag: 'Corporate Hospital Lab'
    },
    {
      name: 'Fortis Memorial Research Institute (FMRI)',
      providerType: 'hospitals',
      city: 'delhi_ncr',
      cityLabel: 'Gurugram / NCR',
      distanceText: '5.2 km away',
      price: 10200,
      phone: '0124-496-2200',
      hours: 'Open 24/7',
      chargeStatus: 'overpriced',
      chargeLabel: '🚨 HEAVILY OVERCHARGED',
      chargeSubtext: '308% markup (+₹7,700 overcharge)',
      badge: '🔴 4.1x Severe Markup',
      isNabl: true,
      tag: 'Tertiary Quaternary Hospital'
    }
  ],
  cbc: [
    {
      name: 'Thyrocare Technologies (Doorstep Collection)',
      providerType: 'home',
      city: 'all',
      cityLabel: 'Pan-India Home Collection',
      distanceText: 'Doorstep Sample Pickup',
      price: 200,
      phone: '022-3090-0000',
      hours: '6 AM - 11 AM Pickup',
      chargeStatus: 'fair',
      chargeLabel: '✓ FAIRLY CHARGED',
      chargeSubtext: 'Near CGHS benchmark rate',
      badge: '🟢 1.3x Fair Price',
      isNabl: true,
      tag: 'Doorstep Collection'
    },
    {
      name: 'Dr Lal PathLabs',
      providerType: 'labs',
      city: 'delhi_ncr',
      cityLabel: 'Delhi NCR',
      distanceText: '1.0 km away',
      price: 320,
      phone: '011-3988-5050',
      hours: '7 AM - 9 PM',
      chargeStatus: 'fair',
      chargeLabel: '✓ FAIRLY CHARGED',
      chargeSubtext: 'Standard certified blood panel fee',
      badge: '🟢 Fair Price',
      isNabl: true,
      tag: 'NABL Certified'
    },
    {
      name: 'Max Super Speciality Hospital',
      providerType: 'hospitals',
      city: 'delhi_ncr',
      cityLabel: 'Delhi NCR',
      distanceText: '6.0 km away',
      price: 650,
      phone: '011-2651-5050',
      hours: 'Open 24/7',
      chargeStatus: 'overpriced',
      chargeLabel: '🚨 HEAVILY OVERCHARGED',
      chargeSubtext: '320% markup on routine blood panel',
      badge: '🔴 4.2x Extreme Markup',
      isNabl: true,
      tag: 'Hospital In-House Lab'
    }
  ],
  lipid_profile: [
    {
      name: 'Thyrocare Home Sample Collection',
      providerType: 'home',
      city: 'all',
      cityLabel: 'Doorstep Service',
      distanceText: 'Home Sample Pickup',
      price: 350,
      phone: '022-3090-0000',
      hours: '6 AM - 11 AM',
      chargeStatus: 'fair',
      chargeLabel: '✓ FAIRLY CHARGED',
      chargeSubtext: 'Within fair private market threshold',
      badge: '🟢 1.5x Fair Price',
      isNabl: true,
      tag: 'Doorstep Pickup'
    },
    {
      name: 'Dr Lal PathLabs',
      providerType: 'labs',
      city: 'delhi_ncr',
      cityLabel: 'Delhi NCR',
      distanceText: '1.2 km away',
      price: 550,
      phone: '011-3988-5050',
      hours: '7 AM - 9 PM',
      chargeStatus: 'moderate',
      chargeLabel: '⚠️ MODERATELY OVERCHARGED',
      chargeSubtext: '139% markup on lipid testing',
      badge: '🟡 2.4x Moderate Markup',
      isNabl: true,
      tag: 'NABL Lab'
    },
    {
      name: 'Medanta - The Medicity',
      providerType: 'hospitals',
      city: 'delhi_ncr',
      cityLabel: 'Gurugram / NCR',
      distanceText: '4.8 km away',
      price: 1350,
      phone: '0124-414-1414',
      hours: 'Open 24/7',
      chargeStatus: 'overpriced',
      chargeLabel: '🚨 HEAVILY OVERCHARGED',
      chargeSubtext: '486% markup (+₹1,120 overcharge)',
      badge: '🔴 5.8x Severe Markup',
      isNabl: true,
      tag: 'Corporate Hospital'
    }
  ]
};

export const TestComparison: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTestId, setSelectedTestId] = useState<string>('mri_knee');
  const [selectedCity, setSelectedCity] = useState<string>('delhi_ncr');
  const [pricingFilter, setPricingFilter] = useState<'all' | 'fair' | 'overpriced'>('all');
  const [providerTypeFilter, setProviderTypeFilter] = useState<string>('all');

  // Filter tests matching category
  const availableTests = useMemo(() => {
    if (selectedCategory === 'all') return ALL_DIAGNOSTIC_TESTS;
    return ALL_DIAGNOSTIC_TESTS.filter(t => t.category === selectedCategory);
  }, [selectedCategory]);

  const activeTest = useMemo(() => {
    return ALL_DIAGNOSTIC_TESTS.find(t => t.id === selectedTestId) || ALL_DIAGNOSTIC_TESTS[0];
  }, [selectedTestId]);

  // Retrieve centers for the active test
  const rawCenters = useMemo(() => {
    return TEST_CENTER_DIRECTORY[selectedTestId] || TEST_CENTER_DIRECTORY['mri_knee'];
  }, [selectedTestId]);

  // Filter centers based on city, facility type, and chargeStatus
  const filteredCenters = useMemo(() => {
    return rawCenters.filter(center => {
      // City
      if (selectedCity !== 'all' && center.city !== selectedCity && center.city !== 'all') {
        return false;
      }
      // Provider Type
      if (providerTypeFilter !== 'all' && center.providerType !== providerTypeFilter) {
        return false;
      }
      // Pricing Filter (Fair only vs Overpriced only)
      if (pricingFilter === 'fair' && center.chargeStatus !== 'fair') {
        return false;
      }
      if (pricingFilter === 'overpriced' && center.chargeStatus === 'fair') {
        return false;
      }
      return true;
    });
  }, [rawCenters, selectedCity, providerTypeFilter, pricingFilter]);

  // Calculate potential patient savings
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
    if (firstMatching) {
      setSelectedTestId(firstMatching.id);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search & Filter Header Container */}
      <div className="bg-gradient-to-r from-emerald-500/10 via-sky-500/10 to-transparent border border-emerald-500/30 rounded-2xl p-5 space-y-4">
        <div>
          <span className="text-[10px] bg-emerald-500/20 text-emerald-700 font-bold px-2 py-0.5 rounded uppercase tracking-wider">
            Automated Fair-Price Auditor
          </span>
          <h2 className="text-base font-bold text-[var(--foreground)] mt-1">
            Diagnostic Centers with Fair-Charge Verification Labels
          </h2>
          <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
            Every center is audited and labeled as{' '}
            <strong className="text-emerald-600 font-bold">✓ FAIRLY CHARGED</strong> or{' '}
            <strong className="text-rose-600 font-bold">🚨 HEAVILY OVERCHARGED</strong> against government CGHS ceilings.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-bold text-[var(--muted-foreground)] mr-1">Categories:</span>
          {DIAGNOSTIC_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] hover:border-emerald-500'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* City and Test Selector Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5">
          {/* City / Location Dropdown */}
          <div className="md:col-span-4 relative">
            <div className="flex items-center bg-[var(--card)] border border-[var(--border)] rounded-xl px-3 py-2 shadow-sm">
              <span className="text-emerald-600 mr-2 text-sm">📍</span>
              <div className="flex-1">
                <label htmlFor="city-select" className="block text-[9px] uppercase tracking-wider font-bold text-[var(--muted-foreground)]">
                  City / Location
                </label>
                <select
                  id="city-select"
                  value={selectedCity}
                  onChange={e => setSelectedCity(e.target.value)}
                  className="w-full bg-transparent text-xs font-semibold text-[var(--foreground)] outline-none cursor-pointer"
                >
                  {CITIES_SELECTION.map(city => (
                    <option key={city.id} value={city.id}>
                      {city.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Test Name Dropdown */}
          <div className="md:col-span-8 relative">
            <div className="flex items-center bg-[var(--card)] border border-[var(--border)] rounded-xl px-3 py-2 shadow-sm">
              <span className="text-emerald-600 mr-2 text-sm">📋</span>
              <div className="flex-1">
                <label htmlFor="test-select" className="block text-[9px] uppercase tracking-wider font-bold text-[var(--muted-foreground)]">
                  Diagnostic Test Name
                </label>
                <select
                  id="test-select"
                  value={selectedTestId}
                  onChange={e => setSelectedTestId(e.target.value)}
                  className="w-full bg-transparent text-xs font-semibold text-[var(--foreground)] outline-none cursor-pointer"
                >
                  {availableTests.map(t => (
                    <option key={t.id} value={t.id}>
                      {t.name} [CGHS Ceiling: ₹{t.cghsBenchmark.toLocaleString('en-IN')}]
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Filter Pills and Facility Type Selector */}
        <div className="flex items-center justify-between flex-wrap gap-2 border-t border-[var(--border)]/60 pt-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-bold text-[var(--muted-foreground)] mr-1">Filter by Pricing:</span>
            <button
              onClick={() => setPricingFilter('all')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                pricingFilter === 'all'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] hover:border-emerald-500'
              }`}
            >
              All Centers
            </button>
            <button
              onClick={() => setPricingFilter('fair')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                pricingFilter === 'fair'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-emerald-500/15 text-emerald-700 border border-emerald-500/30 hover:bg-emerald-500/25'
              }`}
            >
              ✓ Fairly Charged Only
            </button>
            <button
              onClick={() => setPricingFilter('overpriced')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                pricingFilter === 'overpriced'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-rose-500/15 text-rose-700 border border-rose-500/30 hover:bg-rose-500/25'
              }`}
            >
              ⚠️ Overcharged Centers
            </button>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-[var(--muted-foreground)]">
            <span>Facility Type:</span>
            <select
              value={providerTypeFilter}
              onChange={e => setProviderTypeFilter(e.target.value)}
              className="bg-[var(--card)] border border-[var(--border)] text-[11px] font-medium px-2 py-1 rounded-lg outline-none cursor-pointer text-[var(--foreground)]"
            >
              <option value="all">All Facilities</option>
              <option value="labs">NABL Diagnostic Labs</option>
              <option value="home">Home Collection</option>
              <option value="hospitals">Hospitals Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Benchmark Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[var(--background)] border border-[var(--border)] rounded-xl p-3.5 text-xs">
        <div>
          <span className="text-[var(--muted-foreground)]">
            Showing <strong>{filteredCenters.length} Centers</strong> for:
          </span>
          <span className="font-bold text-[var(--foreground)] ml-1 text-sm">{activeTest.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[var(--muted-foreground)]">Official CGHS Benchmark Ceiling:</span>
          <span className="font-bold text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
            ₹{activeTest.cghsBenchmark.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      {/* Patient Savings Banner */}
      {savings > 0 && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 text-xs flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-emerald-800">
            <span className="text-base">💡</span>
            <span>
              <strong>Patient Savings Tip:</strong> Choosing a center with the{' '}
              <strong className="text-emerald-700">✓ FAIRLY CHARGED</strong> label saves you up to{' '}
              <strong>₹{savings.toLocaleString('en-IN')}</strong> compared to corporate hospital rates!
            </span>
          </div>
        </div>
      )}

      {/* Diagnostic Centers List */}
      <div className="space-y-3">
        {filteredCenters.length === 0 ? (
          <div className="p-8 text-center bg-[var(--card)] border border-[var(--border)] rounded-xl">
            <span className="text-3xl">📍</span>
            <p className="text-xs font-semibold text-[var(--foreground)] mt-2">
              No centers match this exact filter in this city.
            </p>
            <p className="text-[11px] text-[var(--muted-foreground)] mt-1">
              Try switching to <strong>"All Centers"</strong> or selecting <strong>"All India"</strong>.
            </p>
          </div>
        ) : (
          filteredCenters.map((center, idx) => {
            const isFair = center.chargeStatus === 'fair';
            const cardBorderClass = isFair
              ? 'border-emerald-500/40 bg-gradient-to-r from-emerald-500/5 to-transparent'
              : center.chargeStatus === 'moderate'
              ? 'border-amber-500/40'
              : 'border-rose-500/40 bg-gradient-to-r from-rose-500/5 to-transparent';

            return (
              <div
                key={idx}
                className={`p-4 rounded-xl border ${cardBorderClass} bg-[var(--card)] hover:shadow-md transition-all space-y-3`}
              >
                {/* Center Title and Fair Status Badge Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[var(--border)]/70 pb-2.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-sm text-[var(--foreground)]">{center.name}</span>
                    <span className="bg-[var(--background)] border border-[var(--border)] text-[var(--muted-foreground)] font-semibold px-2 py-0.5 rounded text-[10px]">
                      {center.tag}
                    </span>
                  </div>
                  <div>
                    <FairPriceBadge status={center.chargeStatus} label={center.chargeLabel} />
                  </div>
                </div>

                {/* Location and Pricing Info Row */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div className="text-[var(--muted-foreground)] text-[11px] space-y-0.5">
                    <div>
                      📍 <strong>{center.cityLabel}</strong> ({center.distanceText}) • ⏰ {center.hours}
                    </div>
                    <div className="text-[var(--foreground)] font-medium mt-1">
                      Audit Verdict:{' '}
                      <span className={isFair ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold'}>
                        {center.chargeSubtext}
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-lg font-black text-[var(--foreground)]">
                      ₹{center.price.toLocaleString('en-IN')}
                    </div>
                    <div className="text-[10px] text-[var(--muted-foreground)] font-medium">
                      CGHS Ceiling: ₹{activeTest.cghsBenchmark.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>

                {/* Action Buttons Bar */}
                <div className="flex items-center justify-between border-t border-[var(--border)]/70 pt-2.5 text-xs">
                  <div className={`text-[11px] font-semibold ${isFair ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {center.price <= activeTest.cghsBenchmark * 1.5
                      ? '✓ Safe to book — Fair pricing confirmed'
                      : '⚠️ Overcharging detected — Consider alternative labs'}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => alert(`Calling ${center.name} at ${center.phone}`)}
                      className="px-3 py-1 bg-[var(--background)] hover:bg-[var(--border)] border border-[var(--border)] font-medium rounded-lg text-xs transition-colors"
                    >
                      📞 Call Center
                    </button>
                    <button
                      onClick={() => alert(`Booking confirmed at ${center.name} for ₹${center.price}`)}
                      className={`px-3.5 py-1 rounded-lg text-xs shadow-sm transition-colors ${
                        isFair
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white font-bold'
                          : 'bg-[var(--background)] hover:bg-[var(--border)] text-[var(--foreground)] border border-[var(--border)] font-medium'
                      }`}
                    >
                      {isFair ? 'Book at Fair Price' : 'Book Anyway'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
