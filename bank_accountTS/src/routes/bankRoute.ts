import { Router } from "express";
import bankController from "../controllers/bankController";


const router = Router()


router.post('/deposite/:num', bankController.deposite)
router.post('/checkCredit/:num', bankController.checkCredit)
router.post('/moneyWithdraw/:num', bankController.moneyWithdraw)
router.post('/getBalance/:num', bankController.getBalance)
router.post('/transfer/:num', bankController.transfer)
router.post('/takeCredit/:num', bankController.takeCredit)



export default router