// Apex custom domain https://smmsfera.ru — assets from site root.
export const BASE_PATH = '';

export function asset(path: string) {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_PATH}${normalized}`;
}
