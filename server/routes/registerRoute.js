import express from "express";
import { registerUser } from "../controllers/authenticationController.js";

const router = express.Router();

/* Register user with encrypted password */
router.post("/", registerUser);

export default router;