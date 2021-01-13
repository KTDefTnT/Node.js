'use strict';

const Controller = require('egg').Controller;
// a.如果文件第一个注释块中存在标签@Controller，应用会扫描当前文件下的所有注释块，否则扫描将会跳过该文件。
// b.如果不标示ControllerName，程序会将当前文件的文件名作为ControllerName。
/**
 * @Controller user
 */
class UserController extends Controller {
  /**
   * @Summary 用户注册
   * @Description 注册用户, 记录用户账户/密码/类型
   * @Router get /register
   * @Request body createUserRequest *body
   * @Response 200 baseResponse 请求成功
   */
  async register() {
    const { ctx, app, service } = this;
    try {
      app.on('error', error => {
        console.log('error', error);
      });
      // 校验字段合法性
      ctx.validate(ctx.rule.createUserRequest, ctx.request.query);
      const respData = await service.user.register(ctx.request.query);
      // 设置响应内容和响应状态码
      ctx.helper.success({ ctx, res: '324234234', message: respData.message, type: respData.type });
    } catch (error) {
      console.log('error', error);
      // 设置响应内容和响应状态码
      ctx.helper.success({ ctx, res: '324234234', type: 'error', message: '数据请求格式错误！' });
    }
  }

  /**
   * @Summary 用户登录
   * @Description 用户登录，请求参数 用户名/手机号码 + 密码
   * @Router get /login
   * @Request body userLoginRequest *body
   * @Response 200 baseResponse 请求成功
   */
  async login() {
    const { ctx, service } = this;
    try {
      const { mobile, password } = ctx.request.query;
      ctx.validate(ctx.rule.userLoginRequest, ctx.request.query);
      const respData = await service.userAccess.login({ mobile, password });
      ctx.helper.success({ ctx, res: respData.token, type: 'success', message: '登录成功' });
    } catch (error) {
      ctx.helper.success({ ctx, res: '数据有误', type: 'error', message: '用户名或密码错误！' });
    }
  }
}

module.exports = UserController;

