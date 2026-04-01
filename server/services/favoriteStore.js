import { getPostgresPool } from "../config/postgres.js";
import { dataSourceStatus } from "./dataSources.js";
import { readStore, writeStore } from "../utils/fileStore.js";

export async function listFavorites(userId) {
  if (dataSourceStatus.postgres.connected) {
    const pool = await getPostgresPool();
    const result = await pool.query(
      `
      SELECT movie
      FROM favorites
      WHERE user_id = $1
      ORDER BY created_at DESC
      `,
      [userId],
    );
    return result.rows.map((row) => row.movie);
  }

  const store = await readStore();
  return store.favorites
    .filter((entry) => entry.userId === userId)
    .map((entry) => entry.movie);
}

export async function addFavorite(userId, movie) {
  if (dataSourceStatus.postgres.connected) {
    const pool = await getPostgresPool();
    await pool.query(
      `
      INSERT INTO favorites (user_id, movie_id, movie)
      VALUES ($1, $2, $3::jsonb)
      ON CONFLICT (user_id, movie_id)
      DO UPDATE SET movie = EXCLUDED.movie
      `,
      [userId, String(movie.id), JSON.stringify(movie)],
    );
    return listFavorites(userId);
  }

  const store = await readStore();
  const existingIndex = store.favorites.findIndex(
    (entry) => entry.userId === userId && entry.movieId === String(movie.id),
  );

  if (existingIndex >= 0) {
    store.favorites[existingIndex].movie = movie;
  } else {
    store.favorites.unshift({
      userId,
      movieId: String(movie.id),
      movie,
    });
  }

  await writeStore(store);
  return listFavorites(userId);
}

export async function removeFavorite(userId, movieId) {
  if (dataSourceStatus.postgres.connected) {
    const pool = await getPostgresPool();
    await pool.query(
      `
      DELETE FROM favorites
      WHERE user_id = $1 AND movie_id = $2
      `,
      [userId, String(movieId)],
    );
    return listFavorites(userId);
  }

  const store = await readStore();
  store.favorites = store.favorites.filter(
    (entry) => !(entry.userId === userId && entry.movieId === String(movieId)),
  );
  await writeStore(store);
  return listFavorites(userId);
}
