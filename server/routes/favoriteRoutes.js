import { Router } from "express";
import {
  deleteFavorite,
  getFavorites,
  getPublicFavorites,
  saveFavorite,
} from "../controllers/favoriteController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/public/:shareId", getPublicFavorites);
router.get("/", requireAuth, getFavorites);
router.post("/", requireAuth, saveFavorite);
router.delete("/:movieId", requireAuth, deleteFavorite);

export default router;
