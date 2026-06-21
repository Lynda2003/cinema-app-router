import { createContext, useContext, useState } from "react";

const FILMS_INITIAUX = [
  {
    id: 1,
    titre: "Inception",
    description:
      "Un voleur qui s'infiltre dans les rêves des gens pour extraire des informations précieuses se voit offrir une chance de racheter ses crimes passés en implantant une idée dans l'esprit d'une personne.",
    posterURL: "https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
    trailerURL: "https://www.youtube.com/embed/YoHD9XEInc0",
    note: 4.5,
  },
  {
    id: 2,
    titre: "Interstellar",
    description:
      "Une équipe d'explorateurs voyage à travers un trou de ver dans l'espace afin d'assurer la survie de l'humanité.",
    posterURL: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    trailerURL: "https://www.youtube.com/embed/zSWdZVtXT7E",
    note: 5,
  },
  {
    id: 3,
    titre: "The Dark Knight",
    description:
      "Batman, le lieutenant James Gordon et le procureur Harvey Dent s'unissent pour démanteler le crime organisé à Gotham, mais le Joker sème le chaos et met leur alliance à l'épreuve.",
    posterURL: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    trailerURL: "https://www.youtube.com/embed/EXeTwQWrcwY",
    note: 5,
  },
  {
    id: 4,
    titre: "Parasite",
    description:
      "La famille Kim, sans le sou, s'infiltre peu à peu dans la vie d'une riche famille en se faisant embaucher comme personnel de maison, jusqu'au jour où un événement inattendu bouleverse tout.",
    posterURL: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    trailerURL: "https://www.youtube.com/embed/5xH0HfJHsaY",
    note: 4.5,
  },
  {
    id: 5,
    titre: "The Matrix",
    description:
      "Un informaticien découvre que la réalité dans laquelle il vit n'est qu'une simulation informatique et rejoint une rébellion contre les machines qui contrôlent l'humanité.",
    posterURL: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    trailerURL: "https://www.youtube.com/embed/vKQi3bBA1y8",
    note: 4,
  },
  {
    id: 6,
    titre: "Avengers: Endgame",
    description:
      "Après les événements dévastateurs d'Infinity War, les Avengers se rassemblent pour tenter de défaire les actions de Thanos et restaurer l'équilibre de l'univers.",
    posterURL: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    trailerURL: "https://www.youtube.com/embed/TcMBFSGVi1c",
    note: 4,
  },
];

const FilmsContext = createContext(null);

export function FilmsProvider({ children }) {
  const [films, setFilms] = useState(FILMS_INITIAUX);

  function ajouterFilm(nouveauFilm) {
    setFilms((prev) => [nouveauFilm, ...prev]);
  }

  function supprimerFilm(id) {
    setFilms((prev) => prev.filter((f) => f.id !== id));
  }

  function getFilmById(id) {
    return films.find((f) => f.id === Number(id));
  }

  return (
    <FilmsContext.Provider value={{ films, ajouterFilm, supprimerFilm, getFilmById }}>
      {children}
    </FilmsContext.Provider>
  );
}

export function useFilms() {
  return useContext(FilmsContext);
}
