import express from "express";
import Accounts from "../models/Accounts.js";

const router = express.Router();
let accountValidated = {};

// Item 4 - Crie um endpoint para registrar um depósito em uma conta
router.post("/account/deposit/", async (req, res, next) => {
  try {
    accountValidated = req.body; 
    console.log(accountValidated);
    validateAccount();
    const newDeposit = await Accounts.find(req.body);
    
    res.send(newDeposit);
  } catch (error) {
    next(error);
  }
});

const validateAccount = () => {
    delete accountValidated.balance;
    console.log({'agencia': accountValidated['agencia']});
}

/*router.post("/account", async (req, res, next) => {
  try {
    const account = new Accounts(req.body);
    await account.save();

    res.send(account);
  } catch (error) {
    next(error);
  }
});*/

// funcao tratamento de erro
router.use((err, req, res, next) => {
  res.status(500).send(err);
});

export default router;
