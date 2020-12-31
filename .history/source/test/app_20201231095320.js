const Koa = require('../index');
const app = new Koa();

app.use((ctx) => {
  console.log('xxxxxx');
  ctx.body = 'welcome to koa';
});

app.listen(9090);