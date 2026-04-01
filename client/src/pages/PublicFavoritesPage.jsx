import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPublicFavorites } from "../api/favoriteApi.js";

export default function PublicFavoritesPage() {
  const { shareId } = useParams();
  const [state, setState] = useState({
    owner: "",
    favorites: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    async function loadPublicList() {
      try {
        const response = await fetchPublicFavorites(shareId);
        setState({
          owner: response.owner,
          favorites: response.favorites,
          loading: false,
          error: "",
        });
      } catch (error) {
        setState((current) => ({
          ...current,
          loading: false,
          error: error.message,
        }));
      }
    }

    loadPublicList();
  }, [shareId]);

  if (state.loading) {
    return <div className="page-state">Loading public list...</div>;
  }

  if (state.error) {
    return <div className="page-state">{state.error}</div>;
  }

  return (
    <main className="page-shell shared-shell">
      <section className="favorites-header">
        <div>
          <p className="eyebrow">Shared watchlist</p>
          <h1>{state.owner}'s favorites</h1>
          <p>A public snapshot of favorite titles shared from CineStack.</p>
        </div>
      </section>
      <section className="favorites-grid">
        {state.favorites.map((movie) => (
          <article key={movie.id} className="shared-card">
            <img src={movie.poster} alt={`${movie.title} poster`} />
            <div>
              <h2>{movie.title}</h2>
              <p>{movie.overview}</p>
              <span>{movie.releaseDate}</span>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
