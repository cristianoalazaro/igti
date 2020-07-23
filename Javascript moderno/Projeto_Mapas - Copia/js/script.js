let countCountries = document.querySelector('#countCountries');
let countFavorites = 0;

let totalPopulationList = 0;
let totalPopulationFavorites = 0;

let tabCountries = document.querySelector('#tabCountries');

allCountries = [];
allFavorites = [];

window.addEventListener('load', () => {
  fetchCountries();
});

async function fetchCountries() {
  const res = await fetch('http://restcountries.eu/rest/v2/all');
  const json = await res.json();
  allCountries = json.map((country) => {
    const { numericCode, name, flag, population } = country;
    return {
      id: numericCode,
      name,
      flag,
      population,
    };
  });
  render();
}

function render() {
  renderCountryList();
  renderFavorites();
  renderSummary();
}

function renderCountryList() {
  let countriesHTML = '<div>';
  allCountries.forEach((country) => {
    const { id, name, flag, population } = country;

    const countryHTML = `
    <div class="country">
      <div>
        <a id="${id}" class="waves-effect waves-light btn">+</a>
      </div>
      <div>
        <img src="${flag}" alt="${name}" />
      </div>
      <div>
        <ul>
        <li>${name}</li>
        <li>${population}</li>
        </ul>
      </div>
    </div>
    `;
    countriesHTML += countryHTML;
  });
  countriesHTML += '</div>';

  tabCountries.innerHTML = countriesHTML;
}

function renderFavorites() {
  let favoritesHTML = '<div>';
  allFavorites.forEach((country) => {
    const { id, name, flag, population } = country;

    const countryHTML = `
    <div class="country">
      <div>
        <a id="${id}" class="waves-effect waves-light btn red darken">+</a>
      </div>
      <div>
        <img src="${flag}" alt="${name}" />
      </div>
      <div>
        <ul>
        <li>${name}</li>
        <li>${population}</li>
        </ul
      </div>
    </div>
    `;
    favoritesHTML += countryHTML;
  });
  favoritesHTML += '</div>';
  allFavorites.innerHTML = favoritesHTML;
}

function renderSummary() {
  console.log('ok');
  countCountries.textContent = allCountries.length;
  countFavorites.textContent = allFavorites.length;

  const totalPopulation = allCountries.reduce((acc, cur) => {
    return acc + cur;
  }, 0);

  totalPopulationList.textContent = totalPopulation;
}
