const { BAD_REQUEST } = require('../constants/statusCodes')

class BadRequestError extends Error {
  constructor(message) {
    super(message)
    this.statusCode = BAD_REQUEST
  }
}

module.exports = BadRequestError
