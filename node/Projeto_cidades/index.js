import { promises as fs } from 'fs';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let statesFile = [];
let citiesFile = [];
let actualUf = null;

let countStates = null;
let countCitiesPerState = null;

main();

async function main() {
  statesFile = JSON.parse(await fs.readFile('Estados.json'));
  countStates = statesFile.length;
  citiesFile = JSON.parse(await fs.readFile('Cidades.json'));

  //createStatesWithCities();
  //countCitiesOfState();

  catchState();
}

async function createStatesWithCities() {
  const cidades = [];
  for (let i = 0; i <= countStates; i++) {
    await fs.writeFile(
      './estados/' + statesFile[i].Sigla + '.json',
      JSON.stringify(cidades)
    );

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

function catchState() {
  async function countCities() {
    let cities = JSON.parse(
      await fs.readFile('./estados/' + actualUf + '.json', 'utf-8')
    );
    console.log(cities.length);
  }
  rl.question('Digite o UF do estado: ', (uf) => {
    if (uf !== '') {
      actualUf = uf.toUpperCase();
      rl.close();
    }
    countCities();
  });

