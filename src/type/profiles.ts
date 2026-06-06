export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export type Profile = {
  id: string;
  name: string;
  email: string;
  role: Role;
  created_at: string;
};
