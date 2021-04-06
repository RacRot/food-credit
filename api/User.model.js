const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    id: Number,
    email: String,
    passwordHash: String,
    username: String
    //...configs
    //  tags: []
    //  notify
    //...data
    //  brokies: []
    //  status
});
const User = mongoose.model('User', UserSchema);

module.exports = User;