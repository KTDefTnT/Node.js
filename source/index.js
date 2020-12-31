const http = require('http')
let context = require('./context');
let request = require('./request');
let response = require('./response');

// 使用koa new Koa需要创建一个class
class Koa {
  constructor(){
    this.middlewares = []
  }

  listen (...args) {
    const server = http.createServer(async (req, res) => {
      // 创建上下文
      const ctx = this.createContext(req, res);
      // await this.callback(ctx);
      // 中间件合成
      console.log('middleware', this.middlewares);
      const fn = this.compoose(this.middlewares);
      // 执行合成函数并传入上下文
      await fn(ctx);
      // 响应
      res.end(ctx.body);
    });
    server.listen(...args);
  }

  // 实例化后存在一个use方法
  // koa中每一个use的方法 有ctx上下文以及一个next方法, 每一个use都是一个中间件
  use (middleware) {
    // this.callback = middleware;
    this.middlewares.push(middleware);
  }

  // 创建上下文
  createContext (req, res) {
    // 将request与response挂载到context上

    let ctx = Object.create(context);
    ctx.request = Object.create(request);
    ctx.response = Object.create(response);

    ctx.req = ctx.request.req = req;
    ctx.res = ctx.response.res = res;

    return ctx;
  }

  /**
   * 中间件 组合中间件， 每执行完一个都要继续去操作下一个(操作一致) 使用遍历最方便
   * Koa中间件机制：Koa中间件机制就是函数式 组合概念 Compoose的概念，将⼀组需要顺序执⾏的函数复合为⼀个函数，外层函数的参数实际是内层函数的返回值。
   * 洋葱圈模型可以形象表示这种机制，是源码中的精髓和难点。
   * @param {*} middlewares 
   * @return 返回一个复合函数
   */
  compoose (middlewares) {
    return function (ctx) {
      return dispatch(0);
      function dispatch(i) {
        const fn = middlewares[i];
        if (!fn) {
          return Promise.resolve();
        }
        return Promise.resolve(
          fn(ctx, function next () {
            return dispatch(i + 1);
          })
        );
      }
    }
  }
}

module.exports = Koa;