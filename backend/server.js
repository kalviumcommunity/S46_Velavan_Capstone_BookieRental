const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = require('./routes');

const startDb = async () => {
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('Connected To MongoDB')
    })
    .catch((err)=>{
        console.log('Connection Interrupted Due To Error',err.message)
    })
};

startDb();

const isConnected = () => {
    return mongoose.connection.readyState === 1;
};


app.get('/',(req,res)=>{
    res.json({
        database: 'BookieRental',
        status: isConnected() ? 'connected' : 'disconnected'
      })
});

app.listen(3000, () => {
    console.log('Running')
});