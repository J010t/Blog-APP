import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();



export const register = async (req, res) => {
    try{
        const {username, email, password} = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const newUser = new User({username, email, password: hashedPassword});
        const saveUser = await newUser.save();
        res.status(200).json(saveUser);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const login = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user) {
            return res.status(404).json("User not found");
        }
        const match = await bcrypt.compare(req.body.password, user.password);
        if(!match) {
            return res.status(401).json("Wrong credentials");
        }
        const token = jwt.sign({_id:user._id,username:user.username,email:user.email}, process.env.JWT_SECRET, {expiresIn: "3d"});
        const {password, ...info} = user._doc;
        res
            .cookie("token",token)
            .status(200)
            .json(info);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const logout = async (req, res) => {
    try {
        res
            .clearCookie("token",{sameSite:"none",secure:true})
            .status(200)
            .send("Logged out");
    } catch (error) {
        res.status(500).json(error);
    }
};

export const refetch = (req,res)=>{
    const token=req.cookies.token
    jwt.verify(token,process.env.JWT_SECRET,{},async (err,data)=>{
        if(err){
            return res.status(404).json(err)
        }
        res.status(200).json(data)
    })
}
