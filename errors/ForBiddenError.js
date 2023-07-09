const { FORBIDDEN } = require('../constants/statusCodes')

class ForbiddenError extends Error {
  constructor(message) {
    super(message)
    this.statusCode = FORBIDDEN
  }
}

module.exports = ForbiddenError
