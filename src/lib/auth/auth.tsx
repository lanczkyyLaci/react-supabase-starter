import { type ReactNode, useEffect, useState } from 'react';

import type { Session, User } from '@supabase/supabase-js';

import { supabase } from '../supabase';
import { AuthContext } from './auth-context';
import { getUserProfile } from '@/api/get-user-profile.ts';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      setSession(data.session);
      const currentUser = data.session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        const profile = await getUserProfile(currentUser.id);
        setRole(profile.role);
        setName(profile.name);
      }

      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        const profile = await getUserProfile(currentUser.id);
        setRole(profile.role);
        setName(profile.name);
      } else {
        setRole(null);
        setName(null);
      }

      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        role,
        loading,
        name,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
