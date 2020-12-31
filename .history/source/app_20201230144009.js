const Koa = require('./index');
const app = new Koa();

app.use(() => {
  console.log('xxxxxx');
});

app.listen(8089);