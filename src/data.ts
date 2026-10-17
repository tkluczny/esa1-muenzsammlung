import type { Muenze } from './types';

// Meine Münzsammlung – Werte in Euro sind grobe Schätzwerte
export const muenzen: Muenze[] = [
  { id: 1, bezeichnung: '10 Schilling', land: 'Österreich', jahr: 1958, metall: 'Silber', sammlerwert: 10 },
  { id: 2, bezeichnung: '5 Schilling', land: 'Österreich', jahr: 1961, metall: 'Silber', sammlerwert: 7 },
  { id: 3, bezeichnung: '25 Schilling', land: 'Österreich', jahr: 1965, metall: 'Silber', sammlerwert: 30, anlass: '150 Jahre Technische Hochschule Wien' },
  { id: 4, bezeichnung: '10 Schilling', land: 'Österreich', jahr: 1995, metall: 'Kupfer-Nickel', sammlerwert: 1 },
  { id: 5, bezeichnung: '5 Schilling', land: 'Österreich', jahr: 1990, metall: 'Kupfer-Nickel', sammlerwert: 1 },
  { id: 6, bezeichnung: '1 Schilling', land: 'Österreich', jahr: 1975, metall: 'Bronze', sammlerwert: 0.5 },
  { id: 7, bezeichnung: '10 Groschen', land: 'Österreich', jahr: 1985, metall: 'Aluminium', sammlerwert: 0.2 },
  { id: 8, bezeichnung: 'Gedenkmünze', land: 'Bulgarien', jahr: 1992, metall: 'Silber', sammlerwert: 35, anlass: 'XVI. Olympische Winterspiele' },
];