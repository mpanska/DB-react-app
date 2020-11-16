const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');



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
    },
    token:{
        type: String
    }
})

//before saving we are doing something:
userSchema.pre('save', function(next){
    var user = this; //this means user schema

    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds, function(error, salt) {
            if(error) 
                return next(error);//next means we're not doind anything below, we just go to save

            //if we dont have any errors we hash parrword
            bcrypt.hash(user.password, salt, function(error, hash){ //plaintext password
            // Store hash in your password DB.
                if(error) return next(error); 
                user.password = hash; 
                next()
            });
        });
    }else{
        next();
    }    
})


userSchema.methods.comparePassword = function(myPlaintextPassword, callback){
    //To check a password:
    // Load hash from your password DB.
    bcrypt.compare(myPlaintextPassword, this.password, function(error, match) {
        if(error) return callback(error);
        callback(null, match);
    });
}

userSchema.methods.generateToken = function(callback){
    var user = this;
    var token = jwt.sign(user._id.toHexString(), 'secret') //id generated automaticly by mongodb

    user.token = token;
    user.save(function(error, user){
        if(error) return callback(error)
        callback(null, user); //the error is null -> success
    })
}


userSchema.statics.findByToken = function(token, callback){
    var user = this;

    //to decode the token
    jwt.verify(token, 'secret', function(error, decode){ //token in our cookie
        user.findOne({"_id":decode, "token":token}, function(error, user){
            if(error) return callback(error); // after decoding the token we get user id
            callback(null, user);
        })
    }) 
}

//first pass the name of the collection to create, second - initiating schema (user schema)
const User = mongoose.model('User', userSchema);
module.exports = {User};