/**
  用户登录的时候，服务端生成一个唯一的会话标识，并以它为key存储数据
  会话标识在客户端和服务端之间通过cookie进行传输
  服务端通过会话标识可以获取到会话相关的信息，然后对客户端的请求进行响应；如果找到有效的会话，那么认为用户是未登陆状态
  会话会有过期时间，也可以通过一些操作（比如登出）来主动删除
 */

// 获取cookie列表
var seralize = function (cookie) {
  let cookies = {};
  if (cookie) {
    cookie.split('; ').map(item => {
      let subCookie = item.split('=');
      cookies[subCookie[0]] = subCookie[1];
    });
  }
  return cookies;
}
const Koa = require('koa');
const session = require('koa-session');
const cors = require('koa2-cors');
const bodyparser = require('koa-bodyparser');
const static = require('koa-static');
const router = require('koa-router')();

// 使用redis缓存用户数据
const redisStore = require('koa-redis');
const redis = require('redis');
const wrapper = require('co-redis');
const redisClient = redis.createClient(6379, "localhost");
const client = wrapper(redisClient);

const app = new Koa();
// 配置跨域
app.use(cors({
  credentials: true
}));
app.keys = ['some Secret'];

const CONFIG = {
  key: 'sid',
  store: redisStore({ client })
}

app.use(static(__dirname + '/'));
app.use(bodyparser());
app.use(session(CONFIG, app));
// 统一鉴权，检查用户是否已登录
app.use(async (ctx, next) => {
  // 判断是否为login请求
  let url = ctx.url;
  if (url === '/login' || url === '/favicon.ico') {
    next();
  } else {
    // 判断是否已存在cookie，即是否已登录
    const cookies = seralize(ctx.header.cookie);
    if (!cookies.includes(CONFIG.key)) {
      ctx.body = {
        message: '您还未登录，请先登录！'
      }
    } else {
      next();
    }
  }
});

// /users/login
router.post('/login', async (ctx, next) => {
  const { body, header } = ctx.request;
  // 在redis中保存数据
  // const cookies = seralize(header.cookie);
  // 在redis中设置sid的值
  // client.set('externalKey', body)
  // ctx.session.userInfo = body;
  await ctx.session.save();
  console.log('session', ctx.session);
  console.log('ctx.response.header', ctx.response.header);
  ctx.body = {
    message: '登录成功！'
  }
  next();
});

// /users/getUser
router.get('/users/getUser', async (ctx, next) => {
  const { header } = ctx.request;
  const cookies = seralize(header.cookie);
  ctx.body = {
    message: "获取数据成功",
    // userInfo: ctx.session.userInfo
    // userInfo从redis中获取
    userInfo: client.get(cookies[CONFIG.key])
  }
});

// /users/logout
router.post('/logout', async (ctx, next) => {
  // delete ctx.session.userInfo;
  // 删除redis中缓存的数据
  const { header } = ctx.request;
  const cookies = seralize(header.cookie);
  client.del(cookies[CONFIG.key]);
  ctx.body = {
    message: '登出成功！'
  };
  next();
});

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000);