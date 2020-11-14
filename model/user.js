const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name:{
        type: String,
        maxLength: 30
    },
    lastName:{
        type: String,
        maxLength: 30
    },
    email:{
        type: String,
        trim: true, //find what is it
        unique: 1 // true       
    },
    password:{
        type: String,
        minLength: 6,
    },
    role:{
        type: Number,
        default: 0 //0 is a regular user, 1 is an admin
    }
})

//first pass the name of the collection to create, second - initiating schema (user schema)
const User = mongoose.model('User', userSchema);
module.exports = {User}