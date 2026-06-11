# De Living Library — Interactieve Conceptwalkthrough

Een visuele, klikbare walkthrough van de Living Library — een kennisecosysteem voor het Nederlandse onderwijs gebaseerd op SECI, knowledge commons, Legitieme Perifere Participatie en de karpathy-wiki gedachte.

## Live Demo

GitHub Pages gehost op: `https://[je-gebruikersnaam].github.io/living-library-walkthrough`

## Wat zit erin

- **5 hoofdstukken**: Van probleem (vijf knelpunten) via spiraal en architectuur naar de synthese
- **SECI-stepper**: Interactief doorklikken door de vier kennisfasen met Ba-ruimtes en nudges
- **Drie pijlers**: Oogst, Ecosysteem, Weergave — elk met theoretisch fundament
- **Legitieme Perifiere Participatie**: De vijf treden van consument naar kern
- **Zeven actoren**: Met voor elk de balans tussen brengen, nudge en halen
- **Knelpuntensynthese**: Hoe SECI, Ostrom, LPP en karpathy-wiki samen alle vijf dimensies aanpakken

## GitHub Pages in 5 minuten

### 1. Maak een nieuwe repository

```bash
# Ga naar github.com → "+" → "New repository"
# Naam: living-library-walkthrough
# Beschrijving: Een interactieve conceptwalkthrough van de Living Library
# Public repository
# Geen templates of README nodig — je voegt die nu toe
```

### 2. Clone de repo lokaal

```bash
git clone https://github.com/[je-gebruikersnaam]/living-library-walkthrough.git
cd living-library-walkthrough
```

### 3. Plaats de bestanden

Download deze drie bestanden van dit project en zet ze in de repo:

- `index.html` — de volledige walkthrough
- `README.md` — deze instructies
- `.gitignore` (optioneel):
  ```
  .DS_Store
  *.log
  node_modules/
  ```

### 4. Push naar GitHub

```bash
git add .
git commit -m "init: living library walkthrough"
git push origin main
```

### 5. Zet GitHub Pages aan

- Ga naar je repository op github.com
- Klik op **Settings** (rechts, tandwielpictogram)
- Scroll naar **Pages** (linksnavigatie)
- Kies onder "Source": **main** (of **master**) branch
- Klik **Save**

**Klaar.** Je site is nu live op `https://[je-gebruikersnaam].github.io/living-library-walkthrough`

## Lokaal testen (optioneel)

Geen build-stap nodig — het is puur HTML, CSS en JavaScript. Gewoon openen in een browser:

```bash
open index.html
```

Of met een lokale server (Python):

```bash
# Python 3
python -m http.server 8000

# Bezoek: http://localhost:8000
```

## Inhoudelijk

### Struktuur per hoofdstuk

| # | Titel | Focus | Interactie |
|---|-------|-------|-----------|
| 01 | Het probleem | Vijf knelpunten (kwaliteit, kwantiteit, vorm, plaats, tijd) | Scroll-reveal met fade-in |
| 02 | De spiraal | SECI-model met Ba-ruimtes per fase | Klikbare tabs, dynamische content |
| 03 | De architectuur | Drie pijlers + gedeelde dataset | Kaartweergave met theoretisch fundament |
| 04 | De mensen | LPP-gradiënt (5 treden) + 7 actoren | Uitklapbare details per actor |
| 05 | De synthese | Vijf sloten, één sleutelbos | Knelpunt-oplosingsparen met tags |

### Concepten onderweg

- **SECI** (Nonaka & Takeuchi): Socialisatie → Externalisatie → Combinatie → Internalisatie
- **Ba**: Originating · Dialoguing · Systemizing · Exercising
- **Ostrom**: Commons-principes voor governance
- **LPP** (Lave & Wenger): Participatiegradiënt van periferie naar kern
- **karpathy-wiki**: Gegenereerde, niet geschreven kennis — één dataset, vele lenzen
- **DFK**: Digital Fragmented Knowledge
- **Lappendeken**: Vermaak's metafoor voor Nederlandseverandering

### Kleurenschema

- Oogst: teal (`#0F6E56`)
- Ecosysteem: paars (`#534AB7`)
- Weergave: roze (`#993556`)
- Knelpunten: oranje/bruin (`#993C1D`)
- Accent: diep oranje (`#D4541F`)

## Aanpassingen / Onderhoud

### Inhoud veranderen

Open `index.html` in een editor. Alles is goed gelabeld met HTML-comments:
```html
<!-- ============ 01 PROBLEEM ============ -->
```

### Fonts of kleuren aanpassen

Bovenkant van `<style>` blok:
```css
:root{
  --paper:#FBFAF6;     /* achtergrond */
  --ink:#22211D;       /* tekst */
  --oranje:#D4541F;    /* accent */
  /* etc. */
}
```

### SECI-fasen uitbreiden

```javascript
const FASEN=[
 {ba:"...", ll:"...", actor:"...", nudge:"..."},
 // voeg hier toe
];
```

### Actoren toevoegen/verwijderen

In de HTML, zoek:
```html
<details class="actor">
  <summary>Naam <span class="kant">instelling/Npuls</span></summary>
  <div class="abody">
    <div><b>Brengt</b>...</div>
    ...
  </div>
</details>
```

Dupliceer en wijzig naar behoefte.

## Browser-ondersteuning

- Chrome/Edge/Firefox/Safari (modern)
- Mobile-first responsive design
- Respects `prefers-reduced-motion` media query (animaties uitgeschakeld als gebruiker dat wilt)

## Deploy-updates

Eenmalig: na het eerste opzetten, update je gewoon via git:

```bash
# Bewerk index.html lokaal
git add index.html
git commit -m "update: hoofdstuk 3 tekst aangepast"
git push origin main
```

Website is vernieuwd zodra push klaar is (~1–2 minuten).

## Licentie

© 2026 Rogier — Npuls. 
CC BY-NC-SA 4.0 (voor educatief gebruik, niet commercieel)

## Vragen of feedback

- Issue aanmaken op de repo
- Of direct een PullRequest indienen

---

**Veel succes met de walkthrough!**
