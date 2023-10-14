import asyncHandler from "express-async-handler";
import Residency from "../models/residencyModel.js";


const createResidency = asyncHandler(async (req, res) => {
  try {
    const { title, description, price, address, country, city,
      facilities, image, type, timeSlots,userInfoId } = req.body.data; 
      console.log("rrrrrrrrrr👌👌",req.body.data)
      console.log("🤷🤦‍♂️",req.user)
    let savedResidency;
    const newResidency = await Residency.create({
      title,
      description,
      price,
      address,
      city,
      country,
      type,
      image,
      facilities,
      userEmail: req.body.data.userEmail, 
      timeSlots,
      owner: userInfoId,
    });

    // try {
    //   // savedResidency = await newResidency.save();
    //   console.log("😒",newResidency)
    // } catch (error) {
    //   if (error.code === 11000) { 
    //     // Handle duplicate key error (duplicate address)
    //     return res.status(400).json({ message: "A residency with this address already exists" });
    //   } else {
    //     console.error('Error creating residency:', error);
    //     console.error(error);
    //     throw new Error('Error creating residency');
    //   }
    // }

    // console.log("New Residency:", savedResidency);
    res.status(201).json({ message: "Residency created successfully", newResidency });

  } catch (err) {
    res.status(500).json({ message: err.message, error: err.message });
  }
});


// const getAllResidencies = asyncHandler(async(req,res)=>{
//   try {
//     const residencies = await Residency.find().sort({createdAt:'desc'})
//     .exec();
//     res.json(residencies);

//   } catch (err) {
//     res.status(500).json({message: "Internal server error", error:err.message});
//   }

// });


const getAllResidencies = asyncHandler(async (req, res) => {
  
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8; 
    const totalCount = await Residency.countDocuments();

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const residencies = await Residency.find()
      .sort({ createdAt: 'desc' })
      .skip(startIndex)
      .limit(limit)
      .exec();

    const results = {
      totalResidencies: totalCount,
      pageCount: Math.ceil(totalCount / limit),
      currentPage: page,
    };

    if (endIndex < totalCount) {
      results.nextPage = page + 1;
    }

    if (startIndex > 0) {
      results.prevPage = page - 1;
    }

    results.residencies = residencies; 

    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});



      // to get specific residency

const getResidency = asyncHandler(async(req,res)=>{
  const {id} = req.params;
  console.log("fffffffffffffffff",id)
  try {
    const residency =await Residency.findById(id).exec();
    if(!residency){
      return res.status(404).json({message:"Residency not found"});
    }

    res.send({...residency.toObject(),timeSlots:residency.timeSlots});
  } catch (err) {
    res.status(500).json({message:"Internal server error",error: err.message});
    
  }

})




export { createResidency,getAllResidencies,getResidency}