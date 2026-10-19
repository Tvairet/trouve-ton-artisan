import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import ArtisanModal from '../components/ArtisanModal';
import ArtisanRating from '../components/ArtisanRating';
import '../styles/pages/ListeArtisans.css';

// Les quatre catégories partagent la même page et le même composant de fiche artisan.
const categories = {
  alimentation: { id: 1, title: 'Nos artisans de l’alimentation' },
  batiment: { id: 2, title: 'Nos artisans du bâtiment' },
  fabrication: { id: 3, title: 'Nos artisans de la fabrication' },
  services: { id: 4, title: 'Nos artisans des services' },
};

function ListeArtisansCategorie() {
  const { slug } = useParams();
  const category = categories[slug];
  const apiUrl = import.meta.env.VITE_API_URL;

  const [artisans, setArtisans] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedArtisan, setSelectedArtisan] = useState(null);

  useEffect(() => {
    if (!category) return undefined;

    const controller = new AbortController();
    const fetchArtisans = async () => {
      setLoading(true);
      setError(null);
      setArtisans([]);
      setSelectedArtisan(null);

      try {
        const response = await fetch(
          `${apiUrl}/api/artisans?categoryId=${category.id}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error('Réponse inattendue de l’API.');
        }

        setArtisans(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchArtisans();
    return () => controller.abort();
  }, [apiUrl, category]);

  // Une catégorie inconnue affiche la page 404 via la route générique.
  if (!category) {
    return <Navigate to="/404" replace />;
  }

  return (
    <>
      <section id="center" aria-labelledby="category-title">
        <h1 id="category-title">{category.title}</h1>

        {loading && <p role="status">Chargement des artisans…</p>}
        {error && <p role="alert">Impossible de charger les artisans : {error}</p>}

        {!loading && !error && (
          <div className="row">
            {artisans.map((artisan) => (
              <div className="col-12 col-xl-4 mb-4" key={artisan.id}>
                <div className="card h-100">
                  <div className="card-body d-flex flex-column">
                    <h2 className="card-title fs-5">{artisan.name}</h2>
                    <p className="card-subtitle mb-2 text-muted fs-6">
                      {artisan.speciality}
                    </p>
                    <div className="mb-2">
                      <ArtisanRating value={artisan.grade} />
                    </div>
                    <p className="card-text">
                      <strong>Localisation :</strong> {artisan.city}<br />
                      <strong>À propos :</strong> {artisan.about || 'Aucune description disponible.'}
                    </p>
                    <button
                      type="button"
                      className="btn btn-primary mt-auto stretched-link"
                      aria-label={`Voir les infos de ${artisan.name}`}
                      onClick={() => setSelectedArtisan(artisan)}
                    >
                      Voir les infos
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {artisans.length === 0 && (
              <p>Aucun artisan dans cette catégorie pour le moment.</p>
            )}
          </div>
        )}
      </section>

      <ArtisanModal
        artisan={selectedArtisan}
        onClose={() => setSelectedArtisan(null)}
      />

      <div className="ticks" />
      <div id="spacer" aria-hidden="true" />
    </>
  );
}

export default ListeArtisansCategorie;
