
import { historyRecord } from "../interfaces/historyInterface";





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












