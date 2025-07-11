import { creditRecord } from "../interfaces/bankAccountsRecors/creditAccount";
import { debitRecord } from "../interfaces/bankAccountsRecors/debetAccount";



export type BankAccountType = (creditRecord | debitRecord);


export interface AccountDataType {
    bankaccounts: BankAccountType[];
}