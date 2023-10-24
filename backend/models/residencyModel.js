import mongoose from "mongoose";

const residencySchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true,
        unique:true
    },
    city:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    type:{
        type:String,
        enum:["Buy","Rent"]
    },
    images:{
        type: [String ],
        required:true,
    },
    facilities:{
        type:mongoose.Schema.Types.Mixed,    /* To allow flexible JSON data.*/
        required:true
    },
    
    userEmail:{
        type:String,
        required:true,
       

    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
      },
      
      timeSlots:{
        type:[String]
      },
      unList:{
        type:Boolean,
        default:false,
      }
},
{
    timestamps:true,
  })


const Residency = mongoose.model("Residency", residencySchema);

export default Residency;