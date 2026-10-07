import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import '../styles/pages/ListeArtisans.css';

// Une seule source de vérité pour les 4 catégories : son slug dans l'URL,
// son identifiant en base, et le titre affiché. Pour ajouter une 5ème
// catégorie un jour, il suffira d'ajouter une ligne ici.
const categories = {
  alimentation: { id: 1, title: 'Nos artisans de l’alimentation' },
  batiment: { id: 2, title: 'Nos artisans du bâtiment' },
  fabrication: { id: 3, title: 'Nos artisans de la fabrication' },
  services: { id: 4, title: 'Nos artisans des services' },
};

const categoryImages = {
  1: 'alimentation.jpg',
  2: 'batiment.jpg',
  3: 'fabrication.jpg',
  4: 'services.jpg',
};

const getCategoryImage = (categoryId) => {
  const filename = categoryImages[categoryId] || 'default.jpg';
  return `/img/${filename}`;
};

const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL;

function ContactForm({ artisan, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  // Envoi au clic (via mailto), pas à la soumission classique du formulaire :
  // on empêche le comportement par défaut (qui rechargerait la page) et on
  // ouvre le client mail de l'utilisateur, à l'adresse définie en environnement.
  const handleSend = (e) => {
    e.preventDefault();
    const subject = `Contact via Trouve ton artisan • ${artisan.name}`;
    const bodyLines = [
      form.message,
      '',
      '—',
      `De : ${form.name || 'Anonyme'} <${form.email || 'non précisé'}>`,
      `Artisan concerné : ${artisan.name} (${artisan.speciality})`,
    ];
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
    window.location.href = mailto;
  };

  return (
    <form onSubmit={handleSend}>
      <div className="mb-3">
        <label className="form-label" htmlFor="contact-name">Nom</label>
        <input id="contact-name" name="name" type="text" className="form-control" placeholder="Votre nom" value={form.name} onChange={onChange} />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="contact-email">Email</label>
        <input id="contact-email" name="email" type="email" className="form-control" placeholder="Votre email" value={form.email} onChange={onChange} />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="contact-message">Message</label>
        <textarea id="contact-message" name="message" className="form-control" rows="4" placeholder="Votre message" value={form.message} onChange={onChange}></textarea>
      </div>
      <button type="submit" className="btn btn-primary w-100">
        Envoyer
      </button>
    </form>
  );
}

function ListeArtisansCategorie() {
  const { slug } = useParams();
  const category = categories[slug];

  const apiUrl = import.meta.env.VITE_API_URL;
  const [artisans, setArtisans] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedArtisan, setSelectedArtisan] = useState(null);

  useEffect(() => {
    if (!category) return;

    const fetchArtisans = async () => {
      setLoading(true);
      try {
        // Filtrage par catégorie fait côté API (WHERE), pas côté React
        const response = await fetch(`${apiUrl}/api/artisans?categoryId=${category.id}`);

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
  }, [apiUrl, category]);

  // Slug inconnu dans l'URL (ex: /categorie/n-importe-quoi) : page 404
  if (!category) {
    return <Navigate to="/404" replace />;
  }

  if (loading) {
    return <p>Chargement…</p>;
  }

  if (error) {
    return <p>Erreur : {error}</p>;
  }

  return (
    <>
      <section id="center">
        <h1>{category.title}</h1>
        <div className="row">
          {artisans.map((artisan) => (
            <div className="col-md-4 mb-4" key={artisan.id}>
              <div className="card h-100">
                <div className="card-body">
                  <h2 className="card-title fs-5">{artisan.name}</h2>
                  <h3 className="card-subtitle mb-2 text-muted fs-6">{artisan.speciality}</h3>
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
          {artisans.length === 0 && (
            <p>Aucun artisan dans cette catégorie pour le moment.</p>
          )}
        </div>

        {/* Modal */}
        {selectedArtisan && (
          <div
            className="modal show d-block"
            tabIndex="-1"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          >
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">{selectedArtisan.name}</h4>
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
                        src={getCategoryImage(category.id)}
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
                      <h5>Contacter l'artisan</h5>
                      <ContactForm artisan={selectedArtisan} onClose={() => setSelectedArtisan(null)} />
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
  );
}

export default ListeArtisansCategorie;