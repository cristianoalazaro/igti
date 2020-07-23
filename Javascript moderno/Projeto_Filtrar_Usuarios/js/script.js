let nameInput = document.querySelector('#name');
let listButton = document.querySelector('#find');
let users = document.querySelector('.users');
let countUsers = 0;

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
      name: name.first + name.last,
      picture: picture.thumbnail,
      age: dob.age,
      gender,
    };
  });
  console.log(allUsers);
}

function listUsers(key) {
  function showButton(event) {
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

  allUsers.forEach((user) => {
    const { name, picture, age, gender } = user;

    const userHTML = `
      <div>
        <div>
          <p><img src="${picture}" />  ${name}, ${age}</p>
        </div
      </div
    `;
    usersHTML += userHTML;
  });
  countUsers = allUsers.length;
  let totalUsers = document.querySelector('#countUsers');
  totalUsers.textContent = countUsers + ' usuário(s) encontrado(s)';
  usersHTML += '</div>';
  users.innerHTML = usersHTML;
}
