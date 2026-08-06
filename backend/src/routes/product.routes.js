import express from "express";
import {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

import upload from "../middleware/multer.middleware.js";

const router = express.Router();

// Public Routes
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// Admin Routes
router.post("/", upload.array("images", 5), createProduct);
router.put("/:id", upload.array("images", 5), updateProduct);
router.delete("/:id", deleteProduct);

export default router;