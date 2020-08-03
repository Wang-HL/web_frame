const mongoose = require('mongoose');


const userModal = new mongoose.Schema({
    nickname: String,
    username: String,
    password: String,
    token: String,
    createTime: String,
    updateTime: String
}, {
    versionKey: false,
});

module.exports = mongoose.model('user', userModal, 'user')