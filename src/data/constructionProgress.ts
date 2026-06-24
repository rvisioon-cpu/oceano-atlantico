export interface ProgressUpdate {
  id: string;
  date: string; // e.g. "Mayo 2024"
  title: string;
  description: string;
  mediaType: 'image' | 'video';
  mediaUrl: string;
  thumbnailUrl?: string;
}

export const constructionProgress: ProgressUpdate[] = [
  {
    id: '1',
    date: 'Marzo 2026',
    title: 'Avance de Obra - Marzo',
    description: 'Registro visual de los avances logrados durante el mes de marzo en Thompson Pueblo Libre.',
    mediaType: 'video',
    mediaUrl: 'progress/march_2026.mp4',
  },
  {
    id: '2',
    date: 'Abril 2026',
    title: 'Avance de Obra - Abril',
    description: 'Continuamos con el progreso de la edificación, mostrando los hitos alcanzados en el mes de abril.',
    mediaType: 'video',
    mediaUrl: 'progress/april_2026.mp4',
  }
];
