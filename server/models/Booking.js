const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car'
    },
    days: {
        type: Number,
        required: true,
        default: 1
    },
    total: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now,
    }
}, {
    timestamps: true
})


module.exports = mongoose.model("Booking", bookSchema)