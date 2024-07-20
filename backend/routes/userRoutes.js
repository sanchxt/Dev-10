import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  addFavorite,
  removeFavorite,
  favoriteResources,
  removeAllFavoriteResources,
  getCreatedResources,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/favorites/:id")
  .post(protect, addFavorite)
  .delete(protect, removeFavorite);
router
  .route("/favorites/resources")
  .get(protect, favoriteResources)
  .put(protect, removeAllFavoriteResources);
router.route("/created-resources").get(protect, getCreatedResources);

export default router;
