class CustomResponse {
  constructor(originalResponse) {
    this.originalResponse = originalResponse;
  }

  status(code) {
    this.originalResponse.statusCode = code;
    return this;
  }

  json(data) {
    this.originalResponse.setHeader('Content-Type', 'application/json');
    this.originalResponse.end(JSON.stringify(data));
  }
}

module.exports = CustomResponse;
