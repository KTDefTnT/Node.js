const Koa = require('koa')
const router = require('koa-router')()
const static = require('koa-static')
const app = new Koa();
const axios = require('axios')
const querystring = require('querystring')

app.use(static(__dirname + '/'));
const config = {
  client_id: 'd2f3b172819db9077205',
  client_secret: '04e7cff0643b27041e7e2cb0c4a85822e62c7b66'
}

router.get('/github/login', async (ctx) => {
    var dataStr = (new Date()).valueOf();
    //重定向到认证接口,并配置参数
    var path = "https://github.com/login/oauth/authorize";
    path += '?client_id=' + config.client_id;

    //转发到授权服务器
    ctx.redirect(path);
})
router.get('/auth/github/callback', async (ctx) => {
    console.log('callback..')
    const code = ctx.query.code;
    const params = {
        client_id: config.client_id,
        client_secret: config.client_secret,
        code: code
    }
    let res = await axios.post('https://github.com/login/oauth/access_token', params)
    console.log('res1',res.data);
    const access_token = querystring.parse(res.data).access_token
    console.log('querystring', querystring.parse(res.data));
    console.log('access_token', querystring.parse(res.data).access_token);
    res = await axios.get('https://api.github.com/user?access_token=' + access_token)
    console.log('userAccess:', res.data)
    ctx.body = `
        <h1>Hello ${res.data.login}</h1>
        <img src="${res.data.avatar_url}" alt=""/>
    `

})

app.use(router.routes()); /*启动路由*/
app.use(router.allowedMethods());
app.listen(7002);