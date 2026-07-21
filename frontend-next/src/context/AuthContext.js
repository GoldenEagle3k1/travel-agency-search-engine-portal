'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { Auth, Api } from '@/utils/api';
import { useRouter, usePathname } from 'next/navigation';

const AuthContext = createContext(null);

const PUBLIC_ROUTES = ['/', '/login', '/agent', '/agent/login', '/agent/register'];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [passenger, setPassenger] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const u = Auth.getUser();
    const p = Auth.getPassenger();
    setUser(u);
    setPassenger(p);
    setLoading(false);
    
    const isAgentLoggedIn = typeof window !== 'undefined' && !!localStorage.getItem('agent_token');
    console.log("AUTH GUARD CHECK:", {
      pathname,
      isLoggedIn: Auth.isLoggedIn(),
      isAgentLoggedIn,
      publicRoute: PUBLIC_ROUTES.includes(pathname),
      startsWithSearch: pathname.startsWith('/search')
    });
    if (!Auth.isLoggedIn() && !isAgentLoggedIn && !PUBLIC_ROUTES.includes(pathname) && !pathname.startsWith('/search')) {
      console.log("AUTH GUARD REDIRECTING TO /login");
      router.push('/login');
    }
  }, [pathname]);

  const login = async (email, password) => {
    const data = await Api.post('/auth/login', { email, password });
    Auth.setToken(data.access_token);
    Auth.setUser(data.user);
    Auth.setPassenger(data.passenger);
    setUser(data.user);
    setPassenger(data.passenger);
    return data;
  };

  const logout = () => {
    Auth.removeToken();
    setUser(null);
    setPassenger(null);
    router.push('/login');
  };

  const updatePassenger = (newPassenger) => {
    Auth.setPassenger(newPassenger);
    setPassenger(newPassenger);
  };

  return (
    <AuthContext.Provider value={{ user, passenger, loading, login, logout, updatePassenger, isLoggedIn: !!user, isAdmin: user?.is_admin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
