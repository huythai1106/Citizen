const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Citizen = new Schema({
    name: {type: String, require: true},
    DOB: {type: Date, require: true},
    sex: {type: String, require: true},
    address: {type: String, require: true}, // id xxyyzz
}, {
    timestamps: true,
})

module.exports = mongoose.model('Citizen', Citizen);