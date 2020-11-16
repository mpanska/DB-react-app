const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require('./config/keys');
const { User } = require('./model/user');
const user = require('./model/user');
const { authent } = require('./middleware/authent')

const app = express();
const port = 5000;

mongoose.connect(config.mongoURI, {useNewUrlParser:true, useUnifiedTopology: true})
        .then(() =>console.log('Database is connected')).catch(err => console.error(err));

app.use(bodyParser.urlencoded({extended: true})); //to use query string
app.use(bodyParser.json());
app.use(cookieParser());


// app.get('/', function (req, res) {
//     res.send('hi there ')
// })

app.get('/api/user/auth', authent, (req, res) => {
    res.status(200).json({ //we send some data to cliet, what we got from auth
        _id: req._id,
        authentificated: true,
        email: req.user.email,
        name: req.user.name,
        lastName: req.user.lastName,
        role: req.user.role
    })
})


//if client gives us a request, it will be json, to be able to read json use bodyparser
app.post('/api/users/register', (req, res) => { 
    //after reading this information we need to put in into our mongodb
    const user = new User(req.body);

    //this sends users data to the database
    user.save((error, data) => {
        if(error) return res.json({success: false, error});

        res.status(200).json({
            success: true,
            userData: data
        });
    })
})

app.post('/api/user/login', (req, res) =>{
    //find email
    User.findOne({email: req.body.email}, (error, user) =>{ 
        if(error) return res.json({success: false})
        //if there is no email like this in DB -> error, else->user with the email
        if(!user) return res.json({
            success: false,
            message: 'Login failed, no such email in DB'
        })
    
        //compare typed passwrrd with one in 
        user.comparePassword(req.body.password, (error, match) =>{//plain password and callback
            if(error) return res.json({success: false})
                
            if(!match) return res.json({
                success: false,
                message: 'The password is wrong'
            })
            
        })

        //generate token
        user.generateToken((error, user) =>{
            if(error){
                console.log('error in generatin token');
                return res.status(400).send(error);
            } 
            //put token into cookie
            res.cookie("x_auth", user.token).status(200).json({
                success: true
            });
        })
    })
})

app.listen(port);