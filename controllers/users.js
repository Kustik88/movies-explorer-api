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
const UnauthorizedError = require('../errors/UnauthorizedError')

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
            return next(new ExistingEmailError('Пользователь с таким email уже существует'))
          }
          next(err)
        })
    })
    .catch(next)
}

const returnEmailAndNameUser = (userData) => {
  const { name, email } = userData
  return { name, email }
}

const updateUser = (req, res, next, body) => {
  const updateObject = Object.keys(body)
    .reduce((obj, key) => (
      { ...obj, [key]: body[key] }
    ), {})

  userModel.findOne({ email: updateObject.email })
    .then((existingUser) => {
      if (existingUser) {
        return existingUser.id !== req.user._id
          ? next(new ExistingEmailError('Пользователь с таким email уже существует'))
          : next(new BadRequestError('Новый email совпадает со старым'))
      }
      return userModel.findByIdAndUpdate(
        req.user._id,
        updateObject,
        { new: true, runValidators: true },
      )
        .orFail(() => next(new NotFoundError('Пользователь c таким id не найден')))
        .then((user) => res.status(OK).send(returnEmailAndNameUser(user)))
        .catch(next)
    })
    .catch(next)
}

const editUserInfo = (req, res, next) => {
  const { name, email } = req.body
  updateUser(req, res, next, { name, email })
}

const getUserInfo = (req, res, next) => {
  const userId = req.user._id
  userModel.findById(userId)
    .orFail(() => next(new NotFoundError('Пользователь c таким id не найден')))
    .then((user) => res.status(OK).send(returnEmailAndNameUser(user)))
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
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 3,
          httpOnly: true,
        })
        .send(token)
    })
    .catch(next)
}
const signoutUser = (req, res, next) => {
  if (!req.cookies.jwt) {
    return next(new UnauthorizedError('Необходима авторизация'))
  }
  try {
    res.clearCookie('jwt')
      .send({ message: 'Пользователь успешно вышел' })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getUserInfo,
  createUser,
  editUserInfo,
  loginUser,
  signoutUser,
}
