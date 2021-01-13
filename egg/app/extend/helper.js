'use strict';

const moment = require('moment');

// 统一成功处理
exports.success = ({ ctx, res = '', type = 'success', message = '处理成功', status = 200 }) => {
  ctx.body = {
    type,
    data: res,
    errorMessage: message,
  };
  ctx.status = status;
};

exports.formatTime = time => moment(time).format('YYYY-MM-DD mm:hh:ss');
