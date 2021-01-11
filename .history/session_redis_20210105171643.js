const Koa = require('koa');
const session = require('koa-session');
const app = new Koa();

// 签名key keys作用 用来对cookie进行签名
app.keys = ['some secret'];
// session的配置项
const sessionConf = {
  key: 'session_id', // cookie键名
  maxAge: 86400000, // 有效期，默认一天
  httpOnly: true, // 仅服务器修改
  signed: true // 签名cookie
};

app.use();

app.listen(3032)
