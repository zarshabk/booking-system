const Car = require('../models/cars')
const User = require('../models/user')


const addCar = async(req, res) => {
    try {

        const car = new Car(req.body)

        await car.save()

        return res.status(201).json({ message: "car added successfully" })
    } catch (err) {
        return res.status(500).json({ message: "unexpected error" })
    }

}


const delCar = async(req, res) => {
    try {

        const car = await Car.findByIdAndDelete(req.params.id)

        if (!car) {
            return res.status(201).json({ message: "car not found" })
        }

        return res.status(201).json({ message: "car deleted successfully" })
    } catch (err) {
        return res.status(500).json({ message: "unexpected error" })
    }

}


const addComent = async(req, res) => {
    const { userId, comment, star } = req.body
    try {
        console.log("rating is")
        let user = await User.findById(userId)

        let car = await Car.findById(req.params.id)
        console.log("rating is 3")

        await car.updateOne({
            reviews: {
                star: star,
                comment: comment,
                user: userId
            }
        })

        // car.rating = car.reviews.length * car.reviews.star / 5
        console.log("rating is")

        return res.status(201).json({ message: "successfully rated" })



    } catch (err) {
        return res.status(500).json({ message: "unexpected error" })

    }
}


const getCar = async(req, res) => {
    try {

        const car = await Car.findById(req.params.id)

        if (!car) {
            return res.status(201).json({ message: "car not found" })
        }

        return res.status(200).json(car)
    } catch (err) {
        return res.status(500).json({ message: "unexpected error" })
    }

}






const getAllars = async(req, res) => {
    const search = req.query.search || ''
    const itemPerPage = 4
    const page = req.query.page || 1
    try {

        let carCount = await Car.countDocuments()

        let car;

        car = await Car.find({
            $or: [{
                name: {
                    $regex: search,
                    $options: 'i'
                }
            }]
        }).skip((page - 1) * itemPerPage).limit(itemPerPage).sort({ createdAt: -1 })

        const pageCount = Math.ceil(carCount / itemPerPage)
        console.log("page ", pageCount)
        return res.status(200).json({ car, carCount, pageCount })

    } catch (err) {
        return res.status(500).json({ message: "unexpected error" })
    }
}

module.exports = {
    getAllars,
    getCar,
    delCar,
    addCar,
    addComent
}