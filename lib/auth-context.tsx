'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  username?: string | null;
  avatarUrl?: string | null;
  subscriptionTier?: string;
}

export interface AuthSession {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

interface AuthContextType {
  user: AuthUser | null;
  session: AuthSession | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, fullName: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: Partial<AuthUser>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load session from localStorage on mount
  useEffect(() => {
    const loadSession = () => {
      try {
        const storedSession = localStorage.getItem('auth_session');
        const storedUser = localStorage.getItem('auth_user');

        if (storedSession && storedUser) {
          const parsedSession = JSON.parse(storedSession);
          const parsedUser = JSON.parse(storedUser);

          // Optional: Validate session expiration if timestamp stored
          setSession(parsedSession);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('Failed to load session:', error);
        localStorage.removeItem('auth_session');
        localStorage.removeItem('auth_user');
      } finally {
        setIsLoading(false);
      }
    };

    loadSession();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      setSession(data.session);
      setUser(data.user);
      localStorage.setItem('auth_session', JSON.stringify(data.session));
      localStorage.setItem('auth_user', JSON.stringify(data.user));
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, fullName: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, fullName }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Signup failed');
      }

      setSession(data.session);
      setUser(data.user);
      localStorage.setItem('auth_session', JSON.stringify(data.session));
      localStorage.setItem('auth_user', JSON.stringify(data.user));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setSession(null);
      localStorage.removeItem('auth_session');
      localStorage.removeItem('auth_user');
      setIsLoading(false);
    }
  };

  const updateUser = (updates: Partial<AuthUser>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('auth_user', JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    session,
    isLoading,
    isAuthenticated: !!user && !!session,
    login,
    signup,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

