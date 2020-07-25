window.addEventListener('load', () => {
  doMap();
  doFilter();
  doForeach();
  doReduce();
  doFind();
  doSome();
  doEvery();
  doSort();
});
function doMap() {
  const nameStateArray = people.results.map((person) => {
    return {
      name: person.name,
      state: person.location.state,
    };
  });
  console.log(nameStateArray);
  return nameStateArray;
}

function doFilter() {
  const liveInParana = people.results.filter((person) => {
    return person.location.state === 'Paraná';
  });
  console.log('live');
  console.log(liveInParana);
}

function doForeach() {
  const mappedPeople = doMap();
  mappedPeople.forEach((person) => {
    person.nameSize =
      person.name.title.length +
      person.name.first.length +
      person.name.last.length;
  });
  console.log(mappedPeople);
}

function doReduce() {
  const totalAges = people.results.reduce((accumulator, current) => {
    return accumulator + current.age;
  }, 0);
  console.log(totalAges);

  /* let sumAges = 0;

  for (let i = 0; i < people.results.length; i++) {
    var current = people.results[i];
    sumAges += current.age;
  }
  console.log(sumAges);*/
}

function doFind() {
  const found = people.results.find((person) => {
    return person.location.city === 'Bernardino de Campos';
  });
  console.log(found);
}

function doSome() {
  const found = people.results.some((person) => {
    return person.location.state === 'Amazonas';
  });
  console.log('found ' + found);
}

function doEvery() {
  const every = people.results.every((person) => {
    return person.location.country === 'Brasil';
  });
  console.log('every ' + every);
}

function doSort() {
  const mappedNames = people.results
    .map((person) => {
      return { name: person.name.first };
    })
    .filter((person) => {
      return person.name.startsWith('C');
    })
    .sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  console.log(mappedNames);
}
