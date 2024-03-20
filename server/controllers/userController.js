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


/* Get User Friend function */
export const getUserFriends = async (req,res) =>{
    try{
        // grab the id attributes from request object
        const { id } = req.params;

        // find the user by the id of the user
        const user = await User.findById(id);

        // return an array of promise of all the user's friends
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        // get the each friends detail from user's friends
        const friendDetails = friends.map(
            ({ _id, userName, friendIconPath, followers}) => {
                return { _id, userName, friendIconPath, followers};
            }
        );

        //send the friends details to front-end
        res.status(200).json(friendDetails);

    } catch (err) {
        res.status(404).json({ message: err.message});
    }
}


/* Add and Remove friend function */
export const addRemoveFriend = async(req,res) => {
    try {
        // grab the id and friendId attributes from request object
        const { id, friendId } = req.params;
        const userId = id;

        // find the user and user's friend using their id
        const user = await User.findById(userId);
        const userFriend = await User.findById(friendId);

        if (user.friends.includes(friendId)){
            // Delete friend in user account (remove friend when id == friendId)
            user.friends = user.friends.filter(id => id !== friendId);
            // Delete friend in friend account
            userFriend.friends = userFriend.friends(id => id !== userId);
        } else {
            // Add friend in user account
            user.friends.push(friendId);
            // Add user as friend in friend account
            userFriend.friends.push(userId);
        }

        // save the user object
        await user.save();
        await friendId.save();

        // return an array of promise of all the user's friends
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        // get the each friends detail from user's friends
        const friendDetails = friends.map(
            ({ _id, userName, friendIconPath, followers}) => {
                return { _id, userName, friendIconPath, followers};
            }
        );

        //send the friends details to front-end
        res.status(200).json(friendDetails);

    } catch (err) {
        res.status(404).json({ message: err.message});
    }
}

