import { supabase } from '@/lib/supabase.ts';

export const getLogoutApi = async () => {
  await supabase.auth.signOut();
};
