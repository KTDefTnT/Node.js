const http = require('http');
const app = http.createServer((req, res) => {
  console.log('resp', req);
  res.setHeader('Set-Cookie', 'userId=127398123892163');
  res.end('hello')
});
app.listen(3030);