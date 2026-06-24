export type UnitStatus = 'available' | 'reserved' | 'sold';

export const UnitStatusString: Record<UnitStatus, string> = {
    available: 'Disponible',
    reserved: 'Separado',
    sold: 'Vendido'
}

export interface Unit {
  id: string;        // e.g. "410"
  floorId: string;   // e.g. "4"
  price: number;     // e.g. 1000
  dimensions: number; // m2, e.g. 90
  bedrooms?: number;  // Optional for storage units
  bathrooms?: number; // Optional for storage units
  status: UnitStatus;
  type?: 'apartment' | 'storage'; // To distinguish unit types
  subtitle?: string; // e.g. "Flat", "Duplex", "Bodega"
  description?: string;
  images?: string[];
  tourUrl?: string; // Kuula or other 360 tour URL
  assetId?: string; // Folder name for assets if different from ID (e.g. 'x01')
  x?: number; // Percentage 0-100
  y?: number; // Percentage 0-100
  path?: string; // SVG Path 'd' attribute for irregular shapes (0-100 coordinate space)
}

export interface Floor {
  id: string; 
  name: string; 
  floorPlanImage: string;
  units: Unit[];
}

// NOTE: In the template, we export empty or sample data.
// In a real implementation, you might import specific asset helpers or just use string paths.

export const floorsData: Floor[] = [
  {
    id: "1",
    name: "Piso 1",
    floorPlanImage: "/plants/floor_1.png",
    units: [
      { 
        id: "101", 
        floorId: "1", 
        price: 0, 
        dimensions: 108.42, 
        bedrooms: 1, 
        bathrooms: 2.5, 
        status: 'available', 
        subtitle: 'Flat', 
        x: 0, 
        y: 0, 
        path: "",
        tourUrl: ""
      },
      { 
        id: "102", 
        floorId: "1", 
        price: 0, 
        dimensions: 80.11, 
        bedrooms: 1, 
        bathrooms: 1.5, 
        status: 'available', 
        subtitle: 'Flat', 
        x: 0, 
        y: 0, 
        path: "",
        tourUrl: ""
      }
    ]
  },
  {
    id: "2",
    name: "Piso 2",
    floorPlanImage: "/plants/floor_2.png",
    units: [
      { 
        id: "201", 
        floorId: "2", 
        price: 0, 
        dimensions: 122.82, 
        bedrooms: 2, 
        bathrooms: 2.5, 
        status: 'available', 
        subtitle: 'Flat', 
        x: 0, 
        y: 0, 
        path: "",
        tourUrl: ""
      },
      { 
        id: "202", 
        floorId: "2", 
        price: 0, 
        dimensions: 134.03, 
        bedrooms: 2, 
        bathrooms: 2.5, 
        status: 'available', 
        subtitle: 'Flat', 
        x: 0, 
        y: 0, 
        path: "",
        tourUrl: ""
      }
    ]
  },
  {
    id: "3",
    name: "Piso 3",
    floorPlanImage: "/plants/floor_3.png",
    units: [
      { 
        id: "301", 
        floorId: "3", 
        price: 0, 
        dimensions: 122.82, 
        bedrooms: 2, 
        bathrooms: 2.5, 
        status: 'available', 
        subtitle: 'Flat', 
        x: 0, 
        y: 0, 
        path: "",
        tourUrl: ""
      },
      { 
        id: "302", 
        floorId: "3", 
        price: 0, 
        dimensions: 134.03, 
        bedrooms: 2, 
        bathrooms: 2.5, 
        status: 'available', 
        subtitle: 'Flat', 
        x: 0, 
        y: 0, 
        path: "",
        tourUrl: ""
      }
    ]
  },
  {
    id: "4",
    name: "Piso 4",
    floorPlanImage: "/plants/floor_4.png",
    units: [
      { 
        id: "401", 
        floorId: "4", 
        price: 0, 
        dimensions: 122.82, 
        bedrooms: 2, 
        bathrooms: 2.5, 
        status: 'available', 
        subtitle: 'Flat', 
        x: 0, 
        y: 0, 
        path: "",
        tourUrl: ""
      },
      { 
        id: "402", 
        floorId: "4", 
        price: 0, 
        dimensions: 134.03, 
        bedrooms: 2, 
        bathrooms: 2.5, 
        status: 'available', 
        subtitle: 'Flat', 
        x: 0, 
        y: 0, 
        path: "",
        tourUrl: ""
      }
    ]
  },
  {
    id: "5",
    name: "Piso 5",
    floorPlanImage: "/plants/floor_5.png",
    units: [
      { 
        id: "501", 
        floorId: "5", 
        price: 0, 
        dimensions: 250.95, 
        bedrooms: 3, 
        bathrooms: 2, 
        status: 'available', 
        subtitle: 'Dúplex', 
        x: 0, 
        y: 0, 
        path: "",
        tourUrl: ""
      },
      { 
        id: "502", 
        floorId: "5", 
        price: 0, 
        dimensions: 267.89, 
        bedrooms: 2, 
        bathrooms: 2, 
        status: 'available', 
        subtitle: 'Dúplex', 
        x: 0, 
        y: 0, 
        path: "",
        tourUrl: ""
      }
    ]
  }
];
