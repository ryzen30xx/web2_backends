const express = require("express");
const { getAllBooks, getBookDetails, addBook, deleteBook, updateBook } = require("../Controllers/booksController");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getAllBooks); // Public
router.get("/:id", verifyToken, getBookDetails); // Protected
router.post("/", verifyToken, addBook); // Protected
router.delete("/:id", verifyToken, deleteBook); // Protected
router.put("/:id", verifyToken, updateBook); // Protected

module.exports = router;
