const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const { mustBeFilled } = require('../helpers/mustBeFilled')
const UnauthorizedError = require('../errors/UnauthorizedError')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, mustBeFilled('name')],
    minlength: [2, 'Минимальная длинна поля "name" - 2'],
    maxlength: [30, 'Максимальная длинна поля "name" - 30'],
  },
  email: {
    type: String,
    required: [true, mustBeFilled('email')],
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Некорректный email,',
    },
  },
  password: {
    type: String,
    required: [true, mustBeFilled('password')],
  },
}, { versionKey: false })

userSchema.statics.findUserByCredentials = function (email, password, next) {
  return this.findOne({ email }).select('+password')
    .orFail(() => next(new UnauthorizedError('Неправильные почта или пароль')))
    .then((user) => bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          return next(new UnauthorizedError('Неправильные почта или пароль'))
        }
        return user
      }))
}

module.exports = mongoose.model('user', userSchema)
