import Post from "../schema/Post.js";
import User from "../schema/User.js";
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
        /* grab the data sent from front-end */
        const userId = req.params.userId;
        const postImgURL = req.body.postImgURL;     // base64 URL
        const title = req.body.title;
        const description = req.body.description;
        const isPrivate = req.body.isPrivate;

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
            likes: [],
            comments: [],
            isPrivate: isPrivate,
        })
        await newPost.save();
    
        /* Find a specific post from MongoDB */
        const post = await Post.findOne({userId: user._id, postImgURL: uploadedImage.url}); 
        
    try {
        /* Send that specific post and post url to front-end */
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

        /* Find all the user posts from MongoDB */
        const posts = await Post.find({userId:userId});

        /* Send all the user posts information to front-end */
        res.status(200).json({posts: posts});

    } catch (err) {
        res.status(404).json({message: err.message});
    }
}

/* Get a specific post function */
export const getPost = async (req,res) =>{
    try {
        // grab the other user id in request object
        const postId = req.params.postId;
        
        /* Find all the user posts from MongoDB */
        const post = await Post.findById(postId);

        /* Send all the user posts information to front-end */
        res.status(200).json(post);

    } catch (err) {
        res.status(404).json({message: err.message});
    }
}

/* Update a post */
export const updatePost = async (req,res) => {
    try {
        /* grab the data sent from front-end */
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
                /* Send that updated post and post url to front-end */
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
        /* grab the data sent from front-end */
        const userId = req.params.userId;
        const postId = req.params.postId;
        const postImgURL = req.body.postImgURL;
    
        /* Find a specifc user in MongoDB */
        const user = await User.findById(userId);
        if (!user){
            return res.status(404).json({ message: 'User not found' });
        }
        else{
            /* Remove a specific post from 'posts' attribute inside the 'user' schema in MongoDB */
            const updatedList = user.posts.filter((imageUrl,index) => imageUrl !== postImgURL);
            await User.updateOne({_id: userId}, {$set: {posts: updatedList}})
            .catch((err) =>{
                return res.status(404).json({ message: err });
            })

            /* Remove a specific post from inside the 'post' schema in MongoDB */
            const deletedPost = await Post.findByIdAndDelete(postId);
            if (!deletedPost){
                return res.status(404).json({ message: 'Post not found' });
            }

            /* Remove a specific post from Cloudinary */
            const publicId = extractPublicId(postImgURL);
            const result = await cloudinary.uploader.destroy(publicId);
            if (!result){
                return res.status(404).json({ message: 'Post not found' });
            }

            /* Send the success message to front-end */
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

/* Get all the friends posts (including user himself) from database function */
export const getAllFriendPosts = async (req,res) =>{
    try {
        const userId = req.params.userId;

        const user = await User.findById(userId);
        if (!user){
            res.status(404).json({message: 'User not found'});
        }

        // find all the user posts in the database
        const userPosts = await Post.find({userId: userId});

        // find all the user's friend posts
        const friendList = user.friends;
        const friendsPostsPromise = friendList.map( async(friend) => {
            const friendPosts = await Post.find({userId: friend._id});
            return friendPosts;
        });
        const friendsPosts = await Promise.all(friendsPostsPromise);

        // send the posts info to front-end
        res.status(201).json({userPosts: userPosts, friendsPosts: friendsPosts});

    } catch (err) {
        res.status(404).json({message: err.message});
    }
}


/* Like/unlike post function */
export const updateLikePost = async (req,res) =>{
    try {
        /* grab the data sent from front-end */
        const profileUserId = req.params.userId;     
        
        const profileUser = await User.findById(profileUserId);
        if (!profileUser){
            return res.status(404).json({ message: 'User not found' });
        }
        else {
            /* grab the data sent from front-end */
            let post;
            let postImgURL;
            if (!req.body.isHomePage){
                const postIndex = req.body.postIndex;
                postImgURL = profileUser.posts[postIndex];

                /* Find a specific post and update the likes */
                post = await Post.findOne({postImgURL: postImgURL});
            } 
            else{
                const postId = req.body.postId;
                post = await Post.findById(postId);
            }

            if (!post){
                return res.status(404).json({ message: 'Post not found' });
            } 
            else{
                /* Find whether the user have like the post */
                const userId = req.body.userId;
                let isLiked = false;            
                post.likes.some((likedUserId) => {
                    if (likedUserId === userId) {
                        isLiked = true;
                        return true;    // Exit the loop
                    }
                    return false;
                });


                if (!isLiked){
                    if (!req.body.isHomePage){
                        /* If the user haven't like the post before, trigger like the post */
                        const updatedPost = await Post.findOneAndUpdate({postImgURL: postImgURL}, { $push: {likes: userId }}, {new: true});
                    }
                    else {
                        /* If the user haven't like the post before, trigger like the post */
                        const postId = req.body.postId;
                        await Post.findOneAndUpdate({_id: postId}, { $push: {likes: userId }}, {new: true});
                    }
                }
                else {
                    if (!req.body.isHomePage){
                        /* If the user have like the post before, trigger unlike the post */
                        await Post.findOneAndUpdate({postImgURL: postImgURL}, { $pull: {likes: userId }},{new: true});
                        
                    }
                    else {
                        const postId = req.body.postId;
                        await Post.findOneAndUpdate({_id: postId}, { $pull: {likes: userId }},{new: true});
                    }
                    
                }

                return res.status(200).json({isLiked: isLiked});
            }

        }
    
    
    } catch (err) {
        res.status(404).json({message: err.message});
    }
}

/* Create new comment */
export const createComment = async (req,res) =>{
    try{
        /* grab the data sent from front-end */
        const userId = req.params.userId;
        const postId = req.params.postId;
        const comment = req.body.comment;


        /* Find a specific post */
        const post = await Post.findById(postId);
        if (!post){
            return res.status(404).json({ message: 'Post not found' });
        } 
        else{
            const user = await User.findById(userId).select('_id userName userAvatarURL');
            if(!user){
                return res.status(404).json({ message: 'User not found' });
            } 
            else{
                const newComment = {
                    userId: user._id,
                    userName: user.userName,
                    userAvatarURL: user.userAvatarURL,
                    comment: comment, 
                    replies: []
                };

                post.comments.push(newComment);
                const updatedPost = await post.save();
                return res.status(200).json(updatedPost.comments);
            }
        }

    } catch (err){
        console.error(err);
    }
}


export const createReply = async (req,res) =>{
    try{
        /* grab the data sent from front-end */
        const userId = req.params.userId;
        const postId = req.params.postId;
        const commentIndex = req.body.commentIndex;
        const reply = req.body.reply;

        /* Find a specific post */
        const post = await Post.findById(postId);
        if (!post){
            return res.status(404).json({ message: 'Post not found' });
        } 
        else{
            const user = await User.findById(userId).select('_id userName userAvatarURL');
            if(!user){
                return res.status(404).json({ message: 'User not found' });

            } else{
                const newReply = {
                    userId: user._id,
                    userName: user.userName,
                    userAvatarURL: user.userAvatarURL,
                    reply: reply
                };

                /* Find the corresponding comment */
                const comment = post.comments[commentIndex];

                /* Add new reply to that comment */
                comment.replies.push(newReply);

                // Saving the updated post
                const updatedPost = await post.save();

                return res.status(200).json(updatedPost.comments); 
            }
            
        }

    } catch (err){
        console.error(err);
    }
}



/* Fetch the comments and replies of the specific post */
export const getComments = async (req,res) =>{
    try{
        /* grab the data sent from front-end */
        const postId = req.params.postId;

        /* Find a specific post */
        const post = await Post.findById(postId);
        if (!post){
            return res.status(404).json({ message: 'Post not found' });
        } 
        else{
            const postComments = post.comments;
            return res.status(200).json(postComments);
        }

    } catch (err){
        console.error(err);
    }
}