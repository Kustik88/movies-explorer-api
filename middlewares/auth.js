const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config')
const UnauthorizedError = require('../errors/UnauthorizedError')

const auth = (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError('Необходима авторизация'))
  }
  const token = authorization.replace('Bearer ', '')
  let payload
  try {
    payload = jwt.verify(token, JWT_SECRET)
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'))
  }
  req.user = payload
  next()
}

module.exports = auth
