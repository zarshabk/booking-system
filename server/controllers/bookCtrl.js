const Booking = require('../models/Booking')
const User = require('../models/user')
const Car = require('../models/cars')



const book = async(req, res) => {
    const { userId, carId, days } = req.body
    try {
        const car = await Car.findOne(carId)
        console.log("car is", car)

        let total = days * car.price

        let book = new Booking({
            user: userId,
            car: carId,
            days,
            total: total
        })

        await book.save()

        return res.status(201).json({ message: 'booking created' })

    } catch (err) {
        return res.status(500).json({ message: "unexpected error", err })
    }
}


const Bookings = async(req, res) => {

    const book = await Booking.find().populate({ path: 'user', select: "username" }).populate({ path: 'car', select: "name price" })
    return res.status(200).json(book)

}


module.exports = {
    book,
    Bookings

}