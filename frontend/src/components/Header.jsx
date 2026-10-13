import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import ArtisanModal from './ArtisanModal';
import logoUrl from '../assets/logo.png';
import logoSearch from '../assets/recherche.png';

const navLinkClass = ({ isActive }) => `nav-link${isActive ? ' active' : ''}`;

// Évite que les boutons de navigation occupent trop de place sur ordinateur.
const navLinkStyle = { width: 'auto', margin: '0.25rem', padding: '0.5rem' };

const normalizeText = (text) =>
  String(text ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('fr')
    .trim();

function Header() {
  const [search, setSearch] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedArtisan, setSelectedArtisan] = useState(null);

  const collapseRef = useRef(null);
  const searchInputRef = useRef(null);
  const searchToggleRef = useRef(null);
  const restoreAfterModalRef = useRef(false);
  const searchRequestRef = useRef(0);
  const location = useLocation();
  const apiUrl = import.meta.env.VITE_API_URL;

  const closeMenu = () => {
    const element = collapseRef.current;
    if (element && window.bootstrap?.Collapse) {
      window.bootstrap.Collapse.getOrCreateInstance(element).hide();
    }
  };

  const resetResults = () => {
    searchRequestRef.current += 1;
    setResults(null);
    setError('');
    setLoading(false);
  };

  // À chaque navigation, on referme la recherche et ses résultats.
  useEffect(() => {
    searchRequestRef.current += 1;
    setResults(null);
    setError('');
    setLoading(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  // Le focus arrive dans le champ après ouverture avec la loupe.
  useEffect(() => {
    if (isSearchOpen) searchInputRef.current?.focus();
  }, [isSearchOpen]);

  const closeSearch = (restoreFocus = false) => {
    setIsSearchOpen(false);
    resetResults();
    if (restoreFocus) searchToggleRef.current?.focus();
  };

  const toggleSearch = () => {
    if (isSearchOpen) {
      closeSearch(true);
    } else {
      closeMenu();
      setIsSearchOpen(true);
    }
  };

  // Échap ferme la recherche mobile et rend le focus à la loupe.
  // Sur ordinateur, il masque les résultats sans cacher le champ.
  const handleSearchKeyDown = (event) => {
    if (event.key !== 'Escape') return;
    event.preventDefault();
    event.stopPropagation();
    if (isSearchOpen) closeSearch(true);
    else {
      resetResults();
      searchInputRef.current?.focus();
    }
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    resetResults();
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    const query = normalizeText(search);

    if (!query) {
      resetResults();
      return;
    }

    const requestId = ++searchRequestRef.current;
    setLoading(true);
    setError('');
    setResults(null);

    try {
      const response = await fetch(`${apiUrl}/api/artisans`);
      if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`);

      const artisans = await response.json();
      if (!Array.isArray(artisans)) throw new Error('Réponse inattendue de l’API');

      // Recherche uniquement sur le nom, la ville ou la profession.
      const matches = artisans.filter((artisan) =>
        [artisan.name, artisan.city, artisan.speciality].some((value) =>
          normalizeText(value).includes(query)
        )
      );

      if (requestId === searchRequestRef.current) setResults(matches);
    } catch (err) {
      console.error('Erreur lors de la recherche :', err);
      if (requestId === searchRequestRef.current) {
        setError('Impossible de rechercher les artisans pour le moment.');
      }
    } finally {
      if (requestId === searchRequestRef.current) setLoading(false);
    }
  };

  const openArtisan = (artisan) => {
    // Le bouton de résultat disparaît : prévoir une cible de retour du focus.
    restoreAfterModalRef.current = true;
    setSelectedArtisan(artisan);
    setIsSearchOpen(false);
    resetResults();
    closeMenu();
  };

  // Après fermeture de la modale, le focus retourne sur un contrôle visible.
  useEffect(() => {
    if (selectedArtisan !== null || !restoreAfterModalRef.current) return;
    restoreAfterModalRef.current = false;
    const desktop = window.matchMedia('(min-width: 1200px)').matches;
    (desktop ? searchInputRef.current : searchToggleRef.current)?.focus();
  }, [selectedArtisan]);

  return (
    <header>
      <nav className="navbar navbar-expand-xl" aria-label="Navigation principale">
        <div className="container-fluid d-flex flex-wrap align-items-center">
          <Link
            className="navbar-brand me-auto"
            to="/"
            onClick={() => {
              closeMenu();
              setIsSearchOpen(false);
              resetResults();
            }}
          >
            <img
              src={logoUrl}
              alt="Trouve ton artisan — Accueil"
              width="250"
              height="100"
              style={{ width: 'clamp(120px, 35vw, 220px)', height: 'auto' }}
            />
          </Link>

          {/* Tablette / mobile : burger et loupe restent distincts. */}
          <div className="d-flex align-items-center gap-2 d-xl-none order-2">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Afficher ou masquer le menu de navigation"
              onClick={() => {
                setIsSearchOpen(false);
                resetResults();
              }}
            >
              <span className="navbar-toggler-icon" />
            </button>

            <button
              ref={searchToggleRef}
              type="button"
              className="btn btn-outline-dark d-flex align-items-center justify-content-center"
              aria-label={isSearchOpen ? 'Fermer la recherche' : 'Afficher la recherche'}
              aria-controls="artisan-search-panel"
              aria-expanded={isSearchOpen}
              onClick={toggleSearch}
              style={{ width: '44px', height: '44px' }}
            >
              <img src={logoSearch} alt="" width="24" height="24" />
            </button>
          </div>

          <div
            className="collapse navbar-collapse order-3 order-xl-2"
            id="navbarNav"
            ref={collapseRef}
          >
            <ul className="navbar-nav mx-xl-auto mb-2 mb-xl-0 text-center">
              <li className="nav-item"><NavLink end className={navLinkClass} style={navLinkStyle} to="/" onClick={closeMenu}>Accueil</NavLink></li>
              <li className="nav-item"><NavLink className={navLinkClass} style={navLinkStyle} to="/categorie/batiment" onClick={closeMenu}>Bâtiment</NavLink></li>
              <li className="nav-item"><NavLink className={navLinkClass} style={navLinkStyle} to="/categorie/services" onClick={closeMenu}>Services</NavLink></li>
              <li className="nav-item"><NavLink className={navLinkClass} style={navLinkStyle} to="/categorie/fabrication" onClick={closeMenu}>Fabrication</NavLink></li>
              <li className="nav-item"><NavLink className={navLinkClass} style={navLinkStyle} to="/categorie/alimentation" onClick={closeMenu}>Alimentation</NavLink></li>
            </ul>
          </div>

          {/* Un seul formulaire : visible sur ordinateur, dépliable sur mobile. */}
          <div
            id="artisan-search-panel"
            className={`order-4 order-xl-3 w-100 mt-2 mt-xl-0 ms-xl-2 ${isSearchOpen ? 'd-block' : 'd-none'} d-xl-block`}
            style={{ maxWidth: '350px', flexShrink: 0 }}
          >
            <form
              className="d-flex position-relative"
              role="search"
              onSubmit={handleSearch}
              onKeyDown={handleSearchKeyDown}
            >
              <input
                ref={searchInputRef}
                className="form-control me-2"
                type="search"
                placeholder="Nom, ville ou métier"
                aria-label="Rechercher par nom, ville ou métier"
                aria-controls={loading || error || results !== null ? 'artisan-search-results' : undefined}
                aria-expanded={loading || Boolean(error) || results !== null}
                value={search}
                onChange={handleSearchChange}
              />
              <button className="btn btn-outline-dark" type="submit" disabled={loading}>
                <img src={logoSearch} alt="" width="24" height="24" />
                <span className="visually-hidden">Rechercher</span>
              </button>

              {(loading || error || results !== null) && (
                <div
                  id="artisan-search-results"
                  className="position-absolute top-100 end-0 mt-2 bg-white border rounded shadow p-3"
                  style={{ width: 'min(420px, 90vw)', maxHeight: '350px', overflowY: 'auto', zIndex: 1050 }}
                  aria-live="polite"
                >
                  {loading && <p className="mb-0">Recherche en cours…</p>}
                  {error && <p className="text-danger mb-0">{error}</p>}
                  {results !== null && results.length === 0 && (
                    <p className="mb-0">Aucun artisan trouvé.</p>
                  )}
                  {results && results.length > 0 && (
                    <>
                      <p className="fw-semibold mb-2">{results.length} artisan(s) trouvé(s)</p>
                      <ul className="list-unstyled mb-0">
                        {results.map((artisan) => (
                          <li key={artisan.id} className="mb-2">
                            <button
                              className="btn btn-outline-primary text-start w-100"
                              type="button"
                              onClick={() => openArtisan(artisan)}
                            >
                              <strong>{artisan.name}</strong>
                              <span className="d-block small">{artisan.speciality} — {artisan.city}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      </nav>

      {selectedArtisan && (
        <ArtisanModal
          artisan={selectedArtisan}
          onClose={() => setSelectedArtisan(null)}
        />
      )}
    </header>
  );
}

export default Header;
