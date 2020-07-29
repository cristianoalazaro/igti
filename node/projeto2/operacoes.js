const nome = 'Teste de Operações';

function soma(a, b) {
  return a + b;
}

function subtracao(a, b) {
  return a - b;
}

//padrão antigo
//module.exports = { soma, subtracao, nome };

//padrão novo - ES6
export default { soma, subtracao, nome };
