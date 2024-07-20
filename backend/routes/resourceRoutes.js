import express from "express";
import rateLimit from "express-rate-limit";

import { protect } from "../middleware/authMiddleware.js";
import {
  addResourceRating,
  createResource,
  deleteResource,
  getResourceById,
  getResources,
  updateResource,
} from "../controllers/resourceController.js";

const router = express.Router();

const createResourceRateLimiter = rateLimit({
  windowMs: 15 * 60 * 60,
  limit: 20,
  message: "Too many requests to create collections, please try again later.",
});

router
  .route("/")
  .post(protect, createResourceRateLimiter, createResource)
  .get(protect, getResources);
router
  .route("/:id")
  .get(protect, getResourceById)
  .put(protect, updateResource)
  .delete(protect, deleteResource);
router.route("/:id/rating").post(protect, addResourceRating);

export default router;
