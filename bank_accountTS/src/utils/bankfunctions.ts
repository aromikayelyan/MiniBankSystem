import fs, {promises} from 'fs'
import { Accountdata } from "../interfaces/accountInterface";
import { historyRecord } from '../interfaces/historyInterface';
import {  BankAccountType } from '../types/accountstype';



const dbPath: string =  './src/db/database.json';


export function findAccount(telNum: string): boolean {
  let accounts: Accountdata[] = []
  let data = fs.readFileSync(dbPath, 'utf8')

  if (data) {
    try {
      accounts = JSON.parse(data)
    } catch (error) {
      console.log(error)
    }
  }
  const account: Accountdata | undefined = accounts.find((client) => client.telNum === telNum);

  if (account) {
    if (account.telNum === telNum) {
      return true
    }
  }
  return false
}

export function transfer(fromId: number, toTelNum: string, amount: number): void {
  
}



export function updateHistory(telNum: string, history: historyRecord): void {
  fs.readFile(dbPath, 'utf8', (err, data) => {

    if (err && err.code !== 'ENOENT') {
      console.log(err)
    }

    let accounts: Accountdata[] = []

    if (data) {
      try {
        accounts = JSON.parse(data)
      } catch (error) {
        console.log(error)
      }
    }

    const account: Accountdata | undefined = accounts.find((client) => client.telNum === telNum);
    if (account) {
      account.history.push(history)
    }

    fs.writeFile(dbPath, JSON.stringify(accounts, null, 2), 'utf8', (writeError) => {
      if (writeError) {
        console.log(writeError)
      }
    })
  })
}


export function getBalance(accounts: BankAccountType[]): number{

  return 1
}


export function updateData(updatedData: Accountdata): void {
  try {

    fs.readFile(dbPath, 'utf8', (err, data) => {

      if (err && err.code !== 'ENOENT') {
        console.log(err)
      }

      let accounts: Accountdata[] = []

      if (data) {
        try {
          accounts = JSON.parse(data)
        } catch (error) {
          console.log(error)
        }
      }

      const account: Accountdata | undefined = accounts.find((client) => client.telNum === updatedData.telNum);
      if (account) {
        Object.assign(account, updatedData);
      }
      else {
        accounts.push(updatedData);
      }
      

      fs.writeFile(dbPath, JSON.stringify(accounts, null, 2), 'utf8', (writeError) => {
        if (writeError) {
          console.log(writeError)
        }
      })
    })
  } catch (error) {
    console.log(error)
  }
}




export async function getMyAccount(pin: string, telNum: string) {
  try {
    let accounts: Accountdata[] = []
    let data = fs.readFileSync(dbPath, 'utf8')

    if (data) {
      try {
        accounts = JSON.parse(data)
      } catch (error) {
        console.log(error)
      }
    }
    const account: Accountdata | undefined = accounts.find((client) => client.telNum === telNum);

    if (account) {
      if (account.pin === pin) {
        return account
      }
    }

    return 'Not Find'

  } catch (error) {
    console.log(error)
  }
}






