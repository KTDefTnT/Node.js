const Koa = require('../index');
const app = new Koa();

app.use((ctx) => {
  console.log('xxxxxx', ctx);
});

app.listen(8089);