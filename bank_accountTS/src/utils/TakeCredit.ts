import { historyRecord } from "../interfaces/historyInterface";
import { Accountdata } from "../interfaces/accountInterface";
import { updateData } from "./bankfunctions";
import { BankAccountType } from "../types/accountstype";
import { interestRates } from "./interestRates";




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


    if (creditSum <= sum) {
        const duty = sum + (sum * interestRates.consumer / 100)

        const creditAccount: BankAccountType = {
            account: Date.now(),
            balance: sum,
            duty,
            interestRate: interestRates.consumer,
            loanTerm: 36,
            type: 'credit'
        }

        account.balance += sum

        account.bankaccounts.forEach((el, index) => {
            if (el.type === 'debit') {
                account.bankaccounts[index].balance += sum
            }
        })

        account.history.push({
            action: "takeCredit",
            amount: creditSum,
        });

        account.bankaccounts.push(creditAccount)
        updateData(account)
        return 'done'
    }
    return "reject"
}



export function payCredit(account: Accountdata, creditSum: number) {
    // сoming soon
}












