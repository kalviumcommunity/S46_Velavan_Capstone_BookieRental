const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const {User , Book} = require('./schemas');
const {joiUser , joiBooks} = require('./joiSchemas');

const app = express();
app.use(cors());
app.use(express.json());

//GET endpoint for Users

app.get('/users',async(req, res) => {
    try{
        const users = await User.find();
        res.json(users);
    }
    catch(err){
        console.log(err);
        res.status(500).send(err);
    }
})

//GET endpoint for Books

app.get('/books',async(req, res) => {
    try{
        const books = await Book.find();
        res.json(books);
    }
    catch(err){
        console.log(err);
        res.status(500).send(err);
    }
})

//POST endpoint for Users sign-up

app.post('/users',async(req,res) => {
    try{
        const {error , value} = joiUser.validate(req.body);
        if (error){
            console.log(error);
            return res.status(400).send(error.details[0].message)
        }
        const newUser = await User.create(req.body);
        res.json(newUser);
    }
    catch(err){
        console.log(err);
        res.status(500).send(err);
    }
})

//POST endpoint for Users Log-In

app.post('/users/login' , async(req,res) => {
    try{
        const {name , password} = req.body;
        const user = await User.findOne({name});
        if (!user){
            return res.status(401).send("Username Not Found");
        }
        const passValid = await user.comparePassword(password);
        if (!passValid){
            return res.status(401).send("Incorrect Password");
        }
        res.json("success")
    } catch(err){
        console.log(err);
        res.status(500).send(err);
    }
})

//POST endpoint for Books

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

//PUT endpoint for Users

app.put('/users/:name',async(req, res) => {
    try{
        const {name} = req.params;
        const updatedUser = await User.findOneAndUpdate({name} , req.body , {new:true});
        res.json(updatedUser);
    }
    catch(err){
        console.log(err);
        res.status(500).send(err);
    }
});

//PUT endpoint for Books

app.put('/books/:id',async(req, res) => {
    try{
        const {id} = req.params;
        const updatedBook = await Book.findByIdAndUpdate(id , req.body , {new:true});
        res.json(updatedBook);
    }
    catch(err){
        console.log(err);
        res.status(500).send(err);
    }
});

module.exports = app;