const { default: mongoose } = require('mongoose')

const handlerError = (err, req, res, next) => {
  const {
    statusCode = (err instanceof mongoose.Error)
      ? 400
      : 500,
    message,
  } = err

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'Ошибка сервера'
        : message,
    })
  next()
}

module.exports = handlerError
