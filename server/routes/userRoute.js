import express from "express";
import { getUserDatabase, getUser, updateUserInfo, updateUserAvatar } from "../controllers/userController.js";
import { verifyToken } from "../middleware/authorization.js";
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

/* Routes to User database */
router.get("/database", getUserDatabase);

/* Routes to specific user page by id */
router.get("/user/:userId", verifyToken, getUser);

/* Update user info (email, contact, address, description) */
router.post("/user/:userId/update", verifyToken, updateUserInfo);

/* Update user avatar (userAvatarURL) */
router.post("/user/update/avatar/:userId", verifyToken, updateUserAvatar);


// /* Routes to specific user friend page */
// router.get("/user/:id/friends",getUserFriends);

// /* Update the route */
// router.patch("/user/:id/:friendId", addRemoveFriend);

export default router;