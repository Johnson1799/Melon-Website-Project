import express from "express";
import { createPost, getUserPosts, deleteUserPost, updatePost } from "../controllers/postController.js";
import {verifyToken} from "../middleware/authorization.js";

const router = express.Router();

/* Create a post to MongoDB and Cloudinary */
router.post("/create/:userId" , createPost);

/* Update a specific post information */
router.post("/update/:userId" , verifyToken, updatePost);

/* Get all the user posts */
router.get("/:userId", verifyToken, getUserPosts);

/* Delete a specific post */
router.delete("/delete/:userId/:postId", verifyToken, deleteUserPost);

// /* Update the routes*/
// router.patch("/:id/like", likePost);

// export the router
export default router;