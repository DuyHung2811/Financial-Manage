import {User} from "./user";

export interface Category {
  id: number;
  name: string;
  status: string;
  note: string;
  color: string;
  user: User;
}
