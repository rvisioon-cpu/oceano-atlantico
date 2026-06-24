export interface Tour {
  id: string;
  title: string;
  subtitle: string;
  thumbnail: string;
  type: 'unit' | 'building';
  target: string;
  floorName?: string;
}

// Example Building Tour Target
const buildingTarget= 'https://kuula.co/share/collection/7HQY1?logo=1&card=1&info=0&logosize=175&fs=1&vr=1&zoom=1&initload=0&thumbs=3&alpha=0.91&inst=es';

export const tours: Tour[] = [
  {
    id: 'building-main',
    title: 'Edificio Principal',
    subtitle: 'Showroom Virtual',
    thumbnail: '/plants/details/face_0_daylight.png',
    type: 'building',
    target: buildingTarget
  },
  {
    id: 't1-101',
    title: 'Flat 101',
    subtitle: '1 Hab. | 2.5 Baños | 108.42m²',
    thumbnail: '/plants/details/101/plans.jpg',
    type: 'unit',
    target: buildingTarget,
    floorName: 'Piso 1'
  },
  {
    id: 't2-102',
    title: 'Flat 102',
    subtitle: '1 Hab. | 1.5 Baños | 80.11m²',
    thumbnail: '/plants/details/101/plans.jpg',
    type: 'unit',
    target: buildingTarget,
    floorName: 'Piso 1'
  },
  {
    id: 't3-201',
    title: 'Flat 201',
    subtitle: '2 Hab. | 2.5 Baños | 122.82m²',
    thumbnail: '/plants/details/101/plans.jpg',
    type: 'unit',
    target: buildingTarget,
    floorName: 'Piso 2'
  },
  {
    id: 't4-202',
    title: 'Flat 202',
    subtitle: '2 Hab. | 2.5 Baños | 134.03m²',
    thumbnail: '/plants/details/101/plans.jpg',
    type: 'unit',
    target: buildingTarget,
    floorName: 'Piso 2'
  },
  {
    id: 't5-501',
    title: 'Dúplex 501',
    subtitle: '3 Hab. | 2 Baños | 250.95m²',
    thumbnail: '/plants/details/101/plans.jpg',
    type: 'unit',
    target: buildingTarget,
    floorName: 'Piso 5'
  },
  {
    id: 't6-502',
    title: 'Dúplex 502',
    subtitle: '2 Hab. | 2 Baños | 267.89m²',
    thumbnail: '/plants/details/101/plans.jpg',
    type: 'unit',
    target: buildingTarget,
    floorName: 'Piso 5'
  }
];

export const getTours = () => tours;
