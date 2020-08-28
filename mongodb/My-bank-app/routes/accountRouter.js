import express from 'express';
import { accountModel } from '../models/accountModel.js';

const app = new express();

//Depósito - PATCH
app.patch('/account/deposit', async (req, res, next) => {
  try {
    const account = req.body;
    let newDeposit = await validateAccount(account);
    newDeposit.balance += account.balance;
    newDeposit = new accountModel(newDeposit);
    newDeposit.save();
    res.send(newDeposit);
  } catch (error) {
    next(error);
  }
});

//Saque - PATCH
app.patch('/account/withdraw', async (req, res, next) => {
  try {
    const account = req.body;
    let newDrawMoney = await validateAccount(account);
    newDrawMoney.balance -= account.balance + 1;
    if (newDrawMoney.balance < 0) {
      throw new Error('Saldo insuficiente');
    }
    newDrawMoney = new accountModel(newDrawMoney);
    newDrawMoney.save();
    res.send(newDrawMoney);
  } catch (error) {
    next(error);
  }
});

//Consultar o saldo - Get
app.get('/account/checkbalance/:agencia/:conta', async (req, res, next) => {
  try {
    const agencia = req.params.agencia;
    const conta = req.params.conta;
    const account = `{"agencia":${agencia},"conta":${conta}}`;

    const checkBalance = await accountModel.findOne({
      agencia: agencia,
      conta: conta,
    });
    if (!checkBalance) {
      throw new Error('Agência/Conta inexistente');
    }
    res.send(checkBalance);
  } catch (error) {
    next(error);
  }
});

//Excluir uma conta - Delete
app.delete('/account/delete/:agencia/:conta', async (req, res, next) => {
  try {
    const agencia = req.params.agencia;
    const conta = req.params.conta;
    const account = `{"agencia":${agencia},"conta":${conta}}`;

    if (!account) {
      throw new Error('Agência/Conta inválida!');
    }
    const deleteAccount = await accountModel.deleteOne({
      agencia: agencia,
      conta: conta,
    });
    //res.status(200).send('Conta deletada com sucesso!');

    deleteAccount = await accountModel.find({ agencia: agencia });
    res.send(deleteAccount.length);
  } catch (error) {
    next(error);
  }
});

//valida conta
const validateAccount = async (account) => {
  const { agencia, conta } = account;
  account = {
    agencia,
    conta,
  };
  try {
    account = await accountModel.findOne(account);
    if (!account) {
      throw new Error('Agência/Conta inválida');
    }
    return account;
  } catch (error) {
    throw new Error(error.message);
  }
};

//Tratamento de erro
app.use((err, req, res, next) => {
  res.status(400).send({ error: err.message });
});

export { app as accountRouter };
