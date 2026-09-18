'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { api, User, UserRole } from '../services';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
  isCustomer: boolean;
  isAdmin: boolean;
  isWorker: boolean;
  isOfficeStaff: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'kk_auth_token';
const USER_KEY = 'kk_auth_user';
const ROLE_KEY = 'kk_auth_role';

function setAuthCookies(token: string, role: string) {
  if (typeof document === 'undefined') return;
  const maxAge = 60 * 60 * 24 * 7; // 7 days
  document.cookie = `${TOKEN_KEY}=${encodeURIComponent(token)}; path=/; max-age=${maxAge}; SameSite=Lax`;
  document.cookie = `${ROLE_KEY}=${encodeURIComponent(role)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

function clearAuthCookies() {
  if (typeof document === 'undefined') return;
  document.cookie = `${TOKEN_KEY}=; path=/; max-age=0; SameSite=Lax`;
  document.cookie = `${ROLE_KEY}=; path=/; max-age=0; SameSite=Lax`;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem(TOKEN_KEY);
      const storedUser = localStorage.getItem(USER_KEY);

      if (storedToken && storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(parsedUser);
        setAuthCookies(storedToken, parsedUser.role);

        // Background check to keep profile in sync
        api
          .getMe(storedToken)
          .then((freshUser) => {
            setUser(freshUser);
            localStorage.setItem(USER_KEY, JSON.stringify(freshUser));
            setAuthCookies(storedToken, freshUser.role);
          })
          .catch(() => {
            // Token expired or invalid
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(USER_KEY);
            clearAuthCookies();
            setToken(null);
            setUser(null);
          });
      } else {
        clearAuthCookies();
      }
    } catch {
      // Ignored
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    try {
      localStorage.setItem(TOKEN_KEY, newToken);
      localStorage.setItem(USER_KEY, JSON.stringify(newUser));
      setAuthCookies(newToken, newUser.role);
    } catch {
      // Ignored
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      clearAuthCookies();
    } catch {
      // Ignored
    }
  };

  const refreshUser = async () => {
    if (!token) return;
    try {
      const freshUser = await api.getMe(token);
      setUser(freshUser);
      localStorage.setItem(USER_KEY, JSON.stringify(freshUser));
    } catch {
      logout();
    }
  };

  const isCustomer = user?.role === 'CUSTOMER';
  const isAdmin = user?.role === 'SUPER_ADMIN';
  const isWorker = user?.role === 'WORKER';
  const isOfficeStaff = user?.role === 'OFFICE_STAFF';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        logout,
        refreshUser,
        isCustomer,
        isAdmin,
        isWorker,
        isOfficeStaff,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
