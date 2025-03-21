const mongoose = require('mongoose');

const bookSchema = mongoose.Schema ({
    title: String,
    description: String,
    author: String,
    image: String,
    price: Number,
    Quantity: Number
})

const bookModel = mongoose.model('Book', bookSchema);
module.exports = bookModel;