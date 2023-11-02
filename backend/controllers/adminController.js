import asyncHandler from "express-async-handler";

import Admin from "../models/adminModel.js";

import generateToken from "../utils/generateToken.js";

import User from '../models/userModel.js'

import Residency from "../models/residencyModel.js";

import Booking from "../models/bookingModel.js";

const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (admin && (await admin.matchPassword(password))) {
    generateToken(res, admin._id)
    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
    })
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

const logoutAdmin = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0)
  })
  res.status(200).json({ message: 'Admin Logged out' });
});

const userData = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({}, { name: 1, email: 1, number: 1, _id: 1 });
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

const residencyList = asyncHandler(async (req, res) => {
  try {
    const residency = await Residency.find({}, { title: 1, price: 1, address: 1, city: 1, country: 1, owner: 1, images: 1, userEmail: 1 })
    res.status(200).json(residency)
  } catch (error) {
    console.error("Error fetching residency :", error);
    throw error;

  }

})

const ownerFetching = asyncHandler(async (req, res) => {
  try {
    let { id } = req.query;
    let owner = await Residency.find({ owner: id });
    res.status(200).json(owner)
    console.log(owner);
  } catch (error) {
    console.log(error)

  }
})

const propUnlist = asyncHandler(async (req, res) => {
  try {
    let { id } = req.body;
    let owner = await Residency.findOne({ _id: id });
    console.log(owner.unList)
    owner.unList = true;
    await owner.save();
    res.status(200).json({ success: "Modified" })
    // console.log(owner);
  } catch (error) {
    console.log(error)
    res.status(200).json({ error: "Something Went Wrong" })
  }
})

const propList = asyncHandler(async (req, res) => {
  try {
    let { id } = req.body;
    let owner = await Residency.findOne({ _id: id });
    console.log(owner.unList)
    owner.unList = false;
    await owner.save();
    res.status(200).json({ success: "Modified" })
    // console.log(owner);
  } catch (error) {
    console.log(error)
    res.status(200).json({ error: "Something Went Wrong" })
  }
})

const countBooking = asyncHandler(async(req,res)=>{
  try {
    const buyCount = await Booking.countDocuments({type:"Buy"})
    const rentCount = await Booking.countDocuments({type:"Rent"})

    const counts ={
      buy:buyCount,
      rent:rentCount,
    }
    res.json(counts);

    console.log(`Buy bookings count: ${buyCount}`);
    console.log(`Rent bookings count: ${rentCount}`);

  } catch (error) {
    console.error(`Error counting bookings: ${error}`)
    res.status(500).json({ error: "Internal server error" });
  }
});

const countUser = asyncHandler(async(req,res)=>{
  try {
    const userCount = await User.countDocuments({})
    console.log(`Total users: ${userCount}`);
    res.json({userCount});
  } catch (error) {
    console.error(`Error counting users: ${error}`);
    res.status(500).json({ error: "Internal server error" });
    
  }
})

const countResidency = asyncHandler(async(req,res)=>{
  try {
    const residencyCount = await Residency.countDocuments({})
    console.log(`Total residency: ${residencyCount}`);
    res.json({residencyCount});
  } catch (error) {
    console.error(`Error counting residency: ${error}`);
    res.status(500).json({ error: "Internal server error" });
    
  }
})




export { authAdmin, logoutAdmin, userData, blockUser, unblockUser, 
         residencyList, ownerFetching, propUnlist, propList, countBooking,
         countUser, countResidency}