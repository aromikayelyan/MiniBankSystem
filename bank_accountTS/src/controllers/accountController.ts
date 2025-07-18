import express from "express";
import { Accountdata } from "../interfaces/accountInterface";
import BankAccount from "../enteties/bank";
import { findAccount, getMyAccount } from "../utils/bankfunctions";
import { Person } from "../enteties/person";

class AccountController {
    getAccount = async (req: express.Request, res: express.Response) => {
        try {
            const { pin } = req.body
            const telNum = req.params.num
            const data = await getMyAccount(pin, telNum)


            return res.status(200).json(data)
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    createAccount = async (req: express.Request, res: express.Response) => {
        try {
            const { name, pin, telNum }: Accountdata = req.body
            const hisExist = findAccount(telNum)

            if (hisExist) {
                return res.status(200).json({ message: "you are have accoount!" })
            }

            const clientData = new Person(name, telNum)
            const client = new BankAccount(clientData, pin)

            client.update()

            return res.status(200).json(client)
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export default new AccountController()


// router.put('/update', (req, res) => {
//     try {

//         // сoming soon
//         return res.status(200).json({message:"updated"})

//     } catch (error) {
//         return res.status(500).json({ error: 'Internal server error' });
//     }
// })


// router.delete('/delete/:num', (req, res) => {
//     try {

//         // сoming soon
//         return res.status(200).json({message:"updated"})

//     } catch (error) {
//         return res.status(500).json({ error: 'Internal server error' });
//     }
// })
