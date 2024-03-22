const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const {User , Book} = require('./schemas');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/users', (req, res) => {
    try {
        res.json({name : "User1"});
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
})

//Post endpoint for Users

app.post('/users',async(req,res) => {
    try{
        const newUser = await User.create(req.body);
        res.json(newUser);
    }
    catch(err){
        console.log(err);
        res.status(500).send(err);
    }
})

//Post endpoint for Books

app.post('/books',async(req, res) => {
    try{
        const newBook = await Book.create(req.body);
        res.json(newBook);
    }
    catch(err){
        console.log(err);
        res.status(500).send(err);
    }
})

module.exports = app;