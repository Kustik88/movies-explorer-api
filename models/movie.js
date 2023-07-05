const mongoose = require('mongoose')
const validator = require('validator')
// const mustBeFilled = require('../helpers/mustBeFilled')

const movieSchema = mongoose.Schema({
  country: {
    type: String,
    required: [true, 'country'],
  },
  director: {
    type: String,
    required: [true, 'director'],
  },
  duration: {
    type: Number,
    required: [true, 'duration'],
  },
  year: {
    type: String,
    required: [true, 'year'],
  },
  description: {
    type: String,
    required: [true, 'descrription'],
  },
  image: {
    type: String,
    required: [true, 'image'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL ссылки изображение',
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'trailerLink'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL ссылки на трейлер',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'thumbnail'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL ссылки на изображение',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'owner'],
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: [true, 'movieId'],
  },
  nameRU: {
    type: String,
    required: [true, 'nameRu'],
  },
  nameEN: {
    type: String,
    required: [true, 'nameEn'],
  },
})

module.exports = mongoose.model('movie', movieSchema)
