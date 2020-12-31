const http = require('http')
let context = require('./context');
let request = require('./request');
let response = require('./response');

// 使用koa new Koa需要创建一个class
class Koa {
  constructor(){
    // this.middlewares = []
  }

  listen (...args) {
    const server = http.createServer(async (request, response) => {
      // 创建上下文
      const ctx = this.createContext(request, response);
      this.callback(ctx);
      // 响应
      response.end(ctx.body);
    });
    server.listen(...args);
  }

  // 实例化后存在一个use方法
  // koa中每一个use的方法 有ctx上下文以及一个next方法
  use (middleware) {
    this.callback = middleware;
  }

  // 创建上下文
  createContext (req, res) {
    // 将request与response挂载到context上
    let ctx = Object.create(context);
    ctx.request = Object.create(request);
    ctx.response = Object.create(response);

    ctx.req = ctx.request.req = req;
    ctx.res = ctx.response.res = res;
    console.log('resquest', request);
    return ctx;
  }
}

module.exports = Koa;