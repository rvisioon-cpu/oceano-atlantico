// Tope mensual de imágenes generadas con IA.
//
// El límite protege el gasto de la cuenta de OpenAI: cada imagen es una
// llamada facturada. Se cuenta por mes calendario en hora de Lima (UTC-5),
// que es el huso con el que trabaja el resto del proyecto, para que el corte
// coincida con el cambio de mes que ve el equipo comercial.
export const MONTHLY_IMAGE_LIMIT = 100;

const LIMA_OFFSET_MS = 5 * 60 * 60 * 1000;

/** Inicio del mes en curso (hora de Lima) expresado en tiempo real UTC. */
export function currentPeriodStart(now: Date = new Date()): Date {
  const lima = new Date(now.getTime() - LIMA_OFFSET_MS);
  const startLima = Date.UTC(lima.getUTCFullYear(), lima.getUTCMonth(), 1, 0, 0, 0, 0);
  return new Date(startLima + LIMA_OFFSET_MS);
}

/** Inicio del mes siguiente: cuando el contador vuelve a cero. */
export function nextPeriodStart(now: Date = new Date()): Date {
  const lima = new Date(now.getTime() - LIMA_OFFSET_MS);
  const startLima = Date.UTC(lima.getUTCFullYear(), lima.getUTCMonth() + 1, 1, 0, 0, 0, 0);
  return new Date(startLima + LIMA_OFFSET_MS);
}

/** Etiqueta del periodo para mostrar en la UI, p. ej. "julio de 2026". */
export function periodLabel(now: Date = new Date()): string {
  const lima = new Date(now.getTime() - LIMA_OFFSET_MS);
  return new Date(Date.UTC(lima.getUTCFullYear(), lima.getUTCMonth(), 1)).toLocaleDateString("es-PE", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
