import express from "express";
import { getAllPosts, getUserPosts, likePost } from "../controllers/postController.js";
import {verifyToken} from "../middleware/authorization.js";

const router = express.Router();

/* Routes to homepage */
router.get("/",verifyToken,getAllPosts);

/* Routes to user post */
router.get("/:userId/posts",verifyToken,getUserPosts);

/* Update the routes*/
router.patch("/:id/like", verifyToken, likePost);

// export the router
export default router;