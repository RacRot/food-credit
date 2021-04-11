"use strict";
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    //...configs
    //  tags: []
    //  notify
    //...data
    //  brokies: []
    //  status
});
const User = mongoose.model('User', UserSchema);
module.exports = User;
