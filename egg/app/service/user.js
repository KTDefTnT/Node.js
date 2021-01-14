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
      resopnseData.message = '用户注册成功！';
    }
    return resopnseData;
  }

  /**
   * 根据用户id查询用户信息
   * @param {*} id 用户id
   */
  async getUserInfoById(id) {
    const { ctx } = this;
    const respData = await ctx.model.User.findOne({ _id: id });
    if (respData) {
      return { data: respData, type: 'success', message: '用户信息查询成功！' };
    }
    return { data: {}, type: 'error', message: '当前用户信息有误' };
  }

  /**
   * 根据分页信息获取用户列表
   * @param {*} payload pageSize，pageNum，searchValue
   */
  async getUserList(payload) {
    const { ctx } = this;
    const { pageSize = 10, pageNo = 1 } = payload;
    const total = await ctx.model.User.count();
    const respData = await ctx.model.User.find()
      .limit(pageSize)
      .skip(pageSize * (pageNo - 1));
    return { data: respData, total , type: 'success', message: '查询成功' };
  }
}

module.exports = UserService;
