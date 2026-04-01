export default function MovieCard({ movie, onSelect, onToggleFavorite, isFavorite, canFavorite }) {
  const releaseYear = movie.releaseDate?.slice(0, 4) || "N/A";

  return (
    <article className="movie-card poster-card">
      <button className="movie-card-button" onClick={() => onSelect(movie)}>
        <img src={movie.poster} alt={`${movie.title} poster`} />
        <div className="movie-hover">
          <span>View details</span>
        </div>
      </button>
      <div className="movie-card-footer">
        <strong className="movie-title">{movie.title}</strong>
        <div className="movie-meta-line">
          <span className="movie-rating">★ {movie.rating}</span>
          <span className="movie-year">{releaseYear}</span>
        </div>
        <button className="ghost-button card-action" onClick={() => onToggleFavorite(movie)}>
          {canFavorite ? (isFavorite ? "Saved" : "Add to favorites") : "Sign in to save"}
        </button>
      </div>
    </article>
  );
}
