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

const floorPB2 = getAssetUrl('plants/floor_pb1.png');
const floorPB1 = getAssetUrl('plants/floor_pb.png');
const floor1 = getAssetUrl('plants/floor_1.png');
const floor2 = getAssetUrl('plants/floor_2.png');
const floor3 = getAssetUrl('plants/floor_3.png');
const floor4 = getAssetUrl('plants/floor_4.png');
const floor5 = getAssetUrl('plants/floor_5.png');
const floor6 = getAssetUrl('plants/floor_6.png');

export interface Floor {
  id: string;
  name: string;
  level: number;
  floorPlanImage: string;
  units: Unit[];
}

// ============================================================================
// Residencial Océano Atlántico — 6 floors, 2 basements (PB 1, PB 2).
// Bedrooms / bathrooms / area (m²) provided by the client.
// NOTE: units 301/401 mirror the 201 stack and 302/402 mirror the 202 stack
// (the client left those rows blank; stacked lines share the same layout).
// Prices are TBD (0) and unit polygons (path/x/y) are pending the floor plans.
// ============================================================================
export const floorsData: Floor[] = [
  {
    id: "PB2",
    name: "PB 2",
    level: -2,
    floorPlanImage: floorPB2,
    units: []
  },
  {
    id: "PB1",
    name: "PB 1",
    level: -1,
    floorPlanImage: floorPB1,
    units: []
  },
  {
    id: "1",
    name: "1",
    level: 1,
    floorPlanImage: floor1,
    units: [
      { id: "101", floorId: "1", price: 0, dimensions: 108.42, bedrooms: 1, bathrooms: 2.5, status: 'available', subtitle: 'Flat' },
      { id: "102", floorId: "1", price: 0, dimensions: 80.11, bedrooms: 1, bathrooms: 1.5, status: 'available', subtitle: 'Flat' },
    ]
  },
  {
    id: "2",
    name: "2",
    level: 2,
    floorPlanImage: floor2,
    units: [
      { id: "201", floorId: "2", price: 0, dimensions: 122.82, bedrooms: 2, bathrooms: 2.5, status: 'available', subtitle: 'Flat' },
      { id: "202", floorId: "2", price: 0, dimensions: 134.03, bedrooms: 2, bathrooms: 2.5, status: 'available', subtitle: 'Flat' },
    ]
  },
  {
    id: "3",
    name: "3",
    level: 3,
    floorPlanImage: floor3,
    units: [
      { id: "301", floorId: "3", price: 0, dimensions: 122.82, bedrooms: 2, bathrooms: 2.5, status: 'available', subtitle: 'Flat' },
      { id: "302", floorId: "3", price: 0, dimensions: 134.03, bedrooms: 2, bathrooms: 2.5, status: 'available', subtitle: 'Flat' },
    ]
  },
  {
    id: "4",
    name: "4",
    level: 4,
    floorPlanImage: floor4,
    units: [
      { id: "401", floorId: "4", price: 0, dimensions: 122.82, bedrooms: 2, bathrooms: 2.5, status: 'available', subtitle: 'Flat' },
      { id: "402", floorId: "4", price: 0, dimensions: 134.03, bedrooms: 2, bathrooms: 2.5, status: 'available', subtitle: 'Flat' },
    ]
  },
  {
    id: "5",
    name: "5",
    level: 5,
    floorPlanImage: floor5,
    units: [
      { id: "501", floorId: "5", price: 0, dimensions: 250.95, bedrooms: 3, bathrooms: 2, status: 'available', subtitle: 'Dúplex' },
      { id: "502", floorId: "5", price: 0, dimensions: 267.89, bedrooms: 2, bathrooms: 2, status: 'available', subtitle: 'Dúplex' },
    ]
  },
  {
    id: "6",
    name: "6",
    level: 6,
    floorPlanImage: floor6,
    units: [
      { id: "601", identifier: "501", floorId: "6", price: 0, dimensions: 250.95, bedrooms: 3, bathrooms: 2, status: 'available', subtitle: 'Dúplex' },
      { id: "602", identifier: "502", floorId: "6", price: 0, dimensions: 267.89, bedrooms: 2, bathrooms: 2, status: 'available', subtitle: 'Dúplex' },
    ]
  }
];

// The floor shown by default when "entering" the building (its top apartment
// floor). Used by the entry transition and preloaders so the building's floor
// count isn't hardcoded. Falls back to the static data when the live (DB) list
// is empty.
export function getEntryFloorId(floors?: Floor[]): string {
  const list = floors && floors.length > 0 ? floors : floorsData;
  const apartments = list.filter(f => f.id.toLowerCase() !== 'pb' && !f.id.toLowerCase().startsWith('s'));
  const pool = apartments.length > 0 ? apartments : list;
  if (pool.length === 0) return '1';
  return [...pool].sort((a, b) => b.level - a.level)[0].id;
}
