const http = require('http');
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
  let cookie = req.headers.cookie;
  let msg = '欢迎第一次来到动物园';
  if (cookie) {
    cookie.split('; ').map(item => {
      let subCookie = item.split('=');
      cookies[subCookie[0]] = subCookie[1];
    });
  }
  console.log(cookie, res.getHeader('Cookie'), res.getHeader('Accept-Language'));
  // 说明不是第一次登录
  if (cookie && Object.keys(cookies).includes('userId')) {
    msg = `动物园再次欢迎你`;
  } else {
    // 多个cookie键值对直接使用'; '进行分割，不是单纯的一个分号
    res.setHeader('Set-Cookie', [seralize('type', 'jiaotangguazi'), seralize('language', 'javascipt'), seralize('userId', '29173iu23872h', { maxAge: 60 })]);
    // res.setHeader('Set-Cookie', ['type=ninja', 'language=javascript', 'userId=21379103iie23']);
  }
  res.setHeader("Content-Type","text/plain; charset=utf-8");
  res.end(msg)
});
app.listen(3030);