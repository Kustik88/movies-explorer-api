const { CONFLICTING_REQUEST } = require('../constants/statusCodes')

class ExistingEmailError extends Error {
  constructor(message) {
    super(message)
    this.statusCode = CONFLICTING_REQUEST
  }
}

module.exports = ExistingEmailError
