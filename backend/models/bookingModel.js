import mongoose from "mongoose";

const bookingSchema= mongoose.Schema({
    residencyName:{
        type:String
    }
    
})



const Booking = mongoose.model('Booking',bookingSchema);
export default Booking;
