//imports
import express from 'express';
import mongoose from 'mongoose';
import { accountRouter } from './routes/accountRouter.js';

//Conexão com o mongoDB
mongoose
  .connect(
    'mongodb+srv://cristianoalazaro:clazaro@cluster0.f1162.azure.mongodb.net/my-bank?retryWrites=true&w=majority',
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

app.put('/student/:id', async(((req, res) = {})));

const app = express();
app.use(express.json());
app.use(accountRouter);

app.listen(3000, () => {
  console.log('API iniciada!');
});
