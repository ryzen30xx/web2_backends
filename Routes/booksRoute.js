const bookControllers = require('../Controllers/booksController.js');

const booksRoute = (app) => {
    app.route('/books')
        .get(bookControllers.ViewAllBooks)
        .post(bookControllers.AddNewBook)
        .delete(bookControllers.DeleteAllBooks)

    app.route('/book/:bookId')
        .get(bookControllers.ViewBook)
        .put(bookControllers.UpdateBook)
        .delete(bookControllers.DeleteBook)
}

module.exports = booksRoute