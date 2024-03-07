import express from "express";
import { createNewUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/", createNewUser);

export default router;