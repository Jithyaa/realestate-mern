import asyncHandler from 'express-async-handler'
import ChatRoom from '../models/roomModel.js';
import Chat from '../models/chatModel.js';



const createChat = asyncHandler(async (req, res) => {
    try {
        const { userId, ownerId, message } = req.body;
        const chatRoom = await ChatRoom.findOneAndUpdate(
            {
                $or: [
                    { userId, ownerId },
                    { userId: ownerId, ownerId: userId },
                ],
            },
            {},
            { upsert: true, new: true }

        );

        const newMessage = await Chat.create({
            chatId: chatRoom._id,
            message,
            sender: userId,
            ownerId,

        });
        return res.status(200).json(newMessage);

    } catch (error) {
        console.log(error);
        return res.status(500).json("Internal servor error");
    }
});

const createChatRoom = asyncHandler(async(req,res)=>{
    try {
        const { userId,ownerId,rid} =req.body;
        console.log("👽👽👽👽👽",req.body);
        let data= await ChatRoom.findOne({userId : userId, ownerId:ownerId,residencyId:rid})
        if(data){
            console.log("wooowwwwwww");
            return res.status(200).send({id:data._id})
        }else{
          if(userId && ownerId && rid){
            let data2= await ChatRoom.create({userId:userId,ownerId:ownerId,residencyId:rid});
            return res.status(200).send({id:data2._id})
          }
        }
    } catch (error) {
        console.log(error);
    }
});
const rooms = asyncHandler(async(req,res)=>{
    try {
        console.log('☠️😶‍🌫️');
       let {id}=req.query;
       let data= await ChatRoom.find(
        {
            $or: [
                { userId:id},
                { ownerId:id},
            ],
        }).populate({path:'residencyId',select:'title images'})
       console.log({data});
       return res.status(200).send({dt:data})
    } catch (error) {
        console.log(error);
    }
});

const addMessage = asyncHandler(async(req,res)=>{
    let {roomId,message,id} = req.body
    try{
        await Chat.create({
            chatId:roomId,
            message:message,
            sender:id,
            
        })
        res.status(200).send({success:true})
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})
const showMessages = asyncHandler(async(req,res)=>{
    let {id} = req.query;
    try{
        let messages = await Chat.find({
            chatId:id,
        })
        res.status(200).send({messages:messages})
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})





export { createChat, createChatRoom, rooms,addMessage,showMessages}