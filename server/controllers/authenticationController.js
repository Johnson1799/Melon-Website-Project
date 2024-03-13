import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js"

/* Register User function */
export const registerUser = async (req,res) => {
    try {
        // Grab the object specified from the 'request' object
        const {userName, password, email, contact, address, description, userAvatarURL, friends, followers} = req.body;

        /* Check if user email is appeared in MongoDB */
        let user = await User.findOne({email:email});

        if(user){
            return res.status(202).send({message:"This email has been registered"});
        }
        else{
            // Encrypt the password
            const salt = await bcrypt.genSalt();
            const encryptedPassword = await bcrypt.hash(password, salt);

            // Create a new user document with a encrypted password initialized
            const newUser = new User({
                userName,
                password: encryptedPassword,
                email, 
                contact,
                address,
                description,
                userAvatarURL, 
                friends,
                followers,
            });

            // save the new user into MongoDB */
            const savedUser = await newUser.save();

            // send the response to the front-end
            res.status(201).json(savedUser);
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

        // find the user which have that particular email
        const user = await User.findOne({email: email});

        // send the message to front-end if the user cannot be found
        if (!user){
            return res.status(400).json({message: "User is not found! Please type the correct username and password agian"});
        }

        // send the message to front-end if the type the incorrect password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch){
            return res.status(400).json({message: "Incorrect passowrd! Please type the correct username and password agian"});
        }

        // create a token (using jwt) and make a secret string for the token
        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET_STRING);

        // delete password attribute so as to make sure the user password will not be sent back to front-end
        delete user.password;

        // send the token and user information to front-end
        res.status(200).json({ token, user});
    }
    catch (err) {
        // send the error message to front-end
        res.status(500).json({error: err.message});
    }
}