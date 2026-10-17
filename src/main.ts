// Einstiegspunkt der Anwendung
import './style.css';
import { muenzen } from './data';
import type { Muenze } from './types';

// ---------- DOM-Elemente ----------
const liste = document.querySelector<HTMLUListElement>('#muenz-liste');
const suchfeld = document.querySelector<HTMLInputElement>('#suche');
const filterGruppe = document.querySelector<HTMLFieldSetElement>('fieldset');
const filterButtons = document.querySelectorAll<HTMLButtonElement>('button[data-metall]');
const ergebnisInfo = document.querySelector<HTMLParagraphElement>('#ergebnis-info');
const statAnzahl = document.querySelector<HTMLElement>('#stat-anzahl');
const statWert = document.querySelector<HTMLElement>('#stat-wert');
const statAelteste = document.querySelector<HTMLElement>('#stat-aelteste');

// ---------- Aktueller Filterzustand ----------
let suchbegriff = '';
let aktivesMetall = 'alle';

// ---------- Hilfsfunktionen ----------

// Formatiert einen Betrag als Euro, z. B. 12 → "€ 12,00"
function formatiereEuro(betrag: number): string {
  return betrag.toLocaleString('de-AT', { style: 'currency', currency: 'EUR' });
}

// Filtert die Münzen nach Suchbegriff und Metall
function filtereMuenzen(daten: Muenze[], begriff: string, metall: string): Muenze[] {
  const suche = begriff.trim().toLowerCase();

  return daten.filter((muenze) => {
    const passtZumMetall = metall === 'alle' || muenze.metall === metall;
    const text = `${muenze.bezeichnung} ${muenze.land} ${muenze.jahr} ${muenze.anlass ?? ''}`.toLowerCase();
    const passtZurSuche = text.includes(suche);
    return passtZumMetall && passtZurSuche;
  });
}

// Summiert den Sammlerwert aller übergebenen Münzen
function berechneGesamtwert(daten: Muenze[]): number {
  return daten.reduce((summe, muenze) => summe + muenze.sammlerwert, 0);
}

// Liefert die älteste Münze – oder undefined, wenn die Liste leer ist
function findeAeltesteMuenze(daten: Muenze[]): Muenze | undefined {
  if (daten.length === 0) return undefined;
  return daten.reduce((aelteste, muenze) => (muenze.jahr < aelteste.jahr ? muenze : aelteste));
}

// ---------- Anzeige ----------

// Erzeugt für eine Münze ein Listenelement mit einer Karte (article)
function erstelleKarte(muenze: Muenze): HTMLLIElement {
  const li = document.createElement('li');
  const article = document.createElement('article');
  article.className = 'muenz-karte';

  const titel = document.createElement('h3');
  titel.textContent = `${muenze.bezeichnung} (${muenze.jahr})`;

  const details = document.createElement('p');
  details.textContent = `${muenze.land} · ${muenze.metall} · ${formatiereEuro(muenze.sammlerwert)}`;

  const anlass = document.createElement('p');
  anlass.textContent = muenze.anlass ?? 'Umlaufmünze';

  article.append(titel, details, anlass);
  li.append(article);
  return li;
}

// Zeigt die übergebenen Münzen in der Liste an
function zeigeMuenzen(daten: Muenze[]): void {
  if (!liste) return;
  const karten: HTMLLIElement[] = daten.map((muenze) => erstelleKarte(muenze));
  liste.replaceChildren(...karten);
}

// Zeigt an, wie viele Münzen gefunden wurden
function aktualisiereErgebnisInfo(anzahl: number): void {
  if (!ergebnisInfo) return;
  ergebnisInfo.textContent =
    anzahl === 0 ? 'Keine Münzen gefunden.' : `${anzahl} von ${muenzen.length} Münzen`;
}

// Aktualisiert die Statistik im aside-Bereich
function aktualisiereStatistik(daten: Muenze[]): void {
  if (statAnzahl) statAnzahl.textContent = String(daten.length);
  if (statWert) statWert.textContent = formatiereEuro(berechneGesamtwert(daten));
  if (statAelteste) {
    const aelteste = findeAeltesteMuenze(daten);
    statAelteste.textContent = aelteste ? `${aelteste.bezeichnung} (${aelteste.jahr})` : '–';
  }
}

// Zentrale Funktion: filtern und alles neu anzeigen
function aktualisiereAnsicht(): void {
  const gefiltert = filtereMuenzen(muenzen, suchbegriff, aktivesMetall);
  zeigeMuenzen(gefiltert);
  aktualisiereErgebnisInfo(gefiltert.length);
  aktualisiereStatistik(gefiltert);
}

// ---------- Events ----------

// Live-Suche: reagiert auf jede Eingabe im Suchfeld
suchfeld?.addEventListener('input', (event: Event) => {
  const target = event.target as HTMLInputElement;
  suchbegriff = target.value;
  aktualisiereAnsicht();
});

// Event Delegation: ein Listener für alle Filter-Buttons
filterGruppe?.addEventListener('click', (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  const button = target.closest<HTMLButtonElement>('button[data-metall]');
  if (!button) return;

  aktivesMetall = button.dataset.metall ?? 'alle';

  // aria-pressed: nur der geklickte Button ist aktiv
  filterButtons.forEach((b) => b.setAttribute('aria-pressed', String(b === button)));

  aktualisiereAnsicht();
});

// Beim Laden der Seite einmal alles anzeigen
aktualisiereAnsicht();