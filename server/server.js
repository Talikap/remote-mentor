require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const { createServer } = require('node:http')
const codeBlockRoutes = require('./routes/codeblocks')
const socketHandler = require('./socketHandler')


//express app
const app = express()

//middleware
app.use(express.json())

app.use((req, res, next) =>{
    console.log(req.path, req.method)
    next()
})
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
        server.listen(process.env.PORT, () =>{
            console.log(`connected to db & listening on port ${process.env.PORT}`) 
        })  
    })
    .catch((error) => {
        console.log(error)
    })

