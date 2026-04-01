import test from "node:test";
import assert from "node:assert/strict";
import { getHomeRows, getMovieById, searchMovies } from "../services/movieService.js";

test("home rows expose curated categories", async () => {
  const rows = await getHomeRows();
  assert.equal(rows.length, 8);
  assert.ok(rows.every((row) => Array.isArray(row.movies) && row.movies.length > 0));
});

test("movie lookup returns fallback detail", async () => {
  const movie = await getMovieById("atlas-2049");
  assert.equal(movie.title, "Atlas 2049");
  assert.ok(movie.trailer);
});

test("search falls back to local curated titles", async () => {
  const results = await searchMovies("ember");
  assert.ok(results.some((movie) => movie.title === "Ember Protocol"));
});
