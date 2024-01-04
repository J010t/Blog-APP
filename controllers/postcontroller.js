import User from "../models/user.js";
import bcrypt from "bcryptjs";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

//create
export const createPost = async (req, res) => {
    try {
        const newPost = new Post(req.body);
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
};

//update
export const updatePost = async (req, res) => { 
    try {
        const post = await Post.findById(req.params.id);

        if (post.userId.toString() === req.body.userId) {
            const updatedPost = await Post.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json(updatedPost);
        } else {
            res.status(401).json("You can only update your post!");
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

//delete
export const deletePost = async (req, res) => { 
    try {
        await Post.findByIdAndDelete(req.params.id);
        await Comment.deleteMany({ postId: req.params.id });
       res.status(200).json("post has been deleted...");
   } catch (err) {
        res.status(500).json(err);
    }
};

//get post
export const getPost = async (req, res) => {
    try {
       const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
       res.status(500).json(err);
    }
};

// get posts
export const getPosts = async (req, res) => {
    const query = req.query;
    console.log(query);
    try {
        const searchFilter = {
            title:{ $regex: query.search, $options:'i'}
        }
       const posts = await Post.find(query.search?searchFilter:null);
        res.status(200).json(posts);
    } catch (err) {
       res.status(500).json(err);
    }
}   

// get user posts
export const getUserPost = async (req, res) => {
    try {
       const postso = await Post.find({userId:req.params.userId});
        res.status(200).json(postso);
    } catch (err) {
       res.status(500).json(err);
    }
}   