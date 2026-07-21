'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5] font-body relative overflow-hidden pt-24 pb-16">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[30%] left-[10%] w-[50%] h-[50%] rounded-full bg-red-600/5 blur-[120px]"></div>
        <div className="absolute bottom-[20%] right-[5%] w-[40%] h-[40%] rounded-full bg-red-800/5 blur-[100px]"></div>
      </div>

      <main className="relative z-10 max-w-4xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-black font-heading tracking-tight text-white animate-fade-in-up">
            Get in <span className="gradient-text font-black">Touch</span>
          </h1>
          <p className="text-base text-neutral-400 max-w-md mx-auto">
            Have questions about our ticketing API, top-ups, or custom enterprise solutions? Contact our operations desk.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Info Columns */}
          <div className="md:col-span-5 space-y-6">
            <div className="glass-panel rounded-xl p-6 border border-white/10 bg-white/[0.02] backdrop-blur-md space-y-4">
              <h3 className="text-lg font-bold font-heading text-white">Contact Info</h3>
              
              <div className="space-y-4 text-sm text-neutral-300">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-red-500">mail</span>
                  <span>operations@skyways.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-red-500">call</span>
                  <span>+92 (300) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-red-500">location_on</span>
                  <span>Karachi Hub, Pakistan</span>
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-xl p-6 border border-white/10 bg-white/[0.02] backdrop-blur-md space-y-3">
              <h3 className="text-sm font-bold font-heading text-white">Office Hours</h3>
              <p className="text-xs text-neutral-400">
                Our core operations and booking desk are available 24/7/365 for urgent ticketing holds and wallet clearing.
              </p>
            </div>
          </div>

          {/* Form Column */}
          <div className="md:col-span-7">
            <div className="glass-panel rounded-xl p-8 border border-white/10 bg-white/[0.02] backdrop-blur-md shadow-xl relative">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="text-5xl">✉️</div>
                  <h3 className="text-2xl font-bold font-heading text-white">Message Sent!</h3>
                  <p className="text-sm text-neutral-400">
                    Thank you for reaching out. A booking coordinator will email you shortly.
                  </p>
                  <button 
                    onClick={() => { setForm({ name: '', email: '', message: '' }); setSubmitted(false); }}
                    className="mt-4 px-6 py-2.5 bg-white/5 border border-white/10 rounded-lg hover:border-red-500/50 hover:bg-red-600/10 text-white font-semibold text-sm transition-all"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2" htmlFor="name">Full Name</label>
                    <input 
                      id="name" 
                      type="text" 
                      required 
                      placeholder="Jane Doe" 
                      className="w-full bg-[#050505] border border-white/10 rounded-lg py-3 px-4 text-white placeholder:text-neutral-600 focus:border-red-600 focus:outline-none transition-colors"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2" htmlFor="email">Email Address</label>
                    <input 
                      id="email" 
                      type="email" 
                      required 
                      placeholder="jane@agency.com" 
                      className="w-full bg-[#050505] border border-white/10 rounded-lg py-3 px-4 text-white placeholder:text-neutral-600 focus:border-red-600 focus:outline-none transition-colors"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2" htmlFor="message">Message</label>
                    <textarea 
                      id="message" 
                      rows="4" 
                      required 
                      placeholder="Explain your inquiry here..." 
                      className="w-full bg-[#050505] border border-white/10 rounded-lg py-3 px-4 text-white placeholder:text-neutral-600 focus:border-red-600 focus:outline-none transition-colors resize-none"
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-3.5 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all flex justify-center items-center gap-2"
                  >
                    <span>Send Message</span>
                    <span className="material-symbols-outlined text-sm">send</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="text-center pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
