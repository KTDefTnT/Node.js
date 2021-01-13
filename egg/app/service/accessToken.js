'use strict';

const Service = require('egg').Service;

class AccessTokenServive extends Service {
  async createToken(id) {
    const { app } = this;
    return app.jwt.sign({
      data: {
        _id: id,
        exp: Math.floor(Date.now() / 1000 + (60 * 60 * 7)),
      },
    }, app.jwt.secrit);
  }
}

module.exports = AccessTokenServive;
