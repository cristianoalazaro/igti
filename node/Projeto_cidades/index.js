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
  //catchState();
  //catchTopFive();
  catchLittleFive();
  //catchLargerName();
  //catchSmallerName();
  //catchLargerNameOfAll();
  //catchSmallerNameOfAll();
  rl.close();
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
}

function catchTopFive() {
  const states = [];
  const cities = [];
  const count = [];
  let count2 = [];

  citiesFile.forEach((city) => {
    cities.push(city);
  });

  statesFile.forEach((state) => {
    let cities2 = cities.filter((res) => {
      return res.Estado === state.ID;
    });
    let countCidades = cities2.length;
    states.push({
      id: state.ID,
      uf: state.Sigla,
      cidades: { cities2 },
      total_cidades: countCidades,
    });
  });
  states.forEach((state) => {
    count.push({ a: state.uf, b: state.total_cidades });
  });
  count.sort((a, b) => {
    return b.b - a.b;
  });
  count2 = count.slice(0, 5);

  console.log(count2);
}

function catchLittleFive() {
  const states = [];
  const cities = [];
  const count = [];
  let count2 = [];

  citiesFile.forEach((city) => {
    cities.push(city);
  });

  statesFile.forEach((state) => {
    let cities2 = cities.filter((res) => {
      return res.Estado === state.ID;
    });
    let countCidades = cities2.length;
    states.push({
      id: state.ID,
      uf: state.Sigla,
      cidades: { cities2 },
      total_cidades: countCidades,
    });
  });
  states.forEach((state) => {
    count.push({ a: state.uf, b: state.total_cidades });
  });
  count.sort((a, b) => {
    return a.b - b.b;
  });
  count2 = count.slice(0, 5).sort((a, b) => {
    return b.b - a.b;
  });

  console.log(count2);
}

function catchLargerName() {
  const states = [];
  const cities = [];
  citiesFile.forEach((city) => {
    cities.push(city);
  });

  statesFile.forEach((state) => {
    let cities2 = cities.filter((res) => {
      return res.Estado === state.ID;
    });
    states.push({
      id: state.ID,
      uf: state.Sigla,
      cidades: { cities2 },
    });
  });

  let state2 = [];
  let largerName = '';

  states.forEach((state) => {
    cities.forEach((city) => {
      if (city.Estado === state.id) {
        if (city.Nome.length > largerName.length) {
          largerName = city.Nome;
        }
      }
    });
    state2.push({ city: largerName, uf: state.uf });
    largerName = '';
  });
  console.log(state2);
}

function catchSmallerName() {
  const states = [];
  const cities = [];
  citiesFile.forEach((city) => {
    cities.push(city);
  });

  statesFile.forEach((state) => {
    let cities2 = cities.filter((res) => {
      return res.Estado === state.ID;
    });

    states.push({
      id: state.ID,
      uf: state.Sigla,
      cidades: { cities2 },
    });
  });

  let state2 = [];
  let smallerName =
    'ddsljfldksfjlsdfjsldkfjsdlfjsldkfjsldfjsdlfjsdfkjdslfjsdfkjsdfj';

  states.forEach((state) => {
    cities.forEach((city) => {
      if (city.Estado === state.id) {
        if (city.Nome.length < smallerName.length) {
          smallerName = city.Nome;
        }
      }
    });
    state2.push({ city: smallerName, uf: state.uf });
    smallerName =
      'ddsljfldksfjlsdfjsldkfjsdlfjsldkfjsldfjsdlfjsdfkjdslfjsdfkjsdfj';
  });
  console.log(state2);
}

function catchLargerNameOfAll() {
  const states = [];
  const cities = [];
  citiesFile.forEach((city) => {
    cities.push(city);
  });

  statesFile.forEach((state) => {
    let cities2 = cities.filter((res) => {
      return res.Estado === state.ID;
    });

    states.push({
      id: state.ID,
      uf: state.Sigla,
      cidades: { cities2 },
    });
  });

  let largerCity = '';
  let newState = [];
  let newState2 = [];
  let newCityWithState = [];
  let newCityWithState2 = [];

  cities.forEach((city) => {
    if (city.Nome.length > largerCity.length) {
      largerCity = city.Nome;
      newState = city.Estado;
    }
  });

  newState2 = states.filter((res) => {
    return res.id === newState;
  });

  newCityWithState.push({ ...newState2, largerCity });
  newCityWithState2 = newCityWithState.map((res) => {
    return res;
  });
  console.log(newCityWithState);
}

function catchSmallerNameOfAll() {
  const states = [];
  const cities = [];
  citiesFile.forEach((city) => {
    cities.push(city);
  });

  statesFile.forEach((state) => {
    let cities2 = cities.filter((res) => {
      return res.Estado === state.ID;
    });

    states.push({
      id: state.ID,
      uf: state.Sigla,
      cidades: { cities2 },
    });
  });

  let smallerCity =
    'sdkfsdkfhsdkfhskdfhskdfhskdfjhskdfjhsdkfhskdfjhsdkfhsdkfkjhsdf';
  let newState = [];
  let newState2 = [];
  let newCityWithState = [];
  let newCityWithState2 = [];

  cities.forEach((city) => {
    if (city.Nome.length < smallerCity.length) {
      smallerCity = city.Nome;
      newState = city.Estado;
    }
  });

  newState2 = states.filter((res) => {
    return res.id === newState;
  });

  newCityWithState.push({ ...newState2, smallerCity });
  newCityWithState2 = newCityWithState.map((res) => {
    return res;
  });
  console.log(newCityWithState2);
}
