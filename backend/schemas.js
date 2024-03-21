const mongoose = require('mongoose');

// Schema for users collection

const  userSchema = new mongoose.Schema({
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true },
    password: { type: String, required: true }
});

// Schema for books collection

const bookSchema = new mongoose.Schema({
    title: { type: String, trim: true, required: true },
    author: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    status: { type: String, trim: true, required: true },
    rent: { type: String, trim: true, required: true },
    price: { type: Number, trim: true, required: true }
});

// Modals for users and books collections

const User = mongoose.model('users', userSchema);
const Book = mongoose.model('books', bookSchema);

module.exports = { User, Book }