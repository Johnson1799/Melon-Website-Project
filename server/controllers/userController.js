import User from "../models/User.js";

/* Get User database function */
export const getUserDatabase = async (req,res) => {
    try {
        const allUsersInfo = await User.find();
        res.json(allUsersInfo);
    } catch (err){
        res.status(500).json({ message: 'Error accessing the database' });
    }
}

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

export const createNewUser = async(req,res) => {
    const newUser = new User(req.body); 
    if (!newUser){
        return res.status(400).send('User data is not received');
    }
    try{ 
        const savedNewUser = await newUser.save();
        res.status(201).json(savedNewUser);
        
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Fail to save the new user to database");
    }
}

export const userLogin = async(req,res) => {
    const {email,password} = req.body;

    try{
        const user = await User.findOne({ email:email, password:password });
        if (!user) {
            // User not found
            return res.status(404).json({error:'Incorrect email or password'});
        } else{
            // Login successful
            return res.status(200).json({success:'Login successful'});
        }
    }
    catch (err){
        return res.status(500).json({error:"Internal server error"});
    }
}