const fs = require('fs');
const path = require("path");
const Router = require('koa-router');
const schedule = require('node-schedule')

function load (filepath, callback) {
  // 获取文件绝对路径
  const dirPath = path.resolve(__dirname, filepath);
  // 读取目录下的文件
  const files = fs.readdirSync(dirPath);

  // 遍历 处理每个文件
  files.map(fileFullName => {
    const filename = fileFullName.replace('.js', '');
    const file = require(`${dirPath}/${filename}`);
    callback(filename, file);
  });
}

/**
 * 初始化路由
 */
function initRouter (app) {
  const router = new Router()
  load('./routes', (filename, routes) => {
    // index前缀判断
    let prefix = filename === 'index' ? '' : `/${filename}`;

    // routes可能是函数 需要升阶处理
    routes = typeof routes === 'function' ? routes(app) : routes;
    // 获取请求的方法以及请求函数
    Object.keys(routes).forEach(key => {
      const [method, path] = key.split(' ');
      console.log(`当前映射的路径是 ${method.toLocaleLowerCase()} ${prefix}${path}`);
      // 注册路由
      // example: router.get('/index', ctx => callback());
      router[method](`${prefix}${path}`, async ctx => {
        await routes[key](ctx);
        console.log(filename, routes);
      });
    })
  });
  return router;
}

/**
 * 
 * @param {全局} app 
 */
function initController (app) {
  const controllers = {}
  load('controller', (filename, controller) => {
    console.log(filename, controller);
    controllers[filename] = controller(app);
  });
  return controllers;
}

/**
 * 初始化服务
 */
function initService () {
  var services = {};
  load('service', async (filename, service) => {
    services[filename] = service;
  });
  return services;
}

/**
 * 执行定时任务
 */
function initSchedule () {
  load('schedule', (filename, scheduleConfig) => {
    schedule.scheduleJob(scheduleConfig.interval, scheduleConfig.handler)
  })
}

module.exports = {
  initRouter,
  initController,
  initService,
  initSchedule
}