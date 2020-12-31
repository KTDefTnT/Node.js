const Koa = require('./index');
const app = new Koa();

app.use((req, res) => {
  console.log('xxxxxx');
});

app.listen(8089);