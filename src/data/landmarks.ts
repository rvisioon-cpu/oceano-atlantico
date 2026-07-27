/**
 * Hitos: the four surroundings that get their own raised marker on the
 * location map, each one with a vertical clip the visitor can open.
 *
 * They are deliberately static. Unlike the POIs — which the dashboard can
 * edit — these four are tied to footage we shot for them, so a row without a
 * matching video would render an empty player.
 *
 * `poiName` is the name of the equivalent point in the POI layer; the map
 * hides it so the place is not pinned twice.
 */
export interface Landmark {
  slug: string;
  name: string;
  category: string;
  coordinates: [number, number]; // [lng, lat]
  poster: string;
  preview: string; // short muted loop shown on hover
  video: string; // full clip with audio, opened from "Ver más"
  poiName?: string;
}

const asset = (slug: string, file: string) => `location/videos/hitos/${slug}/${file}`;

export const landmarks: Landmark[] = [
  {
    slug: 'jockey-plaza',
    name: 'Jockey Plaza',
    category: 'Lifestyle',
    coordinates: [-76.976455, -12.084807],
    poster: asset('jockey-plaza', 'poster.webp'),
    preview: asset('jockey-plaza', 'preview.mp4'),
    video: asset('jockey-plaza', 'full.mp4'),
    poiName: 'Jockey Plaza',
  },
  {
    slug: 'ovalo-monitor',
    name: 'Óvalo Monitor',
    category: 'Conectividad',
    coordinates: [-76.97066, -12.08283],
    poster: asset('ovalo-monitor', 'poster.webp'),
    preview: asset('ovalo-monitor', 'preview.mp4'),
    video: asset('ovalo-monitor', 'full.mp4'),
  },
  {
    slug: 'hipodromo-monterrico',
    name: 'Hipódromo de Monterrico',
    category: 'Áreas verdes y recreación',
    coordinates: [-76.977332, -12.091744],
    poster: asset('hipodromo-monterrico', 'poster.webp'),
    preview: asset('hipodromo-monterrico', 'preview.mp4'),
    video: asset('hipodromo-monterrico', 'full.mp4'),
    poiName: 'Hipódromo de Monterrico',
  },
  {
    slug: 'universidad-de-lima',
    name: 'Universidad de Lima',
    category: 'Educación',
    coordinates: [-76.971007, -12.084466],
    poster: asset('universidad-de-lima', 'poster.webp'),
    preview: asset('universidad-de-lima', 'preview.mp4'),
    video: asset('universidad-de-lima', 'full.mp4'),
    poiName: 'Universidad de Lima',
  },
];

export const landmarkPoiNames = new Set(
  landmarks.map(l => l.poiName).filter(Boolean) as string[]
);
