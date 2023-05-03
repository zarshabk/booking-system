const jwt = require('jsonwebtoken')
const User = require('../models/user')

const isAuthenticated = async(req, res, next) => {

    const token = req.headers.token
    console.log('token', token)

    if (token) {

        const decode = jwt.verify(token, process.env.JWT_KEY)
        req.user = decode.id
        next()

    } else {
        return res.status(404).json({ message: "no token exist" })
    }

    /*  console.log("cookies", req.cookies)
      let token = req.cookies.authToken

      if (token) {
          let id = jwt.verify(token, process.env.JWT_KEY)
              // req.user = id
              // console.log("id is ", req.user)
          req.user = await User.findById(id.id)
          next()
      } else {
          return res.status(403).json({ message: "You are not autheticated" })
      }
      next()*/
}


const isAdmin = async(req, res, next) => {
    console.log(req.cookies)
}


module.exports = {
    isAuthenticated,
    isAdmin
}