import { curatedRows, detailedMovies } from "../data/mockMovies.js";

const genreNames = {
  28: "Action",
  35: "Comedy",
  27: "Horror",
  878: "Sci-Fi",
  10749: "Romance",
  18: "Drama",
  99: "Documentary",
  10770: "Experimental",
};

function imagePath(path) {
  return path ? `https://image.tmdb.org/t/p/w780${path}` : "";
}

function normalizeMovie(movie) {
  const trailerKey =
    movie.trailer ||
    (movie.videos?.results || []).find((video) => video.site === "YouTube" && video.type === "Trailer")
      ?.key ||
    null;

  return {
    id: String(movie.id),
    title: movie.title || movie.name,
    overview: movie.overview,
    poster: imagePath(movie.poster_path),
    backdrop: imagePath(movie.backdrop_path),
    rating: movie.vote_average ? Number(movie.vote_average).toFixed(1) : "N/A",
    releaseDate: movie.release_date || movie.first_air_date || "Unknown",
    genre: movie.genre_names || movie.genre_ids?.map((id) => genreNames[id]).filter(Boolean) || [],
    trailer:
      trailerKey && trailerKey.startsWith("http")
        ? trailerKey
        : trailerKey
          ? `https://www.youtube.com/embed/${trailerKey}`
          : null,
  };
}

async function fetchTmdb(endpoint) {
  const apiKey = process.env.TMDB_API_KEY;
  const bearerToken = process.env.TMDB_BEARER_TOKEN;

  if (!apiKey && !bearerToken) {
    return null;
  }

  const baseUrl = process.env.TMDB_BASE_URL || "https://api.themoviedb.org/3";
  const url = new URL(`${baseUrl}${endpoint}`);

  const headers = {};
  if (bearerToken) {
    headers.Authorization = `Bearer ${bearerToken}`;
  } else {
    url.searchParams.set("api_key", apiKey);
  }

  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`TMDB request failed with ${response.status}`);
  }

  return response.json();
}

export async function getHomeRows() {
  try {
    const tmdbRows = await Promise.all(
      curatedRows.map(async (row) => {
        const payload = await fetchTmdb(`/discover/movie?with_genres=${row.genreId}`);
        if (!payload?.results?.length) {
          return row;
        }

        return {
          ...row,
          movies: payload.results.slice(0, 12).map(normalizeMovie),
        };
      }),
    );

    return tmdbRows;
  } catch {
    return curatedRows;
  }
}

export async function searchMovies(query) {
  if (!query?.trim()) {
    return [];
  }

  const lower = query.toLowerCase();

  try {
    const payload = await fetchTmdb(`/search/movie?query=${encodeURIComponent(query)}`);
    if (payload?.results?.length) {
      return payload.results.slice(0, 18).map(normalizeMovie);
    }
  } catch {
    return curatedRows
      .flatMap((row) => row.movies)
      .filter((movie) => movie.title.toLowerCase().includes(lower));
  }

  return curatedRows
    .flatMap((row) => row.movies)
    .filter((movie) => movie.title.toLowerCase().includes(lower));
}

export async function getMovieById(movieId) {
  try {
    const payload = await fetchTmdb(`/movie/${movieId}?append_to_response=videos`);
    if (payload) {
      return normalizeMovie(payload);
    }
  } catch {
    return detailedMovies[movieId] || null;
  }

  return detailedMovies[movieId] || null;
}
