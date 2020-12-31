module.exports = {
  get body () {
    return this.response.body;
  },
  set body (value) {
    this.response.body = value;
  },
  get url () {
    return this.request.url;
  },
  set url (value) {
    this.request.url = value;
  },
  get method () {
    return this.request.method;
  }
}