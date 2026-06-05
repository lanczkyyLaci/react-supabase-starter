import { type ReactNode, useEffect, useState } from 'react';

import type { Session, User } from '@supabase/supabase-js';

import { supabase } from '../supabase';
import { AuthContext } from './auth-context';

async function fetchRole(userId: string): Promise<string | null> {
  const { data, error } = await supabase
    .from('profile')
    .select('role')
    .eq('id', userId)
    .single();

  if (error || !data) return null;
  return data.role;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      setSession(data.session);
      const currentUser = data.session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        const userRole = await fetchRole(currentUser.id);
        setRole(userRole);
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
        const userRole = await fetchRole(currentUser.id);
        setRole(userRole);
      } else {
        setRole(null);
      }

      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        role,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
