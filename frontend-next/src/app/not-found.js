'use client';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0A0A0A] text-[#F5F5F5] font-body relative overflow-hidden px-6 select-none">
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-red-800/5 rounded-full blur-[100px]" />
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative z-10 max-w-lg w-full text-center space-y-8 flex flex-col items-center">
        {/* Animated Flight Illustration or lost radar */}
        <div className="relative w-48 h-48 flex items-center justify-center">
          {/* Radar ripple rings */}
          <div className="absolute w-full h-full border border-red-600/20 rounded-full animate-[ping_4s_linear_infinite]" />
          <div className="absolute w-3/4 h-3/4 border border-red-600/30 rounded-full animate-[ping_3s_linear_infinite_0.5s]" />
          <div className="absolute w-1/2 h-1/2 border border-red-600/40 rounded-full animate-[ping_2s_linear_infinite_1s]" />
          
          {/* Glowing central node */}
          <div className="w-16 h-16 rounded-full bg-red-600/10 border border-red-600/40 flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.3)]">
            <span className="material-symbols-outlined text-red-500 text-3xl animate-[spin_8s_linear_infinite]">
              radar
            </span>
          </div>
        </div>

        {/* Text Area */}
        <div className="space-y-3">
          <div className="text-red-500 font-mono text-sm uppercase tracking-[0.2em] font-bold">Error 404 — Flight Plan Lost</div>
          <h1 className="text-4xl sm:text-5xl font-black font-heading tracking-tight text-white">
            Route <span className="gradient-text font-black">Not Found</span>
          </h1>
          <p className="text-base text-neutral-400 max-w-sm mx-auto leading-relaxed">
            The page or terminal coordinates you requested do not exist or have been relocated.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full pt-4">
          <Link
            href="/"
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg text-white font-semibold text-sm bg-red-600 hover:bg-red-500 hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">terminal</span>
            Return to Terminal
          </Link>
          <Link
            href="/search"
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg text-neutral-300 font-semibold text-sm bg-white/5 border border-white/10 hover:border-red-500/50 hover:bg-red-600/10 transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">travel</span>
            Search Flights
          </Link>
        </div>
      </div>
    </main>
  );
}
