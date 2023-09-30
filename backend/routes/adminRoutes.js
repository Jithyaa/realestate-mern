import  express from "express";

const router = express.Router();
import { authAdmin,logoutAdmin,userData,blockUser,unblockUser } from "../controllers/adminController.js";





router.post('/admin',authAdmin)
router.post('/logout',logoutAdmin)
router.get('/user',userData)
router.put('/block/:id', blockUser);
router.put('/unblock/:id', unblockUser);




export default router;