import express from "express";
import banksRouter from "./routes/banksRouter.js";
const app = express();

app.use(express.json());
app.use(bankRouter);

app.listen(3000, () => {
  console.log("API Bank Started...");
});
