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

export default function RegisterAgencyPage() {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-surface-container-lowest">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center opacity-40 mix-blend-luminosity"
          style={{ backgroundImage: "url('/network_hd.png')" }}
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-background/20 via-background/60 to-background" />
        <div className="relative z-20 p-16 flex flex-col justify-between h-full w-full">
          <Link href="/" className="flex items-center gap-3 no-underline">
            <LogoIcon className="w-8 h-8" />
            <span className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-black">
              Sky<span className="text-red-600">Ways</span>
            </span>
          </Link>
          <div className="max-w-md">
            <h1 className="font-display-lg text-display-lg text-on-surface mb-6">
              Elevate Your Agency's Reach.
            </h1>
            <p className="font-body-lg text-body-lg text-secondary mb-8">
              Join the premier network of elite travel professionals. Access exclusive inventory, manage complex itineraries with precision, and experience concierge-level support.
            </p>
            <div className="flex items-center gap-4 text-secondary-fixed-dim">
              <div className="flex -space-x-4">
                <div className="w-10 h-10 rounded-full border-2 border-background bg-surface-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-sm">person</span>
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-background bg-surface-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-sm">person</span>
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-background bg-surface-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-sm">person</span>
                </div>
              </div>
              <span className="font-label-md text-label-md">Trusted by 10,000+ top-tier agents</span>
            </div>
          </div>
        </div>
      </div>

      {/* */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16 relative overflow-y-auto bg-background">
        {/* Mobile logo */}
        <div className="absolute top-8 left-6 flex items-center gap-2 lg:hidden">
          <LogoIcon className="w-6 h-6" />
          <span className="font-headline-md text-headline-md text-on-surface tracking-tight font-black">
            Sky<span className="text-red-600">Ways</span>
          </span>
        </div>

        <div className="w-full max-w-[480px] glass-panel rounded-xl p-8 sm:p-10 mt-12 lg:mt-0 shadow-2xl shadow-black/50">
          <div className="mb-8">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Register Agency</h2>
            <p className="font-body-md text-body-md text-secondary">Enter your details to request portal access.</p>
          </div>

          <form className="space-y-6">
            {/* Business Details */}
            <div className="space-y-4">
              <h3 className="font-label-md text-label-md text-primary-container uppercase tracking-widest border-b border-white/10 pb-2">
                Business Details
              </h3>
              <div>
                <label className="block font-label-md text-label-md text-secondary mb-1.5" htmlFor="agencyName">Agency Name</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary-fixed-dim text-[20px]">corporate_fare</span>
                  <input className="w-full bg-[#050505] border border-outline-variant rounded-lg py-2.5 pl-10 pr-4 text-on-surface placeholder:text-secondary-fixed-dim/50 focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-colors font-body-md" id="agencyName" placeholder="e.g., Global Escapes Travel" required type="text" />
                </div>
              </div>
              <div>
                <label className="block font-label-md text-label-md text-secondary mb-1.5" htmlFor="licenseNumber">Business License Number</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary-fixed-dim text-[20px]">badge</span>
                  <input className="w-full bg-[#050505] border border-outline-variant rounded-lg py-2.5 pl-10 pr-4 text-on-surface placeholder:text-secondary-fixed-dim/50 focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-colors font-mono-data" id="licenseNumber" placeholder="IATA / CLIA / ARC Number" required type="text" />
                </div>
              </div>
            </div>

            {/* Primary Contact */}
            <div className="space-y-4 pt-4">
              <h3 className="font-label-md text-label-md text-primary-container uppercase tracking-widest border-b border-white/10 pb-2">
                Primary Contact
              </h3>
              <div>
                <label className="block font-label-md text-label-md text-secondary mb-1.5" htmlFor="contactName">Full Name</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary-fixed-dim text-[20px]">person</span>
                  <input className="w-full bg-[#050505] border border-outline-variant rounded-lg py-2.5 pl-10 pr-4 text-on-surface placeholder:text-secondary-fixed-dim/50 focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-colors font-body-md" id="contactName" placeholder="Jane Doe" required type="text" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-label-md text-label-md text-secondary mb-1.5" htmlFor="email">Business Email</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary-fixed-dim text-[20px]">mail</span>
                    <input className="w-full bg-[#050505] border border-outline-variant rounded-lg py-2.5 pl-10 pr-4 text-on-surface placeholder:text-secondary-fixed-dim/50 focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-colors font-body-md" id="email" placeholder="name@agency.com" required type="email" />
                  </div>
                </div>
                <div>
                  <label className="block font-label-md text-label-md text-secondary mb-1.5" htmlFor="phone">Phone Number</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary-fixed-dim text-[20px]">call</span>
                    <input className="w-full bg-[#050505] border border-outline-variant rounded-lg py-2.5 pl-10 pr-4 text-on-surface placeholder:text-secondary-fixed-dim/50 focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-colors font-mono-data" id="phone" placeholder="+1 (555) 000-0000" required type="tel" />
                  </div>
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="space-y-4 pt-4">
              <h3 className="font-label-md text-label-md text-primary-container uppercase tracking-widest border-b border-white/10 pb-2">Security</h3>
              <div>
                <label className="block font-label-md text-label-md text-secondary mb-1.5" htmlFor="password">Password</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary-fixed-dim text-[20px]">lock</span>
                  <input className="w-full bg-[#050505] border border-outline-variant rounded-lg py-2.5 pl-10 pr-4 text-on-surface placeholder:text-secondary-fixed-dim/50 focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-colors font-body-md" id="password" placeholder="••••••••" required type="password" />
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3 pt-2">
              <div className="flex items-center h-5">
                <input className="w-4 h-4 rounded bg-[#050505] border-outline-variant text-primary-container focus:ring-primary-container focus:ring-offset-background" id="terms" required type="checkbox" />
              </div>
              <label className="font-body-md text-[14px] text-secondary leading-tight" htmlFor="terms">
                I agree to the <Link href="#" className="text-primary hover:text-primary-fixed transition-colors">Terms of Service</Link> and <Link href="#" className="text-primary hover:text-primary-fixed transition-colors">Privacy Policy</Link>.
              </label>
            </div>

            {/* Submit */}
            <div className="pt-6 border-t border-white/10 space-y-4">
              <Link 
                href="/agent/login" 
                className="w-full bg-primary-container text-on-primary-container font-label-md text-label-md py-3 px-4 rounded-lg flex justify-center items-center gap-2 hover:bg-inverse-primary hover:shadow-[0_0_20px_rgba(220,38,38,0.3)] transition-all duration-300"
                id="register-btn"
              >
                Register Agency
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>arrow_forward</span>
              </Link>
              <p className="text-center font-body-md text-sm text-secondary">
                Already have an account?{' '}
                <Link href="/agent/login" className="text-on-surface hover:text-primary transition-colors font-semibold">Sign In</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
