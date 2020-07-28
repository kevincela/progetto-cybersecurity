const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    salt: String,
    account: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
