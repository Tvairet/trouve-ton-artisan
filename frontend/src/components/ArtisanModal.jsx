import { useEffect, useId, useRef, useState } from 'react';
import ArtisanRating from './ArtisanRating';

const categoryImages = {
  1: 'alimentation.jpg',
  2: 'batiment.jpg',
  3: 'fabrication.jpg',
  4: 'services.jpg',
};

export default function ArtisanModal({ artisan, onClose }) {
  const titleId = useId();
  const formId = useId();
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const onCloseRef = useRef(onClose);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const handleClose = () => {setForm({ name: '', email: '', message: '' });
    onClose();
  };

  // La fermeture reste à jour même si le parent recrée sa fonction onClose.
  onCloseRef.current = handleClose;

  useEffect(() => {
    if (!artisan) return undefined;

    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseRef.current();
        return;
      }

      // Le clavier doit rester à l'intérieur de la fenêtre ouverte.
      if (event.key !== 'Tab' || !dialogRef.current) return;

      const elements = Array.from(
        dialogRef.current.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
      if (elements.length === 0) return;

      const first = elements[0];
      const last = elements[elements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus?.();
    };
  }, [artisan]);

  if (!artisan) return null;

  const image = categoryImages[artisan.categoryId];
  const artisanEmail = typeof artisan.email === 'string' ? artisan.email.trim() : '';
  const hasEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(artisanEmail);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!hasEmail) return;

    const subject = `Contact via Trouve ton artisan - ${artisan.name}`;
    const body = [
      form.message,
      '',
      '---',
      `De : ${form.name} <${form.email}>`,
      `Artisan concerné : ${artisan.name}`,
    ].join('\n');

    window.location.href = `mailto:${artisanEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div
      className="modal show d-block"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) handleClose();;
      }}
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
        <div
          ref={dialogRef}
          className="modal-content"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          tabIndex={-1}
        >
          <div className="modal-header">
            <h2 id={titleId} className="modal-title fs-4">{artisan.name}</h2>
            <button
              ref={closeButtonRef}
              type="button"
              className="btn-close"
              aria-label="Fermer la fiche artisan"
              onClick={handleClose}
            />
          </div>

          <div className="modal-body">
            <div className="row g-3">
              <div className="col-md-6">
                {image && (
                  <img
                    src={`/img/${image}`}
                    alt=""
                    className="img-fluid rounded mb-2"
                    style={{
                      width: '100%',
                      height: 'clamp(120px, 18vh, 180px)',
                      objectFit: 'cover',
                      objectPosition: 'center',
                    }}
                  />
                )}
                <div className="mb-3">
                  <ArtisanRating value={artisan.grade} />
                </div>
                <p><strong>Spécialité :</strong> {artisan.speciality || 'Non renseignée'}</p>
                <p><strong>Localisation :</strong> {artisan.city || 'Non renseignée'}</p>
                <p><strong>À propos :</strong> {artisan.about || 'Aucune description disponible.'}</p>
                {artisan.website && (
                  <p>
                    <a href={artisan.website} target="_blank" rel="noopener noreferrer">
                      Site internet de l'artisan
                    </a>
                  </p>
                )}
              </div>

              <div className="col-md-6">
                <h3 className="fs-5">Contacter l'artisan</h3>
                {hasEmail ? (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label" htmlFor={`${formId}-name`}>Nom</label>
                      <input
                        id={`${formId}-name`}
                        className="form-control"
                        name="name"
                        type="text"
                        autoComplete="name"
                        maxLength={100}
                        required
                        value={form.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor={`${formId}-email`}>E-mail</label>
                      <input
                        id={`${formId}-email`}
                        className="form-control"
                        name="email"
                        type="email"
                        autoComplete="email"
                        maxLength={254}
                        required
                        value={form.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor={`${formId}-message`}>Message</label>
                      <textarea
                        id={`${formId}-message`}
                        className="form-control"
                        name="message"
                        rows={4}
                        maxLength={2000}
                        required
                        value={form.message}
                        onChange={handleChange}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                      Préparer l'e-mail
                    </button>
                    <p className="form-text mt-2">
                      Votre logiciel de messagerie s'ouvrira pour envoyer le message.
                      L'envoi ne se fait pas automatiquement depuis le site.
                    </p>
                  </form>
                ) : (
                  <p className="alert alert-info" role="status">
                    Cet artisan ne dispose pas d'adresse e-mail de contact.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
