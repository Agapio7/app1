const express = require('express');
const router = express.Router();
const userController = require('../controller/auth.controller');

// Routes
router.post('/register', userController.registerUser);  // User Registration
router.post('/login', userController.loginUser);  // User Login
router.get('/users', userController.getAllUsers);  // Get All Users
router.delete('/delete/:id', userController.deleteUser);  // Delete User by ID

module.exports = router;
