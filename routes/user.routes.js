const express = require('express')

const router = express.Router()
const User = require("../models/users")

const bcrypt = require("bcryptjs")

// register api

router.post("/register", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const newUser = new User({
            email: req.body.email,
            password: hashedPassword
        })
        const user = await newUser.save()
        res.status(200).json(user)
    } catch (error) {
        console.log('error:', error)
        res.status(500).json(error)
    }
})
// login api

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        // !user &&  res.status(400).json("check your credential")
        if (!user) {
            res.status(400).json("check your credential")
        }
        const validated = await bcrypt.compare(req.body.password, user.password)
        if (!validated) {
            res.status(422).json("Incorrect password")
        }

        const { password, ...others } = user._doc
        res.status(200).json(others)

    } catch (error) {
        console.log('error:', error)
        res.status(500).json(error)
    }
})

module.exports = router;