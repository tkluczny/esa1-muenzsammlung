// Erlaubte Metalle als Union Type – TypeScript lässt nur diese Werte zu
export type Metall = 'Silber' | 'Gold' | 'Kupfer-Nickel' | 'Aluminium' | 'Bronze';

// Beschreibt die Datenstruktur einer einzelnen Münze
export interface Muenze {
  id: number;
  bezeichnung: string;
  land: string;
  jahr: number;
  metall: Metall;
  sammlerwert: number; // in Euro
  anlass?: string;     // optional – nur bei Gedenkmünzen
}