const bookModel = require('../Models/bookModel.js');
const {} = require("express");

const ViewAllBooks = async (req, res) => {
    try {
        const books = await bookModel.find({});
        res.json(books);
    } catch (err) {
        res.status(400).send(err);
    }
}

const AddNewBook = async (req, res) => {
    try {
        await bookModel.create(req.body);
        res.sendStatus(201);
    } catch (err) {
        res.status(400).send(err);
    }
}

const DeleteAllBooks = async (req, res) => {
    try {
        await bookModel.deleteMany();
        res.sendStatus(202);
    } catch (err) {
        res.status(400).send(err);
    }

}

const ViewBook = async (req, res) => {
    try {
        var book = await bookModel.findById(req.params.id);
        // res.sendStatus(201);
        res.json(book);
    } catch (err) {
        res.status(400).send(err);
    }
}

const UpdateBook = async (req, res) => {
    try {
        await bookModel.findOneAndReplace({_id: req.params.id }, req.body);
        res.sendStatus(202);
    } catch (err) {
        res.status(400).send(err);
    }
}

const DeleteBook = async (req, res) => {
    try {
        await bookModel.deleteOne({_id: req.params.id});
        res.sendStatus(202);
    } catch (err) {
        res.status(400).send(err);
    }
}

module.exports = {
    ViewAllBooks,
    AddNewBook,
    DeleteAllBooks,
    ViewBook,
    UpdateBook,
    DeleteBook

}