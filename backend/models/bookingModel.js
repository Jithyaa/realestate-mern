import mongoose from "mongoose";

const bookingSchema = mongoose.Schema({
    residency: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Residency", 

    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        
    },
    date: {
        type: Date,
       
    },
    time: {
        type: String,

    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" 
    }
}, {
    timestamps: true
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
