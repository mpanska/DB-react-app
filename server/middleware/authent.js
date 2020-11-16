const { User } = require('../model/user');

let authent = (req, res, next) => {
    let token = req.cookies.x_auth;
    
    User.findByToken(token, (error, user) =>{ //error if we cant define user by token
        if(error) throw error;
        //if we don't have an error we need to send smth to our client
        if(!user) return res.json({authentificated: false, error: true});
        
        req.token = token;
        req.user = user;
        next();
    }) 
}

module.exports = { authent };