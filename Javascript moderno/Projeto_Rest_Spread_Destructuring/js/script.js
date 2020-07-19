window.addEventListener('load', () => {
  doSpread();
  doRest();
  doDestructurig();
});

function doSpread() {
  const marriedMen = people.results.filter(
    (person) => person.name.title === 'Mr'
  );
  const marriedWomen = people.results.filter(
    (person) => person.name.title === 'Ms'
  );
  const marriedPeople = [...marriedMen, ...marriedWomen, { msg: 'oi' }];
  console.log(marriedPeople);
}

function doRest() {
  console.log(infiniteSum(1, 2));
  console.log(infiniteSum(1, 2, 5, 7, 9, 10));
  console.log(infiniteSum(1, 2, 10, 123, 1000, 23567));
}

function infiniteSum(...numbers) {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}

function doDestructurig() {
  const first = people.results[0];
  //Repetitivo
  //const username = first.login.username;
  //const password = first.login.password;

  //Usando o destructuring
  const { username, password } = first.login;

  console.log(first);
  console.log(username);
  console.log(password);
}
