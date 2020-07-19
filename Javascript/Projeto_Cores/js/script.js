window.addEventListener('load', start);

var range1 = document.querySelector('#range1');
var range2 = document.querySelector('#range2');
var range3 = document.querySelector('#range3');
var r = 0,
  g = 0,
  b = 0;
console.log(r, g, b);

function start() {
  range1.addEventListener('input', updateText);
  range2.addEventListener('input', updateText);
  range3.addEventListener('input', updateText);
  updateRGB(r, g, b);
}

function updateText(event) {
  if (event.target.id === 'range1') {
    document.querySelector('#text1').value = range1.value;
    updateRGB(range1.value, g, b);
  } else if (event.target.id === 'range2') {
    document.querySelector('#text2').value = range2.value;
    updateRGB(r, range2.value, b);
  } else if (event.target.id === 'range3') {
    document.querySelector('#text3').value = range3.value;
    b = range3.value;
    updateRGB(r, g, range3.value);
  }
}

function updateRGB(r, g, b) {
  this.r = r;
  this.g = g;
  this.b = b;
  document.querySelector('#cor').style.backgroundColor =
    'rgb(' + r + ',' + g + ',' + b + ')';
}
