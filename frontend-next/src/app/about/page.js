'use client';
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

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5] font-body relative overflow-hidden pt-24 pb-16">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] right-[10%] w-[50%] h-[50%] rounded-full bg-red-600/5 blur-[120px]"></div>
        <div className="absolute bottom-[10%] left-[5%] w-[40%] h-[40%] rounded-full bg-red-800/5 blur-[100px]"></div>
      </div>

      <main className="relative z-10 max-w-4xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 font-heading text-2xl font-black text-white tracking-wide mb-2">
            <LogoIcon />
            <span>Sky<span className="text-red-600">Ways</span></span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black font-heading tracking-tight text-white">
            Redefining <span className="gradient-text font-black">Travel Logistics</span>
          </h1>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            SkyWays is a premium B2B and customer flight booking aggregator platform designed to simplify global travel planning.
          </p>
        </div>

        <section className="glass-panel rounded-xl p-8 border border-white/10 bg-white/[0.02] backdrop-blur-md space-y-6 shadow-xl">
          <h2 className="text-2xl font-bold font-heading text-white">Our Vision</h2>
          <p className="text-neutral-300 leading-relaxed">
            Travel management has long been burdened by outdated legacy systems, convoluted billing processes, and high entry barriers for independent agencies. SkyWays bypasses traditional bottlenecks by connecting agencies and clients directly with global airline carriers via modern API connections, offering a seamless digital wallet system and instant seat confirmation.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel rounded-xl p-6 border border-white/10 bg-white/[0.02] backdrop-blur-md space-y-3">
            <div className="w-10 h-10 rounded-lg bg-red-600/10 flex items-center justify-center text-red-500">
              <span className="material-symbols-outlined">bolt</span>
            </div>
            <h3 className="text-lg font-bold font-heading text-white">Real-Time Search</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Query flight itineraries, cabin classes, stopovers, and live availability across major carriers within milliseconds.
            </p>
          </div>

          <div className="glass-panel rounded-xl p-6 border border-white/10 bg-white/[0.02] backdrop-blur-md space-y-3">
            <div className="w-10 h-10 rounded-lg bg-red-600/10 flex items-center justify-center text-red-500">
              <span className="material-symbols-outlined">account_balance_wallet</span>
            </div>
            <h3 className="text-lg font-bold font-heading text-white">Instant Wallet Settlement</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              B2B partners can manage local funds in multiple currencies, top up instantly, and issue ticketing hold requests without traditional credit card locks.
            </p>
          </div>
        </section>

        <div className="text-center pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg text-white font-semibold text-sm bg-red-600 hover:bg-red-500 hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all"
          >
            Go Back Home
          </Link>
        </div>
      </main>
    </div>
  );
}
