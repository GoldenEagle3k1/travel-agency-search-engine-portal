'use client';
import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BookingStore, AgentApi, formatPrice, formatPKR, formatDuration, formatTime, formatDate } from '@/utils/api';

function AgentRequestPageInner() {
  const router = useRouter();
  const [offer, setOffer] = useState(null);
  const [searchParams, setSearchParams] = useState({});
  const [wallet, setWallet] = useState(null);
  const [passengers, setPassengers] = useState([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('agent_token');
    if (!token) {
      router.push('/agent/login');
      return;
    }

    // Get offer details from store
    const booking = BookingStore.get();
    if (!booking || !booking.offer) {
      window.showToast?.('No offer selected. Returning to search.', 'warning');
      router.push('/');
      return;
    }

    setOffer(booking.offer);
    setSearchParams(booking.params || {});

    // Init passenger array based on search count
    const travellers = booking.params?.travellers || { adults: 1, children: 0, infants: 0 };
    const totalCount = (travellers.adults || 1) + (travellers.children || 0) + (travellers.infants || 0);
    const pArr = Array.from({ length: totalCount }).map((_, i) => ({
      first_name: '',
      last_name: '',
      passport_no: '',
      date_of_birth: '',
      gender: 'M',
    }));
    setPassengers(pArr);

    // Fetch agent wallet balance
    fetchWallet();
  }, []);

  async function fetchWallet() {
    try {
      const data = await AgentApi.wallet();
      setWallet(data.wallet);
    } catch (_) {}
  }

  function updatePassenger(index, field, val) {
    const next = [...passengers];
    next[index] = { ...next[index], [field]: val };
    setPassengers(next);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    // Validation
    const invalid = passengers.some(p => !p.first_name.trim() || !p.last_name.trim() || !p.passport_no.trim() || !p.date_of_birth);
    if (invalid) {
      setError('Please fill in all passenger details (first name, last name, passport, DOB).');
      return;
    }

    const totalCost = parseFloat(offer.total_amount || 0);
    if (wallet && parseFloat(wallet.balance) < totalCost) {
      setError(`Insufficient wallet balance. Total amount: PKR ${totalCost.toLocaleString()}, Available balance: PKR ${parseFloat(wallet.balance).toLocaleString()}`);
      return;
    }

    setBusy(true);
    try {
      await AgentApi.submitRequest({
        offer_id: offer.offer_id,
        offer_snapshot: offer,
        passenger_data: passengers,
        trip_type: searchParams.tripType || 'one-way',
        total_amount: totalCost,
        currency: 'PKR',
      });
      setSuccess(true);
      BookingStore.clear();
      window.showToast?.('Ticket request submitted successfully!', 'success');
    } catch (ex) {
      setError(ex.message || 'Failed to submit ticket request.');
    } finally {
      setBusy(false);
    }
  }

  if (success) {
    return (
      <div className="agent-request-success bg-brand-black text-brand-white pt-24 min-h-screen">
        <div className="max-w-md mx-auto p-8 bg-brand-charcoal border border-brand-gray-dark/50 rounded-2xl text-center space-y-6 shadow-2xl">
          <div className="text-6xl">🎉</div>
          <h2 className="text-2xl font-bold font-heading">Request Submitted!</h2>
          <p className="text-sm text-brand-gray-light">
            Your ticket request has been sent to the site owner for verification. The fare has been temporarily held from your wallet.
          </p>
          <div className="p-4 bg-brand-black/40 border border-brand-gray-dark/40 rounded-xl text-left space-y-2 text-xs">
            <div><strong>Route:</strong> {offer?.origin_iata} ➔ {offer?.dest_iata}</div>
            <div><strong>Airline:</strong> {offer?.airline_name}</div>
            <div><strong>Hold Amount:</strong> {formatPKR(parseFloat(offer?.total_amount || 0))}</div>
            <div><strong>Status:</strong> Pending Approval</div>
          </div>
          <div className="flex gap-4">
            <Link href="/agent/dashboard" className="btn-primary flex-1">
              Go to Dashboard
            </Link>
            <Link href="/" className="btn-outline flex-1">
              Book Another
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!offer) return null;

  const totalCost = parseFloat(offer.total_amount || 0);
  const isBalanceLow = wallet && parseFloat(wallet.balance) < totalCost;

  return (
    <div className="agent-checkout pt-24 min-h-screen bg-brand-black text-brand-white">
      <div className="container-wide mx-auto px-6 py-8">
        
        {/* Page title */}
        <div className="mb-8">
          <h1 className="text-3xl font-black font-heading tracking-tight">
            Ticket <span className="gradient-text font-black">Request</span>
          </h1>
          <p className="text-xs text-brand-gray-light mt-1">Submit flight details for owner issuance approval</p>
        </div>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Passenger forms */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Passenger Forms */}
            <div className="bg-brand-charcoal border border-brand-gray-dark/40 rounded-xl p-6 shadow-xl space-y-6">
              <h3 className="text-lg font-bold font-heading border-b border-brand-gray-dark/30 pb-3">Passenger Details</h3>
              {passengers.map((p, idx) => (
                <div key={idx} className="space-y-4 pt-4 first:pt-0 border-t border-brand-gray-dark/20 first:border-none">
                  <div className="text-xs font-bold text-brand-red-light uppercase tracking-wider">Passenger #{idx + 1}</div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="form-group">
                      <label htmlFor={`first-name-${idx}`}>First Name *</label>
                      <input
                        id={`first-name-${idx}`}
                        type="text"
                        required
                        placeholder="John"
                        value={p.first_name}
                        onChange={e => updatePassenger(idx, 'first_name', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor={`last-name-${idx}`}>Last Name *</label>
                      <input
                        id={`last-name-${idx}`}
                        type="text"
                        required
                        placeholder="Doe"
                        value={p.last_name}
                        onChange={e => updatePassenger(idx, 'last_name', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="form-group">
                      <label htmlFor={`passport-${idx}`}>Passport Number *</label>
                      <input
                        id={`passport-${idx}`}
                        type="text"
                        required
                        placeholder="A0000000"
                        value={p.passport_no}
                        onChange={e => updatePassenger(idx, 'passport_no', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor={`dob-${idx}`}>Date of Birth *</label>
                      <input
                        id={`dob-${idx}`}
                        type="date"
                        required
                        value={p.date_of_birth}
                        onChange={e => updatePassenger(idx, 'date_of_birth', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor={`gender-${idx}`}>Gender</label>
                      <select
                        id={`gender-${idx}`}
                        value={p.gender}
                        onChange={e => updatePassenger(idx, 'gender', e.target.value)}
                        className="bg-brand-black border border-brand-gray-dark/50 rounded p-2 text-brand-white text-xs font-semibold focus:outline-none"
                      >
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                        <option value="O">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {error && <p className="text-xs text-brand-red font-bold" role="alert">{error}</p>}
          </div>

          {/* RIGHT: Offer Summary & Wallet status */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Ticket Price & Wallet card */}
            <div className="bg-brand-charcoal border border-brand-gray-dark/40 rounded-xl p-6 shadow-xl space-y-4">
              <h3 className="text-lg font-bold font-heading border-b border-brand-gray-dark/30 pb-3">Payment Summary</h3>
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-brand-gray-light">Ticket Fare ({passengers.length} pax)</span>
                <span className="font-bold">{formatPKR(totalCost)}</span>
              </div>

              <div className="h-px bg-brand-gray-dark/30" />

              <div className="flex justify-between items-center text-base font-bold font-heading">
                <span>Total hold amount</span>
                <span className="text-brand-red-light">{formatPKR(totalCost)}</span>
              </div>

              <div className="h-px bg-brand-gray-dark/30" />

              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-brand-gray-light">Your Wallet Balance</span>
                  <span className="font-bold text-white">
                    {wallet ? formatPKR(parseFloat(wallet.balance)) : 'Loading...'}
                  </span>
                </div>
                {isBalanceLow && (
                  <p className="text-[10px] text-brand-red italic leading-relaxed">
                    ⚠️ Wallet balance is insufficient to process this hold. Please top up before submitting.
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="btn-primary w-full py-3 mt-4"
                disabled={busy || isBalanceLow}
                id="submit-request-btn"
              >
                {busy ? 'Submitting request...' : 'Submit Request for Approval'}
              </button>
            </div>

            {/* Flight detail card */}
            <div className="bg-brand-charcoal/60 border border-brand-gray-dark/40 rounded-xl p-6 space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-brand-gray-light">Itinerary</h4>
              <div className="flex gap-4 items-center">
                {offer.airline_logo ? (
                  <img src={offer.airline_logo} alt={offer.airline_name} className="w-8 h-8 rounded-full border border-brand-gray-dark/30" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-brand-black flex items-center justify-center font-bold">✈</div>
                )}
                <div>
                  <div className="text-sm font-bold">{offer.airline_name}</div>
                  <div className="text-[10px] text-brand-gray-light">{offer.cabin_class?.replace('_', ' ')}</div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <div className="text-base font-extrabold">{offer.origin_iata}</div>
                  <div className="text-[10px] text-brand-gray-light">{formatTime(offer.departure_time)}</div>
                </div>
                <div className="flex-1 flex flex-col items-center px-4">
                  <div className="text-[10px] text-brand-gray-light">{formatDuration(offer.duration)}</div>
                  <div className="h-px bg-brand-gray-dark/50 w-full relative">
                    <span className="absolute -top-1 right-1/2 translate-x-1/2 text-[8px] bg-brand-charcoal px-1">✈</span>
                  </div>
                  <div className="text-[9px] text-brand-gray-light mt-0.5">{offer.outbound_stops === 0 ? 'Non-stop' : `${offer.outbound_stops} stop(s)`}</div>
                </div>
                <div className="text-right">
                  <div className="text-base font-extrabold">{offer.dest_iata}</div>
                  <div className="text-[10px] text-brand-gray-light">{formatTime(offer.arrival_time)}</div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}


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

export default function AgentRequestPage() {
  return (
    <Suspense fallback={<div className="agent-request-loading"><div className="spinner" /></div>}>
      <AgentRequestPageInner />
    </Suspense>
  );
}
