require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const verifyToken = require("./middleware/authMiddleware");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Import Routes
const authRoutes = require("./Routes/authRoutes");
const booksRoutes = require("./Routes/booksRoute");

// Public Routes (Login & Register)
app.use("/auth", authRoutes);

// Protected Routes (Require Authentication)
app.use("/books", verifyToken, booksRoutes); 

// Redirect Unauthenticated Users to Landing Page
app.get("/", (req, res) => {
    res.send({ message: "Welcome to the Bookstore API. Please log in." });
});

// Start Server
const port = process.env.PORT || 3005;
app.listen(port, () => console.log(` Server running on http://localhost:${port}`));
