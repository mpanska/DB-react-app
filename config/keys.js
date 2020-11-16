if(process.env.NODE_ENV === 'production'){
    module.exports = require('./production'); //if app is in production mode, we will export prod.js
}else{
    module.exports = require('./develop'); //else -> app is in developement mode
}