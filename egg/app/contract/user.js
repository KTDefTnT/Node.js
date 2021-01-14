'use strict';

module.exports = {
  createUserRequest: {
    mobile: { type: 'string', required: true, description: '手机号码', example: '18801731528', format: /^1[34578]\d{9}$/ },
    password: { type: 'string', required: true, description: '用户密码', example: '123456' },
    username: { type: 'string', required: true, description: '用户名称', example: '姓名' },
  },
  // 用户登录请求
  userLoginRequest: {
    mobile: { type: 'string', required: true, description: '手机号码', example: '18801731528', format: /^1[34578]\d{9}$/ },
    password: { type: 'string', required: true, description: '用户密码', example: '123456' },
  },
  // 用户信息
  userInfoRequest: {
    id: { type: 'string', required: true, description: '用户id', example: '21342jhui32y4232' },
  },
  // 用户列表请求信息
  userListRequest: {
    pageSize: { type: 'number', required: true, description: '分页限制', example: 10 },
    pageNo: { type: 'number', required: true, description: '分页页码', example: 1 },
  },
};
