import { historyRecord } from "../interfaces/historyInterface";
import { Accountdata } from "../interfaces/accountInterface";
import { updateData } from "./bankfunctions";
import { BankAccountType } from "../types/accountstype";




export function checkTakeCredit(history: historyRecord[]): number {

    let sum = 0
    for (let index = 0; index < history.length; index++) {
        sum += history[index].amount
    }

    if (sum >= 20000 && history.length >= 4) {
        const base = sum * 0.1 + history.length * 500;
        const creditLimit = Math.min(base, 50000);
        return Math.round(creditLimit);
    }

    return sum
}



export function TakeCredit(account: Accountdata, creditSum: number): string {
    const sum = checkTakeCredit(account.history)


    if(creditSum <= sum){
        const creditAccount: BankAccountType = {
            account: Date.now(),
            balance: sum,
            interestRate: 14,
            loanTerm: 36,
            type: 'credit'
        }
        account.balance += sum
        account.bankaccounts.push(creditAccount)
        updateData(account)
        return 'done'
    }
    return "reject"
}



export function payCredit(account: Accountdata, creditSum: number){
    // сoming soon
}












