import express, { Router } from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    refreshAccessToken,
} from "../controllers/auth.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();
// Register User
router.post("/register", registerUser);

//Login User
router.post("/login", loginUser);

router.get("/me", verifyJWT, getCurrentUser);
//Refresh TOken
router.post("/refresh-token", refreshAccessToken);
//Logout
router.post("/logout", verifyJWT, logoutUser);
export default router;

