import { Router } from "express";
import { deposite, findAccount, getMyAccount } from "../utils/bankfunctions";
import { checkTakeCredit } from "../utils/TakeCredit";


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
            if(account && typeof account !== 'string'){
                 sum = checkTakeCredit(account.history)
            }
        }

        if(sum > 0){
           message += `The credit amount you are eligible for is $${sum}.`
        }else{
            message += 'you cant take credit'
        }

        return res.status(200).json({message})
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
})




export default router