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

export default function FlightSearchResultsPage() {
  return (
    <>
      {/* Material Symbols */}
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
       SideNavBar <nav className="w-[280px] h-screen fixed left-0 top-0 border-r border-outline-variant bg-surface/50 backdrop-blur-xl shadow-2xl flex flex-col py-base z-50">
<div className="px-6 py-4 mb-4">
<h1 className="font-headline-lg text-headline-lg font-bold text-primary dark:text-primary tracking-tighter">AeroElite B2B</h1>
<p className="text-on-surface-variant font-label-md text-label-md mt-1">ID: AG-4829</p>
</div>
<div className="flex-1 overflow-y-auto">

<Link href="/search"  className="flex items-center gap-4 px-6 py-3 text-primary bg-primary-container/10 border-l-4 border-primary scale-95 duration-150 transition-all" >
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>flight_takeoff</span>
<span className="font-label-md text-label-md">Flight Search</span>
</Link>
<Link href="/manage-bookings" className="flex items-center gap-4 px-6 py-3 text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-all duration-300">
<span className="material-symbols-outlined">event_note</span>
<span className="font-label-md text-label-md">Itineraries</span>
</Link>
<Link href="/agent/dashboard" className="flex items-center gap-4 px-6 py-3 text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-all duration-300">
<span className="material-symbols-outlined">account_balance_wallet</span>
<span className="font-label-md text-label-md">Wallet</span>
</Link>
<Link href="#" className="flex items-center gap-4 px-6 py-3 text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-all duration-300">
<span className="material-symbols-outlined">support_agent</span>
<span className="font-label-md text-label-md">Support</span>
</Link>
<Link href="/settings" className="flex items-center gap-4 px-6 py-3 text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-all duration-300">
<span className="material-symbols-outlined">settings</span>
<span className="font-label-md text-label-md">Settings</span>
</Link>
</div>
<div className="px-6 py-4 mt-auto">
<Link href="/search"  className="w-full btn-primary py-2 rounded font-label-md text-label-md flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-[18px]">add</span>
                New Booking
            </Link>
<div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/10">
<img alt="Agent Profile" className="w-10 h-10 rounded-full object-cover border border-white/20" data-alt="A professional headshot of an elite travel agent in a modern, dark-themed office setting, sharp focus, cinematic lighting, sophisticated B2B aesthetic, crisp details." src="/agent_avatar.png"/>
<div>
<p className="font-label-md text-label-md text-on-surface">Elite Concierge</p>
<p className="font-mono-data text-mono-data text-on-surface-variant text-[12px]">Agent Profile</p>
</div>
</div>
</div>
</nav> TopNavBar &amp; Main Content Wrapper <div className="ml-[280px] flex-1 flex flex-col min-h-screen relative">

<div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-primary-container/5 to-transparent pointer-events-none"></div>

<header className="fixed top-0 right-0 w-[calc(100%-280px)] h-16 bg-surface/30 dark:bg-surface/30 backdrop-blur-md border-b border-outline-variant flex justify-between items-center px-gutter z-40">
<div className="flex items-center gap-4">
<div className="glass-panel px-4 py-1.5 rounded-full flex items-center gap-3">
<span className="material-symbols-outlined text-primary text-[18px]">search</span>
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface leading-tight">DXB - LHR</span>
<span className="font-mono-data text-mono-data text-on-surface-variant text-[11px] leading-tight">Oct 24 • 1 Adult • Economy</span>
</div>
<button className="ml-2 text-on-surface-variant hover:text-primary transition-colors duration-200">
<span className="material-symbols-outlined text-[18px]">edit</span>
</button>
</div>
</div>
<div className="flex items-center gap-4">
<span className="font-mono-data text-mono-data text-on-surface-variant px-3 py-1 glass-panel rounded">PKR</span>
<button className="text-on-surface-variant hover:text-primary transition-colors duration-200">
<span className="material-symbols-outlined">notifications</span>
</button>
<Link href="/confirmation"  className="text-on-surface-variant hover:text-primary transition-colors duration-200">
<span className="material-symbols-outlined">payments</span>
</Link>
<button className="text-on-surface-variant hover:text-primary transition-colors duration-200">
<span className="material-symbols-outlined">help_outline</span>
</button>
</div>
</header>

<main className="flex-1 mt-16 p-container-padding flex gap-6 max-w-[max-width] mx-auto w-full relative z-10">

<aside className="w-[280px] flex-shrink-0 flex flex-col gap-6">

<div className="glass-panel p-5 rounded-xl">
<h3 className="font-label-md text-label-md text-on-surface mb-4 border-b border-white/10 pb-2">Stops</h3>
<div className="space-y-3">
<label className="flex items-center justify-between cursor-pointer group">
<div className="flex items-center gap-3">
<input checked="" className="form-checkbox bg-surface-dim border-white/20 text-primary rounded focus:ring-primary focus:ring-offset-surface-dim h-4 w-4" type="checkbox"/>
<span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">Direct</span>
</div>
<span className="font-mono-data text-mono-data text-on-surface-variant">PKR 145K</span>
</label>
<label className="flex items-center justify-between cursor-pointer group">
<div className="flex items-center gap-3">
<input checked="" className="form-checkbox bg-surface-dim border-white/20 text-primary rounded focus:ring-primary focus:ring-offset-surface-dim h-4 w-4" type="checkbox"/>
<span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">1 Stop</span>
</div>
<span className="font-mono-data text-mono-data text-on-surface-variant">PKR 112K</span>
</label>
</div>
</div>

<div className="glass-panel p-5 rounded-xl">
<h3 className="font-label-md text-label-md text-on-surface mb-4 border-b border-white/10 pb-2 flex justify-between">
                        Price Range
                        <span className="font-mono-data text-mono-data text-primary text-[12px]">Reset</span>
</h3>
<div className="mt-6 px-2">
<div className="h-1 bg-surface-variant rounded-full relative">
<div className="absolute left-0 right-[30%] h-full bg-crimson rounded-full"></div>
<div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(220,38,38,0.8)] border border-crimson cursor-pointer"></div>
<div className="absolute right-[30%] top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(220,38,38,0.8)] border border-crimson cursor-pointer"></div>
</div>
<div className="flex justify-between mt-3 font-mono-data text-mono-data text-on-surface-variant text-[12px]">
<span>112K</span>
<span>450K+</span>
</div>
</div>
</div>

<div className="glass-panel p-5 rounded-xl">
<h3 className="font-label-md text-label-md text-on-surface mb-4 border-b border-white/10 pb-2">Airlines</h3>
<div className="space-y-3">
<label className="flex items-center justify-between cursor-pointer group">
<div className="flex items-center gap-3">
<input checked="" className="form-checkbox bg-surface-dim border-white/20 text-primary rounded focus:ring-primary h-4 w-4" type="checkbox"/>
<span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">Emirates</span>
</div>
</label>
<label className="flex items-center justify-between cursor-pointer group">
<div className="flex items-center gap-3">
<input checked="" className="form-checkbox bg-surface-dim border-white/20 text-primary rounded focus:ring-primary h-4 w-4" type="checkbox"/>
<span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">Qatar Airways</span>
</div>
</label>
<label className="flex items-center justify-between cursor-pointer group">
<div className="flex items-center gap-3">
<input className="form-checkbox bg-surface-dim border-white/20 text-primary rounded focus:ring-primary h-4 w-4" type="checkbox"/>
<span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">British Airways</span>
</div>
</label>
</div>
</div>
</aside>

<div className="flex-1 flex flex-col gap-6">

<div className="glass-panel rounded-xl flex overflow-hidden">
<button className="flex-1 py-3 px-4 flex flex-col items-center justify-center bg-white/5 border-b-2 border-primary">
<span className="font-label-md text-label-md text-on-surface">Cheapest</span>
<span className="font-mono-data text-mono-data text-primary text-[12px]">PKR 112,450</span>
</button>
<button className="flex-1 py-3 px-4 flex flex-col items-center justify-center border-l border-white/10 hover:bg-white/5 transition-colors">
<span className="font-label-md text-label-md text-on-surface-variant">Fastest</span>
<span className="font-mono-data text-mono-data text-on-surface-variant text-[12px]">7h 15m</span>
</button>
<button className="flex-1 py-3 px-4 flex flex-col items-center justify-center border-l border-white/10 hover:bg-white/5 transition-colors">
<span className="font-label-md text-label-md text-on-surface-variant">Recommended</span>
<span className="font-mono-data text-mono-data text-on-surface-variant text-[12px]">PKR 145,200</span>
</button>
</div>

<div className="flex flex-col gap-4">

<div className="glass-panel rounded-xl p-5 hover:bg-white/[0.05] transition-all duration-300 border-l-4 border-l-primary/50 hover:border-l-primary group">
<div className="flex justify-between items-start gap-4">

<div className="flex flex-col gap-4 flex-1">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded bg-white flex items-center justify-center overflow-hidden">
<img alt="Emirates Logo" className="w-6 h-6 object-contain" data-alt="A minimalist, highly stylized vector logo of an airline on a clean white background, deep obsidian and crimson tones, sleek corporate B2B travel aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfbXabO41CwOBRrT-LtPD68KgY7nQZDKlabvfbY38xZfkagcSjMc0-WCtC9e5u8O8b8L-F_VBp8MMQuy_Xj8Hf1vrGGFZmV_vbE588LwEsQN18-ZRM4wOj4stXShHkY7jIwRXRqkt5jDFY1IU7ArHogEHWtrxNIcF3GAvP7pyyhH5a31iXbV0-GJUsUy0BcpQex-qwgdbazRCy28KXKYLaC2nrazliwefexZxEHTwaCRKloPFkYB5N"/>
</div>
<div>
<h4 className="font-label-md text-label-md text-on-surface">Emirates</h4>
<p className="font-mono-data text-mono-data text-on-surface-variant text-[12px]">EK 007 • Boeing 777</p>
</div>
<div className="ml-4 px-2 py-0.5 bg-surface-dim border-l-2 border-crimson rounded text-[10px] font-label-md text-on-surface uppercase tracking-wider">Economy</div>
</div>

<div className="flex items-center gap-6 mt-2">
<div className="flex flex-col items-end w-20">
<span className="font-headline-md text-headline-md text-on-surface">10:30</span>
<span className="font-mono-data text-mono-data text-on-surface-variant">DXB</span>
</div>
<div className="flex-1 flex flex-col items-center relative min-w-[150px]">
<span className="font-mono-data text-mono-data text-on-surface-variant text-[11px] mb-1">7h 15m</span>
<div className="w-full h-[2px] bg-surface-variant relative flex items-center justify-between">
<div className="w-2 h-2 rounded-full bg-surface-variant"></div>
<div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-on-surface-variant">
<span className="material-symbols-outlined text-[16px] rotate-90 group-hover:text-primary transition-colors">flight</span>
</div>
<div className="w-2 h-2 rounded-full bg-surface-variant"></div>
</div>
<span className="font-mono-data text-mono-data text-on-surface-variant text-[11px] mt-1 text-primary">Direct</span>
</div>
<div className="flex flex-col items-start w-20">
<span className="font-headline-md text-headline-md text-on-surface">14:45</span>
<span className="font-mono-data text-mono-data text-on-surface-variant">LHR</span>
</div>
</div>
<div className="flex gap-2 mt-2">
<span className="px-2 py-1 rounded bg-surface/50 border border-white/5 font-mono-data text-[11px] text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">work</span> 30kg Baggage
                                    </span>
<span className="px-2 py-1 rounded bg-surface/50 border border-white/5 font-mono-data text-[11px] text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">receipt_long</span> Refundable
                                    </span>
</div>
</div>

<div className="flex flex-col items-end justify-center min-w-[160px] pl-4 border-l border-white/10 h-full py-2">
<span className="font-mono-data text-mono-data text-on-surface-variant text-[12px]">Total Price</span>
<span className="font-headline-md text-headline-md text-crimson font-bold mt-1 tracking-tight">PKR 145,200</span>
<span className="font-mono-data text-mono-data text-on-surface-variant text-[10px] mb-4">incl. taxes &amp; fees</span>
<Link href="/booking"  className="btn-primary w-full py-2 px-4 rounded font-label-md text-label-md">Select</Link>
</div>
</div>
</div>

<div className="glass-panel rounded-xl p-5 hover:bg-white/[0.05] transition-all duration-300 border-l-4 border-l-transparent hover:border-l-primary/50 group">
<div className="flex justify-between items-start gap-4">

<div className="flex flex-col gap-4 flex-1">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded bg-white flex items-center justify-center overflow-hidden">
<img alt="Qatar Airways Logo" className="w-6 h-6 object-contain" data-alt="A minimalist, highly stylized vector logo of Qatar Airways on a clean white background, deep obsidian and crimson tones, sleek corporate B2B travel aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCazkF3C4PNhr-hcSL4GgUdyLbsFSZBwY3U3LeIjIk-cWWOZT-EL6l0lv3ORMsTGiG2v1Rt194t6O7aIOeh9S00YLvlKX7CUhLdfDEgMboaYTiuudYO-zGoQqbg5m7oibpyYe8WSlBs8IXJt0D6IzFD7XvoooFCkDRrHdQNLr_X-Qc4LADwhvoB90_aMVd7B4v6VxSP4RpeC4djsNT55WOIwT6s587RFFj74zFf3eHG9eDegqATUs1d"/>
</div>
<div>
<h4 className="font-label-md text-label-md text-on-surface">Qatar Airways</h4>
<p className="font-mono-data text-mono-data text-on-surface-variant text-[12px]">QR 1021 • Airbus A350</p>
</div>
<div className="ml-4 px-2 py-0.5 bg-surface-dim border-l-2 border-crimson rounded text-[10px] font-label-md text-on-surface uppercase tracking-wider">Economy</div>
</div>

<div className="flex items-center gap-6 mt-2">
<div className="flex flex-col items-end w-20">
<span className="font-headline-md text-headline-md text-on-surface">08:15</span>
<span className="font-mono-data text-mono-data text-on-surface-variant">DXB</span>
</div>
<div className="flex-1 flex flex-col items-center relative min-w-[150px]">
<span className="font-mono-data text-mono-data text-on-surface-variant text-[11px] mb-1">9h 40m</span>
<div className="w-full h-[2px] bg-surface-variant relative flex items-center justify-between">
<div className="w-2 h-2 rounded-full bg-surface-variant"></div>

<div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-crimson shadow-[0_0_8px_rgba(220,38,38,0.8)] z-10"></div>
<div className="absolute left-1/2 -translate-x-1/2 -top-4 text-[10px] font-mono-data text-on-surface-variant">DOH</div>
<div className="w-2 h-2 rounded-full bg-surface-variant"></div>
</div>
<span className="font-mono-data text-mono-data text-on-surface-variant text-[11px] mt-1 text-on-surface-variant">1 Stop (1h 45m)</span>
</div>
<div className="flex flex-col items-start w-20">
<span className="font-headline-md text-headline-md text-on-surface">14:55</span>
<span className="font-mono-data text-mono-data text-on-surface-variant">LHR</span>
<span className="text-[10px] text-error mt-0.5">+1 Day</span>
</div>
</div>
<div className="flex gap-2 mt-2">
<span className="px-2 py-1 rounded bg-surface/50 border border-white/5 font-mono-data text-[11px] text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">work</span> 25kg Baggage
                                    </span>
</div>
</div>

<div className="flex flex-col items-end justify-center min-w-[160px] pl-4 border-l border-white/10 h-full py-2">
<span className="font-mono-data text-mono-data text-on-surface-variant text-[12px]">Total Price</span>
<span className="font-headline-md text-headline-md text-crimson font-bold mt-1 tracking-tight">PKR 112,450</span>
<span className="font-mono-data text-mono-data text-on-surface-variant text-[10px] mb-4">incl. taxes &amp; fees</span>
<Link href="/booking"  className="btn-ghost w-full py-2 px-4 rounded font-label-md text-label-md text-on-surface">Select</Link>
</div>
</div>
</div>
</div>
</div>
</main>
</div>
    </>
  );
}
