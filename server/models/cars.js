const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },

    rating: {
        type: Number,
        default: 0
    },
    qty: {
        type: Number,
        default: 0
    },

    reviews: [{
        star: {
            type: Number,
            default: 0
        },
        comment: {
            type: String,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    }],

    image: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})


module.exports = mongoose.model("Car", carSchema)