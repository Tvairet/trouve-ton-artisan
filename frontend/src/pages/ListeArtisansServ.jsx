import { useState, useEffect } from 'react';
import '../styles/pages/ListeArtisans.css'

const categoryImages = {
  "1": "alimentation.jpg",
  "2": "batiment.jpg",
  "3": "fabrication.jpg",
  "4": "services.jpg",
  
};

const getCategoryImage = (categoryId) => {
  const filename = categoryImages[categoryId] || "default.jpg";
  return `/img/${filename}`;
};

function ListeArtisansServ() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [artisans, setArtisans] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedArtisan, setSelectedArtisan] = useState(null);

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

  // Filtre fixe sur categoryId = 4
  const filteredArtisans = artisans.filter((artisan) => artisan.categoryId === 4);

  return (
    <>
      <section id="center">
        <h1>Nos artisans de l'alimentation</h1>
        <div className="row">
        {filteredArtisans.map((artisan) => (
      <div className="col-md-4 mb-4" key={artisan.id}>
        <div className="card h-100">
          <div className="card-body">
            <h5 className="card-title">{artisan.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{artisan.speciality}</h6>
            <p className="card-text">
              <strong>Note :</strong> {artisan.grade} ⭐
              <strong>Localisation :</strong> {artisan.city} <br />
              <strong>À propos :</strong> {artisan.about}
            </p>
            <button
                  className="btn btn-primary mt-auto"
                  onClick={() => setSelectedArtisan(artisan)}
                >
                  Voir les infos
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedArtisan && (
        <div
    className="modal show d-block"
    tabIndex="-1"
    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
  >
    <div className="modal-dialog modal-dialog-centered modal-lg">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{selectedArtisan.name}</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setSelectedArtisan(null)}
          ></button>
        </div>

        <div className="modal-body">
          <div className="row">
            {/* Colonne gauche : infos artisan */}
            <div className="col-md-6">
              <img
                src={getCategoryImage(selectedArtisan.categoryId)}
                alt={selectedArtisan.speciality}
                className="img-fluid rounded mb-3"
              />
              <p><strong>Note :</strong> {selectedArtisan.grade} ⭐</p>
              <p><strong>Spécialité :</strong> {selectedArtisan.speciality}</p>
              <p><strong>Localisation :</strong> {selectedArtisan.city}</p>
              <p><strong>À propos :</strong> {selectedArtisan.about}</p>
            </div>

            {/* Colonne droite : formulaire de contact */}
            <div className="col-md-6">
              <h6>Contacter l'artisan</h6>
              <form>
                <div className="mb-3">
                  <label className="form-label">Nom</label>
                  <input type="text" className="form-control" placeholder="Votre nom" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" placeholder="Votre email" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Votre message"
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Envoyer
                </button>
              </form>

              <p className="mt-3">
                <strong>Email :</strong> {selectedArtisan.email}
              </p>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button
            className="btn btn-secondary"
            onClick={() => setSelectedArtisan(null)}
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  </div>
)}
  
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default ListeArtisansServ