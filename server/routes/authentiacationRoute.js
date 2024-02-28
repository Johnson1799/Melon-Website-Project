import express from "express";
import {login} from "../controllers/authenticationController.js";

const router = express.Router();

/* create new data in the database */
router.post("/login", login);

// export the router
export default router;