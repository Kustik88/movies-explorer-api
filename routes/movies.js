const router = require('express').Router()
const auth = require('./auth')

router.use(auth)

router.get('/',)
router.post('/',)
router.delete('/_id',)

module.exports = router
