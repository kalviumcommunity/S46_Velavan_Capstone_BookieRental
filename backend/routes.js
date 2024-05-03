const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {User , Book} = require('./schemas');
const {joiUser , joiBooks} = require('./joiSchemas');

const app = express();
app.use(cors());
app.use(express.json());

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
}

const authenticate = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).send('Unauthorized: No token provided');
    }
    const authToken = token.split('Bearer ')[1];
    try {
        const decoded = jwt.verify(authToken, "Kaizoku-0nii-0rewaaNaaru");
        req.user = decoded
        next()
    } catch (error) {
        return res.status(403).send('Forbidden: Invalid token');
    }
}

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
        const hashedPass = await bcrypt.hash(req.body.password, 10);
        const newUser = await User.create({...req.body , password : hashedPass});
        const token = generateToken( {password : hashedPass} );
        res.json({token});
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
        const passValid = await bcrypt.compare(password, user.password);
        console.log(passValid);
        if (!passValid){
            return res.status(401).send("Incorrect Password");
        }
        const token = generateToken( {password : user.password} );
        res.json({token})
    }
    catch(err){
        console.log(err);
        res.status(500).send(err);
    }
})

//POST endpoint for Books

app.post('/books',authenticate,async(req, res) => {
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

app.put('/books/:id',authenticate,async(req, res) => {
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

//DELETE endpoint for Users

app.delete('/users/:name',async(req, res) => {
    try{
        const {name} = req.params;
        const deletedUser = await User.findOneAndDelete({name});
        res.status(200).json(deletedUser);
    }
    catch(err){
        console.log(err);
        res.status(500).send(err);
    }
});

//DELETE endpoint for Books

app.delete('/books/:id',authenticate,async(req, res) => {
    try{
        const {id} = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);
        res.status(200).json(deletedBook);
    }
    catch(err){
        console.log(err);
        res.status(500).send(err);
    }
}); 

module.exports = app;