import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import path from "path";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import PostRoute from "./routes/posts.js";
import CommentRoute from "./routes/comments.js";
import Post from "./models/Post.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
dotenv.config();

const app = express();

//database
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO)
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
    }
};
connectDB();


//middleware
app.use(express.json());
app.use(cookieParser());
const __dirname = path.resolve();
app.use
app.use(cors({origin: "http://localhost:5173",credentials: true}));
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", PostRoute);
app.use("/api/comments", CommentRoute);


app.use("/images", express.static(path.join(__dirname, "/images"))); 

//upload image
const storage = multer.diskStorage({
    destination: (req, file, fn) => {
        fn(null, "images");
    },
    filename: (req, file, fn) => {
        fn(null, req.body.img);
    },
});

const upload=multer({storage:storage});
app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("Image has been uploaded successfully!");
})


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});


app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client","dist","index.html"));
});
app.post("/api/upload",async (req, res) => {
    const body = req.body;
    try {
        const newImg = await Post.create(body);
        
    } catch (error) {
        
    }

});