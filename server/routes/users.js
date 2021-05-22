const express = require('express');
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get('/', (req, res) => {
    User.find().then(posts => {res.json({posts})})
})

router.post('/register', (req, res) =>{

    const { name, email, password } = req.body;

    if(!name || !email || !password) {
        return res.status(400).json({message: "Please enter all fields"});
    }
    User.findOne({email}).then(user => {
        if(user) {
            return res.status(400).json({message: "User email already exists"});
        }

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err;
                newUser.password = hash;
                newUser.save().then(user => {
                    jwt.sign(
                        { id: user.id },
                        config.get('jwtSecret'),
                        { expiresIn: 3600 },
                        (err, token) => {
                            if(err) throw err;
                            res.json({token,
                                user});
                        }
                    )
                });
            });
        });
    
    });
    
});

module.exports = router;