import { queryOptions } from '@tanstack/react-query';
import { getProfiles } from '@/api/get-profiles';
import { queryKeys } from '@/config/query-key.ts';

export const usersQuery = () =>
  queryOptions({
    queryKey: queryKeys.users,
    queryFn: getProfiles,
  });
