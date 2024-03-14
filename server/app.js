/* import npm */
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import {v2 as cloudinary} from 'cloudinary';

/* import js build-in library */
import path from "path";
import { fileURLToPath } from "url";

/* import controller files */
import { registerUser } from "./controllers/authenticationController.js";
import { createPost } from "./controllers/postController.js";

/* import route files */
import userRoute from "./routes/userRoute.js";
import postRoute from "./routes/postRoute.js";
import registerRoute from "./routes/registerRoute.js";
import loginRoute from "./routes/loginRoute.js";

/* import models files */
import User from "./models/User.js";
import Post from "./models/Post.js";

/* import custom middleware files */
import { verifyToken } from "./middleware/authorization.js";

/* import data files */
import { usersData, postsData } from "./data/data.js" ;


/* Middleware Configuration */
const __filename = fileURLToPath(import.meta.url);  // grab the file URL
const __dirname = path.dirname(__filename);         // get the directory name
dotenv.config();                                    // allow to use dotenv files
// Use Express middleware
const app = express();
app.use(express.json({limit: '5mb'}));
// use helmet middleware
app.use(helmet());                                                      
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
// use bodyParser in express middleware
app.use(bodyParser.json({limit: "30mb", extended: true}));              
app.use(bodyParser.urlencoded( {limit: "30mb", extended: true}));
// use cors middleware
app.use(cors());


/* Setting up the directory for styling */
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));


/* File Uploading Middleware(multer) Configuration */
const storage = multer.diskStorage({
    // specify the directory where the files should be stored
    destination: (req,file,cb)=>{
        cb(null,"public/assets");       // cb: call back function
    },
    // specify the filename
    filename: (req,file,cb)=>{
        cb(null, file.originalname);
    }
});
const upload = multer({storage});

/* Routes with files */
// app.post("/auth/register", upload.single("userIcon"), registerUser);
// app.post("/posts", verifyToken, upload.single("postPicture"),);

/* Routes 'users' page */
app.use("/users",userRoute);

/* Routes 'login' page */
app.use("/login",loginRoute);

/* Routes 'register' page */
app.use("/register",registerRoute);

/* Routes 'posts' page */
app.use("/posts", postRoute);


/* Database Configuration */

// cloudinary database
cloudinary.config({ 
    cloud_name: process.env.cloud_name, 
    api_key: process.env.api_key, 
    api_secret: process.env.api_secret,
});

// MongoDB
const PORT = process.env.PORT;                  // Set the port to 3001 defined in .env
mongoose.connect(process.env.MongoDB_URL)       // Connect to MongoDB by URL defined in .env file)
.then(()=>{
    app.listen(PORT,(result) => {
        console.log(`Successfully connect to Database with Server Port ${PORT}`)
    });
    
    // Insert the user data to the database
    if (!User.findOne()) {
        User.insertMany(usersData); 
    }

    // Insert the post data to the database
    if (!Post.findOne()){
        Post.insertMany(postsData);
    }
    
}) 
.catch((err)=>{
    console.log("Fail to connect to Database");
});

// Cloudinary 
// cloudinary.config({ 
//   cloud_name: 'dppg4mvct', 
//   api_key: '563463938471186', 
//   api_secret: 'IFGe6InsKCKrJBrApYdEkyfZ2qY',
//   secure: true, 
// });

