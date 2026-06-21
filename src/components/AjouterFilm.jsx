import { useState } from "react";

const INITIAL_FORM = {
  titre: "",
  description: "",
  posterURL: "",
  note: 3,
};

function AjouterFilm({ onAjouter }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [erreurs, setErreurs] = useState({});
  const [ouvert, setOuvert] = useState(false);

  function valider() {
    const nouvelles = {};
    if (!form.titre.trim()) nouvelles.titre = "Le titre est requis.";
    if (!form.description.trim()) nouvelles.description = "La description est requise.";
    if (!form.posterURL.trim()) {
      nouvelles.posterURL = "L'URL de l'affiche est requise.";
    } else {
      try {
        new URL(form.posterURL);
      } catch {
        nouvelles.posterURL = "L'URL n'est pas valide.";
      }
    }
    return nouvelles;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === "note" ? parseFloat(value) : value }));
    if (erreurs[name]) setErreurs((prev) => ({ ...prev, [name]: "" }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const nouvelles = valider();
    if (Object.keys(nouvelles).length > 0) {
      setErreurs(nouvelles);
      return;
    }
    onAjouter({ ...form, id: Date.now() });
    setForm(INITIAL_FORM);
    setErreurs({});
    setOuvert(false);
  }

  return (
    <div className="ajouter-film">
      <button className="btn btn--ajouter" onClick={() => setOuvert((prev) => !prev)}>
        {ouvert ? "✕ Annuler" : "+ Ajouter un film"}
      </button>

      {ouvert && (
        <form className="ajouter-film__form" onSubmit={handleSubmit} noValidate>
          <h2 className="ajouter-film__titre">Nouveau film</h2>

          <div className="form__group">
            <label htmlFor="titre" className="form__label">Titre *</label>
            <input
              id="titre"
              name="titre"
              type="text"
              className={`form__input ${erreurs.titre ? "form__input--erreur" : ""}`}
              placeholder="Titre du film"
              value={form.titre}
              onChange={handleChange}
            />
            {erreurs.titre && <span className="form__erreur">{erreurs.titre}</span>}
          </div>

          <div className="form__group">
            <label htmlFor="description" className="form__label">Description *</label>
            <textarea
              id="description"
              name="description"
              className={`form__input form__textarea ${erreurs.description ? "form__input--erreur" : ""}`}
              placeholder="Décrivez le film..."
              value={form.description}
              onChange={handleChange}
              rows={4}
            />
            {erreurs.description && <span className="form__erreur">{erreurs.description}</span>}
          </div>

          <div className="form__group">
            <label htmlFor="posterURL" className="form__label">URL de l'affiche *</label>
            <input
              id="posterURL"
              name="posterURL"
              type="url"
              className={`form__input ${erreurs.posterURL ? "form__input--erreur" : ""}`}
              placeholder="https://..."
              value={form.posterURL}
              onChange={handleChange}
            />
            {erreurs.posterURL && <span className="form__erreur">{erreurs.posterURL}</span>}
          </div>

          <div className="form__group">
            <label htmlFor="note" className="form__label">
              Note : <strong>{form.note}/5</strong>
            </label>
            <input
              id="note"
              name="note"
              type="range"
              className="filtre__range"
              min="0"
              max="5"
              step="0.5"
              value={form.note}
              onChange={handleChange}
            />
            <div className="filtre__range-labels">
              <span>0</span>
              <span>5 ★</span>
            </div>
          </div>

          <button type="submit" className="btn btn--soumettre">
            Ajouter le film
          </button>
        </form>
      )}
    </div>
  );
}

export default AjouterFilm;
