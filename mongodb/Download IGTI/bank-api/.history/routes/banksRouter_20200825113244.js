import express from "express";
import Accounts from "../models/Accounts.js";

const router = express.Router();

// Item 4 - Crie um endpoint para registrar um depósito em uma conta
router.post("/account/deposit/", (req, res) => {
  try {
    const newDeposit = new Accounts(req.body).find();
    console.log(newDeposit);
  } catch (error) {
    next(error);
  }
});

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
