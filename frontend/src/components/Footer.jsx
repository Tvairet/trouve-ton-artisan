import { Link } from "react-router-dom";


export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer text-white " role="contentinfo">
        <div className="row ">
          <div className="col-12 col-lg-8 text-center">
            

            <address className="mb-0 small ">
              101 cours Charlemagne<br />
              CS 20033<br />
              69269 LYON CEDEX 02<br />
              France
            </address>

            <p className="mb-0">
              <a
                href="tel:+33426734000"
                className=" text-decoration-underline"
                aria-label="Téléphone : +33 4 26 73 40 00"
              >
                +33 (0)4 26 73 40 00
              </a>
            </p>
          </div>
        </div>

      {/* Barre légale bas de footer, centrée */}
      <div className="footer-link">
        <div className="container">
          <ul className="nav justify-content-center small">
            <li className="nav-item">
              <Link className="nav-link px-2 link-light" to="/mentions-legales">
                Mentions légales
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-2 link-light" to="/donnees-personnelles">
                Données personnelles
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-2 link-light" to="/accessibilite">
                Accessibilité
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-2 link-light" to="/cookies">
                Cookies
              </Link>
            </li>
          </ul>

          <p className="text-center small mb-0 opacity-75">© {year} Trouve ton artisan&nbsp;!</p>
        </div>
      </div>
    </footer>
  );
}