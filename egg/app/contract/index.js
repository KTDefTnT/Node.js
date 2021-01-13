'use strict';

module.exports = {
  baseRequest: {
    id: { type: 'string', required: true, description: '用户id', example: '234ieiwyrew' },
  },
  baseResponse: {
    type: { type: 'string', required: true, example: 'success' },
    data: { type: 'string', example: '23423423' },
    errorMessage: { type: 'string', example: '请求成功' },
  },
};
