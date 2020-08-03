import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  throw new Error('Error Message Test');
});

app.post('/', async (req, res, next) => {
  try {
    throw new Error('Error Message Async');
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.log('Error 1');
  next(err);
});

app.use((err, req, res, next) => {
  console.log('Error 2');
  res.status(500).send('Ocorreu um erro. Tente novamente mais tarde');
});

app.listen(3000, () => {
  console.log('API started!');
});
