import express from "express";
import {register,login,logout,refetch} from "../controllers/authcontroller.js";

const router = express.Router();

//register
router.post("/register",register);

//login
router.post("/login",login);

//logout
router.get("/logout",logout);

// refetch
router.get("/refetch", refetch);

export default router;