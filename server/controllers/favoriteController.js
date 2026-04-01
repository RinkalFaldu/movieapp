import { asyncHandler } from "../utils/asyncHandler.js";
import {
  addFavorite,
  listFavorites,
  removeFavorite,
} from "../services/favoriteStore.js";
import { findUserByShareId } from "../services/userStore.js";

export const getFavorites = asyncHandler(async (req, res) => {
  const favorites = await listFavorites(req.user.id);
  res.json({
    favorites,
    shareId: req.user.shareId,
  });
});

export const saveFavorite = asyncHandler(async (req, res) => {
  if (!req.body.movie?.id) {
    const error = new Error("A valid movie payload is required");
    error.statusCode = 400;
    throw error;
  }

  const favorites = await addFavorite(req.user.id, req.body.movie);
  res.status(201).json({ favorites });
});

export const deleteFavorite = asyncHandler(async (req, res) => {
  const favorites = await removeFavorite(req.user.id, req.params.movieId);
  res.json({ favorites });
});

export const getPublicFavorites = asyncHandler(async (req, res) => {
  const user = await findUserByShareId(req.params.shareId);
  if (!user) {
    const error = new Error("Public favorites list not found");
    error.statusCode = 404;
    throw error;
  }

  const favorites = await listFavorites(user.id);
  res.json({
    owner: user.name,
    favorites,
    shareId: user.shareId,
  });
});
