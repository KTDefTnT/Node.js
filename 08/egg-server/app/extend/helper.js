const moment = require('moment')

// 处理成功响应
/**
 * 
 * @param {*} helper 进行统一 
 */
exports.success = ({ ctx, res = null, message = '处理成功' }) => {
    ctx.body = {
        code: 0,
        data: res,
        errorMessage: message
    }
    ctx.status = 200
}

// 格式化时间
exports.formatTime = time => moment(time).format('YYYY-MM-DD HH:mm:ss')