const { book, Bookings } = require('../controllers/bookCtrl')

const router = require('express').Router()

router.get('/', Bookings)
router.post('/book', book)



module.exports = router