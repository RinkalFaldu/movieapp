import { Link } from "react-router-dom";

export default function MovieModal({ movie, onClose, onToggleFavorite, isFavorite, canFavorite }) {
  if (!movie) {
    return null;
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-panel" onClick={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          x
        </button>
        <div className="modal-hero">
          <img src={movie.poster} alt={`${movie.title} poster`} />
          <div>
            <p className="eyebrow">Featured selection</p>
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
            <div className="detail-grid">
              <span>Release: {movie.releaseDate}</span>
              <span>Rating: {movie.rating}</span>
              <span>Genres: {movie.genre.join(", ")}</span>
            </div>
            <div className="hero-actions">
              <button className="primary-button" onClick={() => onToggleFavorite(movie)}>
                {canFavorite
                  ? isFavorite
                    ? "Remove favorite"
                    : "Save favorite"
                  : "Sign in to save"}
              </button>
            </div>
            {!canFavorite ? (
              <p className="modal-auth-note">
                Save favorites after you <Link to="/login">sign in</Link> or{" "}
                <Link to="/signup">create an account</Link>.
              </p>
            ) : null}
          </div>
        </div>
        {movie.trailer ? (
          <div className="video-shell">
            <iframe
              src={movie.trailer}
              title={`${movie.title} trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <p className="page-state">Trailer unavailable for this title.</p>
        )}
      </div>
    </div>
  );
}
