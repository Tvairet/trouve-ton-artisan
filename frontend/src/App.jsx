import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Page404 from './pages/Page404';
import ListeArtisansCategorie from './pages/ListeArtisansCategorie';
import './styles/components/header.scss';
import './styles/components/footer.scss';

// Noms des catégories utilisés pour les métadonnées SEO.
const categoryNames = {
  alimentation: 'alimentation',
  batiment: 'bâtiment',
  fabrication: 'fabrication',
  services: 'services',
};

const legalPages = {
  '/mentions-legales': 'Mentions légales',
  '/donnees-personnelles': 'Données personnelles',
  '/accessibilite': 'Accessibilité',
  '/cookies': 'Cookies',
};

// Met à jour les métadonnées lors des changements de page.
function SeoMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const path =
      pathname === '/' ? '/' : pathname.replace(/\/+$/, '');

    const slug = path.startsWith('/categorie/')
      ? path.slice('/categorie/'.length)
      : null;

    const categoryName = slug ? categoryNames[slug] : null;
    const legalTitle = legalPages[path];

    let title = 'Page non trouvée | Trouve ton artisan';
    let description =
      'La page demandée est introuvable sur Trouve ton artisan.';
    let indexable = false;

    if (path === '/') {
      title = 'Trouve ton artisan | Auvergne-Rhône-Alpes';
      description =
        'Trouvez un artisan en Auvergne-Rhône-Alpes. Consultez les professionnels par catégorie et contactez facilement un artisan.';
      indexable = true;
    } else if (categoryName) {
      title = `Artisans de ${categoryName} | Trouve ton artisan`;
      description =
        `Découvrez les artisans de ${categoryName} en Auvergne-Rhône-Alpes. Consultez leurs profils, leurs spécialités et leurs coordonnées.`;
      indexable = true;
    } else if (legalTitle) {
      title = `${legalTitle} | Trouve ton artisan`;
      description = `${legalTitle} : page en construction.`;
    }

    // Titre affiché dans l'onglet du navigateur.
    document.title = title;

    // Description de la page.
    const descriptionTag = document.querySelector(
      'meta[name="description"]'
    );

    if (descriptionTag) {
      descriptionTag.setAttribute('content', description);
    }

    // Consignes d'indexation.
    let robotsTag = document.querySelector(
      'meta[name="robots"]'
    );

    if (!robotsTag) {
      robotsTag = document.createElement('meta');
      robotsTag.setAttribute('name', 'robots');
      document.head.appendChild(robotsTag);
    }

    robotsTag.setAttribute(
      'content',
      indexable ? 'index, follow' : 'noindex, follow'
    );
  }, [pathname]);

  return null;
}

function PageEnConstruction({ titre }) {
  return (
    <section
      className="container py-5 text-center"
      aria-labelledby="construction-title"
    >
      <h1 id="construction-title">{titre}</h1>
      <p>Page en construction.</p>
    </section>
  );
}

function App() {
  return (
    <BrowserRouter>
      <SeoMeta />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/categorie/:slug"
            element={<ListeArtisansCategorie />}
          />
          <Route
            path="/mentions-legales"
            element={<PageEnConstruction titre="Mentions légales" />}
          />
          <Route
            path="/donnees-personnelles"
            element={<PageEnConstruction titre="Données personnelles" />}
          />
          <Route
            path="/accessibilite"
            element={<PageEnConstruction titre="Accessibilité" />}
          />
          <Route
            path="/cookies"
            element={<PageEnConstruction titre="Cookies" />}
          />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
