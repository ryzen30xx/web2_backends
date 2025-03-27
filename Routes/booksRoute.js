const express = require("express");
const { getAllBooks, getBookDetails } = require("../Controllers/booksController");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getAllBooks); // Public
router.get("/:id", verifyToken, getBookDetails); // Protected

module.exports = router;
