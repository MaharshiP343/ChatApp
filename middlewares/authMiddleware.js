const jwt = require('jsonwebtoken');
module.exports = (req, res , next) => {
    try{

        //temp
        console.log('Authorization Header:', req.headers.authorization);  // Temporary debug log

    if (!req.headers.authorization) {
      return res.status(401).send({
        message: "Authorization header missing",
        success: false
      });
    }
    const token = req.headers.authorization.split(" ")[1];

    // temp
    if (!token) {
      return res.status(401).send({
        message: "Invalid token format (use Bearer <token>)",
        success: false
      });
    }




    //    const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);  


        // console.log('Decoded Token:', decodedToken);  // Temporary debug log


        req.userId = decodedToken.userId; // Corrected to match token payload

        next();
        // const userId = decodedToken.userId;


    }
    catch(err){
        res.send({
            message : err ,
            success : false
        });
    }

}