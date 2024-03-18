import Post from "../models/Post.js";
import User from "../models/User.js";
import {v2 as cloudinary} from 'cloudinary';
import { extractPublicId } from 'cloudinary-build-url';

/* Cloudinary database configuration */
cloudinary.config({ 
    cloud_name: process.env.cloud_name, 
    api_key: process.env.api_key, 
    api_secret: process.env.api_secret,
});

/* Post-creating function */
export const createPost = async(req,res) => {
        // grab the attributes from request object
        const userId = req.params.userId;
        const postImgURL = req.body.postImgURL;     // base64 URL
        const title = req.body.title;
        const description = req.body.description;
        const isPrivate = req.body.isPrivate;

        // console.log(`title: ${title}  description: ${description}  isPrivate: ${isPrivate}`);

        /* Upload the post to Cloudinary and get the image url */
        const randomNum= Date.now();
        const uploadedImage = await cloudinary.uploader.upload(postImgURL[0],{
            upload_preset: 'posts_unsigned_upload', 
            public_id: `${userId}_${randomNum}`, 
            allowed_formats: ['png', 'jpg', 'jpeg', 'svg', 'ico', 'jfif', 'webp'],
        }, 
        (err,data) => {
            if (err){
                console.log(err);
            }
        });

        /* Create a post in MongoDB */
        const user = await User.findById(userId);

        const newPost = new Post({
            userId: user._id,
            userName: user.userName,
            title: title,
            description: description,
            userAvatarURL: user.userAvatarURL,
            postImgURL: uploadedImage.url,
            likes: {},
            comments: [],
            isPrivate: isPrivate,
        })
        await newPost.save();
    
        const post = await Post.findOne({userId: user._id, postImgURL: uploadedImage.url}); 
        
    try {
        res.status(200).json({postURL: uploadedImage.url, post:post});

    } catch (err) {
        res.status(409).json({message: err.message});
    }
}

/* Get user's posts function */
export const getUserPosts = async (req,res) =>{
    try {
        // grab the other user id in request object
        const userId = req.params.userId;

        // find the user's posts in the database
        const posts = await Post.find({userId:userId});

        // send the post info to front-end
        res.status(200).json({posts: posts});

    } catch (err) {
        res.status(404).json({message: err.message});
    }
}

/* Update a post */
export const updatePost = async (req,res) => {
    try {
        const userId = req.params.userId;
        const postId = req.body.postId;
        const title = req.body.title;
        const description = req.body.description;
        const isPrivate = req.body.isPrivate;
    
        /* Update the 'post' schema in MongoDB */
        const user = await User.findById(userId);
        if (!user){
            return res.status(404).json({ message: 'User not found' });
        }
        else{
            let updatedPostInfo = await Post.findOneAndUpdate({_id: postId}, { $set: {title: title, description: description, isPrivate: isPrivate}}, {new: true});
            if (updatedPostInfo){
                res.status(200).json(updatedPostInfo);
            }
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};



/* Delete user post */
export const deleteUserPost = async (req,res) => {
    try {
        const userId = req.params.userId;
        const postId = req.params.postId;
        const postImgURL = req.body.postImgURL;
    
        /* Remove the post in MongoDB */
        const user = await User.findById(userId);
        if (!user){
            return res.status(404).json({ message: 'User not found' });
        }
        else{
            const updatedList = user.posts.filter((imageUrl,index) => imageUrl !== postImgURL);
            await User.updateOne({_id: userId}, {$set: {posts: updatedList}})
            .catch((err) =>{
                return res.status(404).json({ message: err });
            })

            const deletedPost = await Post.findByIdAndDelete(postId);
            if (!deletedPost){
                return res.status(404).json({ message: 'Post not found' });
            }

            /* Remove the post in Cloudinary */
            const publicId = extractPublicId(postImgURL);
            const result = await cloudinary.uploader.destroy(publicId);
            if (!result){
                return res.status(404).json({ message: 'Post not found' });
            }

            return res.status(200).json({ message: 'Post Deletion Successful' });
        }

        
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};



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