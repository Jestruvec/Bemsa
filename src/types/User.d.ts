import type { Role } from "@/types";

export interface User {
  id: string;
  created_at: Date;
  name: string;
  lastName: string;
  avatarUrl: string | null;
  email: string;
  password: string;
  roleId: string;
  roles?: Role;
}
