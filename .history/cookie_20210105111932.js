const http = require('http');
const app = http.createServer((req, res) => {
  console.log('resp', req);
  res.end('hello')
});
app.listen(3030);