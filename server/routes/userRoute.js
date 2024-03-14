import express from "express";
import { getUserDatabase, getUser, getUserFriends, addRemoveFriend, updateUserInfo } from "../controllers/userController.js";
import { verifyToken } from "../middleware/authorization.js";

const router = express.Router();

/* Routes to User database */
router.get("/database", getUserDatabase);

/* Routes to specific user page by id */
router.get("/user/:userId", verifyToken, getUser);

/* Routes to update user info */
router.post("/user/:userId/update", verifyToken, updateUserInfo);

// /* Routes to specific user friend page */
// router.get("/user/:id/friends",getUserFriends);

// /* Update the route */
// router.patch("/user/:id/:friendId", addRemoveFriend);

export default router;