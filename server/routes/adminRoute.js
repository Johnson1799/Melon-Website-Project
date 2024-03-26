import express from "express";
import { adminLogin, getUsers, getPosts } from "../controllers/adminController.js";
import { verifyToken } from "../middleware/authorization.js";

const router = express.Router();

/* Get all the friend requests */
router.post("/login", adminLogin);

/* Get all the users information in database*/
router.post("/get/users/:adminId", verifyToken, getUsers);

/* Get all the posts information in database*/
router.post("/get/posts/:adminId", verifyToken, getPosts);


export default router;