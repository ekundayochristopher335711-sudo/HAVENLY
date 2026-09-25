/**
 * Returns the same image with a different requested width.
 * Unsplash (and similar CDNs) accept a `w` parameter, so cards can load
 * 900px images instead of full-size 1600px originals.
 */
export function imgAt(url: string, width: number): string {
  return url.replace(/([?&])w=\d+/, `$1w=${width}`)
}