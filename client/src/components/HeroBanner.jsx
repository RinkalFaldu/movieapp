export default function HeroBanner({ movie, onOpen, authenticated }) {
  if (!movie) {
    return null;
  }

  return (
    <section
      className="hero-banner"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(10,12,20,0.2), rgba(10,12,20,0.95)), url(${movie.backdrop})`,
      }}
    >
      <div className="hero-copy">
        <p className="eyebrow">Streaming now</p>
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>
        <div className="hero-meta">
          <span>{movie.releaseDate}</span>
          <span>{movie.rating} rating</span>
          <span>{movie.genre.join(" • ")}</span>
        </div>
        <div className="hero-actions">
          <button className="primary-button" onClick={() => onOpen(movie)}>
            Play trailer
          </button>
          <button className="ghost-button" onClick={() => onOpen(movie)}>
            More info
          </button>
        </div>
        {!authenticated && (
          <p className="hero-note">
            Create an account to save favorites and share your watchlist.
          </p>
        )}
      </div>
    </section>
  );
}
