const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

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

module.exports = app;