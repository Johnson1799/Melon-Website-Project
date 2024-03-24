import express from "express";
import { createPost, getUserPosts, deleteUserPost, updatePost, updateLikePost } from "../controllers/postController.js";
import {verifyToken} from "../middleware/authorization.js";

const router = express.Router();

/* Get all the user posts */
router.get("/:userId", verifyToken, getUserPosts);

/* Create a post to MongoDB and Cloudinary */
router.post("/create/:userId" , createPost);

/* Update a specific post information */
router.post("/update/:userId" , verifyToken, updatePost);

/* Delete a specific post */
router.delete("/delete/:userId/:postId", verifyToken, deleteUserPost);

/* Update the like (e.g like or unlike the post) */
router.post("/like/:userId", verifyToken, updateLikePost);


/* export the router */
export default router;