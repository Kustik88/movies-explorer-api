const router = require('express').Router()
const auth = require('../middlewares/auth')
const userController = require('../controllers/users')
const { validateUserBodyForPatchUserInfo } = require('../middlewares/validate')

router.use(auth)

router.get('/me', userController.getUserInfo)
router.patch('/me', validateUserBodyForPatchUserInfo, userController.editUserInfo)

module.exports = router
