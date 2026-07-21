'use client';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AirportSearch from '@/components/AirportSearch';
import TravellerSelector from '@/components/TravellerSelector';
import { SearchStore, getCurrency, setCurrency } from '@/utils/api';

const CURRENCIES = ['PKR', 'USD', 'AED', 'GBP'];

const POPULAR_DESTINATIONS = [
  { city: 'Dubai',    iata: 'DXB', country: 'UAE',     emoji: '🇦🇪', price: 'from PKR 42,000' },
  { city: 'London',   iata: 'LHR', country: 'UK',      emoji: '🇬🇧', price: 'from PKR 145,000' },
  { city: 'Istanbul', iata: 'IST', country: 'Turkey',  emoji: '🇹🇷', price: 'from PKR 68,000' },
  { city: 'Riyadh',   iata: 'RUH', country: 'KSA',     emoji: '🇸🇦', price: 'from PKR 35,000' },
  { city: 'Bangkok',  iata: 'BKK', country: 'Thailand',emoji: '🇹🇭', price: 'from PKR 58,000' },
  { city: 'Doha',     iata: 'DOH', country: 'Qatar',   emoji: '🇶🇦', price: 'from PKR 39,000' },
];

const TRUST_BADGES = [
  { icon: '🏷️', title: 'Best Price Guarantee', sub: 'We match the lowest fares' },
  { icon: '🔒', title: 'Secure Payments',       sub: 'Encrypted & safe transactions' },
  { icon: '🕐', title: '24/7 Support',          sub: 'Always here to help you' },
  { icon: '✈️', title: 'Instant Confirmation',  sub: 'Booking confirmed instantly' },
];

const TODAY = new Date().toISOString().split('T')[0];


const LogoIcon = ({ className = "w-8 h-8" }) => (
  <svg 
    className={`text-red-600 transform -rotate-45 transition-transform duration-500 ${className}`} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2C10.67 2 10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z" 
      fill="currentColor"
    />
  </svg>
);

export default function HomePage() {
  const router = useRouter();
  const [tripType, setTripType] = useState('one-way');
  const [origin,      setOrigin]      = useState(null);
  const [destination, setDestination] = useState(null);
  const [depDate,     setDepDate]     = useState(TODAY);
  const [retDate,     setRetDate]     = useState('');
  const [travellers,  setTravellers]  = useState({ adults: 1, children: 0, infants: 0, cabin_class: 'economy' });
  const [currency,    setCurrencyState] = useState(() => (typeof window !== 'undefined' ? getCurrency() : 'PKR'));
  // Multi-city legs
  const [legs, setLegs] = useState([
    { origin: null, destination: null, date: TODAY },
    { origin: null, destination: null, date: '' },
  ]);
  const [error, setError] = useState('');

  function handleCurrency(c) { setCurrency(c); setCurrencyState(c); }

  function swapAirports() {
    const tmp = origin;
    setOrigin(destination);
    setDestination(tmp);
  }

  function updateLeg(i, field, val) {
    const next = [...legs];
    next[i] = { ...next[i], [field]: val };
    setLegs(next);
  }

  function handleSearch(e) {
    e.preventDefault();
    setError('');

    if (tripType === 'multi-city') {
      const valid = legs.every(l => l.origin && l.destination && l.date);
      if (!valid) { setError('Please fill in all flight legs.'); return; }
      const legsPayload = legs.map(l => ({
        origin: l.origin.iata_code,
        destination: l.destination.iata_code,
        departure_date: l.date,
      }));
      SearchStore.set({ tripType, legs: legsPayload, travellers });
      router.push('/search?type=multi-city');
      return;
    }

    if (!origin || !destination) { setError('Please select origin and destination airports.'); return; }
    if (!depDate) { setError('Please select a departure date.'); return; }
    if (tripType === 'round-trip' && !retDate) { setError('Please select a return date.'); return; }

    SearchStore.set({
      tripType,
      origin: origin.iata_code,
      originName: origin.city_name || origin.name,
      destination: destination.iata_code,
      destinationName: destination.city_name || destination.name,
      depDate,
      retDate: tripType === 'round-trip' ? retDate : '',
      travellers,
    });
    router.push('/search');
  }

  return (
    <div className="home-page">

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero__bg" aria-hidden="true" />
        <div className="hero__overlay" aria-hidden="true" />

        <div className="hero__content">
          <div className="hero__top-bar">
            <div className="hero__tagline">
              <h1 className="hero__title">Fly Smarter,<br />Travel Further</h1>
              <p className="hero__sub">Real flights. Real prices. No IATA required.</p>
            </div>
            {/* Currency selector */}
            <div className="currency-picker">
              {CURRENCIES.map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => handleCurrency(c)}
                  className={`currency-btn ${currency === c ? 'currency-btn--active' : ''}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Search form card */}
          <div className="search-card">
            {/* Trip type tabs */}
            <div className="trip-tabs" role="tablist" aria-label="Trip type">
              {[['one-way', '→ One Way'], ['round-trip', '⇌ Round Trip'], ['multi-city', '⊞ Multi-City']].map(([val, label]) => (
                <button
                  key={val}
                  role="tab"
                  aria-selected={tripType === val}
                  type="button"
                  className={`trip-tab ${tripType === val ? 'trip-tab--active' : ''}`}
                  onClick={() => setTripType(val)}
                >
                  {label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSearch} noValidate>
              {/* Standard / Round-trip form */}
              {tripType !== 'multi-city' && (
                <div className="search-form">
                  <div className="search-airports">
                    <AirportSearch
                      id="home-origin"
                      value={origin}
                      onChange={setOrigin}
                      placeholder="From: City or airport"
                      label="From"
                    />
                    <button type="button" className="swap-btn" onClick={swapAirports} aria-label="Swap airports">⇄</button>
                    <AirportSearch
                      id="home-destination"
                      value={destination}
                      onChange={setDestination}
                      placeholder="To: City or airport"
                      label="To"
                    />
                  </div>

                  <div className="search-dates-row">
                    <div className="search-date-field">
                      <label className="search-field-label" htmlFor="dep-date">Departure</label>
                      <input
                        id="dep-date"
                        type="date"
                        className="search-date-input"
                        value={depDate}
                        min={TODAY}
                        onChange={e => setDepDate(e.target.value)}
                        required
                      />
                    </div>
                    {tripType === 'round-trip' && (
                      <div className="search-date-field">
                        <label className="search-field-label" htmlFor="ret-date">Return</label>
                        <input
                          id="ret-date"
                          type="date"
                          className="search-date-input"
                          value={retDate}
                          min={depDate || TODAY}
                          onChange={e => setRetDate(e.target.value)}
                          required
                        />
                      </div>
                    )}
                    <div className="search-traveller-field">
                      <label className="search-field-label">Travellers & Class</label>
                      <TravellerSelector value={travellers} onChange={setTravellers} />
                    </div>
                    <Link href="/search"  type="submit" className="search-btn" id="home-search-btn">
                      🔍 Search Flights
                    </Link>
                  </div>
                </div>
              )}

              {/* Multi-city form */}
              {tripType === 'multi-city' && (
                <div className="multicity-form">
                  {legs.map((leg, i) => (
                    <div key={i} className="multicity-leg">
                      <span className="multicity-leg__num">Leg {i + 1}</span>
                      <AirportSearch
                        id={`mc-origin-${i}`}
                        value={leg.origin}
                        onChange={v => updateLeg(i, 'origin', v)}
                        placeholder="From"
                      />
                      <AirportSearch
                        id={`mc-dest-${i}`}
                        value={leg.destination}
                        onChange={v => updateLeg(i, 'destination', v)}
                        placeholder="To"
                      />
                      <input
                        type="date"
                        className="search-date-input"
                        value={leg.date}
                        min={TODAY}
                        onChange={e => updateLeg(i, 'date', e.target.value)}
                        aria-label={`Departure date for leg ${i + 1}`}
                      />
                      {legs.length > 2 && (
                        <button type="button" className="multicity-remove" onClick={() => setLegs(l => l.filter((_, idx) => idx !== i))} aria-label={`Remove leg ${i + 1}`}>✕</button>
                      )}
                    </div>
                  ))}
                  <div className="multicity-actions">
                    {legs.length < 5 && (
                      <button type="button" className="multicity-add" onClick={() => setLegs(l => [...l, { origin: null, destination: null, date: '' }])}>
                        + Add Another Flight
                      </button>
                    )}
                    <div className="search-traveller-field">
                      <TravellerSelector value={travellers} onChange={setTravellers} />
                    </div>
                    <Link href="/search"  type="submit" className="search-btn" id="home-search-btn-mc">
                      🔍 Search Flights
                    </Link>
                  </div>
                </div>
              )}

              {error && <p className="search-error" role="alert">{error}</p>}
            </form>
          </div>
        </div>
      </section>

      {/* ── POPULAR DESTINATIONS ──────────────────────────── */}
      <section className="section destinations-section">
        <div className="container-wide">
          <h2 className="section-title">Popular Destinations</h2>
          <p className="section-sub">Top routes booked by our travellers</p>
          <div className="destinations-grid">
            {POPULAR_DESTINATIONS.map(dest => (
              <Link
                key={dest.iata}
                href={`/search?origin=KHI&destination=${dest.iata}&date=${depDate}`}
                className="dest-card"
                id={`dest-card-${dest.iata}`}
              >
                <div className="dest-card__flag">{dest.emoji}</div>
                <div className="dest-card__info">
                  <div className="dest-card__city">{dest.city}</div>
                  <div className="dest-card__country">{dest.country}</div>
                  <div className="dest-card__price">{dest.price}</div>
                </div>
                <span className="dest-card__iata">{dest.iata}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── AGENT CTA ─────────────────────────────────────── */}
      <section className="section agent-cta-section">
        <div className="container-wide">
          <div className="agent-cta-card">
            <div className="agent-cta__icon">🧳</div>
            <div className="agent-cta__text">
              <h2 className="agent-cta__title">Are you a travel agent?</h2>
              <p className="agent-cta__sub">
                Book flights for your clients without an IATA code. Top up your wallet, submit requests, and get tickets issued — all from one dashboard.
              </p>
            </div>
            <div className="agent-cta__btns">
              <Link href="/agent/login?tab=register" className="btn-primary" id="cta-agent-signup">
                Join as Agent
              </Link>
              <Link href="/agent" className="btn-secondary" id="cta-agent-learn">
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BADGES ──────────────────────────────────── */}
      <section className="section trust-section">
        <div className="container-wide">
          <div className="trust-grid">
            {TRUST_BADGES.map((b, i) => (
              <div key={i} className="trust-card">
                <div className="trust-card__icon">{b.icon}</div>
                <div className="trust-card__title">{b.title}</div>
                <div className="trust-card__sub">{b.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────── */}
      <footer className="site-footer">
        <div className="container-wide">
          <div className="footer-grid">
            <div className="footer-brand">
              <span className="footer-logo">Sky<span>Ways</span></span>
              <p className="footer-tagline">Real flights, smarter booking.</p>
            </div>
            <div className="footer-col">
              <div className="footer-col-title">Company</div>
              <Link href="/about" className="footer-link">About Us</Link>
              <Link href="/contact" className="footer-link">Contact</Link>
            </div>
            <div className="footer-col">
              <div className="footer-col-title">Travel Agents</div>
              <Link href="/agent" className="footer-link">Agent Portal</Link>
              <Link href="/agent/login?tab=register" className="footer-link">Register as Agent</Link>
            </div>
            <div className="footer-col">
              <div className="footer-col-title">Support</div>
              <Link href="/search" className="footer-link">Search Flights</Link>
              <Link href="/dashboard" className="footer-link">My Bookings</Link>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} SkyWays. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
