const http = require('http');
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
    console.log(cookie, cookies);
  }
  
  // 说明不是第一次登录
  if (cookie && Object.keys(cookies).includes('userId')) {
    msg = `动物园再次欢迎你`;
  } else {
    // 多个cookie键值对直接使用'; '进行分割，不是单纯的一个分号
    res.setHeader('Set-Cookie', ['type=ninja', 'language=javascript', 'userId=21379103iie23']);
  }
  res.setHeader("Content-Type","text/plain; charset=utf-8");
  res.end(msg)
});
app.listen(3030);