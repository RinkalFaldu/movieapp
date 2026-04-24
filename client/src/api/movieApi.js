import { apiRequest } from "./client.js";

export function fetchHomeFeed() {
  return apiRequest("/api/movies/home");
}

export function searchMovies(query) {
  return apiRequest(`/api/movies/search?q=${encodeURIComponent(query)}`);
}

export function fetchMovieDetails(movieId) {
  return apiRequest(`/api/movies/${movieId}`);
}

export function fetchGenreMovies(genreKey, page) {
  return apiRequest(`/api/movies/genre/${genreKey}?page=${page}`);
}
