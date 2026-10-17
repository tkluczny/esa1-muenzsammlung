// Einstiegspunkt der Anwendung
import './style.css';
import { muenzen } from './data';
import type { Muenze } from './types';

// Liste aus dem HTML holen, in die die Münzkarten eingefügt werden
const liste = document.querySelector<HTMLUListElement>('#muenz-liste');

// Formatiert einen Betrag als Euro, z. B. 12 → "12,00 €"
function formatiereEuro(betrag: number): string {
  return betrag.toLocaleString('de-AT', { style: 'currency', currency: 'EUR' });
}

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
  if (!liste) return; // Null-Prüfung: Element nicht gefunden → abbrechen

  const karten: HTMLLIElement[] = daten.map((muenze) => erstelleKarte(muenze));
  liste.replaceChildren(...karten);
}

// Beim Laden der Seite alle Münzen anzeigen
zeigeMuenzen(muenzen);