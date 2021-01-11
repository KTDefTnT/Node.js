const http = require('http');
var sessions = {}; 
var key = 'session_id'; 
var EXPIRES = 20 * 60 * 1000;

var generate = function () {
  var session = {};
  // 生成一个随机数作为唯一的标识
  session.id = (new Date()).getTime() + Math.random();
  session.cookie = {
    expires: (new Date()).getTime() + EXPIRES
  }
  sessions[session.id] = session;
}
const app = http.createServer((req, res) => {
  const sessinKey = 'sid';
  const 
});

app.listen(3031);