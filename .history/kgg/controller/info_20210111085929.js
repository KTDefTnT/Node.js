module.exports = app => ({
  getInfo: async ctx => {
    ctx.body = 'controller getInfo界面'
  }
});