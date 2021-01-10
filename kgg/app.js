const Koa = require('koa');
const { initRouter, initController } = require('./loader');

class application {
  constructor (options) {
    this.$app = new Koa();
    // 1、将ctrl挂载在app上  传入app
    this.$ctrl = initController(this);
    // 初始化路由
    this.$router = initRouter(this);
    this.$app.use(this.$router.routes());
    // console.log(this.$ctrl);
  }

  // 给外部提供一个启动函数
  start (port) {
    this.$app.listen(port);
  }
}

module.exports = application;