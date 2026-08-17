import { useState, useEffect } from 'react';
import '../styles/pages/Home.css';

function RatingStars({ value }) {
  return (
    <div className="rating" aria-label={`Note ${value} sur 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={`star ${i < value ? "filled" : "empty"}`}>★</span>
      ))}
    </div>
  );
}

function Home() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [artisans, setArtisans] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtisans = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/artisans`);

        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }
        const data = await response.json();
        setArtisans(data);
      } catch (err) {
        console.error("Erreur lors de l'appel API :", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArtisans();
  }, [apiUrl]);

  // Top 3 artisans triés par note décroissante
  const topArtisans = [...artisans]
    .sort((a, b) => Number(b.grade) - Number(a.grade))
    .slice(0, 3);

   return (
   <>
    <section className='explicationListe'>
      <h1>Comment trouver mon artisan ?</h1>
      <ol class="list-group list-group-numbered">
        <li className="list-group-item">Choisir la catégorie d'artisanat dans le menu</li>
        <li className="list-group-item">Choisir un artisan</li>
        <li className="list-group-item">Le contacter via le formulaire de contact</li>
        <li className="list-group-item">Une réponse sera apportée sous 48H</li>
      </ol>
    </section>
     <section className='topArtisans'>
        <h2 className="mb-4">Nos meilleurs artisans</h2>

        {loading && <p>Chargement…</p>}
        {error && <p>Erreur : {error}</p>}

        {!loading && !error && (
          <div className="row g-4">
            {topArtisans.map((artisan) => (
              <div key={artisan.id} className="col-12 col-md-4">
                 <div className="card shadow-sm" style={{ minHeight: '330px' }}>
    <div className="card-body d-flex flex-column">
      <h3 className="card-title h5">{artisan.name}</h3>
      <h6 className="card-subtitle mb-2">{artisan.speciality}</h6>
      <RatingStars value={Math.round(Number(artisan.grade))} />
      <p className="card-text mt-2">{artisan.city}</p>
      {artisan.about && (
        <p className="card-text-2">{artisan.about}</p>
      )}
      <a href={`/artisans/${artisan.id}`} className="btn btn-primary mt-auto">
        Voir le profil
      </a>
    </div>
  </div>
              </div>
            ))}
          </div>
        )}
      </section>

     
    </>
   );
  }
export default Home;