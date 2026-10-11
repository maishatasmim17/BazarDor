'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  register: (name: string, email: string, pass: string) => Promise<boolean>;
  socialLogin: (provider: 'google' | 'github', redirectUrl?: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfileName: (name: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEFAULT_AVATAR =
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces';

const toUser = (u: {
  id: string;
  name?: string | null;
  email: string;
  image?: string | null;
}): User => ({
  id: u.id,
  name: u.name || 'ইউজার',
  email: u.email,
  image: u.image || DEFAULT_AVATAR,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // user state + route-guard cookie (user ke sync kore rakhe)
  const saveUserSession = (u: User | null) => {
    setUser(u);
    if (typeof document !== 'undefined') {
      document.cookie = u
        ? `bazardor_session=true; path=/; max-age=604800; SameSite=Lax`
        : `bazardor_session=; path=/; max-age=0; SameSite=Lax`;
    }
  };

  useEffect(() => {
    // ager fake Rezwan data browser theke muche felo
    try {
      localStorage.removeItem('bazardor_user_session');
      localStorage.removeItem('bazardor_registered_users');
    } catch {
      // ignore
    }

    // real session BetterAuth (MongoDB) theke nao
    authClient
      .getSession()
      .then(({ data }) => saveUserSession(data?.user ? toUser(data.user) : null))
      .catch(() => saveUserSession(null))
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (email: string, pass: string): Promise<boolean> => {
    try {
      const { data, error } = await authClient.signIn.email({ email, password: pass });
      if (error || !data?.user) {
        toast.error('ভুল ইমেইল বা পাসওয়ার্ড প্রদান করা হয়েছে!');
        return false;
      }
      saveUserSession(toUser(data.user));
      toast.success('সফলভাবে সাইন ইন হয়েছে!');
      return true;
    } catch {
      toast.error('সাইন ইন ব্যর্থ হয়েছে, আবার চেষ্টা করুন।');
      return false;
    }
  };

  const register = async (name: string, email: string, pass: string): Promise<boolean> => {
    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password: pass,
      });
      if (error) {
        toast.error(error.message || 'নিবন্ধন ব্যর্থ হয়েছে!');
        return false;
      }
      if (data?.user) saveUserSession(toUser(data.user));
      toast.success('অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!');
      return true;
    } catch {
      toast.error('নিবন্ধন ব্যর্থ হয়েছে!');
      return false;
    }
  };

  const socialLogin = async (provider: 'google' | 'github', redirectUrl?: string) => {
    try {
      // real Google/GitHub e redirect hobe, fire ele session auto load hobe
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: redirectUrl || '/',
      });
      if (error) toast.error('সোশ্যাল লগইন ব্যর্থ হয়েছে!');
    } catch {
      toast.error('সোশ্যাল লগইন ব্যর্থ হয়েছে!');
    }
  };

  const logout = async () => {
    try {
      await authClient.signOut();
    } catch {
      // ignore
    } finally {
      saveUserSession(null);
      toast.success('সফলভাবে সাইন আউট হয়েছে');
      router.push('/');
    }
  };

  const updateProfileName = async (newName: string): Promise<boolean> => {
    if (!user) return false;
    try {
      const { error } = await authClient.updateUser({ name: newName });
      if (error) {
        toast.error('তথ্য আপডেট ব্যর্থ হয়েছে!');
        return false;
      }
      saveUserSession({ ...user, name: newName });
      toast.success('প্রোফাইলের তথ্য সফলভাবে আপডেট করা হয়েছে!');
      return true;
    } catch {
      toast.error('তথ্য আপডেট ব্যর্থ হয়েছে!');
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, register, socialLogin, logout, updateProfileName }}
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