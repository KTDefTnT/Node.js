import { get } from 'http';
import * as Koa from 'koa';
const users = [{ name: 'tom', age: 20 }, { name: 'tom', age: 20 }];
export default class User {
  @get('users/')
  public list(ctx: Koa.Context) {
    ctx.body = {
      type: 'ok',
      data: users
    };
  }

  @post('users')
  public add(ctx: Koa.Context) {
    users.push(ctx.request.body);
    ctx.body = {
      type: 'ok'
    }
  }
}