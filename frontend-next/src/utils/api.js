/* ============================================================
   api.js — Shared API client, Auth management, utilities
   ============================================================ */

export const API_BASE = '/api';

// ── Currency state (PKR default) ──────────────────────────
const SUPPORTED_CURRENCIES = ['PKR', 'USD', 'AED', 'GBP'];
const PKR_RATES = { PKR: 1, USD: 0.0036, AED: 0.013, GBP: 0.0028 };

export function getCurrency() {
  if (typeof window === 'undefined') return 'PKR';
  return localStorage.getItem('preferred_currency') || 'PKR';
}
export function setCurrency(c) {
  if (SUPPORTED_CURRENCIES.includes(c)) localStorage.setItem('preferred_currency', c);
}

// ── Token / Auth Management ───────────────────────────────
export const Auth = {
  getToken()     { if (typeof window === 'undefined') return null; return localStorage.getItem('sb_token'); },
  setToken(t)    { localStorage.setItem('sb_token', t); },
  removeToken()  { localStorage.removeItem('sb_token'); localStorage.removeItem('sb_user'); localStorage.removeItem('sb_passenger'); },
  getUser()      { try { return JSON.parse(localStorage.getItem('sb_user')) || null; } catch { return null; } },
  setUser(u)     { localStorage.setItem('sb_user', JSON.stringify(u)); },
  getPassenger() { try { return JSON.parse(localStorage.getItem('sb_passenger')) || null; } catch { return null; } },
  setPassenger(p){ localStorage.setItem('sb_passenger', JSON.stringify(p)); },
  isLoggedIn()   { return !!this.getToken(); },
  isAdmin()      { const u = this.getUser(); return u && u.is_admin; },
  logout()       { this.removeToken(); window.location.href = '/login'; },
};

// ── API Client ────────────────────────────────────────────
export const Api = {
  async request(method, endpoint, body = null, requireAuth = false) {
    const headers = { 'Content-Type': 'application/json' };
    if (requireAuth) {
      const token = Auth.getToken();
      if (!token) { window.location.href = '/login'; return null; }
      headers['Authorization'] = `Bearer ${token}`;
    }
    const opts = { method, headers };
    if (body) opts.body = JSON.stringify(body);
    try {
      const res = await fetch(`${API_BASE}${endpoint}`, opts);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || data.detail || `HTTP ${res.status}`);
      return data;
    } catch (err) {
      if (err.message && (err.message.includes('401') || err.message.includes('Invalid or expired'))) {
        Auth.logout();
      }
      throw err;
    }
  },
  get(ep, auth = false)        { return this.request('GET', ep, null, auth); },
  post(ep, body, auth = false) { return this.request('POST', ep, body, auth); },
  put(ep, body, auth = false)  { return this.request('PUT', ep, body, auth); },
  del(ep, auth = false)        { return this.request('DELETE', ep, null, auth); },
};

// ── Duffel API Client ─────────────────────────────────────
export const DuffelApi = {
  async search(params) {
    const qs = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => { if (v) qs.set(k, String(v)); });
    const res = await fetch(`${API_BASE}/duffel/search?${qs.toString()}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Search failed');
    return data;
  },
  async getOffer(offerId) {
    const res = await fetch(`${API_BASE}/duffel/offer/${offerId}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Offer fetch failed');
    return data.offer;
  },
  async places(query) {
    if (!query || query.length < 2) return [];
    const res = await fetch(`${API_BASE}/duffel/places?query=${encodeURIComponent(query)}`);
    const data = await res.json();
    if (!res.ok) return [];
    return data.places || [];
  },
};

// ── Agent API Client ──────────────────────────────────────
export const AgentApi = {
  _token() { if (typeof window === 'undefined') return null; return localStorage.getItem('agent_token'); },
  _headers() {
    const t = this._token();
    return { 'Content-Type': 'application/json', ...(t ? { Authorization: `Bearer ${t}` } : {}) };
  },
  async _req(method, endpoint, body = null) {
    const opts = { method, headers: this._headers() };
    if (body) opts.body = JSON.stringify(body);
    const res = await fetch(`${API_BASE}/agents${endpoint}`, opts);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
    return data;
  },
  register(d)               { return this._req('POST', '/register', d); },
  login(email, password)    { return this._req('POST', '/login', { email, password }); },
  profile()                 { return this._req('GET', '/profile'); },
  wallet()                  { return this._req('GET', '/wallet'); },
  submitRequest(d)          { return this._req('POST', '/ticket-requests', d); },
  listRequests()            { return this._req('GET', '/ticket-requests'); },
  getRequest(id)            { return this._req('GET', `/ticket-requests/${id}`); },
  notifications()           { return this._req('GET', '/notifications'); },
  unreadCount()             { return this._req('GET', '/notifications/unread-count'); },
  markRead(id)              { return this._req('PUT', `/notifications/${id}/read`); },
  markAllRead()             { return this._req('PUT', '/notifications/read-all'); },
  adminListRequests(status) { return this._req('GET', `/admin/requests?status=${status || 'Pending'}`); },
  adminApprove(id)          { return this._req('POST', `/admin/requests/${id}/approve`); },
  adminReject(id, reason)   { return this._req('POST', `/admin/requests/${id}/reject`, { reason }); },
  adminListAgents()         { return this._req('GET', '/admin/agents'); },
  adminTopup(agId, amount, note) { return this._req('POST', `/admin/agents/${agId}/topup`, { amount, note }); },
};

// ── Session Storage ───────────────────────────────────────
export const SearchStore = {
  set(data)  { if (typeof window !== 'undefined') sessionStorage.setItem('search_params', JSON.stringify(data)); },
  get()      { try { return JSON.parse(sessionStorage.getItem('search_params')) || {}; } catch { return {}; } },
  clear()    { sessionStorage.removeItem('search_params'); },
};

export const BookingStore = {
  set(data)  { if (typeof window !== 'undefined') sessionStorage.setItem('booking_data', JSON.stringify(data)); },
  get()      { try { return JSON.parse(sessionStorage.getItem('booking_data')) || {}; } catch { return {}; } },
  clear()    { sessionStorage.removeItem('booking_data'); },
};

// ── Formatting utilities ──────────────────────────────────
export function formatDate(dt) {
  if (!dt) return '—';
  return new Date(dt).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
}

export function formatTime(dt) {
  if (!dt) return '—';
  return new Date(dt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
}

export function formatDateTime(dt) {
  if (!dt) return '—';
  return new Date(dt).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export function formatDuration(iso) {
  if (!iso) return '—';
  const isoMatch = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
  if (isoMatch) {
    const h = parseInt(isoMatch[1] || '0');
    const m = parseInt(isoMatch[2] || '0');
    return `${h}h ${m > 0 ? m + 'm' : ''}`.trim();
  }
  const hmMatch = iso.match(/(\d+):(\d+)/);
  if (hmMatch) return `${hmMatch[1]}h ${hmMatch[2]}m`;
  return iso;
}

export function formatPrice(amount, sourceCurrency = 'USD') {
  if (amount == null) return '—';
  const preferred = getCurrency();
  // Convert to USD first, then to preferred
  const usdRates = { PKR: 278, USD: 1, AED: 3.67, GBP: 0.79 };
  const inUSD = amount / (usdRates[sourceCurrency] || 1);
  const converted = inUSD * (usdRates[preferred] || 1);
  const localeMap = { PKR: ['en-PK', 'PKR'], USD: ['en-US', 'USD'], AED: ['ar-AE', 'AED'], GBP: ['en-GB', 'GBP'] };
  const [locale, currency] = localeMap[preferred] || ['en-US', 'USD'];
  return new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: 0 }).format(converted);
}

export function formatPKR(amount) {
  if (amount == null) return '—';
  return new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR', maximumFractionDigits: 0 }).format(amount);
}

export function formatStops(stopsCount, segments = []) {
  if (stopsCount === 0) return 'Non-stop';
  if (stopsCount === 1) {
    const layover = segments[0]?.dest_iata;
    return `1 stop${layover ? ` (${layover})` : ''}`;
  }
  return `${stopsCount} stops`;
}

export function formatBaggage(baggageArr = []) {
  if (!baggageArr || baggageArr.length === 0) return 'No checked bag';
  const checked = baggageArr.filter(b => b.type === 'checked');
  const carry   = baggageArr.filter(b => b.type === 'carry_on');
  const parts = [];
  if (checked.length > 0) parts.push(`${checked.reduce((s, b) => s + (b.quantity || 1), 0)} checked bag`);
  if (carry.length > 0)   parts.push('cabin bag');
  return parts.join(' + ') || 'No baggage included';
}

export function getStatusBadge(status) {
  const map = {
    'Confirmed': 'badge-green', 'Cancelled': 'badge-red', 'Pending': 'badge-orange',
    'Approved': 'badge-green', 'Rejected': 'badge-red', 'Issued': 'badge-green',
    'Scheduled': 'badge-white', 'Delayed': 'badge-orange', 'Completed': 'badge-gray',
    'Success': 'badge-green', 'Refunded': 'badge-orange', 'Failed': 'badge-red',
  };
  return `<span class="badge ${map[status] || 'badge-gray'}">${status}</span>`;
}

export function getAirlineIcon(code) {
  const icons = { PK: '🇵🇰', EK: '🇦🇪', BA: '🇬🇧', SV: '🇸🇦', QR: '🇶🇦', TK: '🇹🇷', LH: '🇩🇪', AF: '🇫🇷' };
  return icons[code] || '✈️';
}
