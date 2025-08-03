const router = require("express").Router();
const bcrypt = require("bcryptjs");
const user = require("../models/user");

router.post("/signup", async(req, res) => {

  try{
    //if user already exists
    const user = await user.findOne({ email: req.body.email })
    //if user exists, send  error
    if(user) {
      return res.status(400).send({
        message: "User already exists",
        success: false
      });
    }
    
    //encrypt password
    await bcrypt.hash(req.body.password, 10, async (err, hash) => {
      
      //if user does not exist, create user
    //create a new user in the database



  }

  catch(error) {
    res.send({
      message: error.message,
      success:  false

    });
  }

})

module.exports = router;
