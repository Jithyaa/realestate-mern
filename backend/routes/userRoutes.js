import express from 'express';
import multer from "multer";
import path from "path";
const router = express.Router();
import { authUser,registerUser,logoutUser,getUserProfile,
         updateUserProfile, sendPasswordResetEmail,
         verifyOtp,resetPassword,verifyRegisterOtp,
         bookVisit,getOwnedProperties,cancelBooking,toFav,
         getAllFavorites,getBookings
        } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';


router.post('/',registerUser)
router.post('/auth',authUser)
router.post('/logout',logoutUser); 

const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null,'backend/public/Images')
    },
    filename: (req,file,cb) => {
        cb(null,file.fieldname + "_" +Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage:storage
})

router.route('/profile').get(protect,getUserProfile).put(protect,upload.single('file'),updateUserProfile)

router.post('/send-reset-email', sendPasswordResetEmail);

// Add a new route for OTP verification
router.post('/verify-otp',verifyOtp )

router.post('/reset-password', resetPassword);

router.post('/otp-verification',verifyRegisterOtp);


// residency booking route //

router.post("/bookVisit/:id",bookVisit)
router.get("/ownedProperties/:userEmail",getOwnedProperties)
router.post("/removeBooking/:id",cancelBooking)
router.post("/toFav/:rid",toFav)
router.post("/allFav/",getAllFavorites)
router.get("/bookings/:userEmail",getBookings)



export default router;