console.log('Aula ok');

window.addEventListener('load', start);

function start() {
  console.log('Página carregada com sucesso!');

  var input = document.querySelector('#nameInput');
  input.addEventListener('keyup', countName);

  var form = document.querySelector('form');
  form.addEventListener('submit', preventSubmit);
}

function countName(event) {
  //console.log(event);
  var count = event.target.value;
  var span = document.querySelector('#nameLength');

  span.textContent = count.length;
}

function preventSubmit(event) {
  event.preventDefault();
  console.log(event);
  var nameInput = document.querySelector('#nameInput').value;
  alert(nameInput + ' cadastrado com sucesso!');
}
