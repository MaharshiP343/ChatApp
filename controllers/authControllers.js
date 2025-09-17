const router = require("express").Router();
const bcrypt = require("bcryptjs");
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


module.exports = router;
