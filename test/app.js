const Koa = require('../source/index');
const Router = require('../source/router');
// const Router = require('./router');
const app = new Koa();

app.use((ctx, next) => {
  ctx.body = 'welcome(1)';
  next();
});
app.use((ctx, next) => {
  ctx.body = `${ctx.body} to(2)`;
  next();
});
app.use((ctx, next) => {
  ctx.body = `${ctx.body} Koa(32) ====`;
  next();
});

// 使用路由
const router = new Router();
// router.get('/index', (ctx) => ctx.body += ' There is index page');
// router.get('/home', (ctx) => ctx.body += ' There is home page');
// router.get('/about', (ctx) => ctx.body += ' There is about page');
router.get('/index', async ctx => { ctx.body += 'index page'; });
router.get('/post', async ctx => { ctx.body += 'post page'; });
router.get('/list', async ctx => { console.log(ctx);ctx.body += 'list page'; });

app.use(router.routes());

app.listen(9090);