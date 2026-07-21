'use client';
import { useState, useRef, useEffect } from 'react';

const CABIN_CLASSES = [
  { value: 'economy',          label: 'Economy' },
  { value: 'premium_economy',  label: 'Premium Economy' },
  { value: 'business',         label: 'Business' },
  { value: 'first',            label: 'First Class' },
];

export default function TravellerSelector({ value, onChange }) {
  const { adults = 1, children = 0, infants = 0, cabin_class = 'economy' } = value || {};
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    function handler(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  function update(field, val) {
    onChange({ adults, children, infants, cabin_class, [field]: Math.max(0, val) });
  }

  function setClass(c) {
    onChange({ adults, children, infants, cabin_class: c });
  }

  const total = adults + children + infants;
  const cabinLabel = CABIN_CLASSES.find(c => c.value === cabin_class)?.label || 'Economy';
  const summary = `${total} Traveller${total !== 1 ? 's' : ''} · ${cabinLabel}`;

  return (
    <div ref={wrapRef} className="traveller-wrap" style={{ position: 'relative' }}>
      <button
        type="button"
        id="traveller-selector-btn"
        className="traveller-trigger"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-haspopup="true"
      >
        <span className="traveller-icon">👤</span>
        <span className="traveller-summary">{summary}</span>
        <span className={`traveller-chevron ${open ? 'traveller-chevron--open' : ''}`}>▾</span>
      </button>

      {open && (
        <div className="traveller-panel" role="dialog" aria-label="Select travellers and cabin class">
          {/* Passenger counters */}
          {[
            { key: 'adults',   label: 'Adults',   sub: '12+ years',   min: 1 },
            { key: 'children', label: 'Children',  sub: '2–11 years',  min: 0 },
            { key: 'infants',  label: 'Infants',   sub: 'Under 2',     min: 0 },
          ].map(({ key, label, sub, min }) => (
            <div key={key} className="traveller-row">
              <div className="traveller-label">
                <span className="traveller-label-main">{label}</span>
                <span className="traveller-label-sub">{sub}</span>
              </div>
              <div className="traveller-counter">
                <button
                  type="button"
                  className="traveller-btn"
                  onClick={() => update(key, value[key] - 1)}
                  disabled={value[key] <= min}
                  aria-label={`Decrease ${label}`}
                >−</button>
                <span className="traveller-count">{value[key]}</span>
                <button
                  type="button"
                  className="traveller-btn"
                  onClick={() => update(key, value[key] + 1)}
                  disabled={total >= 9}
                  aria-label={`Increase ${label}`}
                >+</button>
              </div>
            </div>
          ))}

          <div className="traveller-divider" />

          {/* Cabin class */}
          <div className="traveller-class-section">
            <div className="traveller-class-label">Cabin Class</div>
            <div className="traveller-class-grid">
              {CABIN_CLASSES.map(c => (
                <button
                  key={c.value}
                  type="button"
                  className={`traveller-class-btn ${cabin_class === c.value ? 'traveller-class-btn--active' : ''}`}
                  onClick={() => setClass(c.value)}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="traveller-done"
            onClick={() => setOpen(false)}
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
}
