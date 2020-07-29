const mongoose = require('mongoose');


const userModal = new mongoose.Schema({
    nickname: String,
    email: String,
    password: String,
    token: String,
}, {
    versionKey: false,
});

module.exports = mongoose.model('user', userModal, 'user')