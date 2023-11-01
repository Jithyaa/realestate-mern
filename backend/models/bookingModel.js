import mongoose from "mongoose";

const bookingSchema = mongoose.Schema({
    residencyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Residency", 

    },
    userEmail: {
        type: String,
        // ref: "Residency", 
        
    },
    date: {
        type: Date,
       
    },
    time: {
        type: String,

    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Residency", 
    },
    type:{
        type:String,
        ref:"Residency",
    }
}, {
    timestamps: true
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
