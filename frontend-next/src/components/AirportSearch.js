'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { DuffelApi } from '@/utils/api';

const RECENTS_KEY = 'airport_recents';

function getRecents() {
  try { return JSON.parse(localStorage.getItem(RECENTS_KEY)) || []; } catch { return []; }
}
function saveRecent(place) {
  const list = getRecents().filter(p => p.iata_code !== place.iata_code).slice(0, 4);
  localStorage.setItem(RECENTS_KEY, JSON.stringify([place, ...list]));
}

export default function AirportSearch({ value, onChange, placeholder = 'City or airport', label, id }) {
  const [query,    setQuery]    = useState(value?.name || '');
  const [results,  setResults]  = useState([]);
  const [recents,  setRecents]  = useState([]);
  const [open,     setOpen]     = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [cursor,   setCursor]   = useState(-1);
  const timerRef  = useRef(null);
  const wrapRef   = useRef(null);

  // Sync display value when parent changes
  useEffect(() => {
    if (value && !open) setQuery(value.city_name || value.name || value.iata_code || '');
  }, [value]);

  // Click outside to close
  useEffect(() => {
    function handler(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Debounced search
  const search = useCallback((q) => {
    clearTimeout(timerRef.current);
    if (q.length < 2) { setResults([]); return; }
    setLoading(true);
    timerRef.current = setTimeout(async () => {
      try {
        const places = await DuffelApi.places(q);
        setResults(places.filter(p => p.iata_code));
      } catch { setResults([]); }
      finally { setLoading(false); }
    }, 300);
  }, []);

  function handleInput(e) {
    const q = e.target.value;
    setQuery(q);
    setCursor(-1);
    if (q === '') { onChange(null); setResults([]); }
    else search(q);
    setOpen(true);
  }

  function handleFocus() {
    setRecents(getRecents());
    setOpen(true);
  }

  function selectPlace(place) {
    setQuery(place.city_name || place.name || place.iata_code);
    setOpen(false);
    saveRecent(place);
    setRecents(getRecents());
    onChange(place);
  }

  function handleKey(e) {
    const list = results.length ? results : recents;
    if (e.key === 'ArrowDown') { setCursor(c => Math.min(c + 1, list.length - 1)); e.preventDefault(); }
    if (e.key === 'ArrowUp')   { setCursor(c => Math.max(c - 1, 0)); e.preventDefault(); }
    if (e.key === 'Enter' && cursor >= 0) { selectPlace(list[cursor]); e.preventDefault(); }
    if (e.key === 'Escape') setOpen(false);
  }

  const displayList = results.length > 0 ? results : recents;
  const showRecents = results.length === 0 && recents.length > 0 && query.length < 2;

  return (
    <div ref={wrapRef} className="airport-search-wrap" style={{ position: 'relative', flex: 1, minWidth: 0 }}>
      {label && <label htmlFor={id} className="airport-search-label">{label}</label>}
      <div className="airport-search-input-wrap">
        <span className="airport-icon">✈</span>
        <input
          id={id}
          type="text"
          autoComplete="off"
          value={query}
          onChange={handleInput}
          onFocus={handleFocus}
          onKeyDown={handleKey}
          placeholder={placeholder}
          className="airport-input"
          aria-autocomplete="list"
          aria-expanded={open}
        />
        {loading && <span className="airport-spinner" />}
        {value?.iata_code && (
          <span className="airport-iata-badge">{value.iata_code}</span>
        )}
      </div>

      {open && displayList.length > 0 && (
        <ul className="airport-dropdown" role="listbox">
          {showRecents && (
            <li className="airport-dropdown-header">Recent searches</li>
          )}
          {displayList.map((place, i) => (
            <li
              key={place.iata_code + i}
              role="option"
              aria-selected={cursor === i}
              className={`airport-dropdown-item ${cursor === i ? 'airport-dropdown-item--active' : ''}`}
              onMouseDown={() => selectPlace(place)}
            >
              <span className="airport-item-iata">{place.iata_code}</span>
              <span className="airport-item-info">
                <span className="airport-item-city">{place.city_name || place.name}</span>
                <span className="airport-item-detail">{place.name} · {place.country_name}</span>
              </span>
              <span className="airport-item-type">{place.type === 'airport' ? '🏢' : '🏙️'}</span>
            </li>
          ))}
        </ul>
      )}

      {open && query.length >= 2 && !loading && results.length === 0 && (
        <div className="airport-no-results">No airports found for "{query}"</div>
      )}
    </div>
  );
}
