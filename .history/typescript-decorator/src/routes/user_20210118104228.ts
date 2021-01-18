import * as Koa from 'koa';
import { get, post } from '../utils/route-decors';

const users = [{ name: 'tom', age: 20 }, { name: 'tom', age: 20 }];
export default class User {
  /* 
   * 装饰器的编写，以@get('/users')为例，它是函数装饰器且有配置项，其函数签名为：
   * function get(path) {
   *  return function(target, property, descriptor) {}
   * }
   */
  @get('/users')
  public list(ctx: Koa.Context) {
    ctx.body = {
      type: 'ok',
      data: users
    };
  }

  // @post('/users')
  // public add(ctx: Koa.Context) {
  //   users.push(ctx.request.body);
  //   ctx.body = {
  //     type: 'ok'
  //   }
  // }
}