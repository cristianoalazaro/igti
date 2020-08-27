import express from "express";
import Accounts from "../models/Accounts";

const router = express.Router();

router.post("/account", async (req, res) => {
  try {
    const account = new Accounts(req.body);
    await account.save();

    res.send(account);
  } catch (error) {}
});

export default router;
