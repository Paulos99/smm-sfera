/** Heuristic for low-end / data-saver devices. Full experience stays on normal PCs/phones. */
export function isWeakDevice(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const connection = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;
    if (connection?.saveData) return true;
    if (connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g') return true;
    const cores = navigator.hardwareConcurrency || 8;
    if (cores > 0 && cores <= 4) return true;
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    if (typeof memory === 'number' && memory > 0 && memory <= 2) return true;
  } catch {
    return false;
  }
  return false;
}
