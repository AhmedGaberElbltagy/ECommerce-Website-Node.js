const express = require('express');
const app = express();
const Connection = require('./Database/connection');
app.use(express.json());
Connection();

const bootstrab = require('./Services/index.router')

require('dotenv').config();

bootstrab(app)


app.listen(3000,()=>{
    console.log(`Server is Listening on Port ${process.env.PORT} `);
})


