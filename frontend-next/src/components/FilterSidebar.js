'use client';
import { useState } from 'react';
import { formatPrice } from '@/utils/api';

const TIME_BLOCKS = [
  { id: 'morning',   label: 'Morning',   sub: '06–12', icon: '🌅', start: 6,  end: 12 },
  { id: 'afternoon', label: 'Afternoon', sub: '12–18', icon: '☀️', start: 12, end: 18 },
  { id: 'evening',   label: 'Evening',   sub: '18–24', icon: '🌆', start: 18, end: 24 },
  { id: 'night',     label: 'Night',     sub: '00–06', icon: '🌙', start: 0,  end: 6  },
];

export default function FilterSidebar({ offers = [], filters, onChange, onReset }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!offers.length) return null;

  // Derive dynamic filter options from actual results
  const airlines = [...new Map(offers.map(o => [o.airline_iata, { iata: o.airline_iata, name: o.airline_name, logo: o.airline_logo }])).values()];
  const allPrices = offers.map(o => parseFloat(o.total_amount || 0)).filter(Boolean);
  const minPrice = Math.floor(Math.min(...allPrices));
  const maxPrice = Math.ceil(Math.max(...allPrices));

  const { stops = [], airlines: selAirlines = [], times = [], maxDuration = 24, priceRange = [minPrice, maxPrice] } = filters;

  function toggleStop(n) {
    const next = stops.includes(n) ? stops.filter(s => s !== n) : [...stops, n];
    onChange({ ...filters, stops: next });
  }
  function toggleAirline(code) {
    const next = selAirlines.includes(code) ? selAirlines.filter(a => a !== code) : [...selAirlines, code];
    onChange({ ...filters, airlines: next });
  }
  function toggleTime(id) {
    const next = times.includes(id) ? times.filter(t => t !== id) : [...times, id];
    onChange({ ...filters, times: next });
  }
  function setPrice(idx, val) {
    const next = [...priceRange];
    next[idx] = Number(val);
    if (next[0] <= next[1]) onChange({ ...filters, priceRange: next });
  }

  const activeCount = stops.length + selAirlines.length + times.length;

  const panel = (
    <div className="filter-panel">
      <div className="filter-panel__header">
        <span className="filter-panel__title">Filters {activeCount > 0 && <span className="filter-badge">{activeCount}</span>}</span>
        <button className="filter-reset" onClick={onReset}>Reset all</button>
      </div>

      {/* Price range */}
      <div className="filter-section">
        <div className="filter-section__title">Price Range</div>
        <div className="filter-price-values">
          <span>{formatPrice(priceRange[0], 'USD')}</span>
          <span>{formatPrice(priceRange[1], 'USD')}</span>
        </div>
        <input type="range" min={minPrice} max={maxPrice} value={priceRange[0]}
          onChange={e => setPrice(0, e.target.value)} className="filter-range" aria-label="Minimum price" />
        <input type="range" min={minPrice} max={maxPrice} value={priceRange[1]}
          onChange={e => setPrice(1, e.target.value)} className="filter-range" aria-label="Maximum price" />
      </div>

      {/* Stops */}
      <div className="filter-section">
        <div className="filter-section__title">Stops</div>
        {[{ n: 0, label: 'Non-stop' }, { n: 1, label: '1 Stop' }, { n: 2, label: '2+ Stops' }].map(({ n, label }) => (
          <label key={n} className="filter-checkbox">
            <input type="checkbox" checked={stops.includes(n)} onChange={() => toggleStop(n)} />
            <span className="filter-checkbox__label">{label}</span>
          </label>
        ))}
      </div>

      {/* Airlines */}
      <div className="filter-section">
        <div className="filter-section__title">Airlines</div>
        {airlines.map(a => (
          <label key={a.iata} className="filter-checkbox">
            <input type="checkbox" checked={selAirlines.includes(a.iata)} onChange={() => toggleAirline(a.iata)} />
            {a.logo && <img src={a.logo} alt={a.name} className="filter-airline-logo" />}
            <span className="filter-checkbox__label">{a.name}</span>
          </label>
        ))}
      </div>

      {/* Departure time */}
      <div className="filter-section">
        <div className="filter-section__title">Departure Time</div>
        <div className="filter-time-grid">
          {TIME_BLOCKS.map(block => (
            <button
              key={block.id}
              type="button"
              className={`filter-time-btn ${times.includes(block.id) ? 'filter-time-btn--active' : ''}`}
              onClick={() => toggleTime(block.id)}
            >
              <span className="filter-time-icon">{block.icon}</span>
              <span className="filter-time-label">{block.label}</span>
              <span className="filter-time-sub">{block.sub}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Max duration */}
      <div className="filter-section">
        <div className="filter-section__title">Max Flight Duration: {maxDuration}h</div>
        <input type="range" min={1} max={30} value={maxDuration}
          onChange={e => onChange({ ...filters, maxDuration: Number(e.target.value) })}
          className="filter-range" aria-label="Maximum flight duration" />
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile filter button */}
      <button className="filter-mobile-trigger" onClick={() => setMobileOpen(true)} id="filter-mobile-open">
        🎛 Filters {activeCount > 0 && `(${activeCount})`}
      </button>

      {/* Desktop sidebar */}
      <aside className="filter-sidebar-desktop">{panel}</aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="filter-drawer-overlay" onClick={() => setMobileOpen(false)}>
          <div className="filter-drawer" onClick={e => e.stopPropagation()}>
            <div className="filter-drawer__top">
              <button className="filter-drawer__close" onClick={() => setMobileOpen(false)}>✕</button>
            </div>
            {panel}
            <div className="filter-drawer__footer">
              <button className="filter-drawer__apply" onClick={() => setMobileOpen(false)}>
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
