const PI = require("../models/PImodel");

const test = (req, res) => {
    res.send('Olá! Teste ao Controlador');
}

//listar pontos de interesse do bd
const details = (req, res) => {
    PI.find({}).then((pi)=>{
        res.send(pi);
    })
}

//adicionar ponto de interesse
const create = (req, res, next) => {
    PI.create(req.body).then((pi) => {
        res.send(pi);
    }).catch(next);
}
//adicionar novo ponto de interesse
/*const add = (req,res)=>{
    res.send({type:'POST'});
}*/

//atualizar ponto de interesse
const update = (req, res, next) => {
    //atualiza o PI e devolve na tela
    PI.findByIdAndUpdate({ _id: req.params.id }, req.body).then((pi) => {
        PI.findOne({ _id: req.params.id }).then((pi) => {
            res.send(pi)
        });
    }).catch(next);
}

//apagar ponto de interesse
const delete1 = (req, res, next) => {
    //apaga o PI e devolve o PI apagado
    PI.findByIdAndRemove({ _id: req.params.id }).then((pi) => {
        res.send(pi);
    }).catch(next);
}

module.exports = {
    test, details, update, delete1, create
}