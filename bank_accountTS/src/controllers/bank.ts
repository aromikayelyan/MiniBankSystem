import { Accountdata } from "../interfaces/accountInterface";
import {BankAccountType}  from "../types/accountstype";
import { historyRecord } from "../interfaces/historyInterface";
import { deposite, findAccount, getBalance, transfer, updateData } from "../utils/bankfunctions";
import { Person } from "./person";

export default class BankAccount {
    private client: Person;
    private id: number = Date.now()
    private history: historyRecord[];
    private bankaccounts: BankAccountType[] = [];
    private balance: number;
    private pin: string;


    constructor(client: Person, pin: string) {
        this.client = client
        this.history = []
        this.pin = pin
        this.bankaccounts = []
        this.bankaccounts.push({ account: Date.now(), balance: 0, type: 'debit' })
        this.balance = getBalance(this.bankaccounts); // ← 

    }


    public getHistory(pin: string) {
        if (pin === this.pin) {
            return this.history
        } else {
            return "no access"
        }
    }

    public sendMoney(telNum: string, pin: string, money: number): string {
        const user = findAccount(telNum)
        if (pin === this.pin && user && money > 0 && this.balance > money) {
            transfer(this.client.telNum, telNum, money, this.pin)
            return "done"
        } else {
            return "no access"
        }
    }

    public deposit(depositMoney: number): string {
        deposite(this.client.telNum, depositMoney)
        return "Done"
    }

    public update(): void {
        const updated: Accountdata = {
            id: this.id,
            name: this.client.name,
            telNum: this.client.telNum,
            balance: this.balance,
            bankaccounts: this.bankaccounts,
            pin: this.pin,
            history: this.history
        }
        updateData(updated)
    }
}

