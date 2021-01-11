const http = require('http');
const app = http.createServer((req, res) => {
  let cookies = {};
  let cookie = req.cookie;
  let msg = '欢迎第一次来到动物园';
  
  // 说明不是第一次登录
  if (cookie && cookie.userId) {
    console.log('COOKIE', cookie, cookies);
    msg = `动物园再次欢迎你`;
  } else {
    res.setHeader('Set-Cookie', 'userId=127398123892163');
  }
  res.end(msg)
});
app.listen(3030);