'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import type { Session, User } from '@supabase/supabase-js';

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  username?: string | null;
  avatarUrl?: string | null;
  bio?: string | null;
  subscriptionTier?: string;
  stripe_customer_id?: string | null;
  subscription_id?: string | null;
  subscription_plan?: string | null;
  subscription_status?: 'active' | 'inactive' | 'cancelled' | 'past_due' | 'trialing';
  subscription_start_date?: string | null;
  subscription_end_date?: string | null;
}

export interface AuthSession {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at?: number;
}

interface SignupResult {
  requiresEmailVerification: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  session: AuthSession | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, fullName: string) => Promise<SignupResult>;
  logout: () => Promise<void>;
  updateUser: (user: Partial<AuthUser>) => void;
  refreshSubscriptionStatus: () => Promise<void>;
  isSubscriptionActive: () => boolean;
  isSubscriptionExpired: () => boolean;
  daysUntilExpiry: () => number | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase =
  supabaseUrl && supabaseAnonKey
    ? createBrowserClient(supabaseUrl, supabaseAnonKey)
    : null;

function toAuthSession(session: Session | null): AuthSession | null {
  if (!session) {
    return null;
  }
  return {
    access_token: session.access_token,
    refresh_token: session.refresh_token,
    expires_in: session.expires_in,
    expires_at: session.expires_at,
  };
}

function mapAuthUser(user: User, profile?: Record<string, unknown> | null): AuthUser {
  return {
    id: user.id,
    email: user.email || '',
    fullName:
      (profile?.full_name as string | undefined) ||
      (user.user_metadata?.full_name as string | undefined) ||
      '',
    username: (profile?.username as string | null | undefined) ?? null,
    avatarUrl: (profile?.avatar_url as string | null | undefined) ?? null,
    bio: (profile?.bio as string | null | undefined) ?? null,
    subscriptionTier:
      (profile?.subscription_tier as string | undefined) ||
      (profile?.subscription_plan as string | undefined) ||
      'free',
    stripe_customer_id: (profile?.stripe_customer_id as string | null | undefined) ?? null,
    subscription_id: (profile?.subscription_id as string | null | undefined) ?? null,
    subscription_plan: (profile?.subscription_plan as string | null | undefined) ?? null,
    subscription_status:
      (profile?.subscription_status as AuthUser['subscription_status'] | undefined) ||
      'inactive',
    subscription_start_date:
      (profile?.subscription_start_date as string | null | undefined) ?? null,
    subscription_end_date:
      (profile?.subscription_end_date as string | null | undefined) ?? null,
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = useCallback(async (userId: string) => {
    if (!supabase) {
      return null;
    }

    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      return null;
    }
    return data;
  }, []);

  const setAuthState = useCallback(
    async (nextSession: Session | null, nextUser: User | null) => {
      setSession(toAuthSession(nextSession));

      if (!nextUser) {
        setUser(null);
        return;
      }

      const profile = await fetchProfile(nextUser.id);
      setUser(mapAuthUser(nextUser, profile));
    },
    [fetchProfile]
  );

  useEffect(() => {
    let isMounted = true;

    const loadSession = async () => {
      if (!supabase) {
        setIsLoading(false);
        return;
      }

      const {
        data: { session: currentSession },
      } = await supabase.auth.getSession();

      if (!isMounted) {
        return;
      }

      await setAuthState(currentSession, currentSession?.user ?? null);
      if (isMounted) {
        setIsLoading(false);
      }
    };

    loadSession();

    const {
      data: { subscription },
    } = supabase
      ? supabase.auth.onAuthStateChange(async (_event, nextSession) => {
          if (!isMounted) {
            return;
          }
          await setAuthState(nextSession, nextSession?.user ?? null);
          if (isMounted) {
            setIsLoading(false);
          }
        })
      : { data: { subscription: { unsubscribe: () => undefined } } };

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [setAuthState]);

  const login = useCallback(async (email: string, password: string) => {
    if (!supabase) {
      throw new Error('Supabase not configured');
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message || 'Login failed');
      }

      await setAuthState(data.session, data.user);
    } finally {
      setIsLoading(false);
    }
  }, [setAuthState]);

  const signup = useCallback(async (email: string, password: string, fullName: string) => {
    if (!supabase) {
      throw new Error('Supabase not configured');
    }

    setIsLoading(true);
    try {
      const emailRedirectTo =
        typeof window !== 'undefined' ? `${window.location.origin}/auth/login` : undefined;

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
          emailRedirectTo,
        },
      });

      if (error) {
        throw new Error(error.message || 'Signup failed');
      }

      await setAuthState(data.session, data.user);

      if (data.user?.email) {
        fetch('/api/referral', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: data.user.email }),
        }).catch(() => undefined);
      }

      return { requiresEmailVerification: !data.session };
    } finally {
      setIsLoading(false);
    }
  }, [setAuthState]);

  const logout = useCallback(async () => {
    if (!supabase) {
      setUser(null);
      setSession(null);
      return;
    }

    setIsLoading(true);
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateUser = useCallback((updates: Partial<AuthUser>) => {
    setUser((current) => {
      if (!current) {
        return null;
      }
      return { ...current, ...updates };
    });
  }, []);

  const refreshSubscriptionStatus = useCallback(async () => {
    if (!session?.access_token) {
      return;
    }

    const response = await fetch('/api/user/subscription', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    });

    if (response.ok) {
      const subscriptionData = await response.json();
      updateUser(subscriptionData);
    }
  }, [session?.access_token, updateUser]);

  const isSubscriptionActive = useCallback((): boolean => {
    return user?.subscription_status === 'active' || user?.subscription_status === 'trialing';
  }, [user?.subscription_status]);

  const isSubscriptionExpired = useCallback((): boolean => {
    if (!user?.subscription_end_date) {
      return true;
    }
    return new Date() > new Date(user.subscription_end_date);
  }, [user?.subscription_end_date]);

  const daysUntilExpiry = useCallback((): number | null => {
    if (!user?.subscription_end_date) {
      return null;
    }

    const expiryDate = new Date(user.subscription_end_date);
    const diffTime = expiryDate.getTime() - Date.now();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  }, [user?.subscription_end_date]);

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      session,
      isLoading,
      isAuthenticated: Boolean(user && session),
      login,
      signup,
      logout,
      updateUser,
      refreshSubscriptionStatus,
      isSubscriptionActive,
      isSubscriptionExpired,
      daysUntilExpiry,
    }),
    [
      daysUntilExpiry,
      isLoading,
      isSubscriptionActive,
      isSubscriptionExpired,
      login,
      logout,
      refreshSubscriptionStatus,
      session,
      signup,
      updateUser,
      user,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

