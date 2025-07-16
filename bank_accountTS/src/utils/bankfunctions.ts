import fs from 'fs'
import { readFile, writeFile } from 'fs/promises';
import { Accountdata } from "../interfaces/accountInterface";
import { historyRecord } from '../interfaces/historyInterface';
import { BankAccountType } from '../types/accountstype';

const dbPath: string = './src/db/database.json';


export  function findAccount(telNum: string): boolean {
  let accounts: Accountdata[] = []
  let data = fs.readFileSync(dbPath, 'utf-8')

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


export async function getMyAccount(pin: string, telNum: string) {
  try {
    let accounts: Accountdata[] = []
    let data = fs.readFileSync(dbPath, 'utf-8')

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
  } catch (error) {
    console.log(error)
  }
}




export async function getAccount(telNum: string) {
  try {
    let accounts: Accountdata[] = []
    let data = fs.readFileSync(dbPath, 'utf-8')

    if (data) {
      try {
        accounts = JSON.parse(data)
      } catch (error) {
        console.log(error)
      }
    }
    const account: Accountdata | undefined = accounts.find((client) => client.telNum === telNum);
    if (account) {
      return account
    }
  } catch (error) {
    console.log(error)
  }
}




export function getBalance(bankaccounts: BankAccountType[]): number {
  
  let balance = 0

  bankaccounts.forEach( element=> {
    balance += element.balance;
  });

  return balance
}






// =======================================================================================================================================









export async function updateData(updatedData: Accountdata) {
  try {

    let data = await readFile(dbPath, 'utf-8')
    let accounts: Accountdata[] = [];

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

    await writeFile(dbPath, JSON.stringify(accounts, null, 2), 'utf-8');

  } catch (error) {
    console.log(error)
  }
}





// =======================================================================================================================================






export async function transfer(fromTelNum: string, toTelNum: string, amount: number, pin: string) {
  try {
    const isfromAccount = findAccount(fromTelNum)
    const istoAccount = findAccount(toTelNum)

    if (isfromAccount && istoAccount) {
      let fromAccount = await getAccount(fromTelNum)
      let toAccount = await getAccount(toTelNum)
      if (fromAccount?.pin === pin && toAccount) {
        fromAccount.bankaccounts.forEach((el, index)=>{
          if (el.type === 'debit') {
            if (el.balance - amount >= 0) {
              fromAccount.bankaccounts[index].balance -= amount
              fromAccount.balance -= amount
            }
          }
        })
        toAccount.bankaccounts.forEach((el, index)=>{
          if(el.type === 'debit'){
            toAccount.bankaccounts[index].balance += amount
            toAccount.balance += amount
          }
        })

        fromAccount.history.push({
          action: 'transfer',
          amount,
        })

        toAccount.history.push({
          action: 'getTransfer',
          amount,
        })


        await updateData(fromAccount)
        await updateData(toAccount)

        return 'done'
      }
    }

    return 'reject'
    
  } catch (error) {
    console.log(error)
  }
}


export async function deposite(telNum: string, amount: number) {
  try {

    let data = await readFile(dbPath, 'utf-8')
    let accounts: Accountdata[] = [];

    if (data) {
      try {
        accounts = JSON.parse(data);
      } catch (error) {
        console.log(error);
      }
    }

    const account = accounts.find((client) => client.telNum === telNum);

    if (account && amount > 0) {
      account.bankaccounts.forEach((element) => {
        if (element.type === 'debit') {
          element.balance += amount;
          account.balance = element.balance;
        }
      });

      const history: historyRecord = {
        action: "deposite",
        amount,
      };

      account.history.push(history)

    }

    await writeFile(dbPath, JSON.stringify(accounts, null, 2), 'utf-8');
  } catch (error) {
    console.log(error)
  }
}



export async function cashwithdraw(telNum: string, amount: number, account: Accountdata) {
  try {
    if (account && account.balance >= amount && amount > 0) {

      account.balance -= amount
      account.bankaccounts.forEach((el, index) => {
        if (el.type === 'debit') {
          account.bankaccounts[index].balance -= amount
        }
      })

      const history: historyRecord = {
        action: "withdraw",
        amount,
      };


      account.history.push(history)
      await updateData(account)
    }

  } catch (error) {
    console.log(error)
  }
}


// =======================================================================================================================



