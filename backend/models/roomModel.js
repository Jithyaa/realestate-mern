import mongoose from "mongoose";

const ChatRoomSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    ownerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Residency',
        required:true,
    }

},{
    timestamps:true

});

const ChatRoom = mongoose.model("ChatRoom",ChatRoomSchema);

export default ChatRoom;
