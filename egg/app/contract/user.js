'use strict';

module.exports = {
  createUserRequest: {
    mobile: { type: 'string', required: true, description: '手机号码', example: '18801731528' },
    password: { type: 'string', required: true, description: '用户密码', example: '123456' },
    username: { type: 'string', required: true, description: '用户名称', example: '姓名' } 
  },
};
