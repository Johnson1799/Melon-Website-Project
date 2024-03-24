import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../schema/User.js";
import Post from "../schema/Post.js";
import dotenv from 'dotenv';
dotenv.config();


/* Register User function */
export const registerUser = async (req,res) => {
    try {
        /* grab the data sent from front-end */
        const {userName, userNickname, password, email, contact, address, description, userAvatarURL, friends, friendRequests, followers, posts} = req.body;
        
        /* Check if user email is appeared in MongoDB */
        let user = await User.findOne({email:email});
        if(user){
            return res.status(409).send({message:"This Email Has Been Registered"});
        }

        /* Create new user in MongoDB */
        else{
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
                friendRequests,
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
        /* grab the data sent from front-end */
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

        /* Find all the posts for the user*/
        const posts = await Post.find({userId: user._id});

        // send the token and user information to front-end
        res.status(200).json({token:token, user:user, userPosts: posts});
    }
    catch (err) {
        // send the error message to front-end
        res.status(500).json({message: err.message});
    }
}