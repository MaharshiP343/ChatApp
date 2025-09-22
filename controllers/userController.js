const router = require('express').Router();
const User = require('../models/user');
const authMiddleware = require("../middlewares/authmiddleware");

router.get('/get-logged-user', authMiddleware, async (req, res) => {
  try {
   // console.log('Route: Starting query with userId:', req.userId);
    
    const user = await User.findOne({ _id: req.userId });
    
   // console.log('Route: Query result:', user);
    
    if (!user) {
      return res.status(404).send({
        message: "User not found - the user may have been deleted",
        success: false
      });
    }
    
    res.status(200).send({
      message: "User fetched successfully",
      success: true,
      data: user
    });
  }
   catch (err) {
    console.error('Route Error Details:', err);
    res.status(500).send({
      message: err.message || 'An unknown error occurred during query',
      success: false
    });
  }
});

router.get('/get-all-users', authMiddleware, async (req, res) => {
  try {
  //  console.log('Route: Starting query with userId:', req.userId);
    const userid = req.userId
    const alluser = await User.find({ _id: { $ne: userid }  });
    
   // console.log('Route: Query result:', user);
    
      
    res.status(200).send({
      message: "User fetched successfully",
      success: true,
      data: alluser
    });
  }
   catch (err) {
    console.error('Route Error Details:', err);
    res.status(500).send({
      message: err.message || 'An unknown error occurred during query',
      success: false
    });
  }
});

module.exports = router;
