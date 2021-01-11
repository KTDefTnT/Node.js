module.exports = app => ({
  getInfo: async ctx => {
    console.log(app);
    ctx.body = 'controller getInfo界面'
  }
});