const movieModel = require('../models/movie')
const {
  OK,
  CREATED,
} = require('../constants/statusCodes')

const NotFoundError = require('../errors/NotFoundError')
const ForbiddenError = require('../errors/ForBiddenError')

const getCurrentUserMovies = (req, res, next) => {
  const userId = req.user._id
  movieModel.find({ owner: userId })
    .then((movies) => res.status(OK).send(movies))
    .catch(next)
}

const createMovie = (req, res, next) => {
  const owner = req.user._id
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body
  movieModel.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    owner,
    movieId,
  }).then((newMovie) => res.status(CREATED).send(newMovie))
    .catch(next)
}

const deleteMovie = (req, res, next) => {
  movieModel.findOne({ _id: req.params.id })
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError('Фильм с таким id не найден'))
      }
      if (movie.owner.toString() !== req.user._id) {
        return next(new ForbiddenError('Нельзя удалить фильм, если вы его не добавляли'))
      }
      return movie.deleteOne()
        .then(() => res.status(OK).send(movie))
    })
    .catch(next)
}

module.exports = {
  deleteMovie,
  createMovie,
  getCurrentUserMovies,
}
