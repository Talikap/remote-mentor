require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const { createServer } = require('node:http')
const cors = require('cors');
const codeBlockRoutes = require('./routes/codeblocks')
const socketHandler = require('./socketHandler')


//express app
const app = express()

//const corsOptions = {
   // origin: 'https://remote-mentor-production.up.railway.app/', // Replace with your React app's URL
  //  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  //};
  
 // app.use(cors(corsOptions));

//middleware
app.use(express.json())

// routes
app.use('/api/codeblocks', codeBlockRoutes)


//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //create HTTP server
        const server = createServer(app)

        //integrate socket handelling
        socketHandler(server)

        //listen for requests
        server.listen(process.env.PORT,"0.0.0.0", () =>{
            console.log(`connected to db & listening on port ${process.env.PORT}`) 
        })  
    })
    .catch((error) => {
        console.log(error)
    })