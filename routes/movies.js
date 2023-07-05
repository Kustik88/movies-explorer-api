const router = require('express').Router()
const auth = require('../middlewares/auth')
const movieController = require('../controllers/movies')
const { validateMovieBodyForPost, validateMovieParams } = require('../middlewares/validate')

router.use(auth)

router.get('/', movieController.getCurrentUserMovies)
router.post('/', validateMovieBodyForPost, movieController.createMovie)
router.delete('/:id', validateMovieParams, movieController.deleteMovie)

module.exports = router
