const {User} = require('../models/user')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


// Get list of users
router.get(`/`, async (req, res) =>{
    const userList = await User.find().select('-passwordHash')  // to prevent hashed password from showing

    if(!userList){
        res.status(500).json({success: false})
    }
    res.send(userList)
})

// Get specific user with id without password
router.get(`/:id`, async(req, res) =>{
    const user = await User.findById(req.params.id).select('-passwordHash')

    if(!user)
        res.status(500).json({ message: "The user cannot be found" })
    res.status(200).send(user)
})

// Post a new user
router.post('/', async(req, res) =>{
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordHash: bcrypt.hashSync(req.body.password, 10), // hash user password
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country
    })
    user = await user.save()

    if(!user){
        return res.status(400).send('The user cannot be created.')
    }
    res.send(user)
})

// Login existing user
router.post('/login', async(req, res) =>{
    const user = await User.findOne({email: req.body.email})//.select('-passwordHash')
    const secret = process.env.secret  // secret in environment variables
    if(!user){
        res.status(500).send('The user not found')
    }

    // compare password user entered while trying to login to password in the database
    if(user && bcrypt.compareSync(req.body.password, user.passwordHash)){
        const token = jwt.sign({ // when the user is authenticated, pass some of his secret info into the token
            userId: user.id,
            isAdmin: user.isAdmin
        },
        secret,
        {expiresIn: '1d'}  // making jwt expire in a day
    )
        res.status(200).send({user: user.email, token: token})
    }
    else{
        res.status(400).send('Password is wrong')
    }  
})

// GET users count API
router.get(`/get/count`, async (req, res) =>{
    const userCount = await User.countDocuments()

    if(!userCount){
        res.status(500).json({success: false})
    }
    res.send({
        userCount: userCount
    })
})

// Delete API
router.delete('/:id', (req, res) =>{
    User.findByIdAndDelete(req.params.id).then(user =>{
        if(user){
            return res.status(200).json({success: true, message: 'The product has been deleted'})
        }
        else{
            return res.status(404).json({success: false, message: 'Product not found'})
        }
    }).catch(err =>{ // To catch errors
        return res.status(400).json({success: false, error: err})
    })

})


module.exports = router