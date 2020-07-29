import { promises as fs } from 'fs';
import { create } from 'domain';

let statesFile = [];
let citiesFile = [];

let countStates = null;

main();

async function main() {
  statesFile = JSON.parse(await fs.readFile('Estados.json'));
  countStates = statesFile.length;
  citiesFile = JSON.parse(await fs.readFile('Cidades.json'));

  createStatesWithCities();

  /*let state1 = statesFile.filter((state) => {
    return state.ID == 4;
  });
  console.log(state1);
  countStates = statesFile.length;*/

  //console.log(statesFile);
  //console.log(countStates);

  /*citysFile = JSON.parse(await fs.readFile('Cidades.json'));
  //console.log(citysFile);
  let state1 = (citysFile['estado'] = 1);
  console.log(state1);
}

function createCities() {
  citysFile = fs.readFile('Cidades.json');
  //console.log(citysFile);*/
}

function createStatesWithCities() {}
