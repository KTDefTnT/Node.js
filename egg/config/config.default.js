/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // swaggerdoc配置
  config.swaggerdoc = {
    dirScanner: './app/controller',
    apiInfo: {
      title: 'egg-swagger',
      description: 'swagger-ui for egg',
      version: '1.0.0',
    },
    schemes: [ 'http', 'https' ],
    consumes: [ 'application/json' ],
    produces: [ 'application/json' ],
    securityDefinitions: {
      // apikey: {
      //   type: 'apiKey',
      //   name: 'clientkey',
      //   in: 'header',
      // },
      // oauth2: {
      //   type: 'oauth2',
      //   tokenUrl: 'http://petstore.swagger.io/oauth/dialog',
      //   flow: 'password',
      //   scopes: {
      //     'write:access_token': 'write access_token',
      //     'read:access_token': 'read access_token',
      //   },
      // },
    },
    enableSecurity: false,
    // enableValidate: true,
    routerMap: true, // 如果routerMap为true,允许自动生成API路由
    enable: true,
  };

  // jwt配置
  config.jwt = {
    secret: 'this is a jwt secrit',
    enable: true,
    match: /^\/api/, // 匹配中的路由则进行 jwt鉴权 will parse request body only when url path hit match pattern
  };

  // mongoose配置
  config.mongoose = {
    url: 'mongodb://127.0.0.1/egg',
    options: {},
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1610269745027_3857';

  // add your middleware config here
  // 中间件统一异常处理： middleware必须转换为驼峰形式
  // config.middleware = [ 'errorHandler' ];
  config.middleware = [];
  // 自定义统一异常处理
  config.onerror = {
    all(err, ctx) {
      // 所有的异常都在 app 上触发⼀个 error 事件，框架会记录⼀条错误⽇志
      ctx.app.emit('error', err, this);
      console.log('all33333', err.message);
      const status = err.status || 500;
      // 从 error 对象上读出各个属性，设置到响应中
      let error = status === 500 && ctx.app.env === 'prod' ?
        'Internal Server Error' :
        err.message;
      if (error.code === 'credentials_required') {
        // credentials_required, jwt鉴权
        error = '用户未登录或者登录超时，请重新登录！';
      }
      // ctx.body = {
      //   // 服务端⾃身的处理逻辑错误(包含框架错误500 及 ⾃定义业务逻辑错误533开始 ) 客户端请求参数导致的错误(4xx开始)，设置不同的状态码
      //   type: 'error',
      //   status,
      //   errorMessage: error,
      // };
      // 422是什么错误？？？？
      // if (status === 422) {
      //   ctx.body.detail = err.errors;
      // }
      ctx.status = 200;
      ctx.helper.success({ ctx, res: '', type: 'error', message: error, status });
    },
  };

  // config.notfound = {
  //   pageUrl: '/404.html',
  // };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
