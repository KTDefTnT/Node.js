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

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1610269745027_3857';

  // add your middleware config here
  // 中间件统一异常处理： middleware必须转换为驼峰形式
  config.middleware = [ 'errorHandler' ];
  // 自定义统一异常处理
  config.onerror = {
    all(err, ctx) {
      // 所有的异常都在 app 上触发⼀个 error 事件，框架会记录⼀条错误⽇志
      ctx.app.emit('error', err, this);
      const status = err.status || 500;
      // 从 error 对象上读出各个属性，设置到响应中
      const error = status === 500 && ctx.app.env === 'prod' ?
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
    },
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
