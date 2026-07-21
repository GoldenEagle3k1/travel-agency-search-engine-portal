'use client';
import { useState, useEffect } from 'react';
import { DuffelApi, formatPrice } from '@/utils/api';

export default function PriceCalendar({ origin, destination, baseDate, passengers = 1, cabinClass = 'economy', onSelect }) {
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(false);

  const selectedDate = baseDate;

  // Build ±3 day range
  function getDates() {
    if (!baseDate) return [];
    const dates = [];
    const base = new Date(baseDate + 'T12:00:00');
    for (let i = -3; i <= 3; i++) {
      const d = new Date(base);
      d.setDate(d.getDate() + i);
      dates.push(d.toISOString().split('T')[0]);
    }
    return dates;
  }

  useEffect(() => {
    if (!origin || !destination || !baseDate) return;
    fetchPrices();
  }, [origin, destination, baseDate]);

  async function fetchPrices() {
    setLoading(true);
    const dates = getDates();
    const newPrices = {};

    // Fetch each date (limited parallelism to avoid rate limits)
    const promises = dates.map(async (date) => {
      try {
        const data = await DuffelApi.search({ origin, destination, date, passengers, cabin_class: cabinClass });
        if (data.offers && data.offers.length > 0) {
          const cheapest = Math.min(...data.offers.map(o => parseFloat(o.total_amount || Infinity)));
          newPrices[date] = cheapest;
        }
      } catch { /* silent */ }
    });

    // Run in batches of 2 to be gentle on rate limits
    for (let i = 0; i < promises.length; i += 2) {
      await Promise.allSettled(promises.slice(i, i + 2));
    }

    setPrices(newPrices);
    setLoading(false);
  }

  const dates = getDates();
  const allVals = Object.values(prices).filter(Boolean);
  const minVal  = allVals.length ? Math.min(...allVals) : null;

  if (!origin || !destination || dates.length === 0) return null;

  return (
    <div className="price-cal">
      <div className="price-cal__label">Prices by date</div>
      <div className="price-cal__track">
        {dates.map(date => {
          const price  = prices[date];
          const isSel  = date === selectedDate;
          const isCheapest = price != null && price === minVal && !isSel;
          return (
            <button
              key={date}
              type="button"
              className={`price-cal__day ${isSel ? 'price-cal__day--selected' : ''} ${isCheapest ? 'price-cal__day--cheapest' : ''}`}
              onClick={() => onSelect && onSelect(date)}
              aria-label={`${date}: ${price ? formatPrice(price) : 'unavailable'}`}
            >
              <span className="price-cal__weekday">
                {new Date(date + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short' })}
              </span>
              <span className="price-cal__date-num">
                {new Date(date + 'T12:00:00').getDate()}
              </span>
              <span className="price-cal__price">
                {loading && !price ? '…' : price ? formatPrice(price) : '—'}
              </span>
              {isCheapest && <span className="price-cal__badge">Cheapest</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
