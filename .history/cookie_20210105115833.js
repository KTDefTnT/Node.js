const http = require('http');
const app = http.createServer((req, res) => {
  if (req.url === '/favicon.ico') {
    return;
  }
  let cookies = {};
  let cookie = req.headers.cookie;
  let msg = '欢迎第一次来到动物园';
  cookie.split(';').map(item => {
    let subCookie = item.split('=');
    cookies[subCookie[0]] = subCookie[1];
  });
  console.log(cookie, cookies);
  // 说明不是第一次登录
  if (cookie && Object.keys(cookies).includes('userId')) {
    msg = `动物园再次欢迎你`;
  } else {
    // 第二个参数使用数组会导致后续的key前面有个空格？
    res.setHeader('Set-Cookie', ['userId=127398123892163','name=hulu']);
  }
  res.setHeader("Content-Type","text/plain; charset=utf-8");
  res.end(msg)
});
app.listen(3030);