import express from 'express';
import mongoose from 'mongoose';
import { studentRouter } from './routes/studentRouter.js';

mongoose
  .connect(
    'mongodb+srv://cristianoalazaro:clazaro@cluster0.f1162.azure.mongodb.net/grades?retryWrites=true&w=majority',
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
app.use(studentRouter);

app.listen(3000, () => {
  console.log('API iniciada!');
});
