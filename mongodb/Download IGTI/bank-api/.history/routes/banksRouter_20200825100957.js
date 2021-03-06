import express from "express";
import Accounts from "../models/Accounts.js";

const router = express.Router();

router.post("/account", async (req, res) => {
  try {
    const account = new Accounts(req.body);
    await account.save();

    res.send(account);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
