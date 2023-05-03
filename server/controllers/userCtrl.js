const User = require('../models/user')


const getAlluser = async(req, res) => {
    const search = req.query.search || ''
    const itemPerPage = 2
    const page = req.query.page || 1
    try {



        let userCount = await User.countDocuments()

        let user;

        user = await User.find({
            $or: [{
                username: {
                    $regex: search,
                    $options: 'i'
                }
            }]
        }).skip((page - 1) * itemPerPage).limit(itemPerPage).sort({ createdAt: -1 })



        return res.status(200).json({ user, userCount })

    } catch (err) {
        return res.status(500).json({ message: "unexpected error" })
    }
}

const getUser = async(req, res) => {

    try {
        let user = await User.findById(req.params.id)
        return res.status(200).json(user)


    } catch (err) {
        return res.status(500).json({ message: "unexpected error" })

    }
}


const DelUser = async(req, res) => {

    try {
        let user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).json({ message: "User not Found" })

        }
        return res.status(200).json({ message: "user deleted successfully" })


    } catch (err) {
        return res.status(500).json({ message: "unexpected error" })

    }
}


module.exports = {
    getAlluser,
    getUser,
    DelUser
}