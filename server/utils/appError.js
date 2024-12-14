const appError = class extends Error {
  constructor(message, statusCodes) {

    super(message);
    this.statusCode = statusCodes;
  }
};

module.exports = appError;