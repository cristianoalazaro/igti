import { promises as fs } from 'fs';
//import { create } from 'domain';

import readline from 'readline';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let statesFile = [];
let citiesFile = [];

let countStates = null;

main();

async function main() {
  statesFile = JSON.parse(await fs.readFile('Estados.json'));
  countStates = statesFile.length;
  citiesFile = JSON.parse(await fs.readFile('Cidades.json'));

  //createStatesWithCities();
  //countCitiesOfState();
}

async function createStatesWithCities() {
  for (let i = 0; i <= countStates; i++) {
    await fs.writeFile('./estados/' + statesFile[i].Sigla + '.json');

    await fs.appendFile(
      './estados/' + statesFile[i].Sigla + '.json',
      JSON.stringify(
        citiesFile.filter((city) => {
          return city.Estado === statesFile[i].ID;
        })
      )
    );
  }
}

async function countCitiesOfState() {
  rl.question('Digite o UF do estado: ', (uf) => {
    const filePath = './estados/' + uf.toUpperCase() + '.json';
    rl.close();
    let file = JSON.parse(await fs.readFile(filePath));
    console.log(file);
    const totalCities = file.length;
    console.log(totalCities);
  });
}
