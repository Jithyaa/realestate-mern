import  express from "express";

const router = express.Router();
import { authAdmin,logoutAdmin,userData,blockUser,unblockUser,residencyList,ownerFetching, propUnlist, propList } from "../controllers/adminController.js";





router.post('/admin',authAdmin)
router.post('/logout',logoutAdmin)
router.get('/user',userData)
router.put('/block/:id', blockUser);
router.put('/unblock/:id', unblockUser);
router.get('/residencies',residencyList)
router.get('/owner-fetching',ownerFetching)
router.post('/prop-unlist',propUnlist)
router.post('/prop-list',propList)




export default router;