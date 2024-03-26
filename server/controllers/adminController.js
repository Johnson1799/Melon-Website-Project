import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../schema/User.js";
import Post from "../schema/Post.js";
import Admin from "../schema/Admin.js";
import dotenv from 'dotenv';
dotenv.config();

import { adminData } from "../data/data.js" ;

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
            res.status(201).send({adminId: updatedAdmin._id, token: token});
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
            res.status(201).send({users});
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
            res.status(201).send({posts});
        }

    } catch (err){
        res.status(500).json({ message: 'Error accessing the database' });
    }
}