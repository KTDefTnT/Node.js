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

const decorate = (method, path: string, router: KoaRouter, options?: RouteOptions) => {
  // target 类，property 修饰的属性或方法  descriptor 描述,defineProperty()
  return (target, property, descriptor) => {
    const url = options && options.prefix ? options.prefix + path : path;
    console.log('target', target[property]);
    console.log('property', property);
    console.log('descriptor', descriptor);
    console.log('methods', method);
    router[method](url, target[property]);
  }
}

// router强绑定 不利于扩展
const method = method => (path: string, options?: RouteOptions) => decorate(method, path, options, router);

// export const post = (path: string, options?: RouteOptions) => { 
//   return (target, property, descriptor) => {
//     const url = options && options.prefix ? options.prefix + path : path;
//     console.log('target', target[property]);
//     console.log('property', property);
//     console.log('descriptor', descriptor);
//     router['get'](url, target[property]);
//   }
// }

export const get = method('get');
export const post = method('post');
export const update = method('update');
export const put = method('put');


export const load = (folder: string, options: LoadOptions = {}): KoaRouter => {
  const extname = options.extname || '.{js,ts}';
  glob.sync(require('path').join(folder, `./**/*${extname}`))
    .forEach((item) => require(item));
  return router;
}
