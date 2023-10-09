import asyncHandler from "express-async-handler";
import Residency from "../models/residencyModel.js";


const createResidency = asyncHandler(async (req, res) => {
 
  try {
    const { title, description, price, address, country, city,
      facilities, image, userEmail, type, timeSlots } = req.body.data;

      let savedResidency;

    const newResidency = new Residency({
      title,
      description,
      price,
      address,
      city,
      country,
      type,
      image,
      facilities,
      userEmail,
      timeSlots,
      owner: userEmail._id,
    });
    try {
      
       savedResidency = await newResidency.save();
    } catch (error) {
      console.error('Error creating residency:', error);
      throw new Error('Error creating residency');
    }
    
    
    console.log("56tgghh777777", savedResidency);
    res.send({ message: "Recidency created successfully", savedResidency })

  } catch (err) {
    if (err.code === "P2002") {
      throw new Error("A residency with address already there")
    }else{
      res.status(500).json({ message: "Internal server error", error: err.message });
    }
  }
});

const getAllResidencies = asyncHandler(async(req,res)=>{
  try {
    const residencies = await Residency.find().sort({createdAt:'desc'})
    .exec();
    res.json(residencies);

  } catch (err) {
    res.status(500).json({message: "Internal server error", error:err.message});
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