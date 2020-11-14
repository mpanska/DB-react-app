const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 5000;
mongoose.connect('mongodb+srv://mpanska:12345@cluster0.l7k00.mongodb.net/sample_airbnb?retryWrites=true&w=majority', 
    {useNewUrlParser:true, useUnifiedTopology: true})
        .then(() =>console.log('Database is connected')).catch(err => console.error(err));


app.get('/', function (req, res) {
    res.send('hi there ')
  })

  app.listen(port)