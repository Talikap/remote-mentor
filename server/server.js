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
    console.log("before connection")
    console.log(req.path, req.method)
    next()
})
// routes
app.use('/api/codeblocks', codeBlockRoutes)


//connect to db
mongoose.connect(process.env.MONGO_URI)

    .then(() => {
        console.log(`connected to db`) 
        //create HTTP server
        const server = createServer(app)

        //integrate socket handelling
        socketHandler(server)

        const port = process.env.PORT || 3000;
        //listen for requests
        server.listen(port,"0.0.0.0", () =>{
            console.log(`connected to db & listening on port ${port}`) 
        })  
    })
    .catch((error) => {
        console.log(error)
    })

