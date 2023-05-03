const { getCurrentUser, getAlluser, getUser, DelUser } = require('../controllers/userCtrl')
const { isAuthenticated } = require('../middleware/auth')

const router = require('express').Router()


router.get('/', getAlluser)
router.get('/:id', getUser)
router.delete('/:id', DelUser)

module.exports = router