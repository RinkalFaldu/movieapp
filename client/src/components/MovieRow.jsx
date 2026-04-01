import MovieCard from "./MovieCard.jsx";

export default function MovieRow({
  row,
  favorites,
  onSelect,
  onToggleFavorite,
  canFavorite,
  layout = "strip",
}) {
  return (
    <section className="movie-row shelf-row">
      <div className="section-heading">
        <h2>{row.title}</h2>
        <span>{row.movies.length} titles</span>
      </div>
      <div className={layout === "grid" ? "movie-grid-layout" : "movie-strip"}>
        {row.movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onSelect={onSelect}
            onToggleFavorite={onToggleFavorite}
            canFavorite={canFavorite}
            isFavorite={favorites.some((entry) => entry.id === movie.id)}
          />
        ))}
      </div>
    </section>
  );
}
