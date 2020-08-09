class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} falando`);
  }
}

class Dog extends Animal {
  constructor(name, type) {
    super(name);
    this.type = type;
  }

  speak() {
    console.log(`${this.name} (${this.type}) latindo`);
  }
}

class Cat extends Animal {
  constructor(name, type) {
    super(name);
    this.type = type;
  }

  speak() {
    console.log(`${this.name} (${this.type}) miando`);
  }
}

const animal = new Animal('Totó');
const dog = new Dog('Dingo', 'pincher');
const cat = new Cat('Mel', 'comum');

animal.speak();
dog.speak();
cat.speak();
