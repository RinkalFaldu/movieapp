import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchFavorites, removeFavorite } from "../api/favoriteApi.js";
import MovieCard from "../components/MovieCard.jsx";
import MovieModal from "../components/MovieModal.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function FavoritesPage() {
  const { token, user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [shareId, setShareId] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadFavorites() {
      try {
        const response = await fetchFavorites(token);
        setFavorites(response.favorites);
        setShareId(response.shareId);
      } catch (error) {
        setMessage(error.message);
      }
    }

    loadFavorites();
  }, [token]);

  const shareUrl = useMemo(() => {
    if (!shareId) {
      return "";
    }
    return `${window.location.origin}/shared/${shareId}`;
  }, [shareId]);

  async function handleRemove(movie) {
    const response = await removeFavorite(token, movie.id);
    setFavorites(response.favorites);
    if (selectedMovie?.id === movie.id) {
      setSelectedMovie(null);
    }
  }

  async function copyShareLink() {
    await navigator.clipboard.writeText(shareUrl);
    setMessage("Share link copied to clipboard.");
  }

  return (
    <main className="profile-shell">
      <section className="profile-hero">
        <div className="profile-topbar">
          <Link className="ghost-button back-home-button" to="/">
            ← Back to home
          </Link>
          <div className="profile-actions">
            {shareUrl ? (
              <button className="primary-button" onClick={copyShareLink}>
                Copy share link
              </button>
            ) : null}
          </div>
        </div>

        <div className="profile-hero-content">
          <div className="profile-badge">{user?.name?.slice(0, 1) || "U"}</div>
          <div className="profile-copy">
            <p className="eyebrow">Your profile page</p>
            <h1>{user?.name ? `${user.name}'s Favorites` : "Favorite movies"}</h1>
            <p>
              Keep a personal watchlist, revisit the titles you love, and share your picks with
              friends from one clean profile space.
            </p>
          </div>
        </div>

        <div className="profile-stats">
          <article className="profile-stat-card">
            <span className="profile-stat-label">Saved titles</span>
            <strong>{favorites.length}</strong>
          </article>
          <article className="profile-stat-card">
            <span className="profile-stat-label">Public list</span>
            <strong>{shareId ? "Ready" : "Private"}</strong>
          </article>
          <article className="profile-stat-card">
            <span className="profile-stat-label">Share URL</span>
            <strong>{shareUrl ? "Available" : "Not ready"}</strong>
          </article>
        </div>
      </section>

      <section className="profile-library">
        <div className="favorites-header">
          <div>
            <p className="eyebrow">Watchlist library</p>
            <h2>Saved movies</h2>
            <p>Open any title for details, or remove it from your favorites.</p>
          </div>
        </div>
      </section>
      {message ? <p className="page-message">{message}</p> : null}
      <section className="favorites-grid profile-favorites-grid">
        {favorites.length ? (
          favorites.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onSelect={setSelectedMovie}
              onToggleFavorite={handleRemove}
              isFavorite
              canFavorite
            />
          ))
        ) : (
          <div className="page-state profile-empty-state">
            No favorites yet. Go back home and save a few movies to build your profile list.
          </div>
        )}
      </section>
      <MovieModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
        onToggleFavorite={handleRemove}
        isFavorite
        canFavorite
      />
    </main>
  );
}
