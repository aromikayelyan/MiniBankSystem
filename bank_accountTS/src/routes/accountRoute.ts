import { Router } from "express";
import accountController from "../controllers/accountController";



const router = Router()





router.get('/:num', accountController.getAccount)
router.post('/create', accountController.createAccount)
// router.put('/update', )
// router.delete('/delete/:num', )






export default router