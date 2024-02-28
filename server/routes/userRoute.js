import express from "express";
import {
    getUser,
    getUserFriends,
    addRemoveFriend
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/authorization.js";

const router = express.Router();

/* Routes to specific user page */
router.get("/:id", verifyToken, getUser);

/* Routes to specific user friend page */
router.get("/:id/friends",verifyToken,getUserFriends);

/* Update the HTML resource */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;