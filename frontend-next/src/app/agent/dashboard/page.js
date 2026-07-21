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

export default function B2BAgentPortalDashboardTxtPage() {
  return (
    <>
      {/* Material Symbols */}
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
       TopNavBar <header className="bg-surface/30 dark:bg-surface/30 backdrop-blur-md text-primary dark:text-primary shadow-2xl shadow-black/50 border-b border-white/10 flex justify-between items-center px-container-padding w-full h-20 sticky top-0 z-50">
<div className="flex items-center gap-6">
<div className="flex items-center gap-3">
<div className="flex items-center justify-center gap-2 font-heading text-2xl font-black text-brand-white tracking-wide">
    <LogoIcon />
    <span>Sky<span className="text-brand-red">Ways</span></span>
</div>
<h1 className="font-display-lg text-display-lg font-bold text-primary dark:text-primary text-xl">AeroElite B2B</h1>
</div>

<nav className="hidden md:flex gap-6 ml-8">
<Link href="/dashboard"  className="text-primary font-bold border-b-2 border-primary pb-1 active:scale-95 transition-transform font-label-md text-label-md" >Dashboard</Link>
<Link href="/booking"  className="text-on-surface/70 font-medium hover:text-on-surface hover:bg-white/5 transition-all duration-300 active:scale-95 px-2 py-1 rounded font-label-md text-label-md" >Bookings</Link>
<Link href="#" className="text-on-surface/70 font-medium hover:text-on-surface hover:bg-white/5 transition-all duration-300 active:scale-95 px-2 py-1 rounded font-label-md text-label-md" >Inventory</Link>
<Link href="#" className="text-on-surface/70 font-medium hover:text-on-surface hover:bg-white/5 transition-all duration-300 active:scale-95 px-2 py-1 rounded font-label-md text-label-md" >Reports</Link>
</nav>
</div>
<div className="flex items-center gap-4">
<button className="bg-[#DC2626] hover:bg-[#bf0715] text-white px-4 py-2 rounded font-label-md text-label-md transition-all neon-glow-red">
                Top Up Wallet
            </button>
<div className="flex items-center gap-2">
<button className="p-2 text-on-surface/70 hover:text-on-surface hover:bg-white/5 rounded-full transition-all duration-300 active:scale-95">
<span className="material-symbols-outlined">account_balance_wallet</span>
</button>
<button className="p-2 text-on-surface/70 hover:text-on-surface hover:bg-white/5 rounded-full transition-all duration-300 active:scale-95 relative">
<span className="material-symbols-outlined">notifications</span>
<span className="absolute top-1 right-1 w-2 h-2 bg-primary-container rounded-full neon-glow-red"></span>
</button>
<button className="p-2 text-on-surface/70 hover:text-on-surface hover:bg-white/5 rounded-full transition-all duration-300 active:scale-95 flex items-center gap-1">
<span className="material-symbols-outlined">language</span>
<span className="font-mono-data text-mono-data">PKR</span>
</button>
</div>
<div className="flex items-center gap-2 ml-4 pl-4 border-l border-white/10">
<div className="relative">
<img className="w-10 h-10 rounded-full object-cover border border-white/20" data-alt="A professional headshot of a travel agent in a sleek, dimly lit premium office setting. The lighting is moody with subtle red accents in the background, matching a high-tech modern aesthetic. The agent looks focused and confident. Deep obsidian dark mode style." src="/agent_avatar.png"/>
<div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0A0A0A]"></div>
</div>
</div>
</div>
</header><main className="flex-grow flex flex-col items-center w-full px-container-padding py-section-gap gap-gutter max-w-max-width mx-auto">

<section className="w-full glass-card rounded-xl p-6 relative overflow-hidden mb-8">
<div className="absolute inset-0 bg-gradient-to-br from-primary-container/5 to-transparent pointer-events-none"></div>
<div className="relative z-10 flex flex-col md:flex-row gap-4 items-end">

<div className="flex-1 w-full input-glass rounded-lg p-3 flex flex-col group">
<label className="text-on-surface-variant text-xs mb-1 font-label-md text-label-md uppercase tracking-wider">Origin</label>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-tertiary">flight_takeoff</span>
<input className="bg-transparent border-none outline-none text-on-surface w-full font-mono-data text-mono-data focus:ring-0 p-0" placeholder="City or Airport" type="text" value="Dubai (DXB)"/>
</div>
</div>

<button className="p-3 glass-card rounded-full hover:bg-white/10 transition-colors mx-auto md:mx-0 z-20 -my-4 md:my-0 md:-mx-4 shadow-lg">
<span className="material-symbols-outlined text-on-surface">swap_horiz</span>
</button>

<div className="flex-1 w-full input-glass rounded-lg p-3 flex flex-col">
<label className="text-on-surface-variant text-xs mb-1 font-label-md text-label-md uppercase tracking-wider">Destination</label>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-tertiary">flight_land</span>
<input className="bg-transparent border-none outline-none text-on-surface w-full font-mono-data text-mono-data focus:ring-0 p-0" placeholder="City or Airport" type="text" value="London (LHR)"/>
</div>
</div>

<div className="flex-1 w-full input-glass rounded-lg p-3 flex flex-col">
<label className="text-on-surface-variant text-xs mb-1 font-label-md text-label-md uppercase tracking-wider">Dates</label>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-tertiary">calendar_month</span>
<input className="bg-transparent border-none outline-none text-on-surface w-full font-mono-data text-mono-data focus:ring-0 p-0" type="text" value="Oct 24 - Oct 31"/>
</div>
</div>

<div className="w-full md:w-48 input-glass rounded-lg p-3 flex flex-col">
<label className="text-on-surface-variant text-xs mb-1 font-label-md text-label-md uppercase tracking-wider">Travelers &amp; Class</label>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-tertiary">group</span>
<input className="bg-transparent border-none outline-none text-on-surface w-full font-mono-data text-mono-data focus:ring-0 p-0 text-sm overflow-hidden text-ellipsis whitespace-nowrap" type="text" value="1 Adult, Economy"/>
</div>
</div>

<Link href="/search"  className="w-full md:w-auto bg-[#DC2626] hover:bg-[#bf0715] text-white px-8 py-4 rounded-lg font-headline-md text-headline-md text-lg transition-all neon-glow-red flex items-center justify-center gap-2 whitespace-nowrap h-[68px]">
<span className="material-symbols-outlined">search</span>
                    Search Flights
                </Link>
</div>
</section>

<div className="flex flex-col md:flex-row w-full gap-gutter items-start">

<aside className="w-full md:w-[280px] shrink-0 flex flex-col gap-4">
<div className="glass-card rounded-xl p-4 flex flex-col gap-6 sticky top-28">
<h3 className="font-headline-md text-headline-md text-lg border-b border-white/10 pb-2">Filters</h3>

<div className="flex flex-col gap-3">
<h4 className="font-label-md text-label-md text-on-surface-variant">Stops</h4>
<label className="flex items-center gap-3 cursor-pointer group">
<input checked="" className="form-checkbox rounded bg-surface border-white/20 text-[#DC2626] focus:ring-[#DC2626] focus:ring-offset-surface" type="checkbox"/>
<span className="font-body-md text-body-md group-hover:text-white transition-colors">Direct</span>
<span className="ml-auto font-mono-data text-mono-data text-tertiary">PKR 125K</span>
</label>
<label className="flex items-center gap-3 cursor-pointer group">
<input className="form-checkbox rounded bg-surface border-white/20 text-[#DC2626] focus:ring-[#DC2626] focus:ring-offset-surface" type="checkbox"/>
<span className="font-body-md text-body-md group-hover:text-white transition-colors">1 Stop</span>
<span className="ml-auto font-mono-data text-mono-data text-tertiary">PKR 98K</span>
</label>
</div>

<div className="flex flex-col gap-3">
<div className="flex justify-between items-center">
<h4 className="font-label-md text-label-md text-on-surface-variant">Price</h4>
<span className="font-mono-data text-mono-data text-xs">Up to 300K</span>
</div>
<input className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#DC2626]" max="500000" min="50000" type="range" value="300000"/>
</div>

<div className="flex flex-col gap-3 border-t border-white/10 pt-4">
<h4 className="font-label-md text-label-md text-on-surface-variant">Departure Time</h4>
<div className="grid grid-cols-2 gap-2">
<button className="glass-card p-2 rounded flex flex-col items-center justify-center gap-1 hover:bg-white/10 transition-colors border-primary-container/50">
<span className="material-symbols-outlined text-xl">brightness_5</span>
<span className="text-xs">Morning</span>
</button>
<button className="glass-card p-2 rounded flex flex-col items-center justify-center gap-1 hover:bg-white/10 transition-colors opacity-50">
<span className="material-symbols-outlined text-xl">bedtime</span>
<span className="text-xs">Evening</span>
</button>
</div>
</div>
</div>
</aside>

<div className="flex-1 w-full flex flex-col gap-6">

<div className="w-full glass-card rounded-xl p-2 flex overflow-x-auto snap-x hide-scrollbar">
<div className="flex items-center w-full min-w-max justify-between px-2">
<button className="p-2 text-on-surface/50 hover:text-white"><span className="material-symbols-outlined">chevron_left</span></button>
<div className="flex-1 flex justify-center gap-2">

<div className="flex flex-col items-center p-2 rounded hover:bg-white/5 cursor-pointer min-w-[80px] snap-center">
<span className="text-xs text-on-surface-variant font-label-md text-label-md">Mon, 21</span>
<span className="font-mono-data text-mono-data text-sm">PKR 142k</span>
</div>
<div className="flex flex-col items-center p-2 rounded bg-primary-container/10 border border-primary-container/30 cursor-pointer min-w-[80px] snap-center relative">
<div className="absolute -top-1 w-8 h-1 bg-[#DC2626] rounded-full neon-glow-red"></div>
<span className="text-xs text-[#DC2626] font-label-md text-label-md">Tue, 22</span>
<span className="font-mono-data text-mono-data text-sm font-bold text-[#DC2626]">PKR 125k</span>
</div>
<div className="flex flex-col items-center p-2 rounded hover:bg-white/5 cursor-pointer min-w-[80px] snap-center">
<span className="text-xs text-on-surface-variant font-label-md text-label-md">Wed, 23</span>
<span className="font-mono-data text-mono-data text-sm">PKR 135k</span>
</div>
<div className="flex flex-col items-center p-2 rounded hover:bg-white/5 cursor-pointer min-w-[80px] snap-center">
<span className="text-xs text-on-surface-variant font-label-md text-label-md">Thu, 24</span>
<span className="font-mono-data text-mono-data text-sm">PKR 130k</span>
</div>
</div>
<button className="p-2 text-on-surface/50 hover:text-white"><span className="material-symbols-outlined">chevron_right</span></button>
</div>
</div>

<div className="flex flex-col gap-4">

<div className="glass-card rounded-xl p-4 md:p-6 hover:bg-white/[0.05] transition-all duration-300 border-l-4 border-l-transparent hover:border-l-[#DC2626] group">
<div className="flex flex-col md:flex-row justify-between items-center gap-6">

<div className="flex items-center gap-4 w-full md:w-auto">
<div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-1">
<img className="w-full h-full object-contain" data-alt="A minimalist logo for Emirates Airlines, featuring smooth curved lines and elegant red and gold branding on a pure white background. The image should be clean and vector-like." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQBljZTZJVb7Fszh3QJ6DEsxf4_NWvLXg2u8e9gjTPz9A4elPc__NONVarincqW4Oc6m-tF5UAW9LNGl5FFphpSrubchuLtI0kwAcV2oHuF0o8J8sfY99pFTmQwHfpAgETng5FgNaxTs1cduRorWfcda-zKtNaOfQLgoJ3eAnWzT-3lmOtjSdOvU5KtgheREbgH4_u8W03VUDBKIXSTSVECp0oEtb4ZdMUTkVif3T4BupperdAlQem"/>
</div>
<div className="flex flex-col">
<span className="font-headline-md text-headline-md text-base">Emirates</span>
<span className="text-xs text-on-surface-variant font-mono-data text-mono-data">EK-622 • Boeing 777</span>
</div>
</div>

<div className="flex-1 flex items-center justify-center gap-4 w-full px-4">
<div className="flex flex-col items-end">
<span className="font-headline-md text-headline-md text-lg">10:30</span>
<span className="font-mono-data text-mono-data text-sm text-on-surface-variant">DXB</span>
</div>
<div className="flex-1 flex flex-col items-center relative min-w-[120px] max-w-[300px]">
<span className="text-[10px] text-tertiary mb-1">7h 15m</span>
<div className="w-full h-[2px] bg-white/10 relative flex items-center justify-center">
<div className="absolute left-0 w-2 h-2 rounded-full bg-white/30"></div>
<div className="w-2 h-2 rounded-full bg-white/30"></div> 
<div className="absolute right-0 w-2 h-2 rounded-full bg-[#DC2626] neon-glow-red"></div>
</div>
<span className="text-[10px] text-tertiary mt-1 text-[#DC2626]">1 Stop (DOH)</span>
</div>
<div className="flex flex-col items-start">
<span className="font-headline-md text-headline-md text-lg">17:45</span>
<span className="font-mono-data text-mono-data text-sm text-on-surface-variant">LHR</span>
</div>
</div>

<div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4 md:gap-2 border-t md:border-t-0 border-white/10 pt-4 md:pt-0">
<div className="flex flex-col items-start md:items-end">
<span className="text-xs text-on-surface-variant mb-[-4px]">Total Price</span>
<span className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-[#DC2626]">PKR 125,000</span>
</div>
<Link href="/booking"  className="bg-transparent border border-white/20 hover:border-[#DC2626] hover:bg-[#DC2626]/10 px-6 py-2 rounded font-label-md text-label-md transition-colors text-white">
                                    Select
                                </Link>
</div>
</div>
</div>

<div className="glass-card rounded-xl p-4 md:p-6 hover:bg-white/[0.05] transition-all duration-300 border-l-4 border-l-[#DC2626] bg-gradient-to-r from-primary-container/5 to-transparent relative overflow-hidden">
<div className="absolute top-0 right-0 bg-[#DC2626] text-white text-[10px] px-3 py-1 rounded-bl-lg font-bold tracking-wider uppercase">
                            Cheapest Direct
                        </div>
<div className="flex flex-col md:flex-row justify-between items-center gap-6">
<div className="flex items-center gap-4 w-full md:w-auto">
<div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-1">
<img className="w-full h-full object-contain" data-alt="A minimalist logo for PIA (Pakistan International Airlines), featuring crisp green and white branding on a solid white background. Clean, modern, vector-style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA79GOtDJVLCI-Vh2GTOFjxx4rJt0bHXO0YFF9IaZOGLi0623neaLeIrbg1I11k_YN4ooFjed67cqxTPpbBcxJ3g_NwudJ_iAtnOfda8dLSxKTugx1YkvKNfi-amcmmnTt__wH_E4eVev4O1hgyYI20qa1EfbviWf-s2tdqPb_4i0RP4uJ7ddjB6UfbMmZBau1YY546W1YD8MjOHOs3M707vINtc_Fd-Tywi9GgTzlyq-4If6KtY47Y"/>
</div>
<div className="flex flex-col">
<span className="font-headline-md text-headline-md text-base">PIA</span>
<span className="text-xs text-on-surface-variant font-mono-data text-mono-data">PK-785 • Airbus A330</span>
</div>
</div>
<div className="flex-1 flex items-center justify-center gap-4 w-full px-4">
<div className="flex flex-col items-end">
<span className="font-headline-md text-headline-md text-lg">14:00</span>
<span className="font-mono-data text-mono-data text-sm text-on-surface-variant">DXB</span>
</div>
<div className="flex-1 flex flex-col items-center relative min-w-[120px] max-w-[300px]">
<span className="text-[10px] text-tertiary mb-1">6h 45m</span>
<div className="w-full h-[2px] bg-white/20 relative flex items-center justify-center">
<div className="absolute left-0 w-2 h-2 rounded-full bg-white/50"></div>
<div className="absolute right-0 w-2 h-2 rounded-full bg-[#DC2626] neon-glow-red"></div>
</div>
<span className="text-[10px] text-[#DC2626] mt-1 bg-[#DC2626]/20 px-2 py-[2px] rounded-full">Direct</span>
</div>
<div className="flex flex-col items-start">
<span className="font-headline-md text-headline-md text-lg">20:45</span>
<span className="font-mono-data text-mono-data text-sm text-on-surface-variant">LHR</span>
</div>
</div>
<div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4 md:gap-2 border-t md:border-t-0 border-white/10 pt-4 md:pt-0">
<div className="flex flex-col items-start md:items-end">
<span className="text-xs text-on-surface-variant mb-[-4px]">Total Price</span>
<span className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-[#DC2626]">PKR 155,000</span>
</div>
<Link href="/booking"  className="bg-[#DC2626] hover:bg-[#bf0715] px-6 py-2 rounded font-label-md text-label-md transition-colors text-white neon-glow-red">
                                    Select
                                </Link>
</div>
</div>
</div>
</div>
</div>
</div>
</main> Floating Wallet Widget <div className="fixed bottom-6 right-6 glass-card px-4 py-3 rounded-full flex items-center gap-3 shadow-2xl z-50 border border-[#DC2626]/30 bg-surface/80 backdrop-blur-xl group cursor-pointer hover:bg-surface transition-colors">
<div className="w-8 h-8 rounded-full bg-[#DC2626]/20 flex items-center justify-center group-hover:bg-[#DC2626]/40 transition-colors">
<span className="material-symbols-outlined text-[#DC2626] text-sm">account_balance_wallet</span>
</div>
<div className="flex flex-col pr-2">
<span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-label-md">Agent Balance</span>
<span className="font-mono-data text-mono-data text-sm font-bold text-white group-hover:text-[#DC2626] transition-colors drop-shadow-[0_0_8px_rgba(220,38,38,0.5)]">450,000 PKR</span>
</div>
</div>
    </>
  );
}
