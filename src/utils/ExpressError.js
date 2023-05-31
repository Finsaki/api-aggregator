//Custom error class where we also set a message
class ExpressError extends Error {
  constructor(message, statusCode) {
    super();
    this.message = message;
    //express will automatically look for err.status in errors
    this.statusCode = statusCode;
  }
}
module.exports = ExpressError;
