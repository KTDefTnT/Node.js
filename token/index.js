/**
 * 1）JWT 默认是不加密，但也是可以加密的。生成原始 Token 以后，可以用密钥再加密一次。
（2）JWT 不加密的情况下，不能将秘密数据写入 JWT。
（3）JWT 不仅可以用于认证，也可以用于交换信息。有效使用 JWT，可以降低服务器查询数据库的次数。
（4）JWT 的最大缺点是，由于服务器不保存 session 状态，因此无法在使用过程中废止某个 token，或者更改 token 的权限。
    也就是说，一旦 JWT 签发了，在到期之前就会始终有效，除非服务器部署额外的逻辑。
（5）JWT 本身包含了认证信息，一旦泄露，任何人都可以获得该令牌的所有权限。为了减少盗用，JWT 的有效期应该设置得比较短。
    对于一些比较重要的权限，使用时应该再次对用户进行认证。
（6）为了减少盗用，JWT 不应该使用 HTTP 协议明码传输，要使用 HTTPS 协议传输。
 */
const Koa = require('koa');
const static = require('koa-static')
const bodyParser = require('koa-bodyparser');
const jwt = require('jsonwebtoken');
const jwtAuth = require('koa-jwt');
const router = require('koa-router')();

const secret = 'this is a secret';
const app = new Koa();
// 返回静态文件
app.use(static(__dirname + '/'));
app.use(bodyParser())


router.post('/users/login-token', async ctx => {
  const { body } = ctx.request;
  const userInfo = body;
  ctx.body = {
    message: '登录成功！',
    data: userInfo,
    // 生成token给客户端
    token: jwt.sign({
      userInfo,
      jti: Math.random() * 999999,
      // 设置 token 过期时间，一小时后，秒为单位
      exp: Math.floor(Date.now() / 1000) + 60 * 60
    }, secret)
  }
});

router.get( "/users/getUser-token",
  jwtAuth({ secret }),
  async ctx => { 
  // 验证通过，state.user 
  const jwtxxx = await jwtAuth({ secret });
  console.log(jwtxxx); 
  console.log(ctx.state);
  //获取session 
  ctx.body = {
    message: "获取数据成功",
    userInfo: ctx.state.user.userInfo
  };
});

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3030);