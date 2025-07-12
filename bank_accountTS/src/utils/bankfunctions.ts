import fs, { promises } from 'fs'
import { readFile, writeFile } from 'fs/promises';
import { Accountdata } from "../interfaces/accountInterface";
import { historyRecord } from '../interfaces/historyInterface';
import { BankAccountType } from '../types/accountstype';





const dbPath: string = './src/db/database.json';


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
  try {

  } catch (error) {

  }
}



export async function updateHistory(telNum: string, history: historyRecord) {
  try {
    console.log("Reading database...");
    let accounts: Accountdata[] = [];
    const data = await readFile(dbPath, 'utf8');

    if (data) {
      try {
        accounts = JSON.parse(data);
        console.log("Accounts loaded:", accounts.length);
      } catch (error) {
        console.log("JSON parse error:", error);
      }
    }

    const account = accounts.find((client) => client.telNum === telNum);
    console.log("Found account:", account ? account.telNum : "Not found");

    if (account) {
      if (!Array.isArray(account.history)) {
        account.history = [];
        console.log("Initialized history");
      }

      account.history.push(history);
      console.log("History updated:", account.history);
    }

    console.log("Saving accounts...");
    await writeFile(dbPath, JSON.stringify(accounts, null, 2), 'utf-8');
    console.log("Write successful!");
  } catch (err: any) {
    if (err.code !== 'ENOENT') {
      console.log("Read or write error:", err);
    } else {
      console.log("File not found:", dbPath);
    }
  }
  // fs.readFile(dbPath, 'utf8', (err, data) => {

  //   if (err && err.code !== 'ENOENT') {
  //     console.log(err)
  //   }

  //   let accounts: Accountdata[] = []

  //   if (data) {
  //     try {
  //       accounts = JSON.parse(data)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }

  //   const account: Accountdata | undefined = accounts.find((client) => client.telNum === telNum);
  //   if (account) {
  //     account.history.push(history)
  //   }

  //   fs.writeFile(dbPath, JSON.stringify(accounts, null, 2), 'utf8', (writeError) => {
  //     if (writeError) {
  //       console.log(writeError)
  //     }
  //   })
  // })
}




export function getBalance(accounts: BankAccountType[]): number {

  return 0
}


export async function updateData(updatedData: Accountdata) {
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
    } else {
      return 'Not Find'
    }
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

    if (account) {
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

      // Лучше сделать updateHistory синхронным или тоже async/await
      await updateHistory(telNum, history);

      // Обновляем аккаунт
      // (в данном случае уже изменили объект в массиве accounts)
    }

    await writeFile(dbPath, JSON.stringify(accounts, null, 2), 'utf8');



    // let accounts: Accountdata[] = []
    // let data = fs.readFileSync(dbPath, 'utf8')

    // if (data) {
    //   try {
    //     accounts = JSON.parse(data)
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }


    // const account: Accountdata | undefined = accounts.find((client) => client.telNum === telNum);

    // if (account) {
    //   const newAccount = account

    //   newAccount?.bankaccounts.forEach((element, index) => {
    //     if (element.type === 'debit') {
    //       newAccount.bankaccounts[index].balance += amount
    //     }
    //   });

    //   newAccount?.bankaccounts.forEach((element, index) => {
    //     if (element.type === 'debit') {
    //       newAccount.balance = newAccount.bankaccounts[index].balance
    //     }
    //   });


    //   const history: historyRecord = {
    //     action: "deposite",
    //     amount,
    //   }


    //   updateHistory(telNum, history)

    //   Object.assign(account, newAccount);
    // }


    // fs.writeFile(dbPath, JSON.stringify(accounts, null, 2), 'utf8', (writeError) => {
    //   if (writeError) {
    //     console.log(writeError)
    //   }
    // })
  } catch (error) {
    console.log(error)
  }
}







