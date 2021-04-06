const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    username: String,
    //...configs
    //  tags: []
    //  notify
    //...data
    //  brokies: []
    //  status
});
const User = mongoose.model('User', UserSchema);

module.exports = User;