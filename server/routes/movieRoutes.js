import { Router } from "express";
import {
  getHomeFeed,
  getMovieDetails,
  search,
} from "../controllers/movieController.js";

const router = Router();

router.get("/home", getHomeFeed);
router.get("/search", search);
router.get("/:movieId", getMovieDetails);

export default router;
