// const Koa = require('koa');
// const app = new Koa();
// const { initRouter, initController } = require('./loader');

// // 初始化控制器，将控制器挂载在app上  即需要将app传入controller中
// initController(app);
// app.use(async (ctx, next) => {
//   const { url } = ctx.request;
//   if (url === '/favicon.ico') {
//     return;
//   }
//   next();
// });

// app.use(initRouter().routes());


// app.listen(3000);

const App = require('./app');
const app = new App();

app.start(3000);