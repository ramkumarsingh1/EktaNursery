import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  changePassword,
  updateAvatar,
} from "../controllers/user.controller.js";

import { verifyJWT } from "../middleware/auth.middleware.js";
import  upload  from "../middleware/multer.middleware.js";

const router = express.Router();

router.get("/profile", verifyJWT, getUserProfile);

router.put("/profile", verifyJWT, updateUserProfile);

router.put("/change-password", verifyJWT, changePassword);
router.put(
  "/avatar",
  verifyJWT,
  upload.single("avatar"),
  updateAvatar
);

export default router;