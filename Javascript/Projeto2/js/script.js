var a = 7;
var b = 6;

if (a > b) {
  console.log(a + ' é maior que ' + b);
} else if (a === b) {
  console.log(a + ' é igual a ' + b);
} else {
  console.log(a + ' é menor que ' + b);
}

var dayOfWeek = 4;

switch (dayOfWeek) {
  case 1:
    console.log('Domingo');
    break;
  case 2:
    console.log('Segunda-feira');
    break;
  case 3:
    console.log('Terça-feira');
    break;
  case 4:
    console.log('Quarta-feira');
    break;
  case 5:
    console.log('Quinta-feira');
    break;
  case 6:
    console.log('Sexta-feira');
    break;
  case 7:
    console.log('Sábado');
    break;
  default:
    console.log('Dia inválido');
}

var a = 5;
var b = 5;
var resposta = a > b ? 'maior' : a < b ? 'menor' : 'igual';
console.log(a + ' é ' + resposta + ' que ' + b);

var contador = 1;
var n = 0;
while (contador <= 10) {
  n += contador;
  contador++;
  console.log(n);
}
console.log(n);

var cont = 1;
var n = 0;
do {
  n += cont;
  cont++;
  console.log(n);
} while (cont <= 10);

var soma = 0;
for (var i = 1; i <= 10; i++) {
  soma += i;
  console.log(soma);
}
