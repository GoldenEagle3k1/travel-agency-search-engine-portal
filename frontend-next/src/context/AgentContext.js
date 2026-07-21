'use client';
import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

const AgentContext = createContext(null);

const STORAGE_KEY = 'agent_token';
const AGENT_KEY   = 'agent_profile';
const WALLET_KEY  = 'agent_wallet';

export function AgentProvider({ children }) {
  const [isAgentLoggedIn, setIsAgentLoggedIn] = useState(false);
  const [agentProfile,    setAgentProfile]    = useState(null);
  const [wallet,          setWallet]          = useState(null);
  const [unreadCount,     setUnreadCount]     = useState(0);
  const pollRef = useRef(null);

  // ── Bootstrap from localStorage ──────────────────────────────────────────
  useEffect(() => {
    const token   = localStorage.getItem(STORAGE_KEY);
    const profile = localStorage.getItem(AGENT_KEY);
    const wal     = localStorage.getItem(WALLET_KEY);
    if (token && profile) {
      setIsAgentLoggedIn(true);
      setAgentProfile(JSON.parse(profile));
      if (wal) setWallet(JSON.parse(wal));
    }
  }, []);

  // ── Poll unread notifications every 30s when logged in ───────────────────
  const fetchUnreadCount = useCallback(async () => {
    const token = localStorage.getItem(STORAGE_KEY);
    if (!token) return;
    try {
      const res = await fetch('/api/agents/notifications/unread-count', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUnreadCount(data.unread_count || 0);
      }
    } catch (_) {}
  }, []);

  useEffect(() => {
    if (isAgentLoggedIn) {
      fetchUnreadCount();
      pollRef.current = setInterval(fetchUnreadCount, 30_000);
    }
    return () => clearInterval(pollRef.current);
  }, [isAgentLoggedIn, fetchUnreadCount]);

  // ── Login ─────────────────────────────────────────────────────────────────
  async function agentLogin(email, password) {
    const res = await fetch('/api/agents/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');

    localStorage.setItem(STORAGE_KEY, data.access_token);
    localStorage.setItem(AGENT_KEY,   JSON.stringify(data.agent));
    localStorage.setItem(WALLET_KEY,  JSON.stringify(data.wallet));

    setIsAgentLoggedIn(true);
    setAgentProfile(data.agent);
    setWallet(data.wallet);
    setUnreadCount(data.unread_count || 0);
    return data;
  }

  // ── Logout ────────────────────────────────────────────────────────────────
  function agentLogout() {
    clearInterval(pollRef.current);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(AGENT_KEY);
    localStorage.removeItem(WALLET_KEY);
    setIsAgentLoggedIn(false);
    setAgentProfile(null);
    setWallet(null);
    setUnreadCount(0);
  }

  // ── Refresh wallet balance ────────────────────────────────────────────────
  async function refreshBalance() {
    const token = localStorage.getItem(STORAGE_KEY);
    if (!token) return;
    try {
      const res = await fetch('/api/agents/wallet', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setWallet(data.wallet);
        localStorage.setItem(WALLET_KEY, JSON.stringify(data.wallet));
        return data.wallet;
      }
    } catch (_) {}
  }

  return (
    <AgentContext.Provider value={{
      isAgentLoggedIn,
      agentProfile,
      wallet,
      unreadCount,
      setUnreadCount,
      agentLogin,
      agentLogout,
      refreshBalance,
      fetchUnreadCount,
    }}>
      {children}
    </AgentContext.Provider>
  );
}

export function useAgent() {
  const ctx = useContext(AgentContext);
  if (!ctx) throw new Error('useAgent must be used within AgentProvider');
  return ctx;
}

export function getAgentToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(STORAGE_KEY);
}
