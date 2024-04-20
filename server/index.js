const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require("dotenv").config();
const userRoutes = require('./routes/userRoutes');
const app = express()

app.use(cors());
app.use(express.json())

app.use('/api/auth', userRoutes)

mongoose.connect(process.env.MONGO_URL,{
}).then(()=>{
    console.log("Connected to DB")
}).catch((err)=>{
    console.log(err.message)
});

app.listen(process.env.PORT, ()=>{
    console.log(`server running at port ${process.env.PORT}`)
});
