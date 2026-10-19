import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const PAGE_BATIMENT = '/categorie/batiment';
const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

const premierBoutonInfos = (page) =>
  page.getByRole('button', { name: /Voir les infos/i }).first();

const champContact = (modale, nom) =>
  modale.getByRole('textbox', { name: nom, exact: true });

// Analyse WCAG commune à toutes les pages
async function verifierWcag(page) {
  const resultats = await new AxeBuilder({ page })
    .withTags(WCAG_TAGS)
    .analyze();

  const erreurs = resultats.violations.map((violation) => ({
    regle: violation.id,
    gravite: violation.impact,
    description: violation.help,
    elements: violation.nodes.map((node) => ({
      cible: node.target,
      probleme: node.failureSummary,
    })),
  }));

  expect(erreurs, JSON.stringify(erreurs, null, 2)).toEqual([]);
}

// Ouvrir la première fiche artisan de la catégorie Bâtiment
async function ouvrirFiche(page) {
  await page.goto(PAGE_BATIMENT);

  const bouton = premierBoutonInfos(page);
  await expect(bouton).toBeVisible();
  await bouton.click();

  const modale = page.getByRole('dialog');
  await expect(modale).toBeVisible();

  return { bouton, modale };
}

// Vérifier les métadonnées des pages non indexables
async function verifierNoindex(page, titre) {
  await expect(page).toHaveTitle(`${titre} | Trouve ton artisan`);

  await expect(
    page.locator('meta[name="robots"]')
  ).toHaveAttribute('content', 'noindex, follow');
}

// 1. Page d'accueil
test('Accessibilité WCAG 2.1 - Page accueil', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', {
      name: /Comment trouver mon artisan/i,
    })
  ).toBeVisible();

  await expect(
    page.locator('header').getByRole('link', {
      name: 'Bâtiment',
      exact: true,
    })
  ).toBeVisible();

  await expect(
    page.locator('header').getByRole('alert')
  ).toHaveCount(0);

  await verifierWcag(page);
});

// 2 à 5. Les quatre catégories
const categories = [
  { nom: 'Catégorie Bâtiment', slug: 'batiment', artisan: 'Orville Salmons' },
  { nom: 'Alimentation', slug: 'alimentation' },
  { nom: 'Fabrication', slug: 'fabrication' },
  { nom: 'Services', slug: 'services' },
];

for (const { nom, slug, artisan } of categories) {
  test(`Accessibilité WCAG 2.1 - ${nom}`, async ({ page }) => {
    await page.goto(`/categorie/${slug}`);

    if (artisan) {
      await expect(page.getByText(artisan)).toBeVisible();
    } else {
      await expect(premierBoutonInfos(page)).toBeVisible();
    }

    await verifierWcag(page);
  });
}

// 6. Accessibilité de la fiche artisan
test('Accessibilité WCAG 2.1 - Fiche artisan', async ({ page }) => {
  const { modale } = await ouvrirFiche(page);

  await verifierWcag(page);

  await page.keyboard.press('Escape');
  await expect(modale).not.toBeVisible();
});

// 7. Gestion du focus à l'ouverture et à la fermeture
test('Navigation clavier - Gestion du focus de la fiche artisan', async ({ page }) => {
  await page.goto(PAGE_BATIMENT);

  const bouton = premierBoutonInfos(page);
  await expect(bouton).toBeVisible();

  await bouton.focus();
  await page.keyboard.press('Enter');

  const modale = page.getByRole('dialog');
  await expect(modale).toBeVisible();

  await expect.poll(async () =>
    modale.evaluate((element) =>
      element.contains(document.activeElement)
    )
  ).toBe(true);

  await page.keyboard.press('Escape');

  await expect(modale).not.toBeVisible();
  await expect(bouton).toBeFocused();
});

// 8. Maintien du focus dans la modale
test('Navigation clavier - Le focus reste dans la modale', async ({ page }) => {
  const { modale } = await ouvrirFiche(page);

  for (const touche of ['Tab', 'Shift+Tab']) {
    for (let i = 0; i < 12; i++) {
      await page.keyboard.press(touche);

      const focusDansModale = await modale.evaluate(
        (element) => element.contains(document.activeElement)
      );

      expect(
        focusDansModale,
        `Le focus sort de la modale avec ${touche}`
      ).toBe(true);
    }
  }
});

// 9. Validation et réinitialisation du formulaire
test('Formulaire de contact - Validation et réinitialisation', async ({ page }) => {
  const { bouton, modale } = await ouvrirFiche(page);
  const formulaire = modale.locator('form');

  await expect(formulaire).toBeVisible();

  const champs = ['Nom', 'E-mail', 'Objet', 'Message'];

  // Étiquettes accessibles et champs obligatoires
  for (const nom of champs) {
    const champ = champContact(modale, nom);

    await expect(champ).toBeVisible();
    await expect(champ).toHaveAttribute('required', '');
    await expect(champ).toHaveValue('');
  }

  const formulaireValide = () =>
    formulaire.evaluate((element) => element.checkValidity());

  // Formulaire vide
  expect(await formulaireValide()).toBe(false);

  // Saisie des données
  const valeurs = {
    Nom: 'Jean Dupont',
    'E-mail': 'email-invalide',
    Objet: 'Demande de devis',
    Message: 'Bonjour, je souhaite obtenir un devis.',
  };

  for (const [nom, valeur] of Object.entries(valeurs)) {
    await champContact(modale, nom).fill(valeur);
  }

  // Adresse e-mail invalide
  expect(await formulaireValide()).toBe(false);

  // Adresse e-mail valide
  await champContact(modale, 'E-mail').fill('jean@example.com');
  expect(await formulaireValide()).toBe(true);

  // Fermeture et réouverture
  await page.keyboard.press('Escape');
  await expect(modale).not.toBeVisible();

  await bouton.click();

  const nouvelleModale = page.getByRole('dialog');
  await expect(nouvelleModale).toBeVisible();

  // Réinitialisation des quatre champs
  for (const nom of champs) {
    await expect(champContact(nouvelleModale, nom)).toHaveValue('');
  }
});

// 10 à 13. Pages d'informations légales
const pagesLegales = [
  { chemin: '/mentions-legales', titre: 'Mentions légales' },
  { chemin: '/donnees-personnelles', titre: 'Données personnelles' },
  { chemin: '/accessibilite', titre: 'Accessibilité' },
  { chemin: '/cookies', titre: 'Cookies' },
];

for (const { chemin, titre } of pagesLegales) {
  test(`Accessibilité WCAG 2.1 - ${titre}`, async ({ page }) => {
    await page.goto(chemin);

    await expect(
      page.getByRole('heading', { level: 1, name: titre })
    ).toBeVisible();

    await expect(
      page.getByText('Page en construction.')
    ).toBeVisible();

    await verifierNoindex(page, titre);

    await expect(
      page.locator('header').getByRole('link', {
        name: 'Bâtiment',
        exact: true,
      })
    ).toBeVisible();

    await verifierWcag(page);
  });
}

// 14. Page 404
test('Accessibilité WCAG 2.1 - Page 404', async ({ page }) => {
  await page.goto('/page-qui-nexiste-pas');

  await expect(page.locator('main h1')).toBeVisible();

  await verifierNoindex(page, 'Page non trouvée');

  await verifierWcag(page);
});
