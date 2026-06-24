// ============================================================================
// HISTORICAL STATIC DATA — fallback used when the D1 database is unavailable.
// The source of truth is the D1 database (see src/lib/db/schema.ts and seed.sql).
// generate-seed.mjs builds the floors/units seed from this file.
// ============================================================================

export type UnitStatus = 'available' | 'reserved' | 'sold';

export const UnitStatusString: Record<UnitStatus, string> = {
    available: 'Disponible',
    reserved: 'Separado',
    sold: 'Vendido'
}

export interface Unit {
  id: string;        // e.g. "410"
  identifier?: string; // e.g. "410"
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
  photosFurnished?: string[];
  photosUnfurnished?: string[];
  photosPlans?: string[];
  photosBalcony?: string[];
  gallery?: string[];
}

import { getAssetUrl } from '../utils/assets';

const floor1 = getAssetUrl('plants/floor_1.png');
const floor2 = getAssetUrl('plants/floor_2.png');
const floor3 = getAssetUrl('plants/floor_3.png');
const floor4 = getAssetUrl('plants/floor_4.png');
const floor5 = getAssetUrl('plants/floor_5.png');

export interface Floor {
  id: string;
  name: string;
  floorPlanImage: string;
  units: Unit[];
}

// ============================================================================
// Residencial Océano Atlántico — 5 floors, 10 units.
// Bedrooms / bathrooms / area (m²) provided by the client.
// NOTE: units 301/401 mirror the 201 stack and 302/402 mirror the 202 stack
// (the client left those rows blank; stacked lines share the same layout).
// Prices are TBD (0) and unit polygons (path/x/y) are pending the floor plans.
// ============================================================================
export const floorsData: Floor[] = [
  {
    id: "1",
    name: "1",
    floorPlanImage: floor1,
    units: [
      { id: "101", floorId: "1", price: 0, dimensions: 108.42, bedrooms: 1, bathrooms: 2.5, status: 'available', subtitle: 'Flat' },
      { id: "102", floorId: "1", price: 0, dimensions: 80.11, bedrooms: 1, bathrooms: 1.5, status: 'available', subtitle: 'Flat' },
    ]
  },
  {
    id: "2",
    name: "2",
    floorPlanImage: floor2,
    units: [
      { id: "201", floorId: "2", price: 0, dimensions: 122.82, bedrooms: 2, bathrooms: 2.5, status: 'available', subtitle: 'Flat' },
      { id: "202", floorId: "2", price: 0, dimensions: 134.03, bedrooms: 2, bathrooms: 2.5, status: 'available', subtitle: 'Flat' },
    ]
  },
  {
    id: "3",
    name: "3",
    floorPlanImage: floor3,
    units: [
      { id: "301", floorId: "3", price: 0, dimensions: 122.82, bedrooms: 2, bathrooms: 2.5, status: 'available', subtitle: 'Flat' },
      { id: "302", floorId: "3", price: 0, dimensions: 134.03, bedrooms: 2, bathrooms: 2.5, status: 'available', subtitle: 'Flat' },
    ]
  },
  {
    id: "4",
    name: "4",
    floorPlanImage: floor4,
    units: [
      { id: "401", floorId: "4", price: 0, dimensions: 122.82, bedrooms: 2, bathrooms: 2.5, status: 'available', subtitle: 'Flat' },
      { id: "402", floorId: "4", price: 0, dimensions: 134.03, bedrooms: 2, bathrooms: 2.5, status: 'available', subtitle: 'Flat' },
    ]
  },
  {
    id: "5",
    name: "5",
    floorPlanImage: floor5,
    units: [
      { id: "501", floorId: "5", price: 0, dimensions: 250.95, bedrooms: 3, bathrooms: 2, status: 'available', subtitle: 'Dúplex' },
      { id: "502", floorId: "5", price: 0, dimensions: 267.89, bedrooms: 2, bathrooms: 2, status: 'available', subtitle: 'Dúplex' },
    ]
  }
];

// The floor shown by default when "entering" the building (its top apartment
// floor). Used by the entry transition and preloaders so the building's floor
// count isn't hardcoded. Falls back to the static data when the live (DB) list
// is empty.
export function getEntryFloorId(floors?: Floor[]): string {
  const list = floors && floors.length > 0 ? floors : floorsData;
  const apartments = list.filter(f => f.id.toLowerCase() !== 'pb');
  const pool = apartments.length > 0 ? apartments : list;
  if (pool.length === 0) return '1';
  return [...pool].sort((a, b) => (parseInt(b.name) || 0) - (parseInt(a.name) || 0))[0].id;
}
