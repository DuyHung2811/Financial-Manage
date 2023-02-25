import {Role} from "./role";

export interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  address: string;
  age: string;
  sex: string;
  enabled: boolean;
  avatar: string;
  roles: [Role];
}
