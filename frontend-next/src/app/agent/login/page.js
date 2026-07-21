'use client';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { AgentApi } from '@/utils/api';

function AgentLoginInner() {
  const router = useRouter();
  const sp     = useSearchParams();
  const [tab,  setTab]  = useState(sp.get('tab') === 'register' ? 'register' : 'login');
  const [form, setForm] = useState({ email: '', password: '', agency_name: '', contact_name: '', phone: '', city: '' });
  const [busy, setBusy] = useState(false);
  const [err,  setErr]  = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Sync tab state when search params change
  useEffect(() => {
    const t = sp.get('tab') === 'register' ? 'register' : 'login';
    setTab(t);
    setErr('');
  }, [sp]);

  function update(k, v) { setForm(f => ({ ...f, [k]: v })); }

  async function handleLogin(e) {
    e.preventDefault();
    setErr(''); setBusy(true);
    try {
      const data = await AgentApi.login(form.email, form.password);
      localStorage.setItem('agent_token',   data.access_token);
      localStorage.setItem('agent_profile', JSON.stringify(data.agent));
      localStorage.setItem('agent_wallet',  JSON.stringify(data.wallet));
      router.push('/agent/dashboard');
    } catch (ex) {
      setErr(ex.message || 'Login failed');
    } finally { setBusy(false); }
  }

  async function handleRegister(e) {
    e.preventDefault();
    setErr(''); setBusy(true);
    try {
      // For backend compatibility, map the registration form fields correctly
      await AgentApi.register(form);
      window.showToast?.('Account created! Please log in.', 'success');
      router.push('/agent/login?tab=login');
    } catch (ex) {
      setErr(ex.message || 'Registration failed');
    } finally { setBusy(false); }
  }

  return (
    <>
      {/* Load Material Symbols for Google Stitch designs */}
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      <main className="flex h-screen w-full bg-background text-on-surface font-body-md antialiased overflow-hidden select-none">
        
        {/* Left Side: Atmospheric Imagery */}
        <section className="hidden lg:flex lg:w-1/2 relative bg-surface-container-lowest overflow-hidden h-full">
          {tab === 'login' ? (
            <div 
              className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-700 ease-in-out" 
              style={{ backgroundImage: `url('/cabin_hd.png')` }}
            />
          ) : (
            <div 
              className="absolute inset-0 z-0 bg-cover bg-center opacity-40 mix-blend-luminosity transition-all duration-700 ease-in-out" 
              style={{ backgroundImage: `url('/network_hd.png')` }}
            />
          )}
          {/* Overlay to darken and add brand gradient */}
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-background/90 to-background/20 mix-blend-multiply" />
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-background via-transparent to-transparent" />
          
          <div className="relative z-20 p-16 flex flex-col justify-between h-full w-full">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary-container text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>flight_takeoff</span>
              <span className="font-headline-lg text-headline-lg text-on-surface tracking-tight">SkyWays <span className="text-primary-container">B2B</span></span>
            </div>
            
            <div className="max-w-md">
              {tab === 'login' ? (
                <>
                  <h1 className="font-display-lg text-display-lg text-white mb-4">Precision in every detail.</h1>
                  <p className="font-body-lg text-body-lg text-secondary-fixed-dim">Access the industry's most advanced booking platform, designed for elite travel partners managing complex itineraries.</p>
                </>
              ) : (
                <>
                  <h1 className="font-display-lg text-display-lg text-on-surface mb-6">Elevate Your Agency's Reach.</h1>
                  <p className="font-body-lg text-body-lg text-secondary mb-8">Join the premier network of elite travel professionals. Access exclusive inventory, manage complex itineraries with precision, and experience concierge-level support.</p>
                  <div className="flex items-center gap-4 text-secondary-fixed-dim">
                    <div className="flex -space-x-4">
                      <div className="w-10 h-10 rounded-full border-2 border-background bg-surface-container flex items-center justify-center"><span className="material-symbols-outlined text-sm">person</span></div>
                      <div className="w-10 h-10 rounded-full border-2 border-background bg-surface-container flex items-center justify-center"><span className="material-symbols-outlined text-sm">person</span></div>
                      <div className="w-10 h-10 rounded-full border-2 border-background bg-surface-container flex items-center justify-center"><span className="material-symbols-outlined text-sm">person</span></div>
                    </div>
                    <span className="font-label-md text-label-md">Trusted by 10,000+ top-tier agents</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Right Side: Authentication Forms */}
        <section className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16 relative bg-background h-full overflow-y-auto">
          
          {/* Mobile Brand Header */}
          <div className="absolute top-8 left-6 flex items-center gap-2 lg:hidden">
            <span className="material-symbols-outlined text-primary-container text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>flight_takeoff</span>
            <span className="font-headline-md text-headline-md text-on-surface tracking-tight">SkyWays B2B</span>
          </div>

          <div className="w-full max-w-[460px] z-10 mt-12 lg:mt-0">
            {/* Subtle background glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-container/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Glassmorphism Card */}
            <div className="glass-panel rounded-xl p-8 shadow-2xl shadow-black/50 border border-white/10 bg-white/[0.03] backdrop-blur-md">
              <div className="mb-6 text-center">
                <h2 className="font-headline-lg text-headline-lg text-white mb-2">
                  {tab === 'login' ? 'Agent Portal' : 'Register Agency'}
                </h2>
                <p className="font-body-md text-body-md text-secondary-fixed-dim">
                  {tab === 'login' ? 'Secure access to SkyWays B2B' : 'Enter your details to request portal access.'}
                </p>
              </div>

              {err && (
                <div className="p-3 mb-4 rounded-lg bg-error-container/20 border border-error-container text-error text-sm text-center" role="alert">
                  {err}
                </div>
              )}

              {/* LOGIN FORM */}
              {tab === 'login' ? (
                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <label className="block font-label-md text-label-md text-secondary mb-2" htmlFor="username">Email</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-secondary">
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0" }}>mail</span>
                      </div>
                      <input 
                        className="input-dark w-full pl-10 pr-4 py-3 rounded-lg text-white font-mono-data text-mono-data bg-[#050505] border border-white/10 focus:border-red-600 focus:shadow-[0_0_10px_rgba(220,38,38,0.2)] focus:outline-none transition-all placeholder-secondary-container" 
                        id="username" 
                        required 
                        type="email"
                        placeholder="agent@agency.com"
                        value={form.email}
                        onChange={e => update('email', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block font-label-md text-label-md text-secondary" htmlFor="password">Password</label>
                      <Link href="#" className="font-label-md text-label-md text-primary hover:text-white transition-colors" >Forgot Password?</Link>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-secondary">
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0" }}>lock</span>
                      </div>
                      <input 
                        className="input-dark w-full pl-10 pr-10 py-3 rounded-lg text-white font-mono-data text-mono-data bg-[#050505] border border-white/10 focus:border-red-600 focus:shadow-[0_0_10px_rgba(220,38,38,0.2)] focus:outline-none transition-all placeholder-secondary-container" 
                        id="password" 
                        required 
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={form.password}
                        onChange={e => update('password', e.target.value)}
                      />
                      <button 
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-secondary hover:text-white transition-colors" 
                        onClick={() => setShowPassword(!showPassword)} 
                        type="button"
                      >
                        <span className="material-symbols-outlined text-sm" id="visibility-icon" style={{ fontVariationSettings: "'FILL' 0" }}>
                          {showPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button  
                      type="submit"
                      disabled={busy}
                      className="w-full btn-primary text-white bg-red-600 hover:bg-red-500 hover:shadow-[0_0_15px_rgba(220,38,38,0.5)] font-label-md text-label-md py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all" 
                    >
                      <span>{busy ? 'Signing In...' : 'Sign In'}</span>
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0" }}>login</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* REGISTRATION FORM */
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-4">
                    <h3 className="font-label-md text-label-md text-primary-container uppercase tracking-widest border-b border-white/10 pb-1 text-red-500">Business Details</h3>
                    <div>
                      <label className="block font-label-md text-label-md text-secondary mb-1.5" htmlFor="agencyName">Agency Name</label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary-fixed-dim text-[20px]">corporate_fare</span>
                        <input 
                          className="w-full bg-[#050505] border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-on-surface placeholder:text-secondary-fixed-dim/50 focus:border-red-600 focus:shadow-[0_0_10px_rgba(220,38,38,0.2)] focus:outline-none transition-colors font-body-md" 
                          id="agencyName" 
                          placeholder="e.g., Global Escapes Travel" 
                          required 
                          type="text"
                          value={form.agency_name}
                          onChange={e => update('agency_name', e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-label-md text-label-md text-secondary mb-1.5" htmlFor="city">City / Hub</label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary-fixed-dim text-[20px]">location_city</span>
                        <input 
                          className="w-full bg-[#050505] border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-on-surface placeholder:text-secondary-fixed-dim/50 focus:border-red-600 focus:shadow-[0_0_10px_rgba(220,38,38,0.2)] focus:outline-none transition-colors font-mono-data" 
                          id="city" 
                          placeholder="e.g. Karachi or London" 
                          required 
                          type="text"
                          value={form.city}
                          onChange={e => update('city', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-2">
                    <h3 className="font-label-md text-label-md text-primary-container uppercase tracking-widest border-b border-white/10 pb-1 text-red-500">Primary Contact</h3>
                    <div>
                      <label className="block font-label-md text-label-md text-secondary mb-1.5" htmlFor="contactName">Full Name</label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary-fixed-dim text-[20px]">person</span>
                        <input 
                          className="w-full bg-[#050505] border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-on-surface placeholder:text-secondary-fixed-dim/50 focus:border-red-600 focus:shadow-[0_0_10px_rgba(220,38,38,0.2)] focus:outline-none transition-colors font-body-md" 
                          id="contactName" 
                          placeholder="Jane Doe" 
                          required 
                          type="text"
                          value={form.contact_name}
                          onChange={e => update('contact_name', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-label-md text-label-md text-secondary mb-1.5" htmlFor="email">Business Email</label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary-fixed-dim text-[20px]">mail</span>
                          <input 
                            className="w-full bg-[#050505] border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-on-surface placeholder:text-secondary-fixed-dim/50 focus:border-red-600 focus:shadow-[0_0_10px_rgba(220,38,38,0.2)] focus:outline-none transition-colors font-body-md" 
                            id="email" 
                            placeholder="name@agency.com" 
                            required 
                            type="email"
                            value={form.email}
                            onChange={e => update('email', e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block font-label-md text-label-md text-secondary mb-1.5" htmlFor="phone">Phone Number</label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary-fixed-dim text-[20px]">call</span>
                          <input 
                            className="w-full bg-[#050505] border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-on-surface placeholder:text-secondary-fixed-dim/50 focus:border-red-600 focus:shadow-[0_0_10px_rgba(220,38,38,0.2)] focus:outline-none transition-colors font-mono-data" 
                            id="phone" 
                            placeholder="+92 300 1234567" 
                            type="tel"
                            value={form.phone}
                            onChange={e => update('phone', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-2">
                    <h3 className="font-label-md text-label-md text-primary-container uppercase tracking-widest border-b border-white/10 pb-1 text-red-500">Security</h3>
                    <div>
                      <label className="block font-label-md text-label-md text-secondary mb-1.5" htmlFor="reg-password">Password</label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary-fixed-dim text-[20px]">lock</span>
                        <input 
                          className="w-full bg-[#050505] border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-on-surface placeholder:text-secondary-fixed-dim/50 focus:border-red-600 focus:shadow-[0_0_10px_rgba(220,38,38,0.2)] focus:outline-none transition-colors font-body-md" 
                          id="reg-password" 
                          placeholder="••••••••" 
                          required 
                          type="password"
                          value={form.password}
                          onChange={e => update('password', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 space-y-4">
                    <button 
                      type="submit"
                      disabled={busy}
                      className="w-full bg-red-600 text-white font-label-md text-label-md py-3 px-4 rounded-lg flex justify-center items-center gap-2 hover:bg-red-500 hover:shadow-[0_0_20px_rgba(220,38,38,0.3)] transition-all duration-300" 
                    >
                      {busy ? 'Processing...' : 'Register Agency'}
                    </button>
                  </div>
                </form>
              )}

              {/* Tab switching options at bottom */}
              <div className="mt-6 text-center">
                {tab === 'login' ? (
                  <p className="font-body-md text-body-md text-secondary-fixed-dim">
                    New agency partner?{' '}
                    <Link href="/agent/login?tab=register" className="text-primary hover:text-white font-semibold transition-colors">
                      Create an Account
                    </Link>
                  </p>
                ) : (
                  <p className="text-center font-body-md text-sm text-secondary">
                    Already have an account?{' '}
                    <Link href="/agent/login?tab=login" className="text-on-surface hover:text-primary transition-colors font-semibold">
                      Sign In
                    </Link>
                  </p>
                )}
              </div>
            </div>
            
            {/* Back links */}
            <p className="text-center text-xs text-secondary-fixed-dim mt-4">
              <Link href="/" className="hover:text-white transition-colors">← Back to SkyWays</Link>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <Link href="/agent" className="hover:text-white transition-colors">Learn about Agent Portal</Link>
            </p>
          </div>

          {/* version text */}
          <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none">
            <p className="font-mono-data text-[12px] text-secondary-container text-neutral-600">
              SkyWays B2B Platform v2.4.1 © {new Date().getFullYear()}
            </p>
          </div>
        </section>
      </main>
    </>
  );
}


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

export default function AgentLoginPage() {
  return (
    <Suspense fallback={<div className="agent-auth-loading"><div className="spinner" /></div>}>
      <AgentLoginInner />
    </Suspense>
  );
}
