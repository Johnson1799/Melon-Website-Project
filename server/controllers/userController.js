import User from "../models/User.js";

/* Get user function */
export const getUser = async (req,res) => {
    try {
        // grab the id attributes from request object
        const { id } = req.params;

        // find the user by the id of the user
        const user = await User.findById(id);

        // send back user info to front-end
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);

    } catch (err) {
        res.status(404).json({ message: err.message});
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