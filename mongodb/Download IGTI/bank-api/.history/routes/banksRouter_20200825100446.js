import express from "express";

const router = express.Router();

router.post("/account", (req, res) => {
  res.send("Chegou!");
});

export default router;
