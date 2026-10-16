
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

              <div className="mb-3" aria-hidden="true">
                <svg
                  width="160"
                  height="125"
                  viewBox="0 0 160 125"
                  xmlns="http://www.w3.org/2000/svg"
                  focusable="false"
                >
                  {/* Document */}
                  <rect
                    x="27" y="12" width="88" height="92" rx="10"
                    fill="#ffffff"
                    stroke="#00497c"
                    strokeWidth="3"
                  />
                  {/* Lignes du document */}
                  <path
                    d="M42 34h43 M42 44h30"
                    stroke="#384050"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  {/* Numéro d'erreur */}
                  <text
                    x="71" y="78"
                    textAnchor="middle"
                    fontSize="30"
                    fontWeight="700"
                    fill="#0074c7"
                  >
                    404
                  </text>
                  {/* Loupe */}
                  <circle
                    cx="109" cy="80" r="22"
                    fill="#f1f8fc"
                    stroke="#0074c7"
                    strokeWidth="4"
                  />
                  <path
                    d="M125 97l19 19"
                    stroke="#0074c7"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M102 73l14 14 M116 73l-14 14"
                    stroke="#00497c"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
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
