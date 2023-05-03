const router = require('express').Router()
const { Register, Login, Load } = require('../controllers/authCtrl')
const { isAuthenticated } = require('../middleware/auth')
const upload = require('../middleware/multer')

router.post('/register', upload.single('image'), Register)
router.post('/login', Login)
router.get('/load', isAuthenticated, Load)


module.exports = router