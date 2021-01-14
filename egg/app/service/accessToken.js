'use strict';

const Service = require('egg').Service;

class AccessTokenServive extends Service {
  async createToken(userInfo) {
    const { app } = this;
    return app.jwt.sign({
      data: {
        id: userInfo._id,
        username: userInfo.username,
        exp: Math.floor(Date.now() / 1000 + (60 * 60 * 7)),
      },
    }, app.jwt.secrit);
  }
}

module.exports = AccessTokenServive;
