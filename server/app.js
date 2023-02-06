const express = require('express');
const dotenv = require("dotenv").config();
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");

//connection to the database
// mongoose.connect(process.env.MONGOURI);
// mongoose.connection.on('connected', ()=>{
//     console.log('connected to the database');
// });
// mongoose.connection.on('error', (error)=>{
//     console.log('Error',error);
// });


//require the model schema
require('./models/user');
require('./models/Post');
//get the req.body data in jason
app.use(express.json())
app.use(
    cors({
      origin: ["http://localhost:3000", "https://igcloner-app.vercel.app"],
      credentials: true,
    })
  );

//require authicantation route
app.use(require('./routes/auth'));
app.use(require('./routes/post'));




const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));