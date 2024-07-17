const { Schema, model } = require('mongoose')
const bcrypt = require("bcrypt");


const AuthSchema = new Schema({
    phone: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'teacher', 'admin'],
        default: 'user',
        required: true
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    }
})

module.exports = model('Auth', AuthSchema)