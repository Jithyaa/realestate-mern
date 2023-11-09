import mongoose from "mongoose";

const ChatSchema = mongoose.Schema({
    chatId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    message:{
        type:String,
        required:true,
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        required:true

    },
    read:{
        type:Boolean,
        default:false
    },
    timestamp:{
        type:Date,
        default:Date.now,
    }
},{
    timestamps:true
});

const Chat = mongoose.model("Chat",ChatSchema);

export default Chat;