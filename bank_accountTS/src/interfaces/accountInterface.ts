import { BankAccountType } from "../types/accountstype";
import { historyRecord } from "./historyInterface";

export interface Accountdata {
    id: number;
    name: string;
    telNum: string;
    balance: number;
    bankaccounts: BankAccountType[];
    pin: string;
    history: historyRecord[];
}