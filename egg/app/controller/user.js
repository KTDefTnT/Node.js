'use strict';

const Controller = require('egg').Controller;
// a.如果文件第一个注释块中存在标签@Controller，应用会扫描当前文件下的所有注释块，否则扫描将会跳过该文件。
// b.如果不标示ControllerName，程序会将当前文件的文件名作为ControllerName。
/**
 * @Controller user
 */
class UserController extends Controller {
  /**
   * @Summary 创建用户
   * @Description 创建用户, 记录用户账户/密码/类型
   * @Router post /api/user
   * @Request body createUserRequest *body
   * @Response 200 baseResponse 请求成功
   */
  async create() {
    const { ctx } = this;
    // 接口数据格式校验
    ctx.validate(ctx.rule.createUserRequest, ctx.request.body);
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res: 'ajsdjhadada', message: '操作成功' });
  }
}

module.exports = UserController;

