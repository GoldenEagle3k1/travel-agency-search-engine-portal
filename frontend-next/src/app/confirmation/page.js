import React from 'react';
import Link from 'next/link';


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

export default function BookingConfirmationEPage() {
  return (
    <>
      {/* Material Symbols */}
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
       Intent implies focused transaction/confirmation context. Suppressing SideNav and TopNav as per rules.  Main Content Area <main className="flex-1 w-full min-h-screen py-section-gap px-container-padding flex flex-col items-center">
<div className="w-full max-w-4xl mx-auto flex flex-col gap-8">

<div className="flex flex-col items-center text-center gap-4 mb-8">
<div className="w-20 h-20 rounded-full bg-primary-container/20 flex items-center justify-center neon-glow border border-primary-container/50">
<span className="material-symbols-outlined text-[48px] text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
</div>
<div>
<h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">Booking Successful</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant">Your reservation has been confirmed and ticketed.</p>
</div>
</div>

<div className="flex flex-col lg:flex-row gap-6 w-full">

<div className="flex-1 glass-panel rounded-xl flex flex-col overflow-hidden relative">

<div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded bg-white flex items-center justify-center p-1">

<div className="text-red-600 font-headline-md font-bold text-center leading-none">E</div>
</div>
<div>
<div className="font-label-md text-label-md text-on-surface-variant uppercase">Flight</div>
<div className="font-headline-md text-headline-md text-on-surface">EK-622</div>
</div>
</div>
<div className="text-right">
<div className="font-label-md text-label-md text-on-surface-variant uppercase">Booking Ref (PNR)</div>
<div className="font-display-lg text-display-lg text-primary-container neon-text-glow">X7Y8Z9</div>
</div>
</div>

<div className="p-8 flex flex-col gap-8 relative">

<div className="flex justify-between items-start">
<div>
<div className="font-label-md text-label-md text-on-surface-variant uppercase mb-1">Passenger</div>
<div className="font-headline-lg text-headline-lg text-on-surface">Ahmed S.</div>
</div>
<div className="text-right">
<div className="font-label-md text-label-md text-on-surface-variant uppercase mb-1">Class</div>
<div className="inline-block px-3 py-1 rounded bg-surface border-l-4 border-primary-container font-mono-data text-mono-data text-on-surface">Business</div>
</div>
</div>

<div className="flex items-center justify-between w-full py-4 relative">

<div className="flex flex-col gap-1 w-1/3">
<span className="font-display-lg text-display-lg text-on-surface leading-none">DXB</span>
<span className="font-body-md text-body-md text-on-surface-variant">Dubai Intl</span>
<span className="font-mono-data text-mono-data text-on-surface mt-2">14:30<br/>24 Oct</span>
</div>

<div className="flex-1 flex flex-col items-center justify-center relative px-4">
<span className="material-symbols-outlined text-primary-container absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0A0A0A] px-2 z-10" style={{ fontVariationSettings: "'FILL' 1" }}>flight_takeoff</span>
<div className="w-full h-px bg-white/20 relative">
<div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full border border-white bg-transparent"></div>
<div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full border border-white bg-transparent"></div>
</div>
<span className="font-label-md text-label-md text-on-surface-variant mt-4">7h 15m</span>
</div>

<div className="flex flex-col gap-1 w-1/3 text-right">
<span className="font-display-lg text-display-lg text-on-surface leading-none">LHR</span>
<span className="font-body-md text-body-md text-on-surface-variant">London Heathrow</span>
<span className="font-mono-data text-mono-data text-on-surface mt-2">18:45<br/>24 Oct</span>
</div>
</div>

<div className="grid grid-cols-4 gap-4 bg-white/5 p-4 rounded-lg border border-white/5">
<div>
<div className="font-label-md text-label-md text-on-surface-variant uppercase mb-1">Terminal</div>
<div className="font-headline-md text-headline-md text-on-surface">3</div>
</div>
<div>
<div className="font-label-md text-label-md text-on-surface-variant uppercase mb-1">Gate</div>
<div className="font-headline-md text-headline-md text-on-surface">A12</div>
</div>
<div>
<div className="font-label-md text-label-md text-on-surface-variant uppercase mb-1">Seat</div>
<div className="font-headline-md text-headline-md text-on-surface">3C</div>
</div>
<div>
<div className="font-label-md text-label-md text-on-surface-variant uppercase mb-1">Baggage</div>
<div className="font-headline-md text-headline-md text-on-surface">40kg</div>
</div>
</div>
</div>

<div className="relative w-full h-px">
<div className="absolute inset-0 dashed-line"></div>
<div className="ticket-cutout ticket-cutout-left"></div>
<div className="ticket-cutout ticket-cutout-right"></div>
</div>

<div className="p-6 bg-white/5 flex items-center justify-between">
<div className="font-mono-data text-mono-data text-on-surface-variant tracking-widest">
                            ETKT 176 9876543210
                        </div>
<div className="barcode-bars">
<div className="barcode-bar w-2"></div><div className="barcode-bar w-1"></div><div className="barcode-bar w-3"></div><div className="barcode-bar w-1"></div><div className="barcode-bar w-2"></div>
<div className="barcode-bar w-4"></div><div className="barcode-bar w-1"></div><div className="barcode-bar w-2"></div><div className="barcode-bar w-1"></div><div className="barcode-bar w-3"></div>
<div className="barcode-bar w-2"></div><div className="barcode-bar w-1"></div><div className="barcode-bar w-4"></div><div className="barcode-bar w-1"></div><div className="barcode-bar w-2"></div>
<div className="barcode-bar w-1"></div><div className="barcode-bar w-3"></div><div className="barcode-bar w-2"></div><div className="barcode-bar w-1"></div><div className="barcode-bar w-2"></div>
</div>
</div>
</div>

<div className="w-full lg:w-80 flex flex-col gap-6">

<div className="flex flex-col gap-3">
<button className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded btn-primary font-label-md text-label-md">
<span className="material-symbols-outlined">download</span>
                            Download PDF E-ticket
                        </button>
<button className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded btn-ghost font-label-md text-label-md">
<span className="material-symbols-outlined">print</span>
                            Print Receipt
                        </button>
</div>

<div className="glass-panel rounded-xl p-6 flex flex-col gap-4">
<h3 className="font-headline-md text-headline-md text-on-surface">What's Next</h3>
<div className="flex flex-col gap-4">
<div className="flex gap-3">
<span className="material-symbols-outlined text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>luggage</span>
<div>
<div className="font-label-md text-label-md text-on-surface">Baggage Policy</div>
<div className="font-body-md text-body-md text-on-surface-variant text-sm mt-1">Review prohibited items and dimensions before arriving.</div>
</div>
</div>
<div className="flex gap-3">
<span className="material-symbols-outlined text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>how_to_reg</span>
<div>
<div className="font-label-md text-label-md text-on-surface">Online Check-in</div>
<div className="font-body-md text-body-md text-on-surface-variant text-sm mt-1">Opens 48 hours before departure. We'll send a reminder.</div>
</div>
</div>
</div>
<div className="w-full h-px bg-white/10 my-2"></div>
<Link href="/booking"  className="flex items-center gap-2 font-label-md text-label-md text-primary hover:text-primary-container transition-colors" >
                            Manage This Booking
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
</Link>
</div>
</div>
</div>
</div>
</main>
    </>
  );
}
