const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')  //basically convert the request to json
const cors = require('cors')
require('dotenv/config') //require this in order to get access to DB CONNECTION

//Middleware
app.use(cors())
app.use(bodyParser.json())


//middleware is a function that is executed when the user hit on a specific route and 
//we want to do something
// app.use('/posts',()=>{
//     console.log('The middle ware is running');
// })

//import route
const postRoute = require('./routes/posts')
app.use('/posts',postRoute)

//we can create the route
app.get('/',(req,res)=>{
    res.send('We are on home')
})
app.get('/posts',(req,res)=>{
    res.send('We are on post')
})

//connect to our database
mongoose.connect(
    process.env.DB_CONNECTION, //in evv file
    {useNewUrlParser:true},
    ()=>{console.log('Connected to Database');
})

//our server will listen or run on port
app.listen(8080)