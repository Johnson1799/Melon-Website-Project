import User from "../schema/User.js";
import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

/* Cloudinary database configuration */
cloudinary.config({ 
    cloud_name: process.env.cloud_name, 
    api_key: process.env.api_key, 
    api_secret: process.env.api_secret,
});


/* Get User database function */
export const getUserDatabase = async (req,res) => {
    try {
        const allUsersInfo = await User.find();
        res.json(allUsersInfo);
    } catch (err){
        res.status(500).json({ message: 'Error accessing the database' });
    }
}

/* Get user by id function */
export const getUser = async (req,res) => {
    try {
        /* grab the data sent from front-end */
        const userId = req.params.userId;

        /* find the user by the id of the user */
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        /* Send the user information back to front-end */
        res.status(200).json({user:user});

    } catch (err) {
        res.status(404).json({ message: err.message});
    }
}

/* Get user with similar username */
export const getSimilarUsers = async (req,res) => {
    try {
        /* grab the data sent from front-end */
        const userName = req.params.userName;
        const regex = new RegExp(userName, 'i');    // 'i' flag for case-insensitive search

        /* find the users by the username */
        const users = await User.find({userName: regex});
        
        if (!users) {
            return res.status(404).json({ message: "User not found" });
        }

        /* Send the users information back to front-end */
        users.forEach(user=> {
            delete user.password
        });
        res.status(200).json({users:users});

    } catch (err) {
        res.status(404).json({ message: err.message});
    }
}

export const updateUserInfo = async(req,res) => {
    /* grab the data sent from front-end */
    const userId = req.params.userId;
    const editedData = req.body;

    try{
        let updatedUser;
        if (editedData.posts){
            /* Only update the 'posts' attribute in 'user' schema */
            updatedUser = await User.findOneAndUpdate({_id: userId}, {$push: editedData}, {new: true});
        } else{
            /* Update the all the attributes in 'user' schema */
            updatedUser = await User.findOneAndUpdate({_id: userId}, editedData, {new: true});
        }
        if (updatedUser){
            /* Send the updated user information back to front-end */
            res.json(updatedUser);
        }
    }
    catch (err){
        console.log('Error updating user data:', err);
        res.status(500).json({ error: 'Error updating user data' });
    }
}

export const updateUserAvatar = async(req,res) => {
    /* grab the data sent from front-end */
    const imageURL = req.body.image;
    const userId = req.params.userId;

    /* Update the user avatar in Cloudinary */
    const uploadedImage = await cloudinary.uploader.upload(imageURL,{
        upload_preset: 'avatar_unsigned_upload', 
        public_id: `${userId}_avatar`, 
        allowed_formats: ['png', 'jpg', 'jpeg', 'svg', 'ico', 'jfif', 'webp']
    }, 
    (err,data) => {
        if (err){
            console.log(err);
        }
    });

    try{
        /* Send the updated user avatar information (e.g url) back to front-end */
        res.status(200).json(uploadedImage);
    } catch (err) {
        console.log(err);
    }
}

