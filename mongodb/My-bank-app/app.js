//imports
import express from 'express';
import mongoose from 'mongoose';
import { accountRouter } from './routes/accountRouter.js';

require('dotenv').config();

//Conexão com o mongoDB
mongoose
  .connect(
    `mongodb+srv://${process.env.DBUSER}:${process.env.DBPWD}'@cluster0.f1162.azure.mongodb.net/my-bank?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  )
  .then(console.log('Conectado com sucesso ao mongoDB!'))
  .catch((err) => {
    console.log('Erro ao conectar com o mongoDB: ' + err);
  });

const app = express();
app.use(express.json());
app.use(accountRouter);

app.listen(process.env.PORT, () => {
  console.log('API iniciada!');
});
