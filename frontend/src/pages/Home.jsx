import { useEffect, useState } from 'react';
import ArtisanModal from '../components/ArtisanModal';
import ArtisanRating from '../components/ArtisanRating';
import '../styles/pages/Home.css';

function Home() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [artisans, setArtisans] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedArtisan, setSelectedArtisan] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchArtisans = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/artisans`, {
          signal: controller.signal,
        });

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
  }, [apiUrl]);

  // Les trois artisans les mieux notés, à partir des données de l'API.
  const topArtisans = [...artisans]
    .sort((a, b) => Number(b.grade) - Number(a.grade))
    .slice(0, 3);

  return (
    <>
      <section className="explicationListe">
        <h1>Comment trouver mon artisan ?</h1>
        <ol className="list-group list-group-numbered">
          <li className="list-group-item">Choisir la catégorie d'artisanat dans le menu</li>
          <li className="list-group-item">Choisir un artisan</li>
          <li className="list-group-item">Le contacter via le formulaire de contact</li>
          <li className="list-group-item">Une réponse sera apportée sous 48 h</li>
        </ol>
      </section>

      <section className="topArtisans" aria-labelledby="top-artisans-title">
        <h2 id="top-artisans-title" className="mb-4">Nos meilleurs artisans</h2>

        {loading && <p role="status">Chargement…</p>}
        {error && <p role="alert">Erreur : {error}</p>}

        {!loading && !error && (
          <div className="row g-4">
            {topArtisans.map((artisan) => (
              <div key={artisan.id} className="col-12 col-xl-4">
                <div className="card shadow-sm h-100">
                  <div className="card-body d-flex flex-column">
                    <p className="card-text text-center small mb-2">
                      Artisan du mois
                    </p>
                    <h3 className="card-title fs-5">
                      {artisan.name}
                    </h3>
                    <p className="card-subtitle mb-2 fs-6">
                      {artisan.speciality}
                    </p>
                    <ArtisanRating value={artisan.grade} onDark />
                    <p className="card-text mt-2 mb-2">
                      {artisan.city || 'Localisation non renseignée'}
                    </p>
                    <p className="card-text-2">
                      {typeof artisan.about === 'string' && artisan.about.trim()
                        ? artisan.about
                        : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent volutpat scelerisque mauris.'}
                    </p>
                    <button
                      type="button"
                      className="btn btn-primary mt-auto stretched-link"
                      aria-label={`Voir le profil de ${artisan.name}`}
                      onClick={() => setSelectedArtisan(artisan)}
                    >
                      Voir le profil
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <ArtisanModal
        artisan={selectedArtisan}
        onClose={() => setSelectedArtisan(null)}
      />
    </>
  );
}

export default Home;
