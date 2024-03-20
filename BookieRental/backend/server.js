const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.get('/', (req, res) => {
    res.json({Status: 'Running'});
})

app.listen(3000, () => {
    console.log('Running')
})