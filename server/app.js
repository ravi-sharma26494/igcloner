const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 5000;
const { MONGOURI } = require('./keys');

//connection to the database
mongoose.connect(MONGOURI);
mongoose.connection.on('connected', ()=>{
    console.log('connected to the database');
});
mongoose.connection.on('error', (error)=>{
    console.log('Error',error);
});


//require the model schema
require('./models/user');
require('./models/Post');
//get the req.body data in jason
app.use(express.json())

//require authicantation route
app.use(require('./routes/auth'));
app.use(require('./routes/post'));




app.listen(PORT, ()=> console.log('Server up at 5000'))