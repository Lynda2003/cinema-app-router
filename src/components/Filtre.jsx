function Filtre({ filtreTitre, filtreNote, onChangeTitre, onChangeNote, onReset }) {
  return (
    <div className="filtre">
      <h2 className="filtre__titre">Filtrer les films</h2>
      <div className="filtre__controls">
        <div className="filtre__group">
          <label htmlFor="recherche-titre" className="filtre__label">
            Rechercher par titre
          </label>
          <input
            id="recherche-titre"
            type="text"
            className="filtre__input"
            placeholder="Ex: Inception..."
            value={filtreTitre}
            onChange={(e) => onChangeTitre(e.target.value)}
          />
        </div>

        <div className="filtre__group">
          <label htmlFor="filtre-note" className="filtre__label">
            Note minimale : <strong>{filtreNote === 0 ? "Toutes" : `${filtreNote}/5`}</strong>
          </label>
          <input
            id="filtre-note"
            type="range"
            className="filtre__range"
            min="0"
            max="5"
            step="0.5"
            value={filtreNote}
            onChange={(e) => onChangeNote(parseFloat(e.target.value))}
          />
          <div className="filtre__range-labels">
            <span>Toutes</span>
            <span>5 ★</span>
          </div>
        </div>

        <button className="btn btn--reset" onClick={onReset}>
          Réinitialiser les filtres
        </button>
      </div>
    </div>
  );
}

export default Filtre;
