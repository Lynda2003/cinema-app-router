import { useState, useMemo } from "react";
import { useFilms } from "../context/FilmsContext";
import MovieList from "../components/MovieList";
import Filtre from "../components/Filtre";
import AjouterFilm from "../components/AjouterFilm";

function HomePage() {
  const { films, ajouterFilm, supprimerFilm } = useFilms();
  const [filtreTitre, setFiltreTitre] = useState("");
  const [filtreNote, setFiltreNote] = useState(0);

  const filmsFiltres = useMemo(() => {
    return films.filter((film) => {
      const correspondTitre = film.titre
        .toLowerCase()
        .includes(filtreTitre.toLowerCase());
      const correspondNote = film.note >= filtreNote;
      return correspondTitre && correspondNote;
    });
  }, [films, filtreTitre, filtreNote]);

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__logo">🎬 CinéApp</h1>
        <p className="app__sous-titre">Vos films et séries préférés</p>
      </header>

      <main className="app__main">
        <aside className="app__sidebar">
          <AjouterFilm onAjouter={ajouterFilm} />
          <Filtre
            filtreTitre={filtreTitre}
            filtreNote={filtreNote}
            onChangeTitre={setFiltreTitre}
            onChangeNote={setFiltreNote}
            onReset={() => { setFiltreTitre(""); setFiltreNote(0); }}
          />
          <div className="app__stats">
            <p>
              <strong>{filmsFiltres.length}</strong> film
              {filmsFiltres.length !== 1 ? "s" : ""} affiché
              {filmsFiltres.length !== 1 ? "s" : ""} sur{" "}
              <strong>{films.length}</strong>
            </p>
          </div>
        </aside>

        <section className="app__content">
          <MovieList films={filmsFiltres} onSupprimer={supprimerFilm} />
        </section>
      </main>
    </div>
  );
}

export default HomePage;
