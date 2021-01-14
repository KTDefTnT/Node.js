'use strict';

module.exports = {
  baseRequest: {
    id: { type: 'string', required: true, description: '用户id', example: '234ieiwyrew' },
  },
  baseResponse: {
    type: { type: 'string', required: true, example: 'success' },
    data: { type: 'array', itemType: 'string', example: '23423423' },
    message: { type: 'string', example: '请求成功' },
  },
};
