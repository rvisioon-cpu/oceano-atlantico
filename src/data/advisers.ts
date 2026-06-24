// ============================================================================
// HISTORICAL STATIC DATA — DO NOT USE IN PRODUCTION
// This file is kept as a reference. The source of truth is the D1 database.
// See: src/lib/db/schema.ts and seed.sql for the database schema and seed data.
// ============================================================================

export interface AdviserData {
  id: string;
  name: string;
  role: string;
  gender: 'male' | 'female';
  phone: string;
  email?: string;
  whatsappMessage: string;
}

export const advisersData: AdviserData[] = [
  {
    id: 'rocio',
    name: "Rocio Granja",
    role: "Asesora de Ventas",
    gender: 'female',
    phone: "+51959556125",
    whatsappMessage: "Hola, vengo desde la web de Santa Fe 190, deseo más información."
  },
  {
    id: 'pierre',
    name: "Pierre Gurbillon",
    role: "Asesor de Ventas",
    gender: 'male',
    phone: "+51945656710",
    whatsappMessage: "Hola, vengo desde la web de Santa Fe 190, deseo más información."
  }
];
