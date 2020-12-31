// router实际是多个中间件的表达
/**
 * koa中间件的规范：
 *  1、⼀个async函数
 *  2、接收ctx和next两个参数
 *  3、任务结束需要执⾏next
 */

// 使用Router时首先是实例化  const router = new Router()， Router为一个class
// router实例中需要创建get、post请求的方法; get post传入两个参数： path与执行函数(即中间件函数)
// 最后使用app.use(router.routes()); Router中存在routes方法
class Router {
  constructor() {
    // 收集所有的方法
    this.stack = [];
  }

  get (path, middleware) {
    this.register(path, 'get', middleware);
  }
  post (path, middleware) {
    this.register(path, 'post', middleware);
  }
  // 注册一个中间件
  register (path, method, middleware) {
    let route  = { path, method, middleware };
    this.stack.push(route);
  }

  // app.use(router.routes()) routes()方法执行后应返回一个middleware，其有两个入参  ctx与next
  routes () {
    // 一个个执行
    let stock = this.stack;
    return async function (ctx, next) {

    }
  }
}

module.exports = Router;