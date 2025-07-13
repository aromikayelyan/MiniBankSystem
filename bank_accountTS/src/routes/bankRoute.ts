import { Router } from "express";
import { cashwithdraw, deposite, findAccount, getBalance, getMyAccount, transfer } from "../utils/bankfunctions";
import { checkTakeCredit, TakeCredit } from "../utils/TakeCredit";


const router = Router()



router.post('/transfer/:num', async (req, res) => {
    try {


    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
})


router.post('/deposite/:num', async (req, res) => {
    try {
        const { amount } = req.body
        const telNum = req.params.num
        const hisExist = findAccount(telNum)
        if (hisExist) {
            deposite(telNum, amount)
        }

        return res.status(200).json(amount)

    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
})



router.post('/checkCredit/:num', async (req, res) => {
    try {
        const telNum = req.params.num
        const { pin } = req.body
        const hisExist = findAccount(telNum)
        let message = ``
        let sum = 0

        if (hisExist) {
            const account = await getMyAccount(pin, telNum)
            if (account && typeof account !== 'string') {
                sum = checkTakeCredit(account.history)
            }
        }

        if (sum > 0) {
            message += `The credit amount you are eligible for is $${sum}.`
        } else {
            message += 'you cant take credit'
        }

        return res.status(200).json({ message })
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
})


router.post('/moneyWithdraw/:num', async (req, res) => {
    try {
        const telNum = req.params.num
        const { pin, sum } = req.body
        const hisExist = findAccount(telNum)


        if (hisExist) {
            const account = await getMyAccount(pin, telNum)
            if (account && typeof account !== 'string' && account.balance >= sum && sum > 0) {
                cashwithdraw(telNum, sum, account)
            }
        }
        return res.status(200).json(sum)

    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
})


router.post('/getBalance/:num', async (req, res) => {
    try {

        const telNum = req.params.num
        const { pin } = req.body
        const hisExist = findAccount(telNum)
        let balance = 0



        if (hisExist) {
            const account = await getMyAccount(pin, telNum)
            if (account) {
                balance = getBalance(account.bankaccounts)
                return res.status(200).json({ messaeg: 'done' })
            }
        }


        return res.status(200).json({ messaeg: 'reject' })
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
})



router.post('/transferMoney/:num', async (req, res) => {
    try {
        const telNum = req.params.num
        const { pin, toTelNum, amount } = req.body
        const fromExist = findAccount(telNum)
        const toExist = findAccount(toTelNum)

        if (fromExist && toExist) {
            await transfer(telNum, toTelNum, amount, pin)
            return res.status(200).json({ messaeg: 'done' })
        }

        return res.status(200).json({ messaeg: 'reject' })
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
})


router.post('/takeCredit/:num', async (req, res) => {
    try {

        const telNum = req.params.num
        const { pin, sum } = req.body
        const hisExist = findAccount(telNum)
        let message = ``

        if (hisExist) {
            const account = await getMyAccount(pin, telNum)
            if (account && typeof account !== 'string') {
                message = TakeCredit(account, sum)
            }
        }

        return res.status(200).json(message)

    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
})






export default router