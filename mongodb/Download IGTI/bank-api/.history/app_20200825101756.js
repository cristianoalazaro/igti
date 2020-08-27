import express from "express";
import banksRouter from "./routes/banksRouter.js";
//import mongoose from "mongoose";

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
    console.log("Conectado com sucesso");
  } catch (error) {
    console.log("Erro ao conectar no MongoDB. " + { error: error });
  }
})();

const app = express();

app.use(express.json());
app.use(banksRouter);

// funcao tratamento de erro 1
app.use((err, req, res, next) => {
  res.status(500).send("Ocorreu um erro, tente novamente mais tarde.");
});

app.listen(3000, () => {
  console.log("API Bank Started...");
});
