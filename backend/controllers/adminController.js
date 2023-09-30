import asyncHandler from "express-async-handler";

import Admin from "../models/adminModel.js";

import generateToken from "../utils/generateToken.js";

import User from '../models/userModel.js'

const authAdmin = asyncHandler( async (req,res) => {
    const {email,password} = req.body;

    const admin= await Admin.findOne({email});

    if(admin && (await admin.matchPassword(password))){
        generateToken(res,admin._id)
        res.status(201).json({
            _id:admin._id,
            name:admin.name,
            email:admin.email,
        })
    }else{
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

const logoutAdmin = asyncHandler( async (req,res) => {
    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0)
    })
    res.status(200).json({message:'Admin Logged out'});
});

const userData = asyncHandler(async (req,res) => {
  
    try {
        const users = await User.find({}, { name: 1, email: 1, number:1});
        console.log(users)
        res.status(200).json(users)
      } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
      }
  })


  const blockUser = asyncHandler(async (req, res) => {
    const userId = req.params.id;
  
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        res.status(404);
        throw new Error('User not found');
      }
  
      user.blocked = true;
      await user.save();
  
      res.status(200).json({ message: 'User blocked successfully' });
    } catch (error) {
      console.error('Error blocking user:', error);
      res.status(500).json({ error: 'An error occurred while blocking the user' });
    }
  });
  
  const unblockUser = asyncHandler(async (req, res) => {
    const userId = req.params.id;
  
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        res.status(404);
        throw new Error('User not found');
      }
  
      user.blocked = false;
      await user.save();
  
      res.status(200).json({ message: 'User unblocked successfully' });
    } catch (error) {
      console.error('Error unblocking user:', error);
      res.status(500).json({ error: 'An error occurred while unblocking the user' });
    }
  });
  
  



export {authAdmin,logoutAdmin,userData,blockUser,unblockUser}