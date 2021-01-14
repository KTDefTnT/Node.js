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
   * @Router post /register
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
      ctx.validate(ctx.rule.createUserRequest, ctx.request.body);
      const respData = await service.user.register(ctx.request.body);
      // 设置响应内容和响应状态码
      ctx.helper.success({ ctx, data: '324234234', message: respData.message, type: respData.type });
    } catch (error) {
      console.log('error', error);
      // 设置响应内容和响应状态码
      ctx.helper.success({ ctx, data: '324234234', type: 'error', message: '数据请求格式错误！' });
    }
  }

  /**
   * @Summary 用户登录
   * @Description 用户登录，请求参数 用户名/手机号码 + 密码
   * @Router post /auth/login
   * @Request body userLoginRequest *body
   * @Response 200 baseResponse 请求成功
   */
  async login() {
    const { ctx, service } = this;
    try {
      ctx.validate(ctx.rule.userLoginRequest, ctx.request.body);
      const respData = await service.userAccess.login(ctx.request.body);
      ctx.helper.success({ ctx, data: respData.token, type: respData.type, message: respData.message });
    } catch (error) {
      console.log('用户登录信息有误', error);
      ctx.helper.success({ ctx, data: '数据有误', type: 'error', message: '用户名或密码错误！' });
    }
  }

  /**
   * @Summary 查询用户信息
   * @Description 根据用户id 查询对应的用户信息
   * @Router get /api/user/getUserInfoById
   * @Request body userInfoRequest *body
   * @Response 200 baseResponse 请求成功
   */
  async getUserInfoById() {
    const { ctx, service } = this;
    try {
      // const { id } = ctx.request.body;
      const id = ctx.state.user.data.id;
      // console.log('jwt', ctx.state.user.data);
      ctx.validate(ctx.rule.userInfoRequest, ctx.request.query);
      const respData = await service.user.getUserInfoById(id);
      ctx.helper.success({ ctx, data: respData.data, type: respData.type, message: respData.message });
    } catch (error) {
      console.log('查询用户信息有误', error);
      ctx.helper.success({ ctx, data: '用户信息查询失败', type: 'error', message: '用户信息查询失败' });
    }
  }

  /**
   * @Summary 查询所有用户
   * @Desciption 分页查询用户信息
   * @Router post /api/user/getUserList
   * @Request body userListRequest *body
   * @Response 200 baseResponse 请求成功
   */
  async getUserList() {
    const { ctx, service } = this;
    try {
      ctx.validate(ctx.rule.userListRequest, ctx.request.body);
      console.log('service', service);
      const respData = await service.user.getUserList(ctx.request.body);
      console.log(respData);
      ctx.helper.success({ ctx, ...respData });
    } catch (error) {
      console.log('查询分页用户信息', error);
      ctx.helper.success({ ctx, data: [], type: 'error', message: '用户列表查询失败' });
    }
  }
}

module.exports = UserController;

