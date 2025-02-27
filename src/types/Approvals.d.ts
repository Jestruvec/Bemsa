import { TxtStatusEnum } from "@/enums";

export interface Approval {
  id: string;
  created_at: string;
  txtId: string;
  userId: string;
  user_profiles?: User;
  status: TxtStatusEnum;
}
