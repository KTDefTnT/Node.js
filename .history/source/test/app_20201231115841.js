const Koa = require('../index');
const Router = require('../router');
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
});

// 使用路由
const router = new Router();
router.get('/index', (ctx) => ctx.body += ' There is index page');
router.get('/home', (ctx) => ctx.body += ' There is home page');
router.get('/about', (ctx) => ctx.body += ' There is about page');
console.log('router', router.routes());

app.use(router.routes());

app.listen(9090);