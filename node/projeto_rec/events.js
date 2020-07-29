import { EventEmitter } from 'events';

const eventEmitter = new EventEmitter();

eventEmitter.on('teste', (obj) => {
  console.log(obj);
});

export default eventEmitter;
