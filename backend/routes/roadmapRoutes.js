import express from "express";
const router = express.Router();
import {
  createRoadmap,
  getAllRoadmaps,
  getRoadmapById,
  updateRoadmap,
  deleteRoadmap,
  rateRoadmap,
} from "../controllers/roadmapController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(protect, createRoadmap).get(protect, getAllRoadmaps);

router
  .route("/:id")
  .get(protect, getRoadmapById)
  .put(protect, updateRoadmap)
  .delete(protect, deleteRoadmap);

router.route("/:id/rate").post(protect, rateRoadmap);

export default router;
