import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { addFavorite, fetchFavorites, removeFavorite } from "../api/favoriteApi.js";
import {
  fetchGenreMovies,
  fetchMovieDetails,
  fetchHomeFeed,
  searchMovies,
} from "../api/movieApi.js";
import GenreSidebar from "../components/GenreSidebar.jsx";
import MovieModal from "../components/MovieModal.jsx";
import MovieRow from "../components/MovieRow.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function HomePage() {
  const { isAuthenticated, token, logout, user } = useAuth();
  const [rows, setRows] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [activeGenre, setActiveGenre] = useState("");
  const [authPrompt, setAuthPrompt] = useState("");
  const [genrePagination, setGenrePagination] = useState({});
  const [loadingMoreGenre, setLoadingMoreGenre] = useState(false);

  useEffect(() => {
    async function loadPage() {
      try {
        const [home, favoriteResponse] = await Promise.all([
          fetchHomeFeed(),
          isAuthenticated ? fetchFavorites(token) : Promise.resolve({ favorites: [] }),
        ]);
        setRows(home.rows);
        setFavorites(favoriteResponse.favorites);
        setGenrePagination(
          Object.fromEntries(
            home.rows.map((row) => [
              row.key,
              { nextPage: row.nextPage ?? null, hasMore: Boolean(row.hasMore) },
            ]),
          ),
        );
      } catch (error) {
        setMessage(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadPage();
  }, [isAuthenticated, token]);

  useEffect(() => {
    async function runSearch() {
      if (!query.trim()) {
        setSearchResults([]);
        return;
      }

      try {
        const response = await searchMovies(query);
        setSearchResults(response.results);
      } catch (error) {
        setMessage(error.message);
      }
    }

    const timeout = setTimeout(runSearch, 250);
    return () => clearTimeout(timeout);
  }, [query]);

  const genres = useMemo(() => rows.map((row) => ({ key: row.key, title: row.title })), [rows]);
  const activeRow = useMemo(
    () => rows.find((row) => row.key === activeGenre) || null,
    [activeGenre, rows],
  );
  const displayRows = searchResults.length > 0
    ? [{ key: "search", title: `Search results`, movies: searchResults }]
    : activeRow
      ? [
          {
            key: activeRow.key,
            title: `All ${activeRow.title} Movies`,
            movies: activeRow.movies,
          },
        ]
      : rows;

  const activeGenrePaging = activeGenre ? genrePagination[activeGenre] : null;
  const canLoadMoreGenreMovies = Boolean(activeRow && activeGenrePaging?.hasMore);

  function handleSelectGenre(genreKey) {
    setQuery("");
    setSearchResults([]);
    setActiveGenre((current) => (current === genreKey ? "" : genreKey));
  }

  async function openMovie(movie) {
    try {
      const response = await fetchMovieDetails(movie.id);
      setSelectedMovie(response.movie);
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function toggleFavorite(movie) {
    if (!isAuthenticated) {
      setMessage("");
      setAuthPrompt(movie.title);
      return;
    }

    setAuthPrompt("");
    const exists = favorites.some((entry) => entry.id === movie.id);
    const response = exists
      ? await removeFavorite(token, movie.id)
      : await addFavorite(token, movie);
    setFavorites(response.favorites);
  }

  async function loadMoreGenreMovies() {
    if (!activeGenre || !activeGenrePaging?.nextPage || loadingMoreGenre) {
      return;
    }

    setLoadingMoreGenre(true);
    try {
      const response = await fetchGenreMovies(activeGenre, activeGenrePaging.nextPage);
      setRows((currentRows) =>
        currentRows.map((row) => {
          if (row.key !== activeGenre) {
            return row;
          }

          const knownIds = new Set(row.movies.map((movie) => movie.id));
          const appendedMovies = response.movies.filter((movie) => !knownIds.has(movie.id));
          return {
            ...row,
            movies: [...row.movies, ...appendedMovies],
            nextPage: response.nextPage,
            hasMore: response.hasMore,
          };
        }),
      );
      setGenrePagination((current) => ({
        ...current,
        [activeGenre]: {
          nextPage: response.nextPage ?? null,
          hasMore: Boolean(response.hasMore),
        },
      }));
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoadingMoreGenre(false);
    }
  }

  if (loading) {
    return <div className="page-state">Loading your cinema shelves...</div>;
  }

  return (
    <main className="discover-shell">
      <header className="discover-topbar">
        <div className="topbar-left">
          <Link className="brand home-brand" to="/">
            CineStack
          </Link>
        </div>
        <div className="search-strip home-search">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search any movies..."
          />
        </div>
        <div className="nav-actions topbar-actions">
          {isAuthenticated ? (
            <>
              <Link className="ghost-button" to="/favorites">
                {user?.name || "Favorites"}
              </Link>
              <button className="primary-button auth-pill" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="primary-button auth-pill secondary-pill" to="/login">
                Sign In
              </Link>
              <Link className="primary-button auth-pill" to="/signup">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </header>

      <div className="discover-layout">
        <GenreSidebar
          genres={genres}
          activeGenre={activeGenre}
          onSelectGenre={handleSelectGenre}
        />
        <section className="discover-content">
          <div className="content-panel">
            {message ? <p className="page-message">{message}</p> : null}
            {authPrompt ? (
              <div className="auth-callout">
                <div>
                  <strong>Sign in required</strong>
                  <p>
                    Sign in or create an account to add{" "}
                    <span className="auth-callout-title">{authPrompt}</span> to your favorites.
                  </p>
                </div>
                <div className="auth-callout-actions">
                  <Link className="ghost-button" to="/login">
                    Sign In
                  </Link>
                  <Link className="primary-button" to="/signup">
                    Sign Up
                  </Link>
                  <button className="ghost-button" onClick={() => setAuthPrompt("")}>
                    Close
                  </button>
                </div>
              </div>
            ) : null}
            {searchResults.length > 0 ? (
              <div className="search-summary">
                <h1>Search Results</h1>
                <span>{searchResults.length} matches</span>
              </div>
            ) : (
              <div className="search-summary">
                <h1>{activeRow ? `All ${activeRow.title} Movies` : "Browse All Movies"}</h1>
                <span>
                  {activeRow
                    ? "Showing only the selected genre"
                    : "Landing page shows every movie category"}
                </span>
              </div>
            )}
            {!searchResults.length && activeGenre ? (
              <button className="ghost-button clear-filter" onClick={() => setActiveGenre("")}>
                Show all genres
              </button>
            ) : null}
            {displayRows.map((row, index) => (
              <MovieRow
                key={row.key}
                row={{
                  ...row,
                  title:
                    index === 0 && !searchResults.length
                      ? row.title
                      : index === 0
                        ? row.title
                        : `${row.title} Picks`,
                }}
                favorites={favorites}
                onSelect={openMovie}
                onToggleFavorite={toggleFavorite}
                canFavorite={isAuthenticated}
                layout={!searchResults.length && activeGenre ? "grid" : "strip"}
              />
            ))}
            {!searchResults.length && activeGenre && canLoadMoreGenreMovies ? (
              <div className="load-more-wrap">
                <button
                  className="primary-button load-more-button"
                  onClick={loadMoreGenreMovies}
                >
                  {loadingMoreGenre ? "Loading..." : "Load more movies"}
                </button>
              </div>
            ) : null}
          </div>
        </section>
      </div>
      <MovieModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
        onToggleFavorite={toggleFavorite}
        canFavorite={isAuthenticated}
        isFavorite={favorites.some((entry) => entry.id === selectedMovie?.id)}
      />
    </main>
  );
}
