const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userModel = require('../models/user')
const { JWT_SECRET } = require('../config')
const {
  OK,
  CREATED,
} = require('../constants/statusCodes')
const ExistingEmailError = require('../errors/ExistingEmailError')
const BadRequestError = require('../errors/BadRequestError')
const NotFoundError = require('../errors/NotFoundError')

const createUser = (req, res, next) => {
  const { name, email, password } = req.body
  if (!password) {
    return next(new BadRequestError('Поле "password" является обязательным'))
  }
  bcrypt.hash(password, 10)
    .then((hash) => {
      userModel.create({
        name,
        email,
        password: hash,
      })
        .then((newUser) => res.status(CREATED).send({
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        }))
        .catch((err) => {
          if (err.code === 11000) {
            return next(new ExistingEmailError('Такой пользователь уже существует'))
          }
          next(err)
        })
    })
    .catch(next)
}

const editUserInfo = (req, res, next) => {
  const { name, email } = req.body
  userModel.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail(() => next(new NotFoundError('Пользователь c таким id не найден')))
    .then((user) => res.status(OK).send(user))
    .catch(next)
}

const getUserInfo = (req, res, next) => {
  const userId = req.user._id
  userModel.findById(userId)
    .orFail(() => next(new NotFoundError('Пользователь c таким id не найден')))
    .then((user) => res.status(OK).send(user))
    .catch(next)
}

const loginUser = (req, res, next) => {
  const { email, password } = req.body
  return userModel.findUserByCredentials(email, password, next)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '3d' },
      )
      res.send(token)
    })
    .catch(next)
}

module.exports = {
  getUserInfo,
  createUser,
  editUserInfo,
  loginUser,
}
