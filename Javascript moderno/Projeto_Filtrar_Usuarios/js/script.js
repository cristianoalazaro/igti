let nameInput = document.querySelector('#name');
let listButton = document.querySelector('#find');

let usersPage = document.querySelector('.users');
let statisticsPage = document.querySelector('#statistic');

let filteredUsers = [];
let countUsers = 0;
let stringName = null;
let totalMales = 0;
let totalFemales = 0;
let agesSum = 0;

let allUsers = [];

window.addEventListener('load', () => {
  fetchUsers();
  listUsers();
});

async function fetchUsers() {
  const res = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  );
  const json = await res.json();
  allUsers = json.results.map((user) => {
    const { name, picture, dob, gender } = user;
    return {
      name: name.first + ' ' + name.last,
      nameUpper: (name.first + ' ' + name.last).toLocaleUpperCase(),
      picture: picture.thumbnail,
      age: dob.age,
      gender,
    };
  });
}

function listUsers(key) {
  function showButton(event) {
    stringName = event.target.value.toUpperCase();
    if (nameInput.value.trim() !== '') {
      listButton.removeAttribute('disabled');
      if (event.key === 'Enter') {
        renderUsers();
      }
    } else {
      listButton.setAttribute('disabled', '');
    }
  }

  nameInput.addEventListener('keyup', showButton);
  listButton.addEventListener('click', renderUsers);
}

function renderUsers() {
  let usersHTML = '<div>';
  let upperAllUsers = allUsers;

  filteredUsers = upperAllUsers.filter((user) => {
    return user.nameUpper.includes(stringName);
  });
  filteredUsers = filteredUsers.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  filteredUsers.forEach((user) => {
    const { name, picture, age, gender } = user;

    const userHTML = `
      <div>
        <div>
          <p><img src="${picture}" />  ${name}, ${age} anos</p>
        </div
      </div
    `;
    usersHTML += userHTML;
  });
  countUsers = filteredUsers.length;
  let totalUsers = document.querySelector('#countUsers');
  totalUsers.textContent = countUsers + ' usuário(s) encontrado(s)';
  usersHTML += '</div>';
  usersPage.innerHTML = usersHTML;
  renderStatistic();
}

function renderStatistic() {
  findMale();
  findFemale();
  sumAges();
  avgAges();
  let statisticsHTML = `
    <div>
      <h2>Estatísticas</h2>
      <p>Sexo masculino: <bold>${totalMales}</bold></p>
      <p>Sexo feminino: <bold>${totalFemales}</bold></p>
      <p>Soma das idades: <bold>${agesSum}</bold></p>
      <p>Média das idades: <bold>${avgAges()}</bold></p>
    </div>
  `;
  statisticsPage.innerHTML = statisticsHTML;
}

function findMale() {
  const totalMale = filteredUsers.filter((man) => {
    return man.gender === 'male';
  });
  totalMales = totalMale.length;
}

function findFemale() {
  const totalFemale = filteredUsers.filter((woman) => {
    return woman.gender === 'female';
  });
  totalFemales = totalFemale.length;
}

function sumAges() {
  agesSum = filteredUsers.reduce((acc, cur) => {
    return acc + cur.age;
  }, 0);
}

function avgAges() {
  const agesAVG = agesSum / countUsers;
  return agesAVG;
}
