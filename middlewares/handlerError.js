const { default: mongoose } = require('mongoose')
const { BAD_REQUEST, INTERNAL_SERVER_ERROR } = require('../constants/statusCodes')

const handlerError = (err, req, res, next) => {
  const {
    statusCode = (err instanceof mongoose.Error)
      ? BAD_REQUEST
      : INTERNAL_SERVER_ERROR,
    message,
  } = err

  res
    .status(statusCode)
    .send({
      message: statusCode === INTERNAL_SERVER_ERROR
        ? '500 Ошибка сервера'
        : message,
    })
  next()
}

module.exports = handlerError
