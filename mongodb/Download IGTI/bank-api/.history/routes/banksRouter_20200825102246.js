import express from "express";
import Accounts from "../models/Accounts.js";

const router = express.Router();

router.post("/account", async (req, res, next) => {
  try {
    const account = new Accounts(req.body);
    await account.save();

    res.send(account);
  } catch (error) {
    next(error);
  }
});

// funcao tratamento de erro
router.use((err, req, res, next) => {
  res.status(500).send("Ocorreu um erro, tente novamente mais tarde. " + err);
  //res.send(err);
});

export default router;
