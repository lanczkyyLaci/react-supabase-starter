import { supabase } from '@/lib/supabase';
import type { Profile } from '@/type/profiles.ts';

export const getProfiles = async (): Promise<Profile[]> => {
  const { data, error } = await supabase.from('profile').select('*');

  if (error) {
    throw error;
  }

  return data;
};
