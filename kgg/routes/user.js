/**
 * 在router中想使用controller 则需要将上级app传入，升阶处理 (柯里化处理)
 */
module.exports = app => ({
  'get /detail': app.$ctrl.user.detail,
  'get /home': async ctx => {
    ctx.body = 'user 主页';
  }
})