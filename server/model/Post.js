const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var PostSchema = new Schema({
    author: {
        type: String
    },
    content: { 
        type: String
    },
    timestamp: {
        type: Date,
        default: Date.now()
    }
});

module.exports = Post = mongoose.model('Post', PostSchema);