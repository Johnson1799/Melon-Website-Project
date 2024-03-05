import express from "express";
import {
    getUser,
    getUserFriends,
    addRemoveFriend
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/authorization.js";

const router = express.Router();

/* Routes to specific user page */
router.get("/:id", getUser);

/* Routes to specific user friend page */
router.get("/:id/friends",getUserFriends);

/* Update the route */
router.patch("/:id/:friendId", addRemoveFriend);

export default router;