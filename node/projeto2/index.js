//padrão antigo
//const operacoes = require('./operacoes.js');
//const op = require('./operacoes2.js');

//padrão novo - ES6
import operacoes from './operacoes.js';
import op from './operacoes2.js';
import { divisao, resto } from './operacoesNomeados.js';

console.log(operacoes.soma(2, 3));
console.log(operacoes.subtracao(5, 1));
console.log(operacoes.nome);

console.log(op(3, 4));

console.log(divisao(10, 2));
console.log(resto(10, 3));
