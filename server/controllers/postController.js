import Post from "../models/Post.js";
import User from "../models/User.js";

/* Post-creating function */
export const createPost = async(req,res) => {
    try {
        // grab the attributes from request object
        const {userId, description, picturePath } = req.body;

        // find the user in database by the id of the user
        const user = await User.findById(userId);

        // create new post document
        const newPost = new Post({
            userId,
            userName: user.userName,
            description,
            userIconPath: user.userIconPath,
            postPicturePath,
            likes: {},
            comments: []
        })
        await newPost.save();

        // find all the posts in the database
        const post = await Post.find();

        // send the post info to front-end
        res.status(201).json(post);

    } catch (err) {
        res.status(409).json({message: err.message});
    }
}

/* Get all the posts from database function */
export const getAllPosts = async (req,res) =>{
    try {
        // find all the posts in the database
        const post = await Post.find();

        // send the post info to front-end
        res.status(201).json(post);

    } catch (err) {
        res.status(404).json({message: err.message});
    }
}

/* Get user's posts function */
export const getUserPosts = async (req,res) =>{
    try {
        // grab the other user id in request object
        const { userId } = req.body;

        // find the user's posts in the database
        const post = await Post.find({userId});

        // send the post info to front-end
        res.status(200).json(post);

    } catch (err) {
        res.status(404).json({message: err.message});
    }
}

/* Like post function */
export const likePost = async (req,res) =>{
    try {
        // grab the attributes in request object
        const { id } = req.params;      // post id in MongoDB
        const {userId} = req.body;      // userId attribute in Post Schema

        // find the post using user's id
        const post = await Post.findById(id);

        // check whether the user click the like button of the post
        const isLiked = post.likes.get(userId);
        if (isLiked) {
            // unlike the post (set the value to be false in 'userId' key)
            post.likes.delete(userId);
        } else {
            // likes the post (set the value to be true in 'userId' key)
            post.likes.set(userId, true);
        }

        // update the likes attribute in the post
        const updatedPost = await Post.findByIdAndUpdate(id, { likes: post.likes }, { new: true });

        // send the updated post info to front-end
        res.status(200).json(updatedPost);

    } catch (err) {
        res.status(404).json({message: err.message});
    }
}