import { Seller } from "./sellerTypes";
import { Transaction } from "./transactionTypes";


export interface Payouts {
  id: number;
  transactions: Transaction[];
  seller: Seller;
  amount: number;
  status: "PENDING" | "SUCCESS" | "REJECTED";
  date: string;
}