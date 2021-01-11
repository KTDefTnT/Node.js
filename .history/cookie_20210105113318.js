const http = require('http');
const app = http.createServer((req, res) => {
  let cookie = req.cookie;
  let msg = '欢迎第一次参观！';
  console.log('COOKIE', cookie);
  // 说明不是第一次登录
  if (cookie && cookie.userId) {

  } else {
    res.setHeader('Set-Cookie', 'userId=127398123892163');
  }
  res.end(msg)
});
app.listen(3030);