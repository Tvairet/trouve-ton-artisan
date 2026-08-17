import { useState, useEffect } from 'react';

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
        console.log("URL appelée :", `${apiUrl}/api/artisans`);
        const response = await fetch(`${apiUrl}/api/artisans`);

        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }
        const data = await response.json();
        console.log("Données reçues :", data);
        setArtisans(data);
      } catch (err) {
        console.error("Erreur lors de l’appel API :", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArtisans();
  }, [apiUrl]); // effet relancé si l’URL change

  if (loading) {
    return <p>Chargement…</p>;
  }

  if (error) {
    return <p>Erreur : {error}</p>;
  }

  return (
    <>
      <h2>Page d'accueil</h2>
      <section>
        {artisans.map((artisan) => (
          <article key={artisan.id}>
            <h3>{artisan.name}</h3>
          </article>
        ))}
      </section>
    </>
  );
}

export default Home;