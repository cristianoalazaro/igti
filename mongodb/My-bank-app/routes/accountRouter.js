import express from 'express';
import { accountModel } from '../models/accountModel.js';

const app = new express();
//use(express.json());

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

    const accounts = await accountModel.find({ agencia: agencia });
    res.send(accounts.length);
  } catch (error) {
    next(error);
  }
});

//Transferência de contas da mesma agência
app.patch('/account/transfer/', async (req, res, next) => {
  try {
    const accounts = req.body;
    const transferMoney = accounts.contaOrigem.balance;
    let sourceAccount = await validateAccount(accounts.contaOrigem);
    let targetAccount = await validateAccount(accounts.contaDestino);

    // valida se sera cobrado valor de 8 caso contas sejam de agencias diferentes
    if (sourceAccount.agencia !== targetAccount.agencia) {
      sourceAccount.balance -= 8;
    }

    // subtrai do saldo da conta origem o valor da transferencia
    // valida saldo mais valor do saque antes de efetivar de fato o saque
    sourceAccount.balance -= transferMoney; // valor + taxa de 1;
    if (sourceAccount.balance < 0) {
      throw new Error('saldo insuficiente para efetuar a transferencia');
    }

    // deposita o valor da tranferencia na conta de destino
    targetAccount.balance += transferMoney;

    // salva as alteracoes conta origem
    sourceAccount = new accountModel(sourceAccount);
    sourceAccount.save();

    // salva as alteracoes conta destino
    targetAccount = new accountModel(targetAccount);
    targetAccount.save();

    //retorna a conta origem com saldo atualizado
    res.send(sourceAccount);
  } catch (error) {
    next(error);
  }
});

// Item 9. Crie um endpoint para consultar a média do saldo dos clientes de determinada agência.
app.get('/account/averageBalance/:agencia', async (req, res, next) => {
  try {
    const agencia = req.params.agencia;
    const averageBalance = await accountModel.aggregate([
      {
        $match: {
          agencia,
        },
      },
      {
        $group: {
          _id: '$agencia',
          media: {
            $avg: '$balance',
          },
        },
      },
    ]);
    console.log(averageBalance);
    if (averageBalance.length === 0) {
      throw new Error('agencia nao encontrada');
    }
    res.send(averageBalance);
  } catch (error) {
    next(error);
  }
});

// Item 10. Crie um endpoint para consultar os clientes com o menor saldo em conta.
app.get('/account/smallByBalance/:limit/:order', async (req, res, next) => {
  try {
    const limit = Number(req.params.limit);
    const order = req.params.order;
    const topSmallBalance = await accountModel
      .find({})
      .limit(limit)
      .sort(order);
    if (topSmallBalance.length === 0) {
      throw new Error('nenhum cliente encontrado');
    }
    res.send(topSmallBalance);
  } catch (error) {
    next(error);
  }
});

// Item 11. Crie um endpoint para consultar os clientes mais ricos do banco.
app.get('/account/topRicher/:limit/:order', async (req, res, next) => {
  try {
    const limit = Number(req.params.limit);
    const order = req.params.order;
    const topRicher = await accountModel.find({}).limit(limit).sort(order);
    if (topRicher.length === 0) {
      throw new Error('nenhum cliente encontrado');
    }
    res.send(topRicher);
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

// Item 12. Crie um endpoint que irá transferir o cliente com maior saldo em conta de cada agência para a agência private agencia=99.
app.get('/account/transferToPrivate/', async (req, res, next) => {
  try {
    let transferToPrivates = await accountModel.aggregate([
      {
        $group: {
          _id: '$agencia',
          balance: { $max: '$balance' },
        },
      },
    ]);
    /*if (transferToPrivates.length === 0) {
      throw new Error("nenhuma conta apta para agencia Private");
    }*/
    for (const transferToPrivate of transferToPrivates) {
      const { _id, balance } = transferToPrivate;
      let newAccounts = await accountModel.findOne({
        agencia: _id,
        balance,
      });
      newAccounts.agencia = 99;
      newAccounts.save();
    }
    transferToPrivates = await accountModel.find({
      agencia: 99,
    });
    res.send(transferToPrivates);
  } catch (error) {
    next(error);
  }
});

//Tratamento de erro
app.use((err, req, res, next) => {
  res.status(400).send({ error: err.message });
});

export { app as accountRouter };
