import express from "express";
import {update,signOut,getuser} from "../controllers/usercontroller.js";
import verifyToken from "../verifyToken.js";



const router = express.Router();
//update
router.put("/:id", verifyToken,update);

//delete
router.delete("/:id",verifyToken, signOut);

//get user
router.get("/:id", verifyToken,getuser);





export default router;




