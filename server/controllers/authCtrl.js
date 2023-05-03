const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const upload = require('../middleware/multer')

const Register = async(req, res) => {
    const { username, email, password, phone } = req.body

    try {
        let user = await User.findOne({ email: email })
        if (user) {
            const filename = req.file.filename;
            let path = `upload/profile/${filename}`
            console.log("path", path)
            fs.unlink(path, (err) => {
                console.log("err", err)
            })
            return res.status(400).json({ message: "user already exist with this email" })

        }

        let pass = bcrypt.hashSync(password)

        let new_user = new User({ username, email, password: pass, image: req.file.path, phone })

        await new_user.save()

        return res.status(201).json({ message: `congrats ${username} you have registered successfuly` })


    } catch (err) {
        return res.status(500).json({ message: "unexpected error" })
    }
}

const Login = async(req, res) => {
    const { email, password } = req.body

    try {

        let user = await User.findOne({ email: email })

        if (!user) {
            return res.status(500).json({ message: "invalid credentials" })

        }

        let pass = bcrypt.compareSync(password, user.password)

        if (!pass) {
            return res.status(500).json({ message: "invalid credentials" })

        }


        let token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_KEY, { expiresIn: '5d' })

        return res.status(200).json({ message: 'login success', token })

        /*  return res.cookie('authToken', token, {
              expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
              httpOnly: true,
          }).json({ message: "login successfully" })*/

    } catch (err) {
        return res.status(500).json({ message: "error", err })
    }
}


const Load = async(req, res) => {

    try {
        let user = await User.findById(req.user).select('-password')
        return res.status(200).json(user)
    } catch (err) {
        return res.status(500).json({ message: "error", err })

    }
}

module.exports = {
    Register,
    Login,
    Load
}