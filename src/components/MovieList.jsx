import MovieCard from "./MovieCard";

function MovieList({ films, onSupprimer }) {
  if (films.length === 0) {
    return (
      <div className="movie-list--empty">
        <p>Aucun film ne correspond à votre recherche.</p>
      </div>
    );
  }

  return (
    <div className="movie-list">
      {films.map((film) => (
        <MovieCard key={film.id} film={film} onSupprimer={onSupprimer} />
      ))}
    </div>
  );
}

export default MovieList;
