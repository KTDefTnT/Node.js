module.exports = {
  'get /': async (ctx) => {
    ctx.body = "routes 首页"
  },
  'get /detail': async (ctx) => {
    ctx.body = "routes 详情"
  }
};