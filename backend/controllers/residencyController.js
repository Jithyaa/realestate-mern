import asyncHandler from "express-async-handler";
import Residency from "../models/residencyModel.js";


const createResidency = asyncHandler(async (req, res) => {
  try {
    const { title, description, price,address, country, city,
      facilities, images, type, timeSlots,userInfoId } = req.body.data; 
      let rate = price.split(" ")
  
      const numericPrice = !isNaN(parseFloat(rate[0])) ? (
        rate[1] === 'Cr' ? parseFloat(rate[0]) * 10000000 :
        rate[1] === 'Lakh' ? parseFloat(rate[0]) * 100000 :
        rate[1] === 'Thousand' ? parseFloat(rate[0]) * 1000 :
        parseFloat(rate[0])
      ) : 0;
      

    let savedResidency;
    const newResidency = await Residency.create({
      title,
      description,
      price:numericPrice,
      address,
      city,
      country,
      type,
      images,
      facilities,
      userEmail: req.body.data.userEmail, 
      timeSlots,
      owner: userInfoId,
    });
    res.status(201).json({ message: "Residency created successfully", newResidency });

  } catch (err) {
    res.status(500).json({ message: err.message, error: err.message });
  }
});


const getAllResidencies = asyncHandler(async (req, res) => {
  
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8; 
    const totalCount = await Residency.countDocuments();

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const residencies = await Residency.find({unList:false})
  
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
    const residency =await Residency.findById(id);
    if(!residency){
      return res.status(404).json({message:"Residency not found"});
    }

    res.send(residency);
  } catch (err) {
    res.status(500).json({message:"Internal server error",error: err.message});
    
  }

})


export { createResidency,getAllResidencies,getResidency}