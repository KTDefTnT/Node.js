const EventEmitter = require('./eventEmitter');

const events = new EventEmitter();
events.on('connect', (payload) => {
  console.log('xxxx', payload);
});

setInterval(() => {
  events.emit('connect', '参数1', '参数2');
}, 2000);

// console.log('EventEmitter', EventEmitter);