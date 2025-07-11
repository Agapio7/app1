const User = require('../model/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Sign-up (Register)
exports.registerUser = async (req, res) => {
    try {
        const { first_name, last_name, username, email, password } = req.body;

        // Check if all fields are provided
        if (!first_name || !last_name || !username || !email || !password) {
            return res.status(400).json({
                success: false,
                errorCode: "MISSING_FIELDS",
                message: "All fields (first_name, last_name, username, email, password) are required!"
            });
        }

        // Check if email already exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(409).json({
                success: false,
                errorCode: "EMAIL_ALREADY_EXISTS",
                message: "This email is already registered!"
            });
        }

        // Check if username already exists
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(409).json({
                success: false,
                errorCode: "USERNAME_ALREADY_EXISTS",
                message: "This username is already taken!"
            });
        }

        // Validate email format
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                errorCode: "INVALID_EMAIL_FORMAT",
                message: "Please enter a valid email address!"
            });
        }

        // Check password length
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                errorCode: "WEAK_PASSWORD",
                message: "Password must be at least 6 characters long!"
            });
        }

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({ first_name, last_name, username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({
            success: true,
            message: "User registered successfully!"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            errorCode: "SERVER_ERROR",
            message: "Something went wrong!",
            errorDetails: error.message
        });
    }
};


// Sign-in (Login)
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                errorCode: "MISSING_FIELDS",
                message: "Email and password are required!"
            });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                errorCode: "USER_NOT_FOUND",
                message: "No account found with this email!"
            });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                errorCode: "INVALID_CREDENTIALS",
                message: "Incorrect password!"
            });
        }

        // Generate JWT Token
        const token = jwt.sign({ id: user._id }, "yourSecretKey", { expiresIn: "1h" });

        res.json({
            success: true,
            message: "Login successful!",
            token: token,
            userId: user._id,
            userName: user.username
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            errorCode: "SERVER_ERROR",
            message: "Something went wrong!",
            errorDetails: error.message
        });
    }
};


// Get All Users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude passwords
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a User by ID
exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
