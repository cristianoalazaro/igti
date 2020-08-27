import express from "express";

const app = express();

app.use(express.json());
app.use(bankRouter);

app.listen(3000, () => {
  console.log("API Bank Started...");
});
