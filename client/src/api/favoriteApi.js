import { apiRequest } from "./client.js";

export function fetchFavorites(token) {
  return apiRequest("/api/favorites", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function addFavorite(token, movie) {
  return apiRequest("/api/favorites", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ movie }),
  });
}

export function removeFavorite(token, movieId) {
  return apiRequest(`/api/favorites/${movieId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function fetchPublicFavorites(shareId) {
  return apiRequest(`/api/favorites/public/${shareId}`);
}
