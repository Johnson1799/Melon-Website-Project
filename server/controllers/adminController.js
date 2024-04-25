import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../schema/User.js";
import Post from "../schema/Post.js";
import Admin from "../schema/Admin.js";
import dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';
import { extractPublicId } from 'cloudinary-build-url';
import { adminData } from "../data/data.js" ;


dotenv.config();
/* Cloudinary database configuration */
cloudinary.config({ 
    cloud_name: process.env.cloud_name, 
    api_key: process.env.api_key, 
    api_secret: process.env.api_secret,
});



/* Login Admin account */
export const adminLogin = async (req,res) => {
    try {
        /* Grab the data from front-end */
        const inputEmail = req.body.email;
        const inputPassword = req.body.password;

        /* Grab the data from server */
        let adminPassword = adminData[0].password;

        /* Check if admin is appeared in MongoDB */
        const admin = await Admin.findOne({ email: inputEmail });

        if(!admin){
            return res.status(403).send({message:"Admin is not found"});
        }
        else{
            /* Encrypt the admin password and store back to admin schema */
            const salt = await bcrypt.genSalt();
            const isPasswordHashed = bcrypt.compareSync(adminPassword, admin.password);

            if (!isPasswordHashed){
                adminPassword = await bcrypt.hash(adminPassword, salt);
            }

            /* Check if the input password is correct */
            const isPasswordMatch = await bcrypt.compare(inputPassword, adminPassword);
            if (!isPasswordMatch){
                return res.status(401).json({message: "Invalid Email or Password"});
            }
    
            /* create a token (using jwt) and make a secret string for the token */
            const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET);

            /* Save the updated admin into MongoDB */
            const updatedAdmin = await admin.save();

            /* Send the response to the front-end */
            res.status(200).send({adminId: updatedAdmin._id, token: token});
        }
    }
    catch (err) {
        // send the error message to front-end
        res.status(500).json({error: err.message});
    }
}

/* Get all the users information to admin */
export const getUsers = async (req,res) => {
    try {
        const adminId = req.params.adminId;
        const admin = await Admin.findById(adminId);
        if (!admin){
            return res.status(403).send({message:"Admin is not found"});
        }
        else{
            /* Get the all the users' data from database */
            const users = await User.find();
            admin.users = users;
            await admin.save();
            res.status(200).send({users});
        }

    } catch (err){
        res.status(500).json({ message: 'Error accessing the database' });
    }
}

/* Get all the posts information to admin */
export const getPosts = async (req,res) => {
    try {
        const adminId = req.params.adminId;
        const admin = await Admin.findById(adminId);
        if (!admin){
            return res.status(403).send({message:"Admin is not found"});
        }
        else{
            /* Get the all the users' data from database */
            const posts = await Post.find();
            admin.posts = posts;
            await admin.save();
            res.status(200).send({posts});
        }

    } catch (err){
        res.status(500).json({ message: 'Error accessing the database' });
    }
}

export const deleteUser = async (req,res) => {
    try {
        const adminId = req.params.adminId;
        const admin = await Admin.findById(adminId);
        if (!admin){
            return res.status(403).send({message:"Admin is not found"});
        }
        else{
            /* Delete the user data from Admin schema */
            const userId = req.params.userId;

            const updatedUserList = admin.users.filter(user => !user._id.equals(userId));
            const updatedPostList = admin.posts.filter(post => post.userId !== userId);
            await Admin.updateOne({_id: adminId}, {$set: {users: updatedUserList, posts: updatedPostList}});

            /* Remove posts from Cloudinary */
            const postsToBeDeleted = await Post.find({userId:userId});
            const deletePostsPromise = postsToBeDeleted.map( async(post) => {
                const publicId = extractPublicId(post.postImgURL);
                await cloudinary.uploader.destroy(publicId);
            });
            await Promise.all(deletePostsPromise);


            /* Remove posts from posts schema */
            await Post.deleteMany({userId: userId});

            /* Delete the user data from User schema */
            const deletedUser = await User.findByIdAndDelete(userId);
            if (!deletedUser){
                return res.status(404).json({ message: 'User not found' });
            }

            /* Remove user avatar from Cloudinary */
            const defaultUserAvatarURL = 'https://res.cloudinary.com/dppg4mvct/image/upload/v1711785845/avatar/default_user_avatar.png'
            if (deletedUser?.userAvatarURL !== defaultUserAvatarURL){
                const publicId = extractPublicId(deletedUser?.userAvatarURL);
                await cloudinary.uploader.destroy(publicId);
            }

            /* Remove the friend in other user */ 
            const userIdObj = mongoose.Types.ObjectId(userId);

            const users = await User.find({ 'friends._id': userIdObj });
            await Promise.all(users.map(async (user) => {
                // Update the user's friend list in the database
                // await User.updateOne({ _id: user._id }, { $pull: { friends: { _id: userId } } });
                await User.updateOne({ _id: user._id }, { $pull: { friends: { _id: userIdObj } } });
            }));

            res.status(200).send({users: updatedUserList, posts:updatedPostList});
        }

    } catch (err){
        res.status(500).json({ message: 'Error accessing the database' });
    }
}