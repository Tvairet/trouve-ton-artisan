
import { Link, useLocation } from 'react-router-dom';

export default function Page404() {
  const { pathname } = useLocation();

  return (
    <div className="page-404">
      <section
        className="tth-hero d-flex align-items-end"
        aria-labelledby="page-404-title"
      >
        <div className="container">
          <h1 id="page-404-title" className="hero-title">
            Page non trouvée
          </h1>
        </div>
      </section>

      <section
        className="container my-5"
        aria-label="Informations sur la page non trouvée"
      >
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <div className="text-center py-4">
              <p className="lead mb-1">
                La page que vous avez demandée n’est pas accessible ou n’existe pas.
              </p>

              <p className="text-muted mb-3">
                Chemin demandé : <code>{pathname}</code>
              </p>

              <Link to="/" className="btn btn-primary">
                ← Retour à l’accueil
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
