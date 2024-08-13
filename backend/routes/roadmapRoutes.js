import express from "express";
const router = express.Router();
import {
  createRoadmap,
  getRoadmaps,
  getRoadmapById,
  updateRoadmap,
  deleteRoadmap,
  addRoadmapRating,
} from "../controllers/roadmapController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(protect, createRoadmap).get(protect, getRoadmaps);

router
  .route("/:id")
  .get(protect, getRoadmapById)
  .put(protect, updateRoadmap)
  .delete(protect, deleteRoadmap);

router.route("/:id/rate").post(protect, addRoadmapRating);

export default router;
