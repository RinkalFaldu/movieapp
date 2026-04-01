export default function GenreSidebar({ genres, activeGenre, onSelectGenre }) {
  return (
    <aside className="genre-sidebar">
      <div className="genre-sidebar-inner">
        <div className="genre-brand">
          <div className="genre-brand-mark">C</div>
          <div>
            <p className="genre-brand-name">CineStack</p>
            <span className="genre-brand-tag">Movie hub</span>
          </div>
        </div>
        <div className="genre-list-header">
          <h2>Genre</h2>
        </div>
        <div className="genre-list">
          {genres.map((genre) => (
            <button
              key={genre.key}
              className={`genre-link ${activeGenre === genre.key ? "active" : ""}`}
              onClick={() => onSelectGenre(genre.key)}
            >
              {genre.title}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
