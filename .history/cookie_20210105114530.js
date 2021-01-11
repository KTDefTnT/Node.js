const http = require('http');
const app = http.createServer((req, res) => {
  let cookies = {};
  let cookie = req.headers.cookie;
  let msg = '欢迎第一次来到动物园';
  console.log(cookie.split(';'));
  // 说明不是第一次登录
  if (cookie && cookie.indexOf('userId') > -1) {
    msg = `动物园再次欢迎你`;
  } else {
    res.setHeader('Set-Cookie', ['userId=127398123892163', 'name=hulu']);
  }
  res.setHeader("Content-Type","text/plain; charset=utf-8");
  res.end(msg)
});
app.listen(3030);