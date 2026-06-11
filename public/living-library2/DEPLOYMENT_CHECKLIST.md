# Deployment Checklist — Living Library op GitHub Pages

## Bestanden Manifest

Deze vier bestanden liggen in `/mnt/user-data/outputs` klaar:

```
living-library-walkthrough/
├── index.html          (5.2 KB) — volledige walkthrough, alles-in-één
├── README.md           (3.8 KB) — volledige documentatie
├── QUICKSTART.md       (1.4 KB) — snelstart (dit je)
├── .gitignore          (0.6 KB) — Git-negeerlijst
└── (optioneel: LICENSE)
```

**Alles wat je nodig hebt is hierboven genoemd.** Geen build-stap, geen dependencies, geen deploy-tools.

---

## ✅ Pre-Deployment Checklist

- [ ] GitHub account gereed
- [ ] Lokaal: Git geïnstalleerd (`git --version` in terminal)
- [ ] Teksteditor gereed (VS Code, Sublime, etc.)
- [ ] Browser met JavaScript enabled (Chrome, Firefox, Safari, Edge — allemaal OK)

---

## 🚀 Deployment Checklist (Stap-voor-Stap)

### 1️⃣ Repository aanmaken (1 min)
- [ ] Ga naar github.com → **+** → **New repository**
- [ ] Naam: `living-library-walkthrough`
- [ ] Beschrijving (optioneel): "Living Library — een interactieve conceptwalkthrough"
- [ ] **Public**
- [ ] ❌ "Initialize this repository with..." → laat uit
- [ ] Klik **Create repository**

### 2️⃣ Clone lokaal (1 min)
```bash
git clone https://github.com/[jouw-github-user]/living-library-walkthrough.git
cd living-library-walkthrough
```
- [ ] Map verschijnt met `.git` submap

### 3️⃣ Bestanden toevoegen (1 min)
- [ ] **index.html** → kopieer naar de map
- [ ] **README.md** → kopieer naar de map
- [ ] **.gitignore** → kopieer naar de map

Check:
```bash
ls -la
# Zou moeten tonen: index.html, README.md, .gitignore, .git/
```

### 4️⃣ Git commit & push (2 min)
```bash
git add .
git commit -m "init: living library walkthrough"
git push origin main
```
- [ ] Push zonder fouten afgerond
- [ ] Ga naar github.com/[jouw-user]/living-library-walkthrough — bestanden zichtbaar

### 5️⃣ GitHub Pages aanzetten (1 min)
- [ ] Open repo op github.com
- [ ] Rechtsboven: **Settings** (tandwiel)
- [ ] Linksmenu: scroll naar **Pages**
- [ ] Onder "Source":
  - [ ] Branch: **main** (niet master)
  - [ ] Folder: **/ (root)**
- [ ] Klik **Save**

**Wacht ~1–2 minuten.**

### 6️⃣ Controleer live
- [ ] Ga naar: `https://[jouw-github-user].github.io/living-library-walkthrough`
- [ ] Pagina laadt
- [ ] Navigatie werkt (klik op "02 De spiraal", etc.)
- [ ] Interactie werkt (SECI-tabs, actor-details)

---

## 🎯 Wat te verwachten

**Bij stap 5** zie je mogelijk een "Deployments" mededeling.  
**Eerste keer:** ~2 minuten wachten totdat pagina live gaat.  
**Daarna:** Updates via `git push` zijn in ~30 seconden zichtbaar.

---

## 🔍 Als iets niet werkt

| Probleem | Oorzaak | Oplossing |
|----------|---------|-----------|
| Pagina niet gevonden (404) | Pages niet ingeschakeld | Kijk Stap 5 opnieuw; wacht 2 min |
| HTML zichtbaar als tekst | Git branch is `master` niet `main` | Zet Pages source naar `main` branch |
| Fonts zien er raar uit | JavaScript blokkering | Check browser console (F12) op errors |
| Tabs / details werken niet | JavaScript uitgeschakeld | Check browser instellingen |
| Push slaagt niet | SSH-key niet ingesteld | Gebruik HTTPS in plaats van SSH: `git clone https://...` |

---

## 📤 Inhoud later aanpassen

Zodra live:

1. **Bewerk lokaal:**
   ```bash
   # Open index.html in editor
   # Maak wijzigingen
   ```

2. **Commit & push:**
   ```bash
   git add index.html
   git commit -m "update: sectieTitel aangepast"
   git push origin main
   ```

3. **Refresh website:** `https://[user].github.io/living-library-walkthrough`

---

## 🎓 Goede-om-te-weten

- **Geen build-stap:** alles is HTML + CSS + JS in één bestand
- **Offline werkt niet:** de fonts laden van Google Fonts (internet nodig)
- **SEO:** pagina is zichtbaar voor zoekmachines (public repo, geen robots.txt)
- **Https:** automatisch door GitHub
- **Gratis:** GitHub Pages is gratis voor openbare repos

---

## 🚢 Go/No-Go

**Go:** 
- [ ] Alle 4 bestanden in repo
- [ ] Pages Settings correct ingesteld
- [ ] `https://[user].github.io/living-library-walkthrough` toont de pagina
- [ ] Interactie werkt

**No-Go:**
- Pagina laadt maar toont enkel HTML
- Geen interactie werkend
- 404-fout na 5 minuten

→ Check GitHub Pages Settings opnieuw.

---

## ✨ Klaar!

Je walkthrough draait 24/7 op het internet.  
Deel de link met het Npuls-team — geen login nodig, direct bruikbaar.

**URL die je deelt:**  
`https://[jouw-github-user].github.io/living-library-walkthrough`

Hou dit document voor toekomstige updates. Veel sterkte! 🚀
