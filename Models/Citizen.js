const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Citizen = new Schema({
    name: {type: String, require},
    DOB: {type: Date, require, default: Date.now()},
    sex: {type: String, require},
    idAddress: {type: String, require}, // id 010205 -> check auths
}, {
    timestamps: true,
})

module.exports = mongoose.model('Citizen', Citizen);