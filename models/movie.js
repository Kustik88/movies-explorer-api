const mongoose = require('mongoose')
const validator = require('validator')
const { mustBeFilled } = require('../helpers/mustBeFilled')

const movieSchema = mongoose.Schema({
  country: {
    type: String,
    required: [true, mustBeFilled('country')],
  },
  director: {
    type: String,
    required: [true, mustBeFilled('director')],
  },
  duration: {
    type: Number,
    required: [true, mustBeFilled('duration')],
  },
  year: {
    type: String,
    required: [true, mustBeFilled('year')],
  },
  description: {
    type: String,
    required: [true, mustBeFilled('descrription')],
  },
  image: {
    type: String,
    required: [true, mustBeFilled('image')],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL ссылки изображение',
    },
  },
  trailerLink: {
    type: String,
    required: [true, mustBeFilled('trailerLink')],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL ссылки на трейлер',
    },
  },
  thumbnail: {
    type: String,
    required: [true, mustBeFilled('thumbnail')],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL ссылки на изображение',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, mustBeFilled('owner')],
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: [true, mustBeFilled('movieId')],
  },
  nameRU: {
    type: String,
    required: [true, mustBeFilled('nameRu')],
  },
  nameEN: {
    type: String,
    required: [true, mustBeFilled('nameEn')],
  },
}, { versionKey: false })

module.exports = mongoose.model('movie', movieSchema)
