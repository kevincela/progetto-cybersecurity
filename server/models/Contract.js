const mongoose = require("mongoose");

const contractSchema = new mongoose.Schema({
    name: String,
    address: String
});

const Contract = mongoose.model('Contract', contractSchema);

module.exports = Contract;