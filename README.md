# Meine Münzsammlung

Statische Webseite zu meiner persönlichen Münzsammlung – Einsendeaufgabe 1 im Kurs
**Front-End Development (SED502)** an der Ferdinand Porsche FernFH.

## Was die Webseite zeigt

- Eine kurze Vorstellung der Sammlung mit dem Foto einer eigenen Münze
- Eine Übersicht meiner Münzen als Karten mit Bezeichnung, Jahr, Land, Metall,
  geschätztem Sammlerwert und gegebenenfalls dem Anlass der Prägung
- Eine **Live-Suche** nach Bezeichnung, Land, Jahr oder Anlass
- **Filter-Buttons** nach Metall (Silber, Kupfer-Nickel, Aluminium, Bronze)
- Eine **Statistik** mit Anzahl, Gesamtwert und ältester Münze, die sich bei jeder
  Suche und jedem Filter automatisch aktualisiert

## Technische Entscheidungen

### Projekt-Setup

- **Vite** mit dem Template `vanilla-ts`: schneller Entwicklungsserver und ein Build,
  der vor dem Bündeln mit `tsc` die Typen prüft
- Bewusst **kein Framework**, um die Grundlagen aus Modul 01 und 02 direkt anzuwenden

### Semantisches HTML und Barrierefreiheit

- Seitenstruktur ausschließlich mit semantischen Elementen: `header`, `nav`, `main`,
  `section`, `article`, `aside`, `figure`/`figcaption` und `footer`
- `aria-label="Hauptnavigation"` an der Navigation, `aria-labelledby` verknüpft jeden
  Abschnitt mit seiner Überschrift
- Suchfeld mit `<label>`, Filter-Buttons in `<fieldset>` mit `<legend>`
- `aria-pressed` zeigt Screenreadern den aktiven Filter an; dasselbe Attribut steuert
  per CSS auch die sichtbare Hervorhebung
- `aria-live="polite"` sorgt dafür, dass die Trefferanzahl vorgelesen wird
- `lang="de"`, aussagekräftiger `alt`-Text, logische Überschriftenhierarchie (h1–h3),
  sichtbarer Fokus-Rahmen und Rücksicht auf `prefers-reduced-motion`
- **Lighthouse Accessibility-Score: 100** (siehe `lighthouse.png`)

### TypeScript

- `src/types.ts`: Union Type `Metall` und Interface `Muenze` (mit optionalem Feld
  `anlass`) – Tippfehler bei Metallangaben werden schon beim Schreiben erkannt
- `src/data.ts`: Münzdaten getrennt von der Programmlogik
- `src/main.ts`: typisierte Funktionen mit klarer Aufgabe, unter anderem
  - `filtereMuenzen()` – Suche und Metallfilter mit `filter`
  - `berechneGesamtwert()` und `findeAeltesteMuenze()` – Statistik mit `reduce`
  - `zeigeMuenzen()` – erzeugt die Karten mit `map`
- Eine zentrale Funktion `aktualisiereAnsicht()` rendert die Liste bei jeder Änderung
  neu aus dem Daten-Array
- **Event Delegation**: ein einziger Listener auf dem `fieldset` für alle Filter-Buttons
- `textContent` statt `innerHTML`, um das Einschleusen von HTML zu vermeiden
- Null-Prüfungen bei allen DOM-Zugriffen

### Styling

- CSS-Variablen für ein einheitliches Farbschema mit hohem Kontrast
- Responsives Layout mit CSS Grid: ab 900 px Sammlung und Statistik nebeneinander,
  die Münzkarten ordnen sich automatisch in passende Spalten

## Projektstruktur
├── index.html Semantisches Seitengerüst
├── public/bilder/ Eigenes Münzfoto
├── src/
│ ├── types.ts Typen und Interface
│ ├── data.ts Münzdaten
│ ├── main.ts Logik, Rendering und Event-Handling
│ └── style.css Styling
├── lighthouse.png Ergebnis des Accessibility-Audits
└── reflexion.pdf Reflexionsbericht

## Lokal starten

```bash
npm install
npm run dev      # Entwicklungsserver unter http://localhost:5173
npm run build    # Typprüfung und Produktions-Build
```

## Bildnachweis

Münzfoto: eigene Aufnahme.