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

export default function PassengerDetailsBookingCheckoutPage() {
  return (
    <>
      {/* Material Symbols */}
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
       Ambient Background Glow <div className="fixed inset-0 pointer-events-none z-0">
<div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary-container/5 blur-[120px]"></div>
<div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-primary-container/5 blur-[100px]"></div>
</div> SideNavBar <nav className="bg-surface/10 backdrop-blur-xl border-r border-outline-variant shadow-2xl w-[280px] h-screen fixed left-0 top-0 z-50 flex flex-col h-full py-base">

<div className="px-6 py-6 border-b border-outline-variant/30 mb-4">
<div className="flex items-center gap-3 mb-2">
<div className="w-8 h-8 rounded bg-primary-container flex items-center justify-center">
<span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>flight</span>
</div>
<h1 className="font-headline-md text-headline-md font-bold text-primary">SkyLink Premium</h1>
</div>
<p className="font-label-md text-label-md text-on-surface-variant">Elite Agent Portal</p>
</div>

<div className="px-6 mb-6">
<Link href="/search"  className="w-full bg-primary-container text-white font-label-md text-label-md py-3 rounded-lg shadow-[0_0_15px_rgba(220,38,38,0.2)] hover:bg-inverse-primary transition-all flex justify-center items-center gap-2">
<span className="material-symbols-outlined">add</span>
                New Booking
            </Link>
</div>

<ul className="flex-1 px-4 space-y-1">
<li>
<Link href="/dashboard"  className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant font-medium hover:bg-surface-variant/20 hover:text-primary transition-colors scale-95 duration-150 ease-in-out" >
<span className="material-symbols-outlined">dashboard</span>
<span className="font-body-md text-body-md">Dashboard</span>
</Link>
</li>
<li>
<Link href="/search"  className="flex items-center gap-3 px-4 py-3 rounded-lg text-primary font-bold border-r-2 border-primary bg-primary-container/10 hover:bg-surface-variant/20 hover:text-primary transition-colors scale-95 duration-150 ease-in-out" >
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>flight_takeoff</span>
<span className="font-body-md text-body-md">Search Flights</span>
</Link>
</li>
<li>
<Link href="/manage-bookings" className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant font-medium hover:bg-surface-variant/20 hover:text-primary transition-colors scale-95 duration-150 ease-in-out">
<span className="material-symbols-outlined">edit_calendar</span>
<span className="font-body-md text-body-md">Manage Bookings</span>
</Link>
</li>
<li>
<Link href="/agent/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant font-medium hover:bg-surface-variant/20 hover:text-primary transition-colors scale-95 duration-150 ease-in-out">
<span className="material-symbols-outlined">handyman</span>
<span className="font-body-md text-body-md">Agent Tools</span>
</Link>
</li>
<li>
<Link href="/agent/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant font-medium hover:bg-surface-variant/20 hover:text-primary transition-colors scale-95 duration-150 ease-in-out">
<span className="material-symbols-outlined">assessment</span>
<span className="font-body-md text-body-md">Reports</span>
</Link>
</li>
</ul>

<div className="px-4 border-t border-outline-variant/30 pt-4 mt-auto">
<ul className="space-y-1">
<li>
<Link href="/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant font-medium hover:bg-surface-variant/20 hover:text-primary transition-colors scale-95 duration-150 ease-in-out">
<span className="material-symbols-outlined">settings</span>
<span className="font-body-md text-body-md">Settings</span>
</Link>
</li>
<li>
<Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant font-medium hover:bg-surface-variant/20 hover:text-primary transition-colors scale-95 duration-150 ease-in-out">
<span className="material-symbols-outlined">contact_support</span>
<span className="font-body-md text-body-md">Support</span>
</Link>
</li>
</ul>
</div>
</nav> TopNavBar <header className="bg-surface/30 backdrop-blur-md border-b border-outline-variant h-16 fixed top-0 right-0 left-[280px] z-40 flex justify-between items-center px-container-padding">

<div className="flex items-center gap-4">
<span className="font-headline-md text-headline-md font-black tracking-tighter text-primary">SkyLink B2B</span>
</div>

<nav className="hidden lg:flex items-center gap-6">
<Link href="#" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-all active:opacity-80 transition-opacity"  style={{color: "#ffb4ab"}}>Global Availability</Link>
<Link href="#" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-all active:opacity-80 transition-opacity" >Fare Rules</Link>
<Link href="#" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-all active:opacity-80 transition-opacity" >Tax Tables</Link>
</nav>

<div className="flex items-center gap-6">
<span className="font-mono-data text-mono-data text-on-surface-variant">Currency: USD</span>
<div className="flex items-center gap-4 border-l border-outline-variant/50 pl-6">
<button className="text-on-surface-variant hover:text-primary transition-colors">
<span className="material-symbols-outlined">notifications</span>
</button>
<button className="text-on-surface-variant hover:text-primary transition-colors">
<span className="material-symbols-outlined">help_outline</span>
</button>
<div className="flex items-center gap-2 cursor-pointer group">
<div className="w-8 h-8 rounded-full bg-surface-container overflow-hidden border border-outline-variant group-hover:border-primary transition-colors">
<img className="w-full h-full object-cover" data-alt="A professional headshot of a travel agent in their 30s, looking confidently at the camera. The lighting is studio quality, emphasizing a polished corporate aesthetic against a dark minimalist background." src="/agent_avatar.png"/>
</div>
<span className="font-label-md text-label-md text-on-surface-variant group-hover:text-primary transition-colors">Agent Profile</span>
<span className="material-symbols-outlined text-on-surface-variant text-sm">expand_more</span>
</div>
</div>
</div>
</header> Main Content Layout <main className="ml-[280px] mt-16 p-container-padding relative z-10 max-w-[1440px] mx-auto">

<div className="mb-8 flex items-center gap-2 text-on-surface-variant font-label-md text-label-md">
<span>Search</span>
<span className="material-symbols-outlined text-sm">chevron_right</span>
<span>Select Flight</span>
<span className="material-symbols-outlined text-sm">chevron_right</span>
<span className="text-primary-container">Passenger &amp; Checkout</span>
</div>
<div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

<div className="xl:col-span-8 space-y-8">

<section>
<h2 className="font-headline-md text-headline-md text-primary-container mb-4 flex items-center gap-3">
<span className="font-mono-data text-mono-data text-outline tracking-widest opacity-50">01</span>
                        PASSENGER INFORMATION
                    </h2>
<div className="glass-panel rounded-xl p-6">
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<div className="space-y-2">
<label className="font-label-md text-label-md text-on-surface-variant">First Name (as on Passport)</label>
<input className="w-full form-input rounded-lg px-4 py-3 font-body-md text-body-md" placeholder="Enter first name" type="text"/>
</div>
<div className="space-y-2">
<label className="font-label-md text-label-md text-on-surface-variant">Last Name (as on Passport)</label>
<input className="w-full form-input rounded-lg px-4 py-3 font-body-md text-body-md" placeholder="Enter last name" type="text"/>
</div>
<div className="space-y-2">
<label className="font-label-md text-label-md text-on-surface-variant">Date of Birth</label>
<input className="w-full form-input rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface-variant" type="date"/>
</div>
<div className="space-y-2">
<label className="font-label-md text-label-md text-on-surface-variant">Gender</label>
<select className="w-full form-input rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface-variant appearance-none">
<option>Select gender</option>
<option>Male</option>
<option>Female</option>
<option>Undisclosed</option>
</select>
</div>
<div className="space-y-2">
<label className="font-label-md text-label-md text-on-surface-variant">Passport Number</label>
<input className="w-full form-input rounded-lg px-4 py-3 font-mono-data text-mono-data tracking-wider uppercase" placeholder="A12345678" type="text"/>
</div>
<div className="space-y-2">
<label className="font-label-md text-label-md text-on-surface-variant">Passport Expiry</label>
<input className="w-full form-input rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface-variant" type="date"/>
</div>
</div>
</div>
</section>

<section>
<h2 className="font-headline-md text-headline-md text-primary-container mb-4 flex items-center gap-3">
<span className="font-mono-data text-mono-data text-outline tracking-widest opacity-50">02</span>
                        SEAT SELECTION
                    </h2>
<div className="glass-panel rounded-xl p-8 flex flex-col items-center">

<div className="flex gap-6 mb-8 w-full justify-center border-b border-outline/10 pb-6">
<div className="flex items-center gap-2">
<div className="w-4 h-4 rounded-sm border border-outline/50 bg-surface/50"></div>
<span className="font-label-md text-label-md text-on-surface-variant">Available</span>
</div>
<div className="flex items-center gap-2">
<div className="w-4 h-4 rounded-sm bg-primary-container shadow-[0_0_8px_rgba(220,38,38,0.5)]"></div>
<span className="font-label-md text-label-md text-on-surface">Selected</span>
</div>
<div className="flex items-center gap-2">
<div className="w-4 h-4 rounded-sm bg-surface-container-high border border-outline-variant/50"></div>
<span className="font-label-md text-label-md text-on-surface-variant/50">Occupied</span>
</div>
</div>

<div className="relative px-8 py-12 rounded-t-[100px] border border-outline/20 bg-gradient-to-b from-surface-container/20 to-transparent">

<div className="absolute inset-0 rounded-t-[100px] border-2 border-outline-variant/10 pointer-events-none"></div>

<div className="seat-map-grid">

<div className="seat occupied">1A</div>
<div className="seat occupied">1B</div>
<div className="w-5"></div> 
<div className="seat available">1C</div>
<div className="seat available">1D</div>

<div className="seat available">2A</div>
<div className="seat occupied">2B</div>
<div></div>
<div className="seat occupied">2C</div>
<div className="seat occupied">2D</div>

<div className="seat available">3A</div>
<div className="seat available">3B</div>
<div></div>
<div className="seat selected">3C</div>
<div className="seat available">3D</div>

<div className="seat occupied">4A</div>
<div className="seat available">4B</div>
<div></div>
<div className="seat available">4C</div>
<div className="seat available">4D</div>
</div>
</div>
</div>
</section>

<section>
<h2 className="font-headline-md text-headline-md text-primary-container mb-4 flex items-center gap-3">
<span className="font-mono-data text-mono-data text-outline tracking-widest opacity-50">03</span>
                        CONTACT DETAILS
                    </h2>
<div className="glass-panel rounded-xl p-6">
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<div className="space-y-2">
<label className="font-label-md text-label-md text-on-surface-variant">Email Address</label>
<input className="w-full form-input rounded-lg px-4 py-3 font-body-md text-body-md" placeholder="passenger@domain.com" type="email"/>
</div>
<div className="space-y-2">
<label className="font-label-md text-label-md text-on-surface-variant">Phone Number</label>
<div className="flex">
<select className="form-input rounded-l-lg border-r-0 px-3 py-3 font-body-md text-body-md text-on-surface-variant w-24 appearance-none">
<option>+971</option>
<option>+44</option>
<option>+1</option>
</select>
<input className="w-full form-input rounded-r-lg px-4 py-3 font-body-md text-body-md" placeholder="50 123 4567" type="tel"/>
</div>
</div>
</div>
</div>
</section>
</div>

<div className="xl:col-span-4">
<div className="sticky top-[100px]">
<div className="glass-panel rounded-xl p-6 relative overflow-hidden">

<div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-container to-transparent opacity-50"></div>
<h3 className="font-headline-md text-headline-md mb-6">Order Summary</h3>

<div className="bg-surface-container/50 rounded-lg p-4 mb-6 border border-outline/10">
<div className="flex justify-between items-center mb-4">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-on-surface-variant">flight_class</span>
<span className="font-label-md text-label-md text-on-surface-variant">Emirates (EK)</span>
</div>
<span className="px-2 py-1 bg-surface rounded text-xs font-mono-data text-on-surface border-l-2 border-primary-container">Business</span>
</div>
<div className="flex items-center justify-between">
<div className="text-center">
<div className="font-headline-md text-headline-md">DXB</div>
<div className="font-mono-data text-mono-data text-on-surface-variant">08:45</div>
</div>
<div className="flex-1 flex flex-col items-center px-4 relative">
<span className="font-label-md text-label-md text-on-surface-variant text-[10px] mb-1">7h 20m</span>
<div className="w-full h-[1px] bg-outline-variant relative">
<span className="material-symbols-outlined text-primary-container absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>flight</span>
</div>
<span className="font-label-md text-label-md text-on-surface-variant text-[10px] mt-1">Direct</span>
</div>
<div className="text-center">
<div className="font-headline-md text-headline-md">LHR</div>
<div className="font-mono-data text-mono-data text-on-surface-variant">13:05</div>
</div>
</div>
</div>

<div className="space-y-3 font-body-md text-body-md mb-6 border-b border-outline/10 pb-6">
<div className="flex justify-between text-on-surface-variant">
<span>Base Fare (1x Adult)</span>
<span className="font-mono-data text-mono-data">$3,450.00</span>
</div>
<div className="flex justify-between text-on-surface-variant">
<span>Taxes &amp; Fees</span>
<span className="font-mono-data text-mono-data">$420.50</span>
</div>
<div className="flex justify-between text-on-surface-variant">
<span>Seat Selection (3C)</span>
<span className="font-mono-data text-mono-data">$85.00</span>
</div>
</div>

<div className="flex justify-between items-end mb-8">
<span className="font-body-lg text-body-lg text-on-surface-variant">Total Price</span>
<div className="text-right">
<span className="font-label-md text-label-md text-primary-container mr-1">USD</span>
<span className="font-display-lg text-display-lg text-white drop-shadow-[0_0_10px_rgba(220,38,38,0.5)]">3,955<span className="text-2xl text-on-surface-variant">.50</span></span>
</div>
</div>

<Link href="/booking"  className="w-full bg-primary-container text-white font-label-md text-label-md py-4 rounded-lg shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] hover:bg-inverse-primary transition-all duration-300 flex justify-center items-center gap-2">
<span className="material-symbols-outlined">lock</span>
                            Confirm &amp; Book
                        </Link>
<p className="text-center font-mono-data text-[11px] text-on-surface-variant mt-3 opacity-60">By clicking Confirm, you agree to the Fare Rules and Terms of Service.</p>
</div>
</div>
</div>
</div>
</main>
    </>
  );
}
