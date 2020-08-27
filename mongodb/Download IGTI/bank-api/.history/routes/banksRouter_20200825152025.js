import express from "express";
import Accounts from "../models/Accounts.js";

const router = express.Router();

// Item 4 - Crie um endpoint para registrar um depósito em uma conta
router.patch("/account/deposit/", async (req, res, next) => {
  try {
    const account = req.body;
    let newDeposit = await validateAccount(account);
    newDeposit.balance += account.balance;
    newDeposit = new Accounts(newDeposit);
    newDeposit.save();
    res.send(newDeposit);
  } catch (error) {
    next(error);
  }
});

// Item 5. Crie um endpoint para registrar um saque em uma conta.
router.patch("/account/withdraw/", async (req, res, next) => {
  try {
    const account = req.body;
    let newDrawMoney = await validateAccount(account);

    // valida saldo mais valor do saque antes de efetivar de fato o saque
    newDrawMoney.balance -= account.balance + 1; // valor + taxa de 1;
    if (newDrawMoney.balance < 0) {
      throw new Error("saldo insuficiente");
    }

    newDrawMoney = new Accounts(newDrawMoney);
    newDrawMoney.save();
    res.send(newDrawMoney);
  } catch (error) {
    next(error);
  }
});

// Item 6. Crie um endpoint para consultar o saldo da conta
router.get("/account/checkBalance/", async (req, res, next) => {
  try {
    const account = req.body;
    const checkBalance = await validateAccount(account);
    res.send(checkBalance);
  } catch (error) {
    next(error);
  }
});

// Item 7. Crie um endpoint para excluir uma conta.
router.delete("/account/delete/", async (req, res, next) => {
  try {
    const account = req.body;
    let deleteAccount = await validateAccount(account);
    deleteAccount = new Accounts(deleteAccount);
    deleteAccount.deleteOne();
    res
      .status(200)
      .send(
        `{"message": "Conta de ${deleteAccount.name}, Numero: ${deleteAccount.conta} da Agencia: ${deleteAccount.agencia} excluida com sucesso!"}`
      );
  } catch (error) {
    next(error);
  }
});

// Item 8. Crie um endpoint para realizar transferências entre contas.
router.patch("/account/transfer/", async (req, res, next) => {
  try {
    const accounts = req.body;
    console.log(accounts);
    //let deleteAccount = await validateAccount(account);
    /*deleteAccount = new Accounts(deleteAccount);
    deleteAccount.deleteOne();
    res
      .status(200)
      .send(
        `{"message": "Conta de ${deleteAccount.name}, Numero: ${deleteAccount.conta} da Agencia: ${deleteAccount.agencia} excluida com sucesso!"}`
      );*/
  } catch (error) {
    next(error);
  }
});

// valida se agencia/conta existe
const validateAccount = async (account) => {
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
