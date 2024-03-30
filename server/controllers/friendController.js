import User from "../schema/User.js";
import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

/* Send the friend request to other user */
export const sendFriendRequest = async (req,res) =>{
    try{
        /* grab the data sent from front-end */
        const userId = req.params.userId;  
        const friendId = req.params.friendId;

        /* Update the 'friendRequests' attribute in 'User' schema */
        const friend = await User.findById(friendId);
        const user =  await User.findById(userId);

        if (!friend){
            return res.status(404).json({ message: "User not found" });
        } else{
            let isFriend = false;
            user.friends.map((friend  => {
                if (friend._id.toString() === friendId ){
                    isFriend =true;
                }
            }));
            
            if (!friend.friendRequests.includes(userId) && !isFriend){
                friend.friendRequests.push(userId);
                const profileUser = await friend.save();
                return res.status(200).json({message: 'Friend request is sent', profileUser:profileUser});
            }
            else {
                if (isFriend){
                    return res.status(202).json({error: 'You both are already friends'});
                } 
                else{
                    return res.status(202).json({error: 'The friend request has been sent already'});
                }
            }
        }
    }
    catch (err) {
        res.status(404).json({message: err.message});
    }
}

/* Get the friend requests in user */
export const getFriendRequest = async (req,res) =>{
    try{
        /* grab the data sent from front-end */
        const userId = req.params.userId;  

        const user = await User.findById(userId);

        if (!user){
            return res.status(404).json({ message: "User not found" });
        } 
        else{
            const friendRequestList = user.friendRequests;
            const friendsRequestDataPromise = friendRequestList.map( async(friendRequestId) => {
                const userData = await User.findById(friendRequestId).select('_id userName userNickname userAvatarURL');
                if (!userData){
                    return res.status(404).json({ message: "User not found" });
                }
                return userData;
            });
            
            const friendsRequestData = await Promise.all(friendsRequestDataPromise);
            res.status(200).json(friendsRequestData);
        }
    }
    catch (err) {
        res.status(404).json({message: err.message});
    }
}


/* Accept the friend request */
export const acceptFriendRequest = async (req,res) =>{
    try{
        /* grab the data sent from front-end */
        const userId = req.params.userId;  
        const requestUserId = req.params.requestId;

        /* Delete the 'friendRequests' attribute from the user and update the 'follower' attribute */
        const updatedUser = await User.findOneAndUpdate({_id: userId}, { $pull: {friendRequests: requestUserId}, $inc: { followers: 1 }}, {new: true}).select('_id userName userNickname userAvatarURL');
        if (!updatedUser){
            return res.status(404).json({ message: "User not found" });
        } 

        /* Update the 'friends' attribute in another user schema */
        const updatedRequestUser = await User.findOneAndUpdate({_id: requestUserId}, { $push: {friends: updatedUser}}, {new: true});

        if (!updatedRequestUser){
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "Accept Friend Request!" });
        
    }
    catch (err) {
        res.status(404).json({message: err.message});
    }
}


/* Delete the friend request */
export const refuseFriendRequest = async (req,res) =>{
    try{
        /* grab the data sent from front-end */
        const userId = req.params.userId;  
        const requestUserId = req.params.requestId;

        /* Update the 'friendRequests' attribute in 'User' schema */
        const updatedUser = await User.findOneAndUpdate({_id: userId}, { $pull: {friendRequests: requestUserId}}, {new: true});

        if (!updatedUser){
            return res.status(404).json({ message: "User not found" });
        } else{
            return res.status(200).json({ message: "Refuse Friend Request!" });
        }
    }
    catch (err) {
        res.status(404).json({message: err.message});
    }
}


export const removeFriend = async (req,res) =>{
    try{
        /* grab the data sent from front-end */
        const userId = req.params.userId;  
        const friendId = req.params.friendId;

        const user = await User.findById(userId);

        if (!user){
            return res.status(404).json({ message: "User not found" });
        } 
        else{
            /* Remove that friend from the user */
            user.friends = user.friends.filter(friend => friend._id.toString() !== friendId);
            const updatedUser = await user.save();

            /* Other user followers decreased by 1 */
            const updatedProfileUser = await User.findOneAndUpdate({_id: friendId}, { $inc: {followers: -1} }, {new: true});
            res.status(200).json({message: 'You unfollow this user', user:updatedUser, profileUser:updatedProfileUser});
        }
    }
    catch (err) {
        res.status(404).json({message: err.message});
    }
}