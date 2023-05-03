const express = require('express')
const app = express()
const parser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
app.use(express.json())
app.use(cors())
app.use(parser())

const port = process.env.PORT || 5000

app.use('/upload/profile', express.static('./upload/profile'))

const auth = require('./routes/authRoute')
const user = require('./routes/userRoute')
const car = require('./routes/carRoute')
const book = require('./routes/BookingRoute')


mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected with Db")
    app.listen(port, () => {
        console.log(`server is running at port ${port}`)
    })
}).catch(Err => console.log(Err))


app.use('/api/auth', auth)
app.use('/api/user', user)
app.use('/api/car', car)
app.use('/api/booking', book)