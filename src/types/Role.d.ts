import type { RolePermission } from "./";

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: RolePermission[];
}
