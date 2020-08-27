import express from "express";
import Accounts from "../models/Accounts.js";

const router = express.Router();

// Item 4 - Crie um endpoint para registrar um depósito em uma conta
router.post("/account/deposit/", async (req, res, next) => {
  try {
    const accountValidated = req.body; 
    validateAccount(accountValidated);
    const newDeposit = await Accounts.find(req.body);
    
    res.send(newDeposit);
  } catch (error) {
    next(error);
  }
});

const validateAccount = (accountValidated) => {
    console.log(accountValidated);
    const [agencia, conta] = accountValidated;
    const validated = {
        agencia: agencia,
        conta: conta
    }
    console.log(validated);
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
