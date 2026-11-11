'use client';

import { createContext, useContext } from 'react';

import type { SessionUser } from '@/lib/auth';

/**
 * The signed-in visitor, provided by ToolGate once sign-in has been confirmed.
 * Tools read this instead of asking for a name and email again.
 */

type AuthValue = { user: SessionUser };

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ user, children }: { user: SessionUser; children: React.ReactNode }) {
  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthValue {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth must be used inside ToolGate');
  return value;
}
