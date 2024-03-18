import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js"
import dotenv from 'dotenv';
dotenv.config();

/* Register User function */
export const registerUser = async (req,res) => {
    try {
        // Grab the object specified from the 'request' object
        const {userName, userNickname, password, email, contact, address, description, userAvatarURL, friends, followers, posts} = req.body;
        /* Check if user email is appeared in MongoDB */
        let user = await User.findOne({email:email});
        if(user){
            return res.status(409).send({message:"This Email Has Been Registered"});
        }
        else{
            /* Create new user in MongoDB */

            // Encrypt the password
            const salt = await bcrypt.genSalt();
            const encryptedPassword = await bcrypt.hash(password, salt);

            // Create a new user document with a encrypted password initialized
            const newUser = new User({
                userName,
                userNickname,
                password: encryptedPassword,
                email, 
                contact,
                address,
                description,
                userAvatarURL, 
                friends,
                followers,
                posts,
            });

            // save the new user into MongoDB */
            const savedUser = await newUser.save();

            // send the response to the front-end
            res.status(201).send({message: "User Registration Successful!"});
        }
    }
    catch (err) {
        // send the error message to front-end
        res.status(500).json({error: err.message});
    }
}


/* Login Function */
export const login = async (req,res) => {
    try {
        // Grab the object specified from the 'request' object
        const { email, password } = req.body;

        // find the user which have that input email
        const user = await User.findOne({email: email});

        // send the message to front-end if the user cannot be found
        if (!user){
            return res.status(401).json({message: "Invalid Email or Password"});
        }

        // send the message to front-end if the type the incorrect password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch){
            return res.status(401).json({message: "Invalid Email or Password"});
        }

        // create a token (using jwt) and make a secret string for the token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

        // send the token and user information to front-end
        res.status(200).json({token:token, user:user});
    }
    catch (err) {
        // send the error message to front-end
        res.status(500).json({message: err.message});
    }
}