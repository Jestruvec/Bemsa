import type { Role } from "./";

export interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  roleId: string;
  imgUrl: string;
  role: Role;
}
