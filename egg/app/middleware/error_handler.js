'use strict';

/**
 * @param {*} options 中间件的配置项，框架会将 app.config[${middlewareName}] 传递进来
 * @param {*} app 当前应用 Application 的实例
 */
module.exports = (options, app) => async (ctx, next) => {
  // 异常捕获 为了保证异常可追踪，必须保证所有抛出的异常都是 Error 类型，因为只有 Error 类型才会带上堆栈信息，定位到问题。
  try {
    await next();
  } catch (err) {
    // 所有的异常都在 app 上触发⼀个 error 事件，框架会记录⼀条错误⽇志
    app.emit('error', err, this);
    const status = err.status || 500;
    // 从 error 对象上读出各个属性，设置到响应中
    const error = status === 500 && app.env === 'prod' ?
      'Internal Server Error' :
      err.message;
    ctx.body = {
      // 服务端⾃身的处理逻辑错误(包含框架错误500 及 ⾃定义业务逻辑错误533开始 ) 客户端请求参数导致的错误(4xx开始)，设置不同的状态码
      code: status,
      errorMessage: error,
    };
    // 422是什么错误？？？？
    if (status === 422) {
      ctx.body.detail = err.errors;
    }
    ctx.status = 200;
    next();
  }
};
