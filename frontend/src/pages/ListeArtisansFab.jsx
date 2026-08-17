import { useState, useEffect } from 'react';



function ListeArtisansFab() {
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
        console.error("Erreur lors de l'appel API :", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArtisans();
  }, [apiUrl]); // effet relancé si l'URL change

  if (loading) {
    return <p>Chargement…</p>;
  }

  if (error) {
    return <p>Erreur : {error}</p>;
  }

  // Filtre fixe sur categoryId = 3
  const filteredArtisans = artisans.filter((artisan) => artisan.categoryId === 3);

  return (
    <>
      <section id="center">
        {filteredArtisans.map((artisan)=>(
         <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Note</th>
              <th>specialité</th>
              <th>Localisation</th>
            </tr>
          </thead>
          <tbody>
            <td>{artisan.name}</td>
            <td>{artisan.grade}</td>
            <td>{artisan.speciality}</td>
            <td>{artisan.city}</td>
          </tbody>
          
         </table> 
        ))}
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default ListeArtisansFab
