const { NOT_FOUND } = require('../constants/statusCodes')

class NotFoundError extends Error {
  constructor(message) {
    super(message)
    this.statusCode = NOT_FOUND
  }
}

module.exports = NotFoundError
