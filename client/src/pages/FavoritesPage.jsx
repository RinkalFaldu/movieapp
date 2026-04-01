import { useEffect, useMemo, useState } from "react";
import { fetchFavorites, removeFavorite } from "../api/favoriteApi.js";
import MovieCard from "../components/MovieCard.jsx";
import MovieModal from "../components/MovieModal.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function FavoritesPage() {
  const { token } = useAuth();
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
    <main className="page-shell favorites-shell">
      <section className="favorites-header">
        <div>
          <p className="eyebrow">Your profile list</p>
          <h1>Favorite movies</h1>
          <p>Save titles you want to revisit, then share the whole list with friends.</p>
        </div>
        {shareUrl ? (
          <button className="primary-button" onClick={copyShareLink}>
            Copy share link
          </button>
        ) : null}
      </section>
      {message ? <p className="page-message">{message}</p> : null}
      <section className="favorites-grid">
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
          <div className="page-state">No favorites yet. Add a few from the browse page.</div>
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
