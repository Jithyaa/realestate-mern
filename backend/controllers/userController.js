import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js'
import nodemailer from 'nodemailer';
import Booking from '../models/bookingModel.js';
import Residency from '../models/residencyModel.js'
import mongoose from 'mongoose';

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      number: user.number,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password')
  }
});



const registerUser = asyncHandler(async (req, res) => {
  const { name, email, number, password } = req.body;

  const userExists = await User.findOne({ email });
  console.log("suiiiiiiiiiii dd")

  if (userExists) {
    res.status(400);
    throw new Error('User already exists')
  }

  // Generate OTP
  const otp = Math.floor(1000 + Math.random() * 9000);

  // Send OTP to user's email
  await sendOTPByEmail(email, otp);


  const user = await User.create({
    name,
    email,
    number,
    password,
    otp,

  });
  console.log("suiiiiiiiiiii mm")

  res.status(200).json({ message: 'Register user' })
});


// *Sending otp*


const sendOTPByEmail = async (email, otp) => {
  // const transporter = nodemailer.createTransport({
  //   host: 'smtp.ethereal.email',
  //   port: 587,
  //   auth: {
  //     user: process.env.ETHEREAL_EMAIL,
  //     pass: process.env.ETHEREAL_PASSWORD
  //   }
  // })

  // const mailOptions = {
  //   from: process.env.ETHEREAL_EMAIL,
  //   to: email,
  //   subject: 'OTP Verification',
  //   text: ` Your OTP for verification is: ${otp}`,
  // };

  // await transporter.sendMail(mailOptions);
  try{
        console.log("suiiiiiiiiiii")
        const transporter = nodemailer.createTransport({
            host:process.env.HOST,
            port:Number(process.env.EMAIL_PORT),
            secure:false,
            requireTLS: true,

            auth:{
                user:process.env.USER,
                pass:process.env.PASS,
            }
        });
        const options = {
            from:process.env.USER,
            to:email,
            subject:'OTP Verification',
            text:` Your OTP for verification is: ${otp}`,
        }
        transporter.sendMail(options,(err,info)=>{
          if (err) {
            console.log("Email not sent:", err);
          } else {
            console.log("Email sent successfully:", info.response);
          }
        });
      }catch(err){
        console.log(err);
      }
};



const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0)
  })
  res.status(200).json({ message: 'User Logged out ' })
});



const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };
  res.status(200).json(user);
});


const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.file) {
      user.imagePath = req.file.filename || user.imagePath
    }

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updateUser = await user.save();
    res.status(200).json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
    });


  } else {
    res.status(404);
    throw new Error('User not found')
  }
});



// *** Verifying Otp ***


const verifyRegisterOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  // Find the user by email
  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }
  const receivedOTP = parseInt(otp, 10);
  if (user.otp === receivedOTP) {
    user.isVerified = true;
    await user.save();

    if (user.isVerified === true) {
      generateToken(res, user._id);
      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
      });
    } else {
      res.status(400);
      throw new Error('User verification failed');
    }
  } else {
    res.status(400);
    throw new Error('Invalid OTP');
  }
});



//  ** For Reset Password **


const sendPasswordResetEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ success: false, error: 'User not found' });
      return;
    }
    user.resetOtp = otp;
    await user.save();
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: process.env.ETHEREAL_EMAIL,
        pass: process.env.ETHEREAL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.ETHEREAL_EMAIL,
      to: email,
      subject: 'Password Reset OTP',
      text: `Your OTP for password reset is: ${otp}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.messageId);

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Error sending email: ' + err.message);
    res.status(500).json({ success: false, error: 'Error sending email' });
  }
});


const verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  console.log('Received OTP verification request:', req.body);

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404).json({ success: false, error: 'User not found' });
    return;
  }
  const receivedOtp = Number(otp);
  if (user.resetOtp === receivedOtp) {
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ success: false, error: 'OTP does not match' });
  }
});



const resetPassword = asyncHandler(async (req, res) => {
  const { email, newPassword } = req.body;
  if (!req.user) {
    res.status(401).json({ success: false, error: 'Unauthorized' });
    return;
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ success: false, error: 'User not found' });
      return;
    }

    // Check if the new password is the same as the old password
    if (await user.comparePassword(newPassword)) {
      res.status(400).json({ success: false, error: 'New password must be different from the old password' });
      return;
    }

    // Update the user's password in the database
    user.password = newPassword;
    await user.save();

    // Optionally, remove the old password here

    res.status(200).json({ success: true, message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ success: false, error: 'Error resetting password' });
  }
});

// *** Reset Password END ***//


// book visit to residency //

const bookVisit = async (req, res) => {
  const { userEmail, date, selectedTime, ownerId, type,userId} = req.body;
  console.log("⭐⭐",req.body)
  const { id } = req.params; // residency id //
  try {
    const residency = await Residency.findById(id);

    if (!residency) {
      res.status(404).json({ message: "Residency Not Found" });
      return;
    }

    const existingBooking = await Booking.find({
      userEmail,
      date,
      userId,
      time:selectedTime,
    })
    if(existingBooking.length > 0){
      return res.status(400).json({ message: "You already have a booking at the same date and time" });
    }

    const existingBookingForSameProperty = await Booking.findOne({
      userEmail,
      userId,
      residencyId:id,

    });
    if(existingBookingForSameProperty){
      return res.status(400).json({ message: "You have already booked this property" });
    }

    const newBooking = new Booking({
      userEmail,
      userId,
      residencyId: id,
      date,
      time: selectedTime,
      ownerId,
      type,
    });

    await newBooking.save();

    res.send("Your visit is booked successfully");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const getOwnedProperties = asyncHandler(async (req, res) => {
  try {
    const { userEmail } = req.params;
    const residency = await Residency.find({ userEmail }).populate('residencyId')
    res.status(200).json(residency);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
})


const cancelBooking = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;
  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" })
    }
    await Booking.findByIdAndDelete(bookingId);
    res.json({ message: 'Booking cancelled successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});


const toFav = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { rid } = req.params;

  try {
    const user = await User.findOne({ email }).exec();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.favResidenciesID.includes(rid)) {

      user.favResidenciesID = user.favResidenciesID.filter((id) => id !== rid);

    } else {
      user.favResidenciesID.push(rid);
    }

    const updateUser = await user.save();

    if (user.favResidenciesID.includes(rid)) {

      res.send({ message: "Added to favorites", user: updateUser });
    } else {
      res.send({ message: "Removed from favorites", user: updateUser });
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

const getAllFavorites = asyncHandler(async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email }, 'favResidenciesID').exec();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.favResidenciesID);

  } catch (error) {
    throw new Error(err.message);
  }
});


const getBookings =asyncHandler (async(req,res)=>{
  const {userEmail} = req.params;
  try {
    const bookings = await Booking.find({userEmail});
    res.status(200).json(bookings);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export {
  authUser, registerUser, logoutUser, getUserProfile,
  updateUserProfile, sendPasswordResetEmail, verifyOtp,
  resetPassword, verifyRegisterOtp, bookVisit, getOwnedProperties,
  cancelBooking, toFav, getAllFavorites, getBookings, 
};






