import { supabase } from '@/lib/supabase.ts';

export const getUserProfile = async (
  userId: string,
): Promise<{ role: string | null; name: string | null }> => {
  const { data, error } = await supabase
    .from('profile')
    .select('role, name')
    .eq('id', userId)
    .single();

  if (error || !data) return { role: null, name: null };
  return { role: data.role, name: data.name };
};
