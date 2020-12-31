const Koa = require('../index');
const app = new Koa();

app.use((ctx, next) => {
  ctx.body = 'welcome(1)';
  next();
});
app.use((ctx, next) => {
  ctx.body = `${ctx.body} to(2)`;
  next();
});
app.use((ctx) => {
  ctx.body = `${ctx.body} Koa(3)`;
})

app.listen(9090);