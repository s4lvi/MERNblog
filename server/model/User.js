const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {
        type: String
    },
    email: { 
        type: String
    },
    password: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    lastLogin: {
        type: Date,
        default: Date.now()
    }
});

module.exports = User = mongoose.model('User', UserSchema);