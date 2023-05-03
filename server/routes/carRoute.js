const router = require('express').Router()

const { addCar, getAllars, getCar, delCar, addComent } = require('../controllers/carCtrl')
const Car = require('../models/cars')

router.post('/create', addCar)
router.get('/', getAllars)
router.get('/:id', getCar)
router.delete('/:id', delCar)
router.put('/review', addComent)

module.exports = router