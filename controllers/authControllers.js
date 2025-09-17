const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

router.post("/signup", async(req, res) => {
  try{
    //if user already exists
    const user = await User.findOne({ email: req.body.email })
    //if user exists, send  error
    if(user) {
      return res.status(400).send({
        message: "User already exists",
        success: false
      });
    }
    
    //encrypt password
    const hashedpassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedpassword;

      
      //if user does not exist, create user
      const newUser = new User(req.body);
      await newUser.save();

    //create a new user in the database

    res.status(201).send({
      message: "User created successfully",
      success: true

    });
  }

  

  catch(error) {
    res.send({
      message: error.message,
      success:  false

    });
  }

}); 


router.post("/login", async(req, res) => {
  try{
    const user = await User.findOne({ email: req.body.email });
    if(!user) {
      return res.status(404).send({
        message: "User not found",
        success: false
      });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if(!isMatch) {
      return res.status(400).send({
        message: "Incorrect password",
        success: false
      });
    }

    //generate jwt token
    const token = jwt.sign ({userID : user._id}, process.env.SECRET_KEY, {expiresIn: "1d"});

      res.send({
        message: "Login successful",
        success: true,
        token: token
      });

    // res.status(200).send({
    //   message: "Login successful",
    //   success: true,
    //   data: user
    // });
  }
  catch(error) {
    res.send({
      message: error.message,
      success: false
    });
  }
});



module.exports = router;
