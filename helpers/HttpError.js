class HttpError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.name = "HttpError";
    this.status = statusCode;
  }
}

module.exports = { HttpError };
