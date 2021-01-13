'use strict';
const Service = require('egg').Service;

class UserService extends Service {
  /**
   * 创建用户
   * @param {*} payload 用户创建数据
   */
  async register(payload) {
    const { ctx } = this;
    const { username, mobile, password } = payload;
    let resopnseData = {};
    // 先判断用户是否已注册
    const respData = await ctx.model.User.findOne({ mobile });
    if (respData) {
      resopnseData = {
        type: 'error',
        message: '手机号码已存在，请重新注册！',
      };
    } else {
      resopnseData = await ctx.model.User.create({
        username,
        mobile,
        password,
      });
      resopnseData.type = 'success';
    }
    return resopnseData;
  }
}

module.exports = UserService;
