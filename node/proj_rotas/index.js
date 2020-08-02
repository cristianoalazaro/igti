import express from 'express';

const app = express();

app.all('/testAll', (req, res) => {
  res.send(req.method);
});

app.get('/teste?', (req, res) => {
  res.send('/teste?');
});

app.get('/buzz+', (_, res) => {
  res.send('buzz');
});

app.listen(3000, () => {
  console.log('API started!');
});
