import express from "express";
import { getUserDatabase, getUser, getUserFriends, addRemoveFriend } from "../controllers/userController.js";
import { verifyToken } from "../middleware/authorization.js";

const router = express.Router();

/* Routes to User database */
router.get("/database", getUserDatabase);

/* Routes to specific user page */
router.get("user/:id", getUser);

/* Routes to specific user friend page */
router.get("user/:id/friends",getUserFriends);

/* Update the route */
router.patch("user/:id/:friendId", addRemoveFriend);

export default router;