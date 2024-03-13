import express from "express";
import {login, registerUser} from "../controllers/authenticationController.js";

const router = express.Router();

/* Login user verification */
router.post("/loginuser", login);

/* Register new user with encrypted password */
router.post("/reguser", registerUser)

// export the router
export default router;