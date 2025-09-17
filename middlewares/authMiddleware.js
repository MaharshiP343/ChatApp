const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    console.log('Authorization Header:', req.headers.authorization);
    
    if (!req.headers.authorization) {
      return res.status(401).send({
        message: "Authorization header missing",
        success: false
      });
    }
    
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).send({
        message: "Invalid token format (use Bearer <token>)",
        success: false
      });
    }
    
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    console.log('Decoded Token:', decodedToken);
    
    // Set userId on req object (matches userID from token payload)
    req.userId = decodedToken.userID;
    next();
  } catch (err) {
    console.error('JWT Error:', err);
    res.status(401).send({
      message: err.message || 'Authentication failed',
      success: false
    });
  }
};
