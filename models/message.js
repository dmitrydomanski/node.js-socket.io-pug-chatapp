//bring in mongoose
const mongoose = require('mongoose');

let messageSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    }

});

const Message = module.exports = mongoose.model('Message', messageSchema);