import express from "express";
import banksRouter from "./routes/banksRouter.js";
import mongoose from "mongoose";

(async () => {
  try {
    console.log("Conectando ao MongoDB... ");
    await mongoose.connect(
      "mongodb+srv://igti:fullstack@cluster0.pv9x2.mongodb.net/igti_modulo_4?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    );
    console.log("Conectado com sucesso ao MongoDB");
  } catch (error) {
    console.log("Erro ao conectar no MongoDB. " + error);
  }
})();

const app = express();

app.use(express.json());
app.use(banksRouter);

app.listen(3000, () => {
  console.log("API Bank Started...");
});
