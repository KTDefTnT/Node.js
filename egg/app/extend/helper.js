'use strict';

const moment = require('moment');

// 统一成功处理
exports.success = ({ ctx, res = null, msg = '处理成功', status = 200 }) => {
  ctx.body = {
    code: 0,
    data: res,
    errorMessage: msg,
  };
  ctx.status = status;
};

exports.formatTime = time => moment(time).format('YYYY-MM-DD mm:hh:ss');
