import express from 'express';
import {createComment, updateComment,deleteComment,getComments} from '../controllers/commentcontroller.js';
import verifyToken from '../verifyToken.js';


const router = express.Router();

//create
router.post('/create', verifyToken,createComment);

//update
router.put('/update/:id', verifyToken,updateComment);

//delete
router.delete('/delete/:id', verifyToken,deleteComment);

//get user post
router.get("/post/:postId",getComments);

export default router;