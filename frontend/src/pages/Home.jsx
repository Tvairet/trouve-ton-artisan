import { useState, useEffect } from 'react';
import '../styles/pages/Home.css';

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
  const [selectedArtisan, setSelectedArtisan] = useState(null); // 👈 nouvel état

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
      <button
        type="button"
        className="btn btn-primary mt-auto"
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
    </>
   );
  }
export default Home;