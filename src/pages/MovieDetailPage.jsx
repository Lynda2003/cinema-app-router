import { useParams, useNavigate } from "react-router-dom";
import { useFilms } from "../context/FilmsContext";

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

function MovieDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getFilmById } = useFilms();
  const film = getFilmById(id);

  if (!film) {
    return (
      <div className="detail-not-found">
        <p>Film introuvable.</p>
        <button className="btn btn--retour" onClick={() => navigate("/")}>
          ← Retour à l'accueil
        </button>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <header className="detail-page__header">
        <button className="btn btn--retour" onClick={() => navigate(-1)}>
          ← Retour
        </button>
        <h1 className="app__logo">🎬 CinéApp</h1>
      </header>

      <main className="detail-page__main">
        <div className="detail-page__poster-col">
          <img
            src={film.posterURL}
            alt={`Affiche de ${film.titre}`}
            className="detail-page__poster"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/400x600/1a1a2e/e0e0e0?text=Pas+d%27image";
            }}
          />
        </div>

        <div className="detail-page__info-col">
          <h2 className="detail-page__titre">{film.titre}</h2>
          <StarRating note={film.note} />
          <p className="detail-page__description">{film.description}</p>

          <div className="detail-page__trailer">
            <h3 className="detail-page__trailer-titre">Bande-annonce</h3>
            <div className="detail-page__iframe-wrapper">
              <iframe
                src={film.trailerURL}
                title={`Bande-annonce de ${film.titre}`}
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="detail-page__iframe"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MovieDetailPage;
