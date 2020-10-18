const express = require('express');
const bodyParser = require('body-parser');

const app = express();

let port = 5000;

app.listen(process.env.port || port,()=>{
    console.log('Servidor em execução na porta: '+port);
});

app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send('End point inválido');
});

const routes = require('./routes/api');
app.use('/api',routes);

//erro handling middleware
app.use((err,req,res,next)=>{
    console.log(err);
    //muda o status
    res.status(400).send({error:err.message});
})

const mongoose = require('mongoose');

//conectar ao banco
mongoose.connect('mongodb+srv://cristianoalazaro:clazaro@cluster0.f1162.azure.mongodb.net/PontosInteresse?retryWrites=true&w=majority');

//confirmar a conexão
mongoose.connection.on('connected', ()=>{
    console.log('Conectado ao banco '+'test');
});

//menssagem de erro
mongoose.connection.off('error', (err)=>{
    console.log('Erro de conexão '+err);
});

