const express = require('express');
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', (req, res) =>{

    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({message: "Please enter all fields"});
    }
    User.findOne({email}).then(user => {
        if(!user) {
            return res.status(400).json({message: "User does not exist!"});
        }

        bcrypt.compare(password, user.password)
        .then(isMatch => {
            if(!isMatch) return res.status(400).json({message: 'Invalid credentials'})
            
            jwt.sign(
                { id: user.id },
                config.get('jwtSecret'),
                { expiresIn: 3600 },
                (err, token) => {
                    if(err) throw err;
                    res.json({
                        token,
                        user: {
                            id: user.id,
                            name: user.name,
                            email: user.email
                        }});
                }
            )
            
        })
    
    });
    
});

router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
})

module.exports = router;