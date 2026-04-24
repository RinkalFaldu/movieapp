import { asyncHandler } from "../utils/asyncHandler.js";
import { dataSourceStatus } from "../services/dataSources.js";
import {
  getGenreMovies,
  getHomeRows,
  getMovieById,
  searchMovies,
} from "../services/movieService.js";

export const getHomeFeed = asyncHandler(async (_req, res) => {
  const rows = await getHomeRows();
  res.json({
    rows,
    integrations: {
      tmdb: Boolean(process.env.TMDB_API_KEY || process.env.TMDB_BEARER_TOKEN),
      postgres: dataSourceStatus.postgres.connected,
    },
  });
});

export const getMovieDetails = asyncHandler(async (req, res) => {
  const movie = await getMovieById(req.params.movieId);
  if (!movie) {
    const error = new Error("Movie not found");
    error.statusCode = 404;
    throw error;
  }

  res.json({ movie });
});

export const search = asyncHandler(async (req, res) => {
  const results = await searchMovies(req.query.q || "");
  res.json({ results });
});

export const getGenreFeed = asyncHandler(async (req, res) => {
  const page = Number.parseInt(req.query.page || "1", 10);
  const genre = await getGenreMovies(req.params.genreKey, Number.isNaN(page) ? 1 : page);

  if (!genre) {
    const error = new Error("Genre not found");
    error.statusCode = 404;
    throw error;
  }

  res.json(genre);
});
