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

export default function CustomerPassengerDashboardPage() {
  return (
    <>
      {/* Material Symbols */}
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
       SideNavBar (from JSON) <nav className="w-[280px] h-screen fixed left-0 top-0 bg-surface dark:bg-surface bg-surface/10 backdrop-blur-xl border-r border-outline-variant shadow-2xl flex flex-col h-full py-base z-50 nav-hide-mobile">
<div className="px-6 py-4 flex items-center gap-4 mb-6">
<div className="w-10 h-10 rounded-lg bg-surface-bright flex items-center justify-center overflow-hidden">
<div className="flex items-center justify-center gap-2 font-heading text-2xl font-black text-brand-white tracking-wide">
    <LogoIcon />
    <span>Sky<span className="text-brand-red">Ways</span></span>
</div>
</div>
<div>
<h1 className="font-headline-md text-headline-md font-bold text-primary dark:text-primary tracking-tight">SkyLink Premium</h1>
<p className="font-label-md text-label-md text-on-surface-variant">Elite Agent Portal</p>
</div>
</div>
<div className="px-4 mb-6">
<Link href="/search"  className="w-full bg-primary-container hover:bg-primary text-on-primary-container font-label-md text-label-md py-3 rounded-lg shadow-[0_0_24px_rgba(220,38,38,0.3)] hover:shadow-[0_0_32px_rgba(220,38,38,0.5)] transition-all flex items-center justify-center gap-2 scale-95 duration-150 ease-in-out hover:scale-100">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>add</span>
                New Booking
            </Link>
</div>
<ul className="flex-1 px-3 space-y-1 overflow-y-auto">
<li>
<Link href="/dashboard"  className="flex items-center gap-3 px-4 py-3 rounded-lg text-primary font-bold border-r-2 border-primary bg-primary-container/10 scale-95 duration-150 ease-in-out" >
<span className="material-symbols-outlined">dashboard</span>
<span className="font-label-md text-label-md">Dashboard</span>
</Link>
</li>
<li>
<Link href="/search"  className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant font-medium hover:bg-surface-variant/20 hover:text-primary transition-colors scale-95 duration-150 ease-in-out" >
<span className="material-symbols-outlined">flight_takeoff</span>
<span className="font-label-md text-label-md">Search Flights</span>
</Link>
</li>
<li>
<Link href="/booking"  className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant font-medium hover:bg-surface-variant/20 hover:text-primary transition-colors scale-95 duration-150 ease-in-out" >
<span className="material-symbols-outlined">edit_calendar</span>
<span className="font-label-md text-label-md">Manage Bookings</span>
</Link>
</li>
<li>
<Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant font-medium hover:bg-surface-variant/20 hover:text-primary transition-colors scale-95 duration-150 ease-in-out" >
<span className="material-symbols-outlined">handyman</span>
<span className="font-label-md text-label-md">Agent Tools</span>
</Link>
</li>
<li>
<Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant font-medium hover:bg-surface-variant/20 hover:text-primary transition-colors scale-95 duration-150 ease-in-out" >
<span className="material-symbols-outlined">assessment</span>
<span className="font-label-md text-label-md">Reports</span>
</Link>
</li>
</ul>
<div className="mt-auto px-3 border-t border-outline-variant/30 pt-4 space-y-1">
<Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant font-medium hover:bg-surface-variant/20 hover:text-primary transition-colors scale-95 duration-150 ease-in-out" >
<span className="material-symbols-outlined">settings</span>
<span className="font-label-md text-label-md">Settings</span>
</Link>
<Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant font-medium hover:bg-surface-variant/20 hover:text-primary transition-colors scale-95 duration-150 ease-in-out" >
<span className="material-symbols-outlined">contact_support</span>
<span className="font-label-md text-label-md">Support</span>
</Link>
</div>
</nav> TopNavBar (from JSON) <header className="h-16 fixed top-0 right-0 left-[280px] z-40 bg-surface/30 dark:bg-surface/30 backdrop-blur-md border-b border-outline-variant flex justify-between items-center px-container-padding content-shift-mobile nav-hide-mobile">
<div className="flex items-center gap-8">
<div className="font-headline-md text-headline-md font-black tracking-tighter text-primary">SkyLink B2B</div>
<nav className="hidden lg:flex items-center gap-6">
<Link href="#" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-all active:opacity-80 transition-opacity"  style={{color: "#ffb4ab"}}>Global Availability</Link>
<Link href="#" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-all active:opacity-80 transition-opacity" >Fare Rules</Link>
<Link href="#" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-all active:opacity-80 transition-opacity" >Tax Tables</Link>
</nav>
</div>
<div className="flex items-center gap-6">
<div className="text-primary dark:text-primary font-mono-data text-mono-data font-semibold bg-surface-bright/30 px-3 py-1 rounded-md border border-outline-variant/50">
                Currency: USD
            </div>
<div className="flex items-center gap-3">
<button className="text-on-surface-variant hover:text-primary transition-all active:opacity-80 transition-opacity w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-bright/20">
<span className="material-symbols-outlined">notifications</span>
</button>
<button className="text-on-surface-variant hover:text-primary transition-all active:opacity-80 transition-opacity w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-bright/20">
<span className="material-symbols-outlined">help_outline</span>
</button>
</div>
<div className="flex items-center gap-3 border-l border-outline-variant/30 pl-6 cursor-pointer hover:opacity-80 transition-opacity">
<span className="font-label-md text-label-md text-on-surface">Agent Profile</span>
<div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant/50">
<img alt="Agent Avatar" className="w-full h-full object-cover" data-alt="A professional headshot of a travel agent in a dimly lit, high-end modern office. Subtle red accent lighting highlights the silhouette. Ultra-realistic, 8k resolution, cinematic lighting." src="/agent_avatar.png"/>
</div>
</div>
</div>
</header> Main Content Area <main className="ml-[280px] w-full pt-[80px] px-container-padding max-w-max-width mx-auto pb-12 content-shift-mobile">

<div className="mb-section-gap pt-8">
<h1 className="font-display-lg text-display-lg text-on-surface mb-2">Welcome back, Alexander</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant">Here is an overview of your upcoming travel and elite status.</p>
</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-section-gap">

<div className="glass-card rounded-xl p-6 relative overflow-hidden group">
<div className="absolute inset-0 bg-gradient-to-br from-surface-bright/5 to-transparent pointer-events-none"></div>
<div className="flex justify-between items-start mb-8 relative z-10">
<div>
<p className="font-label-md text-label-md text-on-surface-variant mb-1">Total Spent (YTD)</p>
<h2 className="font-headline-lg text-headline-lg text-on-surface font-mono-data">$14,250<span className="text-on-surface-variant text-headline-md">.00</span></h2>
</div>
<div className="w-10 h-10 rounded-full bg-surface-bright/20 flex items-center justify-center text-primary">
<span className="material-symbols-outlined">payments</span>
</div>
</div>
<div className="relative z-10 flex items-center gap-2">
<span className="material-symbols-outlined text-green-500 text-sm">trending_up</span>
<span className="font-mono-data text-mono-data text-green-500">+12% vs last year</span>
</div>
</div>

<div className="glass-card rounded-xl p-6 relative overflow-hidden group border-l-4 border-l-primary-container">

<div className="flex justify-between items-start mb-8 relative z-10">
<div>
<p className="font-label-md text-label-md text-on-surface-variant mb-1">Current Status</p>
<div className="inline-flex items-center gap-2 bg-primary-container/20 border border-primary-container/50 px-3 py-1 rounded-full mt-1">
<span className="w-2 h-2 rounded-full bg-primary-container neon-glow-red"></span>
<span className="font-label-md text-label-md text-primary font-bold tracking-widest uppercase">Crimson Elite</span>
</div>
</div>
<div className="w-10 h-10 rounded-full bg-primary-container/10 flex items-center justify-center text-primary-container">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
</div>
</div>
<div className="relative z-10 w-full bg-surface-bright/30 h-1.5 rounded-full overflow-hidden">
<div className="bg-primary-container h-full w-[85%] rounded-full shadow-[0_0_10px_rgba(220,38,38,0.8)]"></div>
</div>
<p className="font-mono-data text-mono-data text-on-surface-variant mt-3 text-right">8,500 pts to next tier</p>
</div>

<div className="glass-card rounded-xl p-6 relative overflow-hidden group">
<div className="absolute -right-10 -top-10 w-40 h-40 bg-primary-container/10 rounded-full blur-[40px] pointer-events-none"></div>
<div className="flex justify-between items-start mb-6 relative z-10">
<div>
<p className="font-label-md text-label-md text-on-surface-variant mb-1">Next Departure</p>
<h2 className="font-headline-md text-headline-md text-on-surface font-mono-data tracking-wider">SL-492</h2>
</div>
<div className="text-right">
<p className="font-label-md text-label-md text-on-surface-variant mb-1">T-Minus</p>
<p className="font-mono-data text-mono-data text-primary font-bold text-lg">48h 12m</p>
</div>
</div>
<div className="relative z-10 flex items-center justify-between border-t border-outline-variant/30 pt-4 mt-2">
<div className="text-center">
<h3 className="font-headline-md text-headline-md">JFK</h3>
<p className="font-mono-data text-mono-data text-on-surface-variant text-xs">08:00 AM</p>
</div>
<div className="flex-1 px-4 flex flex-col items-center">
<span className="material-symbols-outlined text-outline-variant text-sm mb-1">flight_takeoff</span>
<div className="w-full border-t-2 border-dashed border-outline-variant/50 relative">
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full neon-glow-red"></div>
</div>
</div>
<div className="text-center">
<h3 className="font-headline-md text-headline-md">LHR</h3>
<p className="font-mono-data text-mono-data text-on-surface-variant text-xs">20:15 PM</p>
</div>
</div>
</div>
</div>

<div className="glass-card rounded-xl overflow-hidden">
<div className="px-6 py-5 border-b border-outline-variant/30 flex justify-between items-center bg-surface-bright/5">
<h2 className="font-headline-md text-headline-md text-on-surface">Recent Bookings</h2>
<button className="font-label-md text-label-md text-primary hover:text-primary-container transition-colors flex items-center gap-1">
                    View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
</button>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr>
<th className="font-label-md text-label-md text-on-surface-variant py-4 px-6 font-medium">Flight Record</th>
<th className="font-label-md text-label-md text-on-surface-variant py-4 px-6 font-medium">Route</th>
<th className="font-label-md text-label-md text-on-surface-variant py-4 px-6 font-medium">Date</th>
<th className="font-label-md text-label-md text-on-surface-variant py-4 px-6 font-medium">Cabin</th>
<th className="font-label-md text-label-md text-on-surface-variant py-4 px-6 font-medium text-right">Status</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant/10">

<tr className="hover:bg-surface-bright/10 transition-colors group">
<td className="py-4 px-6">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded bg-surface-bright flex items-center justify-center border border-outline-variant/30 group-hover:border-primary/50 transition-colors">
<span className="material-symbols-outlined text-primary text-sm">flight</span>
</div>
<div>
<p className="font-mono-data text-mono-data text-on-surface font-semibold">SL-492</p>
<p className="font-label-md text-label-md text-on-surface-variant text-xs">PNR: X7B9Q2</p>
</div>
</div>
</td>
<td className="py-4 px-6 font-mono-data text-mono-data text-on-surface">JFK <span className="text-outline-variant mx-1">→</span> LHR</td>
<td className="py-4 px-6 font-mono-data text-mono-data text-on-surface">Oct 24, 2023</td>
<td className="py-4 px-6">
<span className="bg-surface-bright/40 text-on-surface font-mono-data text-mono-data text-xs px-2 py-1 rounded border-l-2 border-primary">Business</span>
</td>
<td className="py-4 px-6 text-right">
<div className="inline-flex items-center gap-2">
<span className="font-label-md text-label-md text-on-surface">Upcoming</span>
<span className="w-2 h-2 rounded-full bg-primary neon-glow-red"></span>
</div>
</td>
</tr>

<tr className="hover:bg-surface-bright/10 transition-colors group">
<td className="py-4 px-6">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded bg-surface-bright flex items-center justify-center border border-outline-variant/30">
<span className="material-symbols-outlined text-on-surface-variant text-sm">flight</span>
</div>
<div>
<p className="font-mono-data text-mono-data text-on-surface font-semibold">SL-118</p>
<p className="font-label-md text-label-md text-on-surface-variant text-xs">PNR: M4T1P9</p>
</div>
</div>
</td>
<td className="py-4 px-6 font-mono-data text-mono-data text-on-surface">LAX <span className="text-outline-variant mx-1">→</span> JFK</td>
<td className="py-4 px-6 font-mono-data text-mono-data text-on-surface">Sep 12, 2023</td>
<td className="py-4 px-6">
<span className="bg-surface-bright/40 text-on-surface font-mono-data text-mono-data text-xs px-2 py-1 rounded border-l-2 border-primary">First</span>
</td>
<td className="py-4 px-6 text-right">
<div className="inline-flex items-center gap-2">
<span className="font-label-md text-label-md text-on-surface-variant">Completed</span>
<span className="w-2 h-2 rounded-full bg-green-500 neon-glow-green opacity-50"></span>
</div>
</td>
</tr>

<tr className="hover:bg-surface-bright/10 transition-colors group opacity-75">
<td className="py-4 px-6">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded bg-surface-bright flex items-center justify-center border border-outline-variant/30">
<span className="material-symbols-outlined text-on-surface-variant text-sm">block</span>
</div>
<div>
<p className="font-mono-data text-mono-data text-on-surface font-semibold line-through decoration-outline-variant">SL-892</p>
<p className="font-label-md text-label-md text-on-surface-variant text-xs">PNR: R2D2C3</p>
</div>
</div>
</td>
<td className="py-4 px-6 font-mono-data text-mono-data text-on-surface">ORD <span className="text-outline-variant mx-1">→</span> MIA</td>
<td className="py-4 px-6 font-mono-data text-mono-data text-on-surface">Aug 05, 2023</td>
<td className="py-4 px-6">
<span className="bg-surface-bright/40 text-on-surface font-mono-data text-mono-data text-xs px-2 py-1 rounded border-l-2 border-surface-variant">Economy</span>
</td>
<td className="py-4 px-6 text-right">
<div className="inline-flex items-center gap-2">
<span className="font-label-md text-label-md text-outline-variant">Cancelled</span>
<span className="w-2 h-2 rounded-full bg-outline-variant"></span>
</div>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</main>
    </>
  );
}
