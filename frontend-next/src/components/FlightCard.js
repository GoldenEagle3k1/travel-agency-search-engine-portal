'use client';
import { useState } from 'react';
import { formatTime, formatDuration, formatPrice, formatStops, formatBaggage } from '@/utils/api';

export default function FlightCard({ offer, onSelect, isAgent = false }) {
  const [expanded, setExpanded] = useState(false);

  if (!offer) return null;

  const {
    airline_name, airline_logo, airline_iata,
    origin_iata, origin_city, dest_iata, dest_city,
    departure_time, arrival_time, duration,
    outbound_stops, outbound_segments = [],
    total_amount, total_currency,
    refundable, changeable, baggage = [],
    cabin_class,
  } = offer;

  const stopsText = formatStops(outbound_stops || 0, outbound_segments);
  const isNonStop = outbound_stops === 0;
  const baggageText = formatBaggage(baggage);

  return (
    <article className="flight-card">
      <div className="flight-card__main">
        {/* Airline */}
        <div className="flight-card__airline">
          {airline_logo ? (
            <img src={airline_logo} alt={airline_name} className="flight-card__airline-logo" />
          ) : (
            <div className="flight-card__airline-fallback">{airline_iata || '✈'}</div>
          )}
          <span className="flight-card__airline-name">{airline_name}</span>
        </div>

        {/* Route timeline */}
        <div className="flight-card__route">
          <div className="flight-card__endpoint">
            <span className="flight-card__time">{formatTime(departure_time)}</span>
            <span className="flight-card__iata">{origin_iata}</span>
            <span className="flight-card__city">{origin_city}</span>
          </div>

          <div className="flight-card__middle">
            <span className="flight-card__duration">{formatDuration(duration)}</span>
            <div className="flight-card__line">
              <div className="flight-card__dot" />
              <div className="flight-card__line-bar" />
              {!isNonStop && (
                <div className="flight-card__stop-dot" title={stopsText} />
              )}
              <div className="flight-card__line-bar" />
              <div className="flight-card__dot" />
            </div>
            <span className={`flight-card__stops ${isNonStop ? 'flight-card__stops--direct' : 'flight-card__stops--layover'}`}>
              {stopsText}
            </span>
          </div>

          <div className="flight-card__endpoint flight-card__endpoint--right">
            <span className="flight-card__time">{formatTime(arrival_time)}</span>
            <span className="flight-card__iata">{dest_iata}</span>
            <span className="flight-card__city">{dest_city}</span>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="flight-card__action">
          <div className="flight-card__price-block">
            <span className="flight-card__price">{formatPrice(parseFloat(total_amount || 0), total_currency)}</span>
            <span className="flight-card__price-sub">per person</span>
          </div>
          <button
            className="flight-card__select-btn"
            onClick={() => onSelect && onSelect(offer)}
            id={`select-offer-${offer.offer_id}`}
          >
            {isAgent ? 'Request Ticket' : 'Select'}
          </button>
          <button
            className="flight-card__expand-btn"
            onClick={() => setExpanded(e => !e)}
            aria-expanded={expanded}
          >
            {expanded ? '▲ Hide' : '▼ Details'}
          </button>
        </div>
      </div>

      {/* Tags row */}
      <div className="flight-card__tags">
        <span className={`flight-card__tag ${isNonStop ? 'flight-card__tag--green' : ''}`}>
          {isNonStop ? '✓ Non-stop' : stopsText}
        </span>
        <span className="flight-card__tag">{baggageText}</span>
        <span className="flight-card__tag">{cabin_class?.replace('_', ' ')}</span>
        {refundable && <span className="flight-card__tag flight-card__tag--green">Refundable</span>}
        {changeable && <span className="flight-card__tag">Changeable</span>}
      </div>

      {/* Expanded segment details */}
      {expanded && (
        <div className="flight-card__segments">
          {outbound_segments.map((seg, i) => (
            <div key={i} className="flight-seg">
              <div className="flight-seg__header">
                <span className="flight-seg__fn">{seg.flight_number}</span>
                <span className="flight-seg__aircraft">{seg.aircraft || ''}</span>
              </div>
              <div className="flight-seg__route">
                <div className="flight-seg__point">
                  <span className="flight-seg__iata">{seg.origin_iata}</span>
                  <span className="flight-seg__time">{formatTime(seg.departure_time)}</span>
                  <span className="flight-seg__place">{seg.origin_name}</span>
                </div>
                <div className="flight-seg__line">
                  <span className="flight-seg__dur">{formatDuration(seg.duration)}</span>
                  <div className="flight-seg__arrow">→</div>
                </div>
                <div className="flight-seg__point">
                  <span className="flight-seg__iata">{seg.dest_iata}</span>
                  <span className="flight-seg__time">{formatTime(seg.arrival_time)}</span>
                  <span className="flight-seg__place">{seg.dest_name}</span>
                </div>
              </div>
              {i < outbound_segments.length - 1 && (
                <div className="flight-seg__layover">
                  Layover in {seg.dest_city || seg.dest_iata}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </article>
  );
}
