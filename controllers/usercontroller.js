import bcrypt from "bcryptjs";
import User from "../models/user.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";


//update
export const update = async (req,res)=>{
    try{
        if(req.body.password){
            const salt=await bcrypt.genSalt(10);
            req.body.password=await bcrypt.hashSync(req.body.password,salt);
        }
        const updatedUser=await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.status(200).json(updatedUser);

    }
    catch(err){
        res.status(500).json(err);
    }
};

//delete
export const signOut = async (req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        await Post.deleteMany({userId:req.params.id})
        await Comment.deleteMany({userId:req.params.id})
        res.status(200).json("User has been deleted!")

    }
    catch(err){
        res.status(500).json(err)
    }
};

//get user
export const getuser = async (req,res)=>{
    try{
        const user=await User.findById(req.params.id)
        const {password,...info}=user._doc
        res.status(200).json(info)
    }
    catch(err){
        res.status(500).json(err)
    }
};
