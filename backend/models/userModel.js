import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    number: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                // Check if mobileNumber is a 10-digit number.
                return /^\d{10}$/.test(value);
            },
            message: 'Mobile number must be a 10-digit number'
        }
    },
    password:{
        type:String,
        required:true
    },

    imagePath:{
        type:String,
        
    },
    blocked: {
        type: Boolean,
        default: false
    },
    resetOtp:{
        type:Number,
    },
    otp:{
        type:Number
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    bookedVisits: [
        {
          type: mongoose.Schema.Types.Mixed,
        },
      ],
      favResidenciesID: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Residency",
        },
      ],
      ownedResidencies: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Residency",
        },
      ],
   
},
{
  timestamps:true,
}
);

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt= await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt)
    next();

});

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);

}

const User = mongoose.model('User',userSchema);

export default User;