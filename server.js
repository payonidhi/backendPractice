const express = require('express');
const app = express();
const dotenv = require('dotenv');
const auth = require('./routes/auth')

dotenv.config({path: "./config.env"})

app.use(express.json());
require('./db/conn');
app.use(auth)

console.log("Hello Server....");

const PORT = process.env.PORT;
app.listen(PORT, ()=> {
    console.log(`Server listening on ${PORT}`)
})