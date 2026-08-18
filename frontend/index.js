import { createRoot } from 'react-dom/client';

// Effacez le contenu HTML existant
document.body.innerHTML = '<div id="app"></div>';

// Affichez plutôt votre composant React
const root = createRoot(document.getElementById('app'));
root.render(<h1>Bonjour tout le monde</h1>);
