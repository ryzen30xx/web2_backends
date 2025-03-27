const Book = require("../Models/bookModel");
const jwt = require("jsonwebtoken");

// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Access Denied. No token provided." });

    try {
        const verified = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid token", error });
    }
};

// Get all books (Public)
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: "Error fetching books", error });
    }
};

// Get book details (Protected)
exports.getBookDetails = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: "Book not found" });
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: "Error fetching book", error });
    }
};

// Add a new book (Protected)
exports.addBook = async (req, res) => {
    try {
        const { title, description, author, image, price, Quantity } = req.body;

        // Đúng: Kiểm tra "Quantity" với chữ hoa
        if (!title || !author || !price || !Quantity) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newBook = new Book({ title, description, author, image, price, Quantity });
        await newBook.save();
        
        res.status(201).json({ message: "Book added successfully!", book: newBook });
    } catch (error) {
        console.error("Error adding book:", error);  // In lỗi ra console
        res.status(500).json({ message: "Error adding book", error });
    }
};


// Update a book (Protected)
exports.updateBook = async (req, res) => {
    try {
        const { title, description, author, image, price, Quantity } = req.body;
        const bookId = req.params.id;

        const updatedBook = await Book.findByIdAndUpdate(
            bookId,
            { title, description, author, image, price, Quantity },
            { new: true, runValidators: true }
        );

        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.json({ message: "Book updated successfully!", book: updatedBook });
    } catch (error) {
        res.status(500).json({ message: "Error updating book", error });
    }
};

// Delete a book (Protected)
exports.deleteBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        const deletedBook = await Book.findByIdAndDelete(bookId);

        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.json({ message: "Book deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting book", error });
    }
};
