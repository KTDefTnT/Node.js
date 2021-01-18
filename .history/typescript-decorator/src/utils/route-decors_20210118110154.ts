import * as Koa from 'koa';
import * as glob from 'glob';
import * as KoaRouter from 'koa-router';

const router = new KoaRouter();
type LoadOptions = {  
  /**     * 路由文件扩展名，默认值是`.{js,ts}`     */
  extname?: string;
};
type RouteOptions = {
  /**
  * 适用于某个请求比较特殊，需要单独制定前缀的情形
  */
  prefix?: string;
  /**
  * 给当前路由添加一个或多个中间件
  */
  middlewares?: Array<Koa.Middleware>;
};

export const get = (path: string, options?: RouteOptions) => {
  return (target, property, descriptor) => {
    const url = options && options.prefix ? options.prefix + path : path;
    router['get'](url, target[property]);
  }
}

// export const post = (path: string) => { 
//   console.log('post', path);
// }


export const load = (folder: string, options: LoadOptions = {}): KoaRouter => {
  const extname = options.extname || '.{js,ts}';
  glob.sync(require('path').join(folder, `./**/*${extname}`))
    .forEach((item) => require(item));
  return router;
}
