import express from "express";

import { getDashboardStats } from "../controllers/dashboard.controller.js";
import {
    verifyJWT,
    verifyAdmin,
} from "../middleware/auth.middleware.js";

const router = express.Router();

router.get(
    "/stats",
    verifyJWT,
    verifyAdmin,
    getDashboardStats
);

export default router;