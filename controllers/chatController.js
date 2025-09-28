const authMiddleware = require("../middlewares/authMiddleware") ;
const chat = require("../Models/chat");
const router = require('express').Router();


router.post   ("/create-new-chat" , authMiddleware, async (req,res)=>{

try{

    const chats = new chat (req.body)
    const savedchat  = await chats.save()

    res.status(201).send(
        {
            success: true,
            message: "New Chat added.",
            data : savedchat
        }
    )

}

catch(err){

    res.status(400).send(
        {
            message: err.message,
            success : false
        }
    )



}

})

module.exports  = router;
