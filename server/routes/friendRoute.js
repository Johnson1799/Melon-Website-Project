import express from "express";
import { getFriendRequest, sendFriendRequest, acceptFriendRequest, refuseFriendRequest, removeFriend } from "../controllers/friendController.js";
import {verifyToken} from "../middleware/authorization.js";

const router = express.Router();

/* Get all the friend requests */
router.get("/request/:userId", verifyToken, getFriendRequest);

/* Send the friend request to other user */
router.post("/send/request/:userId/:friendId", verifyToken, sendFriendRequest);

/* Accept the friend request */
router.post("/request/accept/:userId/:requestId", verifyToken, acceptFriendRequest);

/* Refuse the friend request */
router.post("/request/refuse/:userId/:requestId", verifyToken, refuseFriendRequest);

/* Unfollow friend */
router.post("/remove/:userId/:friendId", verifyToken, removeFriend);

export default router;