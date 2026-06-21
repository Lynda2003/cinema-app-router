import { useState } from "react";

function StarRating({ note }) {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${star <= Math.round(note) ? "star--filled" : "star--empty"}`}
        >
          ★
        </span>
      ))}
      <span className="note-value">{note}/5</span>
    </div>
  );
}

function MovieCard({ film, onSupprimer }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="movie-card">
      <div className="movie-card__poster-wrapper">
        <img
          src={film.posterURL}
          alt={`Affiche de ${film.titre}`}
          className="movie-card__poster"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/300x450/1a1a2e/e0e0e0?text=Pas+d%27image";
          }}
        />
        <div className="movie-card__overlay">
          <button
            className="btn btn--detail"
            onClick={() => setExpanded((prev) => !prev)}
          >
            {expanded ? "Masquer" : "Voir détails"}
          </button>
        </div>
      </div>

      <div className="movie-card__body">
        <h3 className="movie-card__titre">{film.titre}</h3>
        <StarRating note={film.note} />

        {expanded && (
          <p className="movie-card__description">{film.description}</p>
        )}

        <button
          className="btn btn--supprimer"
          onClick={() => onSupprimer(film.id)}
        >
          Supprimer
        </button>
      </div>
    </div>
  );
}

export default MovieCard;
