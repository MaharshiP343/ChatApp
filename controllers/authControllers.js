const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

router.post("/signup", async (req, res) => {
  try {
    // Check if user already exists
    const user = await User.findOne({ email: req.body.email });
    
    // If user exists, send error
    if (user) {
      return res.status(400).send({
        message: "User already exists",
        success: false
      });
    }
    
    // Basic validation for required fields
    if (!req.body.email || !req.body.password || !req.body.firstname || !req.body.lastname) {
      return res.status(400).send({
        message: "Missing required fields (firstname, lastname, email, password)",
        success: false
      });
    }
    
    // Encrypt password
    const hashedpassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedpassword;
    
    // Create new user
    const newUser = new User(req.body);
    await newUser.save();
    
    res.status(201).send({
      message: "User created successfully",
      success: true
    });
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).send({
      message: error.message,
      success: false
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({
        message: "User not found",
        success: false
      });
    }
    
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).send({
        message: "Incorrect password",
        success: false
      });
    }
    
    // Generate JWT token
    const token = jwt.sign({ userID: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });
    
    // Temporary debug logs (remove after testing)
    console.log('Generated Token:', token);
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    console.log('Decoded Token:', decodedToken);
    
    res.status(200).send({
      message: "Login successful",
      success: true,
      token: token
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).send({
      message: error.message,
      success: false
    });
  }
});

module.exports = router;
