# QUICK START — Living Library Walkthrough op GitHub Pages

## 🚀 In 5 minuten live

### Stap 1: Repository aanmaken
Ga naar **github.com** → **+** → **New repository**
- Naam: `living-library-walkthrough`
- Public
- Klaar

### Stap 2: Bestanden toevoegen
Clone de repo:
```bash
git clone https://github.com/[jouw-user]/living-library-walkthrough.git
cd living-library-walkthrough
```

Download van dit project:
- `index.html` → plaats in de map
- `README.md` → plaats in de map
- `.gitignore` → plaats in de map

### Stap 3: Push naar GitHub
```bash
git add .
git commit -m "init: living library"
git push origin main
```

### Stap 4: Pages aanzetten
1. Open je repo op **github.com**
2. **Settings** (tandwiel rechtsboven)
3. **Pages** (linkerkant)
4. **Source**: selecteer `main` branch
5. **Save**

### ✅ Klaar!
Site is live op: `https://[jouw-user].github.io/living-library-walkthrough`

---

## 🔧 Lokaal testen

```bash
# Gewoon openen in browser
open index.html

# Of met server (Python 3)
python -m http.server 8000
# Bezoek: http://localhost:8000
```

---

## 📝 Content aanpassen

Alle inhoud zit in **index.html** in duidelijke secties:
```html
<!-- ============ 01 PROBLEEM ============ -->
<!-- ============ 02 SPIRAAL ============ -->
<!-- etc. -->
```

Bewerk tekst, voeg actoren toe, pas kleuren aan — alles staat in Comments.

---

## 🎨 Kleuren aanpassen

Bovenkant van `<style>` block in index.html:
```css
:root {
  --paper:#FBFAF6;        /* wit/room */
  --oranje:#D4541F;       /* accent */
  --oogst:#0F6E56;        /* teal */
  --eco:#534AB7;          /* paars */
  --weer:#993556;         /* roze */
}
```

---

## 📱 Responsive

Werkt op desktop, tablet en mobiel.  
Animaties respecteren `prefers-reduced-motion`.

---

## 🆚 Updates pushen

Na aanpassingen lokaal:
```bash
git add index.html    # (of welk bestand je aanpaste)
git commit -m "update: [beschrijving]"
git push origin main
```

Live update in ~1–2 minuten.

---

## 🤝 Voor het team

**Deel deze link:**  
`https://[jouw-user].github.io/living-library-walkthrough`

Iedereen kan de walkthrough bekijken — geen login nodig.

---

## ❓ Problemen?

- **Pagina niet zichtbaar**: Wacht 2 minuten na push
- **Fonts zien er raar uit**: Zorg dat JavaScript enabled is
- **Interactive elementen werken niet**: Hard refresh (Cmd+Shift+R / Ctrl+Shift+R)

---

**Questions? Check README.md voor volledige docs.**
