/**
 * Cloudflare R2 Utility Functions
 *
 * This module provides helper functions for working with Cloudflare R2 storage.
 * It allows you to seamlessly switch between local files and R2-hosted files.
 */

/**
 * Get the full R2 URL for a resource path
 *
 * @param path - The resource path (e.g., "/CLG STUFF!/sem1/notes.pdf")
 * @returns Full URL to the resource (R2 or local fallback)
 *
 * @example
 * // Development (no R2_PUBLIC_URL set)
 * getR2Url('/CLG STUFF!/notes.pdf') // => '/CLG STUFF!/notes.pdf'
 *
 * // Production (with R2_PUBLIC_URL)
 * getR2Url('/CLG STUFF!/notes.pdf') // => 'https://pub-xxx.r2.dev/CLG STUFF!/notes.pdf'
 */
export function getR2Url(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_R2_URL;

  // In development or if R2 is not configured, use local files
  if (!baseUrl) {
    return path;
  }

  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // Remove 'public/' prefix if present (R2 paths don't include 'public/')
  const r2Path = cleanPath.replace(/^public\//, '');

  return `${baseUrl}/${r2Path}`;
}

/**
 * Check if R2 is configured and enabled
 *
 * @returns true if R2_PUBLIC_URL is set
 */
export function isR2Enabled(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_R2_URL);
}

/**
 * Get the R2 base URL
 *
 * @returns The R2 base URL or null if not configured
 */
export function getR2BaseUrl(): string | null {
  return process.env.NEXT_PUBLIC_R2_URL || null;
}

/**
 * Transform a resource object to use R2 URLs
 *
 * @param resource - The resource object with a path property
 * @returns Resource object with updated path
 *
 * @example
 * const resource = { id: '1', path: '/CLG STUFF!/notes.pdf', title: 'Notes' };
 * const r2Resource = transformResourceForR2(resource);
 * // r2Resource.path => 'https://pub-xxx.r2.dev/CLG STUFF!/notes.pdf'
 */
export function transformResourceForR2<T extends { path: string }>(
  resource: T
): T {
  return {
    ...resource,
    path: getR2Url(resource.path),
  };
}

/**
 * Transform an array of resources to use R2 URLs
 *
 * @param resources - Array of resource objects
 * @returns Array of resources with updated paths
 */
export function transformResourcesForR2<T extends { path: string }>(
  resources: T[]
): T[] {
  return resources.map(transformResourceForR2);
}
