module.exports = {
  get url () {
    return this.req.url;
  },

  set url (val) {
    this.req.url = val;
  }
}