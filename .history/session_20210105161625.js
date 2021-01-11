const http = require('http');
var sessions = {}; 
var sessionKey = 'session_id'; 
var EXPIRES = 20 * 60 * 1000;

var generate = function () {
  var session = {};
  // 生成一个随机数作为唯一的标识
  session.id = (new Date()).getTime() + Math.random();
  session.cookie = {
    expires: (new Date()).getTime() + EXPIRES
  }
  // 在内存中设置用户数据
  sessions[session.id] = {
    ...session,
    username: '焦糖瓜子',
    password: 123456,
    isVip: true
  }
  return session;
}

var seralize = function (name, value, opt = {}) {
  var params = [`${name}=${value}`]
  // 设置失效时间，告知浏览器Cookie多久之后失效
  opt.maxAge && params.push(`Max-Age=${opt.maxAge}`);
  // 可以访问该Cookie的域名。
  // 如果设置为“.google.com”，则所有以“google.com”结尾的域名都可以访问该Cookie。注意第一个字符必须为“.”
  opt.domain && params.push(`Domian=${opt.domain}`);
  // 该Cookie的使用路径。
  // 如果设置为“/sessionWeb/”，则只有contextPath为“/sessionWeb”的程序可以访问该Cookie。如果设置为“/”，则本域名下contextPath都可以访问该Cookie。注意最后一个字符必须为“/”
  opt.path && params.push(`Path=${opt.path}`);
  // Expires的值是一个UTC格式的时间字符串，告知浏览器此Cookie何时将过期，Max-Age则告知浏览器此Cookie多久后过期
  opt.expires && params.push(`Expires=${opt.expires.toUTCString()}`);
  // HttpOnly告知浏览器不允许通过脚本document.cookie去更改这个Cookie值，
  opt.httpOnly && params.push(`HttpOnly`);
  // 当Secure值为true时，在HTTP中是无效的，在HTTPS中才有效
  opt.secure && params.push(`Secure`);
  return params.join('; ');
}

const app = http.createServer((req, res) => {
  if (req.url === '/favicon.ico') {
    return;
  }
  let cookies = {};
  let session = {};
  let cookie = req.headers.cookie;
  let msg = '欢迎第一次来到动物园_session';
  if (cookie) {
    cookie.split('; ').map(item => {
      let subCookie = item.split('=');
      cookies[subCookie[0]] = subCookie[1];
    });
  }
  console.log('cookie', cookie, cookies);
  if (Object.keys(cookies).length > 0) {
    let id = cookies[sessionKey];
    session = sessions[id];
    if (session && session.cookie.expires > (new Date()).getTime()) {
      // 更新用户cookie过期时间
      session.cookie.expires = (new Date()).getTime() + EXPIRES;
    } else {
      // 用户已超时 强制退出登录 删除cookie, 重新生成session
      delete sessions[id];
      session = generate();
    }
    console.log(cookies[id], sessions[id]);
    msg = `动物园再次欢迎你_session`;
  } else {
    session = generate();
  }
  res.setHeader('Set-Cookie', seralize(sessionKey, session.id));
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.end(msg);
});

app.listen(3031);