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

export default function ManageBookingsPage() {
  return (
    <>
      {/* Material Symbols */}
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      
      {/* SideNavBar (Desktop) */}
      <aside className="hidden md:flex flex-col bg-surface-container-lowest/80 dark:bg-surface-container-lowest/80 backdrop-blur-xl fixed left-0 top-0 h-full w-[280px] border-r border-white/5 shadow-2xl shadow-black/40 z-40 py-base">
        <div className="px-6 py-4 flex items-center gap-4 mb-6">
          <div className="flex items-center justify-center gap-2 font-heading text-2xl font-black text-brand-white tracking-wide">
            <LogoIcon />
            <span>Sky<span className="text-brand-red">Ways</span></span>
          </div>
          <div>
            <h2 className="font-headline-md text-headline-md text-on-surface">Elite Travel Concierge</h2>
            <p className="font-body-md text-body-md text-on-surface-variant text-sm mt-1">ID: AGENT-9942</p>
          </div>
        </div>
        <div className="px-6 mb-8">
          <Link href="/search" className="w-full bg-primary-container text-white py-3 rounded hover:bg-red-700 transition-colors font-label-md text-label-md shadow-[0_0_15px_rgba(220,38,38,0.4)]">
            New Booking
          </Link>
        </div>
        <nav className="flex-1 flex flex-col gap-2">
          <a className="flex items-center gap-4 text-on-surface-variant px-6 py-4 hover:bg-white/5 hover:text-on-surface transition-colors active:translate-x-1 duration-200" href="#">
            <span className="material-symbols-outlined">flight_takeoff</span>
            <span className="font-label-md text-label-md">Flight Search</span>
          </a>
          <Link href="#" className="flex items-center gap-4 text-on-surface-variant px-6 py-4 hover:bg-white/5 hover:text-on-surface transition-colors active:translate-x-1 duration-200" >
            <span className="material-symbols-outlined">event_note</span>
            <span className="font-label-md text-label-md">Itineraries</span>
          </Link>
          <Link href="#" className="flex items-center gap-4 text-on-surface-variant px-6 py-4 hover:bg-white/5 hover:text-on-surface transition-colors active:translate-x-1 duration-200" >
            <span className="material-symbols-outlined">group</span>
            <span className="font-label-md text-label-md">Passenger Manifests</span>
          </Link>
          <Link href="/confirmation" className="flex items-center gap-4 text-on-surface-variant px-6 py-4 hover:bg-white/5 hover:text-on-surface transition-colors active:translate-x-1 duration-200" >
            <span className="material-symbols-outlined">payments</span>
            <span className="font-label-md text-label-md">Agent Wallet</span>
          </Link>
          <Link href="#" className="flex items-center gap-4 text-on-surface-variant px-6 py-4 hover:bg-white/5 hover:text-on-surface transition-colors active:translate-x-1 duration-200" >
            <span className="material-symbols-outlined">support_agent</span>
            <span className="font-label-md text-label-md">Support</span>
          </Link>
          <Link href="#" className="flex items-center gap-4 text-on-surface-variant px-6 py-4 hover:bg-white/5 hover:text-on-surface transition-colors active:translate-x-1 duration-200" >
            <span className="material-symbols-outlined">settings</span>
            <span className="font-label-md text-label-md">Settings</span>
          </Link>
        </nav>
        <div className="mt-auto">
          <Link href="#" className="flex items-center gap-4 text-on-surface-variant px-6 py-4 hover:bg-white/5 hover:text-on-surface transition-colors active:translate-x-1 duration-200" >
            <span className="material-symbols-outlined">logout</span>
            <span className="font-label-md text-label-md">Logout</span>
          </Link>
        </div>
      </aside>
      
      {/* Main Content Area */}
      <main className="flex-1 md:ml-[280px] flex flex-col min-h-screen">

<header className="hidden md:flex justify-between items-center px-container-padding w-full h-20 sticky top-0 z-50 bg-surface/30 dark:bg-surface/30 backdrop-blur-md border-b border-white/10 shadow-2xl shadow-black/50">
<div className="flex items-center gap-8">
<h1 className="font-display-lg text-display-lg font-bold text-primary dark:text-primary text-[28px]">AeroElite B2B</h1>
<nav className="flex items-center gap-6">
<Link href="/dashboard"  className="text-on-surface/70 font-medium hover:text-on-surface hover:bg-white/5 transition-all duration-300 active:scale-95 px-2 py-1 rounded" >
<span className="font-label-md text-label-md">Dashboard</span>
</Link>
<Link href="/booking"  className="text-primary font-bold border-b-2 border-primary pb-1 active:scale-95 transition-transform" >
<span className="font-label-md text-label-md">Bookings</span>
</Link>
<Link href="#" className="text-on-surface/70 font-medium hover:text-on-surface hover:bg-white/5 transition-all duration-300 active:scale-95 px-2 py-1 rounded" >
<span className="font-label-md text-label-md">Inventory</span>
</Link>
<Link href="#" className="text-on-surface/70 font-medium hover:text-on-surface hover:bg-white/5 transition-all duration-300 active:scale-95 px-2 py-1 rounded" >
<span className="font-label-md text-label-md">Reports</span>
</Link>
</nav>
</div>
<div className="flex items-center gap-4">
<div className="relative">
<input className="bg-[#050505] border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-on-surface focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all w-64 glass-panel" placeholder="Search PNR..." type="text"/>
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
</div>
<button className="text-primary-container hover:text-white transition-colors border border-primary-container hover:bg-primary-container/20 px-4 py-2 rounded font-label-md text-label-md">
                    Top Up Wallet
                </button>
<div className="flex items-center gap-2 text-on-surface">
<button className="p-2 rounded-full hover:bg-white/10 transition-colors"><span className="material-symbols-outlined">account_balance_wallet</span></button>
<button className="p-2 rounded-full hover:bg-white/10 transition-colors"><span className="material-symbols-outlined">notifications</span></button>
<button className="p-2 rounded-full hover:bg-white/10 transition-colors"><span className="material-symbols-outlined">language</span></button>
</div>
<img alt="Agent Profile Avatar" className="w-10 h-10 rounded-full object-cover border border-white/20 ml-2" data-alt="A professional headshot of a travel agent in a modern office setting. The lighting is cinematic and moody, with a sleek high-tech corporate background. Professional attire, looking confident. Dark cinematic tones." src="/agent_avatar.png"/>
</div>
</header>

<div className="p-container-padding max-w-max-width mx-auto w-full space-y-8 mt-4">

<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
<div>
<h1 className="font-headline-lg text-headline-lg text-on-surface">Manage Bookings</h1>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">View and manage your agency's flight reservations.</p>
</div>
<div className="flex items-center gap-4 w-full md:w-auto">
<div className="relative w-full md:w-auto">
<input className="bg-[#050505] border border-white/10 rounded py-2 pl-10 pr-4 text-sm text-on-surface focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all w-full md:w-64" placeholder="Booking Ref (PNR)" type="text"/>
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
</div>
<Link href="/search"  className="bg-primary-container text-white px-6 py-2 rounded hover:bg-red-700 transition-colors font-label-md text-label-md shadow-[0_0_15px_rgba(220,38,38,0.3)] whitespace-nowrap">
                        Create New Booking
                    </Link>
</div>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
<div className="glass-panel rounded-lg p-6 glow-crimson transition-all cursor-default">
<div className="flex justify-between items-start">
<div>
<p className="font-label-md text-label-md text-on-surface-variant mb-1">Total Bookings</p>
<h3 className="font-headline-md text-headline-md text-on-surface">1,248</h3>
</div>
<span className="material-symbols-outlined text-tertiary">flight_class</span>
</div>
</div>
<div className="glass-panel rounded-lg p-6 glow-crimson transition-all cursor-default relative overflow-hidden">
<div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500"></div>
<div className="flex justify-between items-start">
<div>
<p className="font-label-md text-label-md text-on-surface-variant mb-1">Pending Tickets</p>
<h3 className="font-headline-md text-headline-md text-on-surface">42</h3>
</div>
<span className="material-symbols-outlined text-amber-500">pending_actions</span>
</div>
</div>
<div className="glass-panel rounded-lg p-6 glow-crimson transition-all cursor-default relative overflow-hidden">
<div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-container"></div>
<div className="flex justify-between items-start">
<div>
<p className="font-label-md text-label-md text-on-surface-variant mb-1">Upcoming Departures</p>
<h3 className="font-headline-md text-headline-md text-on-surface">18</h3>
</div>
<span className="material-symbols-outlined text-primary-container">flight_takeoff</span>
</div>
</div>
<div className="glass-panel rounded-lg p-6 glow-crimson transition-all cursor-default relative overflow-hidden">
<div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500"></div>
<div className="flex justify-between items-start">
<div>
<p className="font-label-md text-label-md text-on-surface-variant mb-1">Completed</p>
<h3 className="font-headline-md text-headline-md text-on-surface">892</h3>
</div>
<span className="material-symbols-outlined text-green-500">task_alt</span>
</div>
</div>
</div>

<div className="glass-panel rounded-lg overflow-hidden flex flex-col">

<div className="p-4 border-b border-white/10 flex flex-wrap gap-4 items-center justify-between bg-black/20">
<div className="flex gap-4">
<select className="bg-[#050505] border border-white/10 rounded py-1.5 px-3 text-sm text-on-surface focus:border-primary-container outline-none glass-panel">
<option>All Statuses</option>
<option>Ticketed</option>
<option>Pending</option>
<option>Cancelled</option>
</select>
<select className="bg-[#050505] border border-white/10 rounded py-1.5 px-3 text-sm text-on-surface focus:border-primary-container outline-none glass-panel">
<option>Last 30 Days</option>
<option>This Week</option>
<option>Today</option>
</select>
</div>
<button className="text-on-surface-variant hover:text-on-surface flex items-center gap-1 text-sm font-medium transition-colors">
<span className="material-symbols-outlined text-[18px]">filter_list</span> More Filters
                    </button>
</div>

<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-white/5 border-b border-white/10">
<th className="p-4 font-label-md text-label-md text-on-surface-variant font-medium">PNR</th>
<th className="p-4 font-label-md text-label-md text-on-surface-variant font-medium">Passenger</th>
<th className="p-4 font-label-md text-label-md text-on-surface-variant font-medium">Route</th>
<th className="p-4 font-label-md text-label-md text-on-surface-variant font-medium">Departure</th>
<th className="p-4 font-label-md text-label-md text-on-surface-variant font-medium">Carrier</th>
<th className="p-4 font-label-md text-label-md text-on-surface-variant font-medium">Status</th>
<th className="p-4 font-label-md text-label-md text-on-surface-variant font-medium">Fare (PKR)</th>
<th className="p-4 font-label-md text-label-md text-on-surface-variant font-medium text-right">Actions</th>
</tr>
</thead>
<tbody className="font-mono-data text-mono-data">

<tr className="border-b border-white/5 table-row-hover transition-colors">
<td className="p-4 font-bold text-on-surface">X7Y8Z9</td>
<td className="p-4 text-on-surface">Ahmed, S.</td>
<td className="p-4 text-on-surface-variant flex items-center gap-2">
                                    DXB <span className="material-symbols-outlined text-[16px] text-primary-container">arrow_forward</span> LHR
                                </td>
<td className="p-4 text-on-surface-variant">24 Oct, 10:30</td>
<td className="p-4 flex items-center gap-2">
<img alt="EK" className="w-6 h-6 rounded bg-white/10 p-0.5 object-contain" data-alt="Emirates Airlines logo stylized in a minimal flat icon design. Red and white on dark background. Clean corporate style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBY6GPf2O9t-suTyBP7w8Thn7VEPBFBvdsFRcMX9jB6UyZi314uuC8i2XJkn6whHSjntqAE-NXylnf8qMD1n3H9thi7JeHT5P7L-c9a4BwNwdcEbhGkrK_aZYCgA8FFjGmT1ABxX5RJBW8NUTdXFM4ybSAmDAxYiWvkR9qFSoPjGTA4C_MTmw4RzgZD7zk9snrbM9Wyzm7c90jn5xtB3Ajx8zTGeKUo_Z5fZ2shvssnquvRtWYrI481"/>
<span className="text-on-surface">EK</span>
</td>
<td className="p-4">
<span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20 badge-glow-green">
<span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                                        Ticketed
                                    </span>
</td>
<td className="p-4 text-on-surface">145,000</td>
<td className="p-4 text-right">
<div className="flex items-center justify-end gap-2">
<button className="p-1.5 text-on-surface-variant hover:text-white hover:bg-white/10 rounded transition-colors" title="View Details"><span className="material-symbols-outlined text-[20px]">visibility</span></button>
<button className="p-1.5 text-on-surface-variant hover:text-white hover:bg-white/10 rounded transition-colors" title="Download E-Ticket"><span className="material-symbols-outlined text-[20px]">download</span></button>
<button className="p-1.5 text-on-surface-variant hover:text-primary-container hover:bg-red-500/10 rounded transition-colors" title="Cancel"><span className="material-symbols-outlined text-[20px]">cancel</span></button>
</div>
</td>
</tr>

<tr className="border-b border-white/5 table-row-hover transition-colors">
<td className="p-4 font-bold text-on-surface">A2B3C4</td>
<td className="p-4 text-on-surface">Khan, M.</td>
<td className="p-4 text-on-surface-variant flex items-center gap-2">
                                    KHI <span className="material-symbols-outlined text-[16px] text-primary-container">arrow_forward</span> DXB
                                </td>
<td className="p-4 text-on-surface-variant">25 Oct, 08:15</td>
<td className="p-4 flex items-center gap-2">
<img alt="QR" className="w-6 h-6 rounded bg-white/10 p-0.5 object-contain" data-alt="Qatar Airways logo stylized in a minimal flat icon design. Maroon and white on dark background. Clean corporate style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1MPahfLvgj4UyGA7hltgUmGl2hD0-irNogtI1J-3TdTCDFohN5mYIELrUwh98NkMubEl_mCqzrWVLn6aRe7EQrYvut2neBo5lpcM45x5VhIn6wi5fZOj-Kfa4ZTgiEV6t6f2rKt3wqq_xOHPX5A-ew2ZTyFv-1r779GzZsG5zSgr0ZrsBRVEJTKgHFqP-S0WYunEumaXrvE_WLV3eECHsAiseuKbMvIwdGPrgQ8O2pyz6Cgk2K8Vd"/>
<span className="text-on-surface">QR</span>
</td>
<td className="p-4">
<span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20 badge-glow-amber">
<span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                                        Pending
                                    </span>
</td>
<td className="p-4 text-on-surface">85,500</td>
<td className="p-4 text-right">
<div className="flex items-center justify-end gap-2">
<button className="p-1.5 text-on-surface-variant hover:text-white hover:bg-white/10 rounded transition-colors" title="View Details"><span className="material-symbols-outlined text-[20px]">visibility</span></button>
<button className="p-1.5 text-on-surface-variant hover:text-white hover:bg-white/10 rounded transition-colors opacity-50 cursor-not-allowed" title="Download E-Ticket"><span className="material-symbols-outlined text-[20px]">download</span></button>
<button className="p-1.5 text-on-surface-variant hover:text-primary-container hover:bg-red-500/10 rounded transition-colors" title="Cancel"><span className="material-symbols-outlined text-[20px]">cancel</span></button>
</div>
</td>
</tr>

<tr className="border-b border-white/5 table-row-hover transition-colors opacity-70">
<td className="p-4 font-bold text-on-surface line-through">J9K8L7</td>
<td className="p-4 text-on-surface">Ali, R.</td>
<td className="p-4 text-on-surface-variant flex items-center gap-2">
                                    ISB <span className="material-symbols-outlined text-[16px] text-primary-container">arrow_forward</span> JFK
                                </td>
<td className="p-4 text-on-surface-variant">20 Oct, 23:45</td>
<td className="p-4 flex items-center gap-2">
<img alt="TK" className="w-6 h-6 rounded bg-white/10 p-0.5 object-contain" data-alt="Turkish Airlines logo stylized in a minimal flat icon design. Red and white on dark background. Clean corporate style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDClEwSciDd4QeDIkQ8Zam09FidaqtvCZGRVyyJlwexhTzMq530AbSHUlJ_du4ofkKDEaz8mIYDVku7TEW9z0qNjerQTpDKh_O7efsngDnYlCzgwpjNj-8r9A8s6cyZAtUORDkIqyGfZpcnTqEEKSFa19RAr2cYthefm89AxfPMlrte-15GqgdJPRVopnU7M2jR6y8IXpt6tZnXcq1K8Qz2OitX_T4RXWBHKrnCBDpJ4MkZyYJKp5IQ"/>
<span className="text-on-surface">TK</span>
</td>
<td className="p-4">
<span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-500/10 text-gray-400 border border-gray-500/20">
<span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                                        Cancelled
                                    </span>
</td>
<td className="p-4 text-on-surface">320,000</td>
<td className="p-4 text-right">
<div className="flex items-center justify-end gap-2">
<button className="p-1.5 text-on-surface-variant hover:text-white hover:bg-white/10 rounded transition-colors" title="View Details"><span className="material-symbols-outlined text-[20px]">visibility</span></button>
</div>
</td>
</tr>
</tbody>
</table>
</div>

<div className="p-4 border-t border-white/10 flex items-center justify-between bg-black/20">
<span className="text-sm text-on-surface-variant">Showing 1 to 3 of 1,248 entries</span>
<div className="flex gap-1">
<button className="p-1 text-on-surface-variant hover:text-white bg-white/5 hover:bg-white/10 rounded border border-white/10 transition-colors disabled:opacity-50"><span className="material-symbols-outlined text-[20px]">chevron_left</span></button>
<button className="px-3 py-1 bg-primary-container text-white rounded text-sm font-medium">1</button>
<button className="px-3 py-1 text-on-surface-variant hover:text-white bg-white/5 hover:bg-white/10 rounded border border-white/10 text-sm transition-colors">2</button>
<button className="px-3 py-1 text-on-surface-variant hover:text-white bg-white/5 hover:bg-white/10 rounded border border-white/10 text-sm transition-colors">3</button>
<span className="px-2 text-on-surface-variant">...</span>
<button className="p-1 text-on-surface-variant hover:text-white bg-white/5 hover:bg-white/10 rounded border border-white/10 transition-colors"><span className="material-symbols-outlined text-[20px]">chevron_right</span></button>
</div>
</div>
</div>
</div>
</main>
    </>
  );
}
