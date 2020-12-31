const Koa = require('../index');
const app = new Koa();

app.use((ctx) => {
  console.log('xxxxxx', ctx);
  ctx.body = '测试koa啦';
});

app.listen(9090);