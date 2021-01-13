'use strict';

module.exports = {
  createUserRequest: {
    mobile: { type: 'string', required: true, description: '手机号码', example: '18801731528', format: /^1[34578]\d{9}$/ },
    password: { type: 'string', required: true, description: '用户密码', example: '123456' },
    username: { type: 'string', required: true, description: '用户名称', example: '姓名' },
  },
  userLoginRequest: {
    mobile: { type: 'string', required: true, description: '手机号码', example: '18801731528', format: /^1[34578]\d{9}$/ },
    password: { type: 'string', required: true, description: '用户密码', example: '123456' },
  },
};
