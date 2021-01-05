const Koa = require('koa');
const session = require('koa-session');
const app = new Koa();

// 签名key keys作用 用来对cookie进行签名
app.keys = ['some secret'];
// session的配置项
const CONFIG = {
  key: 'session_id', // cookie键名
  maxAge: 86400000, // 有效期，默认一天
  httpOnly: true, // 仅服务器修改
  signed: true // 签名cookie
};

// 注册
app.use(session(CONFIG, app));

app.use(ctx => {
  if (ctx.path === '/favicon.ico') return;
  // 获取
  let n = ctx.session.count || 0;
  // 设置
  ctx.session.count = ++n;
  ctx.body = '第' + n + '次访问';
});

app.listen(3032)
