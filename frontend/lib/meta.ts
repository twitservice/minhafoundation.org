/**
 * Resolves the social/OG meta image for a page.
 *
 * Priority:
 *  1. Page-level `meta_img` (non-empty string from the page's own JSON)
 *  2. Common fallback `commonMetaImg` (from common.json → images.meta_img)
 *
 * @param pageMeta    - Value of `meta_img` from the page dictionary (may be empty string or undefined)
 * @param commonMeta  - Fallback value from commonDict.images.meta_img
 * @param baseUrl     - Absolute base URL of the site (e.g. "https://minhafoundation.org")
 * @returns           Fully-qualified image URL string
 */
export function resolveMetaImg(
  pageMeta: string | undefined,
  commonMeta: string,
  baseUrl: string
): string {
  const src = pageMeta && pageMeta.trim() !== '' ? pageMeta : commonMeta;
  // If the path is already absolute return as-is, otherwise prepend baseUrl
  return src.startsWith('http') ? src : `${baseUrl}${src}`;
}
