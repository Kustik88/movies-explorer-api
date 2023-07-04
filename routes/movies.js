const router = require('express').Router()
const auth = require('./auth')
const {
  deleteMovie,
  createMovie,
  getCurrentUserMovies,
} = require('../controllers/movies')

router.use(auth)

router.get('/', getCurrentUserMovies)
router.post('/', createMovie)
router.delete('/:id', deleteMovie)

module.exports = router
