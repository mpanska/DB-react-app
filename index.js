const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require('./config/keys');
const { User } = require('./model/user');

const app = express();
const port = 5000;

mongoose.connect(config.mongoURI, {useNewUrlParser:true, useUnifiedTopology: true})
        .then(() =>console.log('Database is connected')).catch(err => console.error(err));

app.use(bodyParser.urlencoded({extended: true})); //to use query string
app.use(bodyParser.json());
app.use(cookieParser());


app.get('/', function (req, res) {
    res.send('hi there ')
})



//if client gives us a request, it will be json, to be able to read json use bodyparser
app.post('/api/users/register', (req, res) => { 
    //after reading this information we need to put in into our mongodb
    const user = new User(req.body);

    user.save((error, userData) => {
        if(error) return res.json({success: false, error});

        return res.status(200).json({success: true});
    })
})



app.listen(port);