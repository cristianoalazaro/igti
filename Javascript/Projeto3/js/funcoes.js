function sum(a, b) {
  return a + b;
}

function compareNumbers(a, b) {
  var resposta = a > b ? 'maior' : a < b ? 'menor' : 'igual';
  return a + ' é ' + resposta + ' que ' + b;
}

console.log(sum(10, 20));

console.log(compareNumbers(100, 20));

function superSum(from, upTo) {
  var sum = 0;
  for (var i = from; i <= upTo; i++) {
    sum += i;
  }
  return sum;
}

console.log(superSum(1, 10));
console.log(superSum(9, 100));
console.log(superSum(1, 10000));
