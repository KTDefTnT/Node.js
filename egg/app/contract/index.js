'use strict';

module.exports = {
  baseRequest: {
    id: { type: 'string', required: true, description: '用户id', example: '234ieiwyrew' },
  },
  baseResponse: {
    code: { type: 'integer', required: true, example: 0 },
    data: { type: 'string', example: [] },
    errorMessage: { type: 'string', example: '请求成功' },
  },
};
