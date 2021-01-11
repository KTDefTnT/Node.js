/**
  用户登录的时候，服务端生成一个唯一的会话标识，并以它为key存储数据
  会话标识在客户端和服务端之间通过cookie进行传输
  服务端通过会话标识可以获取到会话相关的信息，然后对客户端的请求进行响应；如果找到有效的会话，那么认为用户是未登陆状态
  会话会有过期时间，也可以通过一些操作（比如登出）来主动删除
 */
const Koa = require('koa');
const session = require('koa-session');
const cors = require('koa2-cors');
const bodyparser = require('koa-bodyparser');
const static = require('koa-static');
const router = require('koa-router')();

const app = new Koa();
// 配置跨域
app.use(cors({
  credentials: true
}));
app.keys = ['some Secret'];

app.use(static(__dirname + '/'));
app.use(bodyparser);
app.use(session(app));
// 统一鉴权，看请求接口是否已有session

// /users/login
router.post('/user/login', async (ctx, next) => {
  const { body } = ctx.request;
  console.log('boby');
  ctx.session = body;
  ctx.body = {
    message: '登录成功！'
  }
});
// /users/getUser
// router.post('/user/')
// /users/logout

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(7001);