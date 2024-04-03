import express from "express";
import { createPost, getUserPosts, getAllFriendPosts, getPost, deleteUserPost, updatePost, updateLikePost, createComment, createReply, getComments } from "../controllers/postController.js";
import {verifyToken} from "../middleware/authorization.js";

const router = express.Router();

/* Get all the user posts */
router.get("/:userId", verifyToken, getUserPosts);

/* Get all the friend posts (including all the user posts) */
router.get("/get/friends/:userId", verifyToken, getAllFriendPosts);

/* Get a specific post */
router.get("/get/:postId",verifyToken, getPost);

/* Get the comment of the post */
router.get("/comment/:postId", verifyToken, getComments);

/* Create a post to MongoDB and Cloudinary */
router.post("/create/:userId" , createPost);

/* Update a specific post information */
router.post("/update/:userId" , verifyToken, updatePost);

/* Update the like (e.g like or unlike the post) */
router.post("/like/:userId", verifyToken, updateLikePost);

/* Create comment in the post */
router.post("/comment/:userId/:postId", verifyToken, createComment);

/* Create reply in the post */
router.post("/reply/:userId/:postId", verifyToken, createReply);

/* Delete a specific post */
router.delete("/delete/:userId/:postId", verifyToken, deleteUserPost);


/* export the router */
export default router;