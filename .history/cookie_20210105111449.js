const http = require('http');
const app = http.createServer((req, res) => {
  res.end('hello')
});
app.listen(3030);