const Koa = require('koa');
const { initRouter, initController, initService } = require('./loader');

class application {
  constructor (options) {
    this.$app = new Koa();
    //! 初始化的顺序必须正确，后续的依赖前面的挂载  service->controller->router
    // 初始化service
    this.$service = initService();
    // 1、将ctrl挂载在app上  controller中想要调用service则需要传入this，获取挂载在this上的$service
    this.$ctrl = initController(this);
    // 初始化路由, router中可能需要使用controller，controller挂载this上，传入this 
    this.$router = initRouter(this);
    this.$app.use(this.$router.routes());
  }

  // 给外部提供一个启动函数
  start (port) {
    this.$app.listen(port);
  }
}

module.exports = application;