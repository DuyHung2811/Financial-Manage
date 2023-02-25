import {Category} from "./category";
import {Wallet} from "./wallet";

export interface Transaction {
  id: number;
  wallet: Wallet;
  category: Category;
  totalSpent: number;
  time: string;
  note: string;
}
