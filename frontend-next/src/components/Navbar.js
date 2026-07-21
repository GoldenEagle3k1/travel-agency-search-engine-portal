'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getCurrency, setCurrency } from '@/utils/api';

const LogoIcon = () => (
  <svg 
    className="w-8 h-8 text-brand-red transform -rotate-45 hover:rotate-0 transition-transform duration-500" 
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

export default function Navbar() {
  const router = useRouter();
  const { isLoggedIn, passenger, isAdmin, logout } = useAuth();
  const pathname = usePathname();

  // Suppress navbar on auth, confirmation, booking and transactional screens
  const transactionalPaths = [
    '/login',
    '/agent/login',
    '/agent/register',
    '/register',
    '/confirmation',
    '/booking',
    '/manage-bookings'
  ];
  const isTransactionalPage = transactionalPaths.includes(pathname);
  if (isTransactionalPage) return null;

  const [menuOpen, setMenuOpen] = useState(false);
  const [currency, setCurrencyState] = useState('PKR');

  // Agent states
  const [isAgent, setIsAgent] = useState(false);
  const [agentName, setAgentName] = useState('');
  const [notifCount, setNotifCount] = useState(0);

  useEffect(() => {
    setCurrencyState(getCurrency());

    // Check agent state from localStorage
    const agentToken = localStorage.getItem('agent_token');
    const agentProf = localStorage.getItem('agent_profile');
    if (agentToken && agentProf) {
      setIsAgent(true);
      try {
        const prof = JSON.parse(agentProf);
        setAgentName(prof.agency_name || 'Agent');
      } catch (_) {}
      
      // Fetch unread count for badge
      fetch(`/api/agents/notifications/unread-count`, {
        headers: { Authorization: `Bearer ${agentToken}` }
      })
        .then(res => res.json())
        .then(data => setNotifCount(data.unread_count || 0))
        .catch(() => {});
    }
  }, [pathname]);

  function handleCurrencyChange(e) {
    const c = e.target.value;
    setCurrency(c);
    setCurrencyState(c);
    // Refresh page to apply conversion
    window.location.reload();
  }

  function handleAgentLogout() {
    ['agent_token', 'agent_profile', 'agent_wallet'].forEach(k => localStorage.removeItem(k));
    setIsAgent(false);
    setAgentName('');
    router.push('/');
  }

  const navLinks = [
    { href: '/', label: 'Home', id: '/' },
    { href: '/search', label: 'Flights', id: '/search' },
    { href: '/agent', label: 'Agent Portal', id: '/agent' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between bg-brand-black/90 backdrop-blur-md border-b border-brand-gray-dark/50 transition-all duration-300">
      
      {/* Brand logo */}
      <Link href="/" className="flex items-center gap-3 font-heading text-xl font-black text-brand-white tracking-wide hover:opacity-90 transition-opacity">
        <LogoIcon />
        <span>
          Sky<span className="text-brand-red">Ways</span>
        </span>
      </Link>

      {/* Hamburger Menu Toggle (Mobile) */}
      <button 
        onClick={() => setMenuOpen(!menuOpen)} 
        className="nav-mobile-trigger flex flex-col gap-1.5 p-2 text-brand-gray-light hover:text-brand-white focus:outline-none transition-colors md:hidden"
        aria-label="Toggle navigation menu"
      >
        <span className={`w-6 h-0.5 bg-current transform transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`w-6 h-0.5 bg-current transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
        <span className={`w-6 h-0.5 bg-current transform transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      {/* Nav Links (Desktop) */}
      <ul className="nav-desktop items-center gap-1 list-none font-body hidden md:flex">
        {navLinks.map(link => {
          const isActive = pathname === link.id || (pathname.startsWith(link.id + '/') && link.id !== '/');
          return (
            <li key={link.id}>
              <Link 
                href={link.href} 
                className={`px-4 py-2 text-sm font-semibold rounded-md transition-all duration-200 ${
                  isActive 
                    ? 'text-brand-white bg-brand-red/10 shadow-sm shadow-brand-red/10' 
                    : 'text-brand-gray-light hover:text-brand-white hover:bg-brand-card'
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Currency & Auth buttons (Desktop) */}
      <div className="nav-desktop items-center gap-4 font-body hidden md:flex">
        
        {/* Currency Selector */}
        <div className="flex items-center gap-1 bg-brand-charcoal border border-brand-gray-dark/50 rounded px-2.5 py-1 text-xs">
          <span className="text-brand-gray-light font-bold">Currency:</span>
          <select 
            value={currency} 
            onChange={handleCurrencyChange} 
            className="bg-transparent border-none text-brand-white font-bold outline-none cursor-pointer"
            aria-label="Preferred currency selector"
          >
            <option value="PKR">PKR</option>
            <option value="USD">USD</option>
            <option value="AED">AED</option>
            <option value="GBP">GBP</option>
          </select>
        </div>

        {isAgent ? (
          <>
            <Link 
              href="/agent/dashboard" 
              className="px-3 py-1.5 text-sm font-medium text-brand-gray-light hover:text-brand-white flex items-center gap-1.5"
              id="nav-agent-dashboard"
            >
              💼 {agentName}
              {notifCount > 0 && (
                <span className="bg-brand-red text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {notifCount}
                </span>
              )}
            </Link>
            <button 
              onClick={handleAgentLogout} 
              className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-gray-light hover:text-brand-white border border-brand-gray-muted/30 hover:border-brand-red rounded-md transition-all duration-200"
            >
              Logout Agent
            </button>
          </>
        ) : isLoggedIn ? (
          <>
            {isAdmin && (
              <Link 
                href="/admin" 
                className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-white border border-brand-red/40 hover:border-brand-red bg-brand-red-glow rounded-md transition-all duration-300 hover:shadow-md hover:shadow-brand-red/20"
              >
                Admin Panel
              </Link>
            )}
            <Link 
              href="/dashboard" 
              className="px-3 py-1.5 text-sm font-medium text-brand-gray-light hover:text-brand-white transition-colors"
            >
              👤 {passenger?.first_name || 'My Account'}
            </Link>
            <button 
              onClick={logout} 
              className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-gray-light hover:text-brand-white border border-brand-gray-muted/30 hover:border-brand-red rounded-md transition-all duration-200"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link 
              href="/login" 
              className="px-4 py-2 text-sm font-semibold text-brand-white border border-brand-gray-muted/30 hover:border-brand-white rounded-md transition-all duration-200"
            >
              Login
            </Link>
            <Link 
              href="/agent/register" 
              className="px-4 py-2 text-sm font-semibold text-brand-white bg-gradient-to-r from-brand-red-dark to-brand-red hover:from-brand-red hover:to-brand-red-light rounded-md shadow-lg shadow-brand-red/20 hover:shadow-xl hover:shadow-brand-red/35 transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Register
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`absolute top-full left-0 right-0 bg-brand-charcoal/95 border-b border-brand-gray-dark/50 backdrop-blur-lg flex flex-col gap-4 p-6 transition-all duration-300 md:hidden z-40 ${
        menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}>
        <ul className="flex flex-col gap-2 list-none">
          {navLinks.map(link => {
            const isActive = pathname === link.id || (pathname.startsWith(link.id + '/') && link.id !== '/');
            return (
              <li key={link.id} onClick={() => setMenuOpen(false)}>
                <Link 
                  href={link.href} 
                  className={`block px-4 py-2.5 rounded-md text-base font-semibold transition-colors ${
                    isActive ? 'text-brand-white bg-brand-red/20' : 'text-brand-gray-light hover:text-brand-white hover:bg-brand-card'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="h-px bg-brand-gray-dark/50 my-1" />

        <div className="flex flex-col gap-4">
          
          {/* Mobile Currency Selector */}
          <div className="flex justify-between items-center bg-brand-black rounded px-4 py-2 text-sm border border-brand-gray-dark/50">
            <span className="text-brand-gray-light font-bold">Preferred Currency</span>
            <select 
              value={currency} 
              onChange={handleCurrencyChange} 
              className="bg-transparent border-none text-brand-white font-bold outline-none cursor-pointer"
              aria-label="Preferred currency selector mobile"
            >
              <option value="PKR">PKR</option>
              <option value="USD">USD</option>
              <option value="AED">AED</option>
              <option value="GBP">GBP</option>
            </select>
          </div>

          {isAgent ? (
            <>
              <Link 
                href="/agent/dashboard" 
                onClick={() => setMenuOpen(false)}
                className="w-full text-center px-4 py-2.5 text-base font-medium text-brand-gray-light hover:text-brand-white"
              >
                💼 {agentName}
              </Link>
              <button 
                onClick={() => { setMenuOpen(false); handleAgentLogout(); }} 
                className="w-full text-center px-4 py-2.5 text-sm font-bold uppercase tracking-wider text-brand-gray-light hover:text-brand-white border border-brand-gray-muted/30 rounded-md transition-colors"
              >
                Logout Agent
              </button>
            </>
          ) : isLoggedIn ? (
            <>
              {isAdmin && (
                <Link 
                  href="/admin" 
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-center px-4 py-2.5 text-sm font-bold uppercase tracking-wider text-brand-white border border-brand-red bg-brand-red-glow rounded-md transition-all"
                >
                  Admin Panel
                </Link>
              )}
              <Link 
                href="/dashboard" 
                onClick={() => setMenuOpen(false)}
                className="w-full text-center px-4 py-2.5 text-base font-medium text-brand-gray-light hover:text-brand-white"
              >
                👤 {passenger?.first_name || 'My Account'}
              </Link>
              <button 
                onClick={() => { setMenuOpen(false); logout(); }} 
                className="w-full text-center px-4 py-2.5 text-sm font-bold uppercase tracking-wider text-brand-gray-light hover:text-brand-white border border-brand-gray-muted/30 rounded-md transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                href="/login" 
                onClick={() => setMenuOpen(false)}
                className="w-full text-center px-4 py-2.5 text-base font-semibold text-brand-white border border-brand-gray-muted/30 rounded-md transition-all"
              >
                Login
              </Link>
              <Link 
                href="/agent/register" 
                onClick={() => setMenuOpen(false)}
                className="w-full text-center px-4 py-2.5 text-base font-semibold text-brand-white bg-brand-red rounded-md shadow-lg shadow-brand-red/20"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>

    </nav>
  );
}
