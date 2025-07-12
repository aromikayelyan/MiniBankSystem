import { Router } from "express";
import { Accountdata } from "../interfaces/accountInterface";
import BankAccount from "../controllers/bank";
import { findAccount, getMyAccount } from "../utils/bankfunctions";
import { Person } from "../controllers/person";

const router = Router()



router.get('/:num', async (req, res) => {
    try {
        const { pin } = req.body
        const telNum = req.params.num    
        const data = await getMyAccount(pin, telNum)


        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
})



router.post('/create', (req, res) => {
    try {

        const { name, pin, telNum }: Accountdata = req.body
        const hisExist = findAccount(telNum)

        if(hisExist){
            return res.status(200).json({message: "you are have accoount!"})
        }

        const clientData = new Person(name, telNum)
        const client = new BankAccount(clientData, pin)

        client.update()

        return res.status(200).json(client)

    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
})


router.put('/update', (req, res) => {
    try {

        
        return res.status(200).json({message:"updated"})

    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
})


export default router