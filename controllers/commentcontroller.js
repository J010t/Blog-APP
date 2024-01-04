import User from "../models/user.js";
import bcrypt from "bcryptjs";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

//create
export const createComment = async (req, res) => {
    try {
        const newComment = new Comment(req.body);
        const savedComment = await newComment.save();
        res.status(200).json(savedComment);
    } catch (err) {
        res.status(500).json(err);
    }
};

//update
export const updateComment = async (req, res) => { 
    try {
        const Comment = await Comment.findById(req.params.id);

        if (Comment.userId.toString() === req.body.userId) {
            const updatedComment = await Comment.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json(updatedComment);
        } else {
            res.status(401).json("You can only update your post!");
        }
    } catch (err) {
        res.status(500).json(err);
    }
};
//delete
export const deleteComment = async (req, res) => { 
    try {
        await Comment.findByIdAndDelete(req.params.id);
       res.status(200).json("Comment has been deleted...");
   } catch (err) {
        res.status(500).json(err);
    }
};

//get Comment
export const getComments = async (req,res)=>{
    try{
        const comments=await Comment.find({postId:req.params.postId});
        res.status(200).json(comments);
    }
    catch(err){
        res.status(500).json(err);
    }
}


