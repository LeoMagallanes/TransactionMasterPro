import { Router } from "express";
import {getClientInfo, login} from "../controllers/client.controller.js";
import { transfer, getAccountTransactions } from "../controllers/transaction.controller.js";
const router = Router()

router.get("/", (req, res) =>{
    res.send("Obteniendo datos desde la API!")
});

router.post("/client", getClientInfo);

router.post("/client/login", login);

router.post("/transfer", transfer);

router.post("/transactions",getAccountTransactions);

export default router;