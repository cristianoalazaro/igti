import express from "express";
import Accounts from "../models/Accounts.js";

const router = express.Router();

// Item 4 - Crie um endpoint para registrar um depósito em uma conta
router.post("/account/deposit/", async (req, res, next) => {
  try {
    const account = req.body;
    await validateAccount(account, next);
    //const newDeposit = await Accounts.find(req.body);

    //res.send(newDeposit);
  } catch (error) {
    next(error);
  }
});

// valida se agencia/conta existe
const validateAccount = async (account, next) => {
  const { agencia, conta } = account;
  account = {
    agencia,
    conta,
  };
  try {
    account = await Accounts.find(account);
    console.log(account);
    throw new Error["{agencia/conta invalida}"];
    if (account.length === 0) {
        throw new Error("{agencia/conta invalida}");
    }
  } catch (err) {
      next(err);
  }
};

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
