const mongoose = require("mongoose");

const chatschema = new mongoose.Schema({

    members : {
        type:[
            {type:mongoose.Schema.Types.ObjectID , ref : "users"},
            
            
        ]
    },

    lastMessage : {
        type : mongoose.Schema.Types.ObjectID , ref: "messages"
    },

    unreadMessageCount:{
        type:Number,
        default : 0 
    }





} , { timestamps:true } );

module.exports =    mongoose.model("chats" , chatschema);