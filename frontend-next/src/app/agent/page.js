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

export default function AgentMarketingLandingPagePage() {
  return (
    <>
      {/* Material Symbols */}
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" /> <header className="bg-surface/80 dark:bg-surface/80 backdrop-blur-xl fixed top-0 w-full z-50 border-b border-white/10 shadow-2xl transition-all duration-300 ease-in-out">
<div className="flex justify-between items-center px-container-padding h-20 max-w-max-width mx-auto">
<div className="flex items-center gap-4">
<div className="flex items-center justify-center gap-2 font-heading text-2xl font-black text-brand-white tracking-wide">
    <LogoIcon />
    <span>Sky<span className="text-brand-red">Ways</span></span>
</div>
<div className="font-headline-lg text-headline-lg font-bold text-primary tracking-tight">AeroElite</div>
</div>
<nav className="hidden md:flex items-center gap-8">
<Link href="#" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors duration-300 ease-in-out" >Solutions</Link>
<Link href="#" className="font-label-md text-label-md text-primary border-b-2 border-primary pb-1 duration-300 ease-in-out" >Network</Link>
<Link href="#" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors duration-300 ease-in-out" >Technology</Link>
<Link href="#" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors duration-300 ease-in-out" >Pricing</Link>
</nav>
<div className="flex items-center gap-4">
<Link href="/agent/login"  className="hidden md:block font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors duration-300 ease-in-out">Agent Login</Link>
<Link href="/agent/register" className="bg-primary-container text-white px-6 py-2 rounded font-label-md text-label-md hover:opacity-80 transition-all duration-300 ease-in-out crimson-glow-hover">Join Network</Link>
</div>
</div>
</header><main className="flex-grow pt-20">

<section className="relative min-h-[90vh] flex items-center justify-center px-container-padding overflow-hidden">
<div className="absolute inset-0 z-0">
<div className="w-full h-full bg-cover bg-center opacity-30" data-alt="A sprawling, abstract network of glowing red data lines and nodes over a deep black background, resembling a high-tech global flight map. The aesthetic is sleek, minimalist, and ultra-modern B2B technology with a dark mode glassmorphic feel." style={{ backgroundImage: "url('/network_hd.png')" }}></div>
<div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
</div>
<div className="relative z-10 max-w-4xl mx-auto text-center">
<h1 className="font-display-lg text-display-lg md:text-[64px] md:leading-[72px] text-white mb-6">The Future of <span className="text-primary-container">Travel Management</span></h1>
<p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-2xl mx-auto">Empowering elite agents with next-generation tools, real-time global availability, and seamless settlement workflows in one unified, high-performance platform.</p>
<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
<Link href="/agent/register" className="w-full sm:w-auto bg-primary-container text-white px-8 py-4 rounded font-label-md text-label-md crimson-glow crimson-glow-hover transition-all duration-300">Join the Network</Link>
<Link href="/search" className="w-full sm:w-auto glass-card text-on-surface px-8 py-4 rounded font-label-md text-label-md hover:bg-surface-container transition-all duration-300">Explore Solutions</Link>
</div>
</div>
</section>

<section className="py-section-gap px-container-padding max-w-max-width mx-auto">
<div className="text-center mb-16">
<h2 className="font-headline-lg text-headline-lg text-white mb-4">Built for the Modern Agent</h2>
<p className="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto">Precision-engineered tools designed to streamline complex itineraries and accelerate agency growth.</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
<div className="glass-card rounded-xl p-8 hover:-translate-y-1 transition-transform duration-300">
<div className="w-12 h-12 rounded-full bg-primary-container/10 flex items-center justify-center mb-6">
<span className="material-symbols-outlined text-primary-container text-[24px]">api</span>
</div>
<h3 className="font-headline-md text-headline-md text-white mb-3">Live API Search</h3>
<p className="font-body-md text-body-md text-on-surface-variant">Instant global availability at your fingertips. Connect directly to major carriers and aggregators with millisecond response times.</p>
</div>
<div className="glass-card rounded-xl p-8 hover:-translate-y-1 transition-transform duration-300">
<div className="w-12 h-12 rounded-full bg-primary-container/10 flex items-center justify-center mb-6">
<span className="material-symbols-outlined text-primary-container text-[24px]">account_balance_wallet</span>
</div>
<h3 className="font-headline-md text-headline-md text-white mb-3">Digital Wallet</h3>
<p className="font-body-md text-body-md text-on-surface-variant">Secure, instantaneous settlement and top-ups. Manage agency funds and execute bookings without traditional credit bottlenecks.</p>
</div>
<div className="glass-card rounded-xl p-8 hover:-translate-y-1 transition-transform duration-300">
<div className="w-12 h-12 rounded-full bg-primary-container/10 flex items-center justify-center mb-6">
<span className="material-symbols-outlined text-primary-container text-[24px]">verified_user</span>
</div>
<h3 className="font-headline-md text-headline-md text-white mb-3">Owner Approval</h3>
<p className="font-body-md text-body-md text-on-surface-variant">Seamless workflow management for agency owners. Set booking limits, require approvals, and monitor all sub-agent activity in real-time.</p>
</div>
</div>
</section>

<section className="py-section-gap px-container-padding bg-surface-container-low border-y border-outline-variant/30 overflow-hidden relative">
<div className="max-w-max-width mx-auto">
<div className="flex flex-col lg:flex-row items-center gap-12">
<div className="lg:w-1/3 z-10">
<h2 className="font-headline-lg text-headline-lg text-white mb-6">Unrivaled Interface Quality</h2>
<p className="font-body-md text-body-md text-on-surface-variant mb-8">Experience a dashboard engineered for clarity and speed. The dark, minimalist aesthetic reduces eye strain during high-volume booking sessions, while intelligent layouts put critical data exactly where you need it.</p>
<ul className="space-y-4">
<li className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary-container text-[20px]">check_circle</span>
<span className="font-body-md text-body-md text-on-surface">Real-time status indicators</span>
</li>
<li className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary-container text-[20px]">check_circle</span>
<span className="font-body-md text-body-md text-on-surface">Fluid grid data presentation</span>
</li>
<li className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary-container text-[20px]">check_circle</span>
<span className="font-body-md text-body-md text-on-surface">Distraction-free focus modes</span>
</li>
</ul>
</div>
<div className="lg:w-2/3 relative">
<div className="absolute inset-0 bg-gradient-to-r from-surface-container-low to-transparent z-10 w-32"></div>
<div className="absolute inset-0 bg-gradient-to-t from-surface-container-low to-transparent z-10 h-32 top-auto bottom-0"></div>
<img className="w-full h-auto rounded-xl shadow-2xl border border-white/5 opacity-80 mix-blend-screen" data-alt="A highly stylized, blurred conceptual mockup of a dark-mode B2B travel agency dashboard interface. It features glassmorphic panels, glowing red status indicators, and crisp white typography on a deep obsidian background. Professional, high-tech, and luxurious." src="/dashboard_mockup.png"/>
</div>
</div>
</div>
</section>

<section className="py-section-gap px-container-padding max-w-4xl mx-auto">
<div className="glass-card rounded-2xl p-12 text-center border-primary-container/30 relative overflow-hidden">
<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-container to-transparent"></div>
<h2 className="font-display-lg text-display-lg text-white mb-6">Ready to Elevate Your Agency?</h2>
<p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-xl mx-auto">Join a network of elite travel professionals utilizing AeroElite to redefine operational efficiency and client satisfaction.</p>
<Link href="/agent/register" className="bg-primary-container text-white px-10 py-4 rounded font-label-md text-label-md crimson-glow crimson-glow-hover transition-all duration-300">Get Started Now</Link>
</div>
</section>
</main> <footer className="bg-surface-container-lowest dark:bg-surface-container-lowest w-full py-section-gap border-t border-outline-variant mt-auto">
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter px-container-padding max-w-max-width mx-auto">
<div className="col-span-1 md:col-span-2 lg:col-span-1">
<div className="font-headline-md text-headline-md text-primary mb-4">AeroElite</div>
<p className="font-body-md text-body-md text-on-surface-variant">© 2024 AeroElite Global. All rights reserved. Precision travel management for the modern agent.</p>
</div>
<div className="flex flex-col gap-3">
<Link href="#" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" >Privacy Policy</Link>
<Link href="#" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" >Terms of Service</Link>
</div>
<div className="flex flex-col gap-3">
<Link href="#" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" >API Documentation</Link>
<Link href="#" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" >Support</Link>
</div>
<div className="flex flex-col gap-3">
<Link href="#" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" >Carrier Partners</Link>
</div>
</div>
</footer>
    </>
  );
}
