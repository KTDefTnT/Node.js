import * as glob from 'glob';
import * as KoaRouter from 'koa-router';

const router = new KoaRouter();

export const get = (path: string, options?: RouteOptions) => {    return (target, property, descriptor) => {        const url = options && options.prefix ? options.prefix + path : path        router['get'](url, target[property])    }}

// export const post = (path: string) => { 
//   console.log('post', path);
// }
type LoadOptions = {  
  /**     * 路由文件扩展名，默认值是`.{js,ts}`     */
  extname?: string;
};

export const load = (folder: string, options: LoadOptions = {}): KoaRouter => {
  const extname = options.extname || '.{js,ts}';
  glob.sync(require('path').join(folder, `./**/*${extname}`))
    .forEach((item) => require(item));
  return router;
}
