const jwt = require('jsonwebtoken');



module.exports = (req, res , next) => {

    try{

        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');

        req.body.userId = decodedToken.userId; 
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