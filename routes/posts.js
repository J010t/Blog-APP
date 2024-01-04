import express from 'express';
import { getPosts, createPost, updatePost, deletePost,getPost,getUserPost} from '../controllers/postcontroller.js';
import verifyToken from '../verifyToken.js';


const router = express.Router();

//create
router.post('/create', verifyToken,createPost);

//update
router.put('/update/:id',verifyToken, updatePost);

//delete
router.delete('/delete/:id',verifyToken, deletePost);

//get all
router.get('/all', getPosts);

//get post
router.get('/:id', getPost);

//get user post
router.get('/user/:userId',getUserPost);



export default router;