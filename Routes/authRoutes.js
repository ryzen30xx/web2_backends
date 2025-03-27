const express = require("express");
const { registerUser, loginUser, getAllUsers, deleteUser } = require("../Controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", getAllUsers); // Lấy danh sách người dùng
router.delete("/users/:id", deleteUser); // Xóa người dùng

module.exports = router;