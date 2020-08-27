import express from "express";
import Accounts from "../models/Accounts.js";

const router = express.Router();

// Item 4 - Crie um endpoint para registrar um depósito em uma conta
router.patch("/account/deposit/", async (req, res, next) => {
  try {
    let account = req.body;
    let newDeposit = await validateAccount(account, next);
    newDeposit.balance += account.balance;
    newDeposit = new Accounts(newDeposit);
    newDeposit.save();
    res.send(newDeposit);
  } catch (error) {
    next(error);
  }
});

// 5. Crie um endpoint para registrar um saque em uma conta.
router.patch("/account/withdraw/", async (req, res, next) => {
    try {
      let account = req.body;
      let newDeposit = await validateAccount(account, next);
      if (newDeposit.balance === 0) {
          throw new Error("saldo insuficiente");
      }
      newDeposit.balance =- account.balance + 1 // valor + taxa de 1;
      newDeposit = new Accounts(newDeposit);
      newDeposit.save();
      res.send(newDeposit);
    } catch (error) {
      next(error);
    }
  });


// valida se agencia/conta existe
const validateAccount = async (account, next) => {
  //traz apenas a agencia e a conta para consulta no BD;
  const { agencia, conta } = account;
  account = {
    agencia,
    conta,
  };
  try {
    account = await Accounts.find(account);
    if (account.length === 0) {
      throw new Error("agencia/conta invalida");
    }
    return account[0]; // retorna o objeto e nao o array;
  } catch (error) {
    throw new Error(error.message);
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
  res.status(400).send({ error: err.message });
});

export default router;
