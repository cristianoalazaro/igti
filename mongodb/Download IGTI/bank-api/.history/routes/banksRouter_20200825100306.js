import express from "express";

const router = express.Router();

router.post("/account", (res, req) => {

    res.send("Chegou!");
})

export default router;