'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="flex h-screen w-full overflow-hidden" style={{ background: '#131313', color: '#e5e2e1' }}>
      {/* ── LEFT: Cinematic cabin image ── */}
      <section className="hidden lg:flex lg:w-1/2 relative overflow-hidden" style={{ background: '#0e0e0e' }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/cabin_hd.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        <div className="relative z-10 flex flex-col justify-end p-12 h-full">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Precision in every detail.
            </h1>
            <p className="text-lg text-white/60" style={{ fontFamily: 'Inter, sans-serif' }}>
              Access the industry's most advanced booking platform, designed for elite travel partners managing complex itineraries.
            </p>
          </div>
        </div>
      </section>

      {/* ── RIGHT: Login form ── */}
      <section className="w-full lg:w-1/2 flex items-center justify-center p-6 relative" style={{ background: '#131313' }}>
        {/* Glow */}
        <div className="absolute w-96 h-96 rounded-full pointer-events-none" style={{ top: '25%', left: '50%', transform: 'translate(-50%,-50%)', background: 'rgba(220,38,38,0.08)', filter: 'blur(80px)' }} />

        <div className="w-full max-w-md z-10">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Link href="/" className="flex items-center gap-3 no-underline">
              <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none" style={{ color: '#dc2626', transform: 'rotate(-45deg)' }}>
                <path d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2C10.67 2 10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z" fill="currentColor" />
              </svg>
              <span className="text-2xl font-black text-white tracking-wide" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Sky<span style={{ color: '#dc2626' }}>Ways</span>
              </span>
            </Link>
          </div>

          {/* Card */}
          <div className="rounded-xl p-8 shadow-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)' }}>
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-semibold text-white mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>Agent Portal</h2>
              <p className="text-sm" style={{ color: '#c8c6c5' }}>Secure access to SkyWays B2B</p>
            </div>

            <form className="space-y-5">
              {/* Agency ID */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#c8c6c5', fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }} htmlFor="agency-id">Agency ID</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: '#c8c6c5' }}>badge</span>
                  <input
                    id="agency-id"
                    type="text"
                    placeholder="AE-12345"
                    className="w-full pl-10 pr-4 py-3 rounded-lg text-white text-sm transition-all"
                    style={{ background: '#050505', border: '1px solid rgba(255,255,255,0.1)', outline: 'none', fontFamily: 'Inter, sans-serif' }}
                    onFocus={e => { e.target.style.borderColor = '#dc2626'; e.target.style.boxShadow = '0 0 10px rgba(220,38,38,0.2)'; }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#c8c6c5', fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }} htmlFor="username">Email or Username</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: '#c8c6c5' }}>mail</span>
                  <input
                    id="username"
                    type="email"
                    placeholder="agent@agency.com"
                    className="w-full pl-10 pr-4 py-3 rounded-lg text-white text-sm transition-all"
                    style={{ background: '#050505', border: '1px solid rgba(255,255,255,0.1)', outline: 'none', fontFamily: 'Inter, sans-serif' }}
                    onFocus={e => { e.target.style.borderColor = '#dc2626'; e.target.style.boxShadow = '0 0 10px rgba(220,38,38,0.2)'; }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold" style={{ color: '#c8c6c5', fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }} htmlFor="password">Password</label>
                  <button type="button" className="text-sm transition-colors" style={{ color: '#ffb4ab', fontFamily: 'Inter, sans-serif' }}>Forgot Password?</button>
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: '#c8c6c5' }}>lock</span>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-3 rounded-lg text-white text-sm transition-all"
                    style={{ background: '#050505', border: '1px solid rgba(255,255,255,0.1)', outline: 'none', fontFamily: 'Inter, sans-serif' }}
                    onFocus={e => { e.target.style.borderColor = '#dc2626'; e.target.style.boxShadow = '0 0 10px rgba(220,38,38,0.2)'; }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                    style={{ color: '#c8c6c5' }}
                  >
                    <span className="material-symbols-outlined text-sm">{showPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
              </div>

              {/* Sign In */}
              <div className="pt-2">
                <Link
                  href="/agent/login"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-white font-semibold text-sm transition-all no-underline"
                  style={{ background: '#dc2626', fontFamily: 'Inter, sans-serif' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#ef4444'; e.currentTarget.style.boxShadow = '0 0 15px rgba(220,38,38,0.5)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#dc2626'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  Sign In
                  <span className="material-symbols-outlined text-sm">login</span>
                </Link>
              </div>
            </form>

            {/* Register CTA */}
            <div className="mt-8 text-center">
              <p className="text-sm" style={{ color: '#c8c6c5', fontFamily: 'Inter, sans-serif' }}>
                New agency partner?{' '}
                <Link href="/agent/login?tab=register" className="font-semibold transition-colors no-underline" style={{ color: '#ffb4ab' }}>
                  Create an Account
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-0 right-0 text-center">
          <p className="text-xs" style={{ color: '#474746', fontFamily: 'Inter, sans-serif' }}>SkyWays B2B Platform © {new Date().getFullYear()}</p>
        </div>
      </section>
    </main>
  );
}
