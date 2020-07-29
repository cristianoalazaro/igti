import { promises as fs } from 'fs';

//init();
writeReadJson();

//Utilizando promises com async await
/*async function init() {
  try {
    await fs.writeFile('teste.txt', 'bla bla bla');
    await fs.appendFile('teste.txt', '\nTeste append file');
    const data = await fs.readFile('teste.txt', 'utf-8');
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}*/

async function writeReadJson() {
  try {
    //Escrita com valores iniciais
    const arrayCarros = ['Gol', 'Palio', 'Uno'];
    const obj = {
      carros: arrayCarros,
    };
    await fs.writeFile('teste.json', JSON.stringify(obj));

    //leitura do conteudo atual
    const data = JSON.parse(await fs.readFile('teste.json'));

    //modificando o conteudo
    data.carros.push('Sandero');
    console.log(data);

    //sobrescrevendo o arquivo com o conteudo modificado
    await fs.writeFile('teste.json', JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
}

//Utilizando promises
/*fs.writeFile('teste.txt', 'bla bla bla')
  .then(() => {
    fs.appendFile('teste.txt', '\nteste append file')
      .then(() => {
        fs.readFile('teste.txt', 'utf-8').then((resp) => {
          console.log(resp);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((err) => {
    console.log(err);
  })
  .catch((err) => {
    console.log(err);
  });*/

//Utilizando callbacks
//import fs, { readFileSync } from 'fs';

//Assíncronas
/*console.log('1');
fs.writeFile('teste.txt', 'bla bla bla', function (err) {
  console.log('2');
  if (err) {
    console.log(err);
  } else {
    fs.appendFile('teste.txt', '\nteste appendFile', (err) => {
      if (err) {
        console.log(err);
      } else {
        fs.readFile('teste.txt', 'utf-8', (err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log(data);
          }
        });
      }
    });
  }
});
console.log('3');*/

//Síncronas
/*try {
  console.log('1');
  fs.writeFileSync('teste.txt', 'bla bla bla');
  console.log('2');
  const data = readFileSync('teste.txt', 'utf-8');
  console.log(data);
  console.log('3');
} catch (err) {
  console.log(err);
}*/
