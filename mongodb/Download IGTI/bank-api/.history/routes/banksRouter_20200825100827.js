import express from "express";
import Accounts from "../models/Accounts";

const router = express.Router();

router.post("/account", (req, res) => {
  try {
    const account = new Accounts(req.body);
  } catch (error) {}
});

export default router;
