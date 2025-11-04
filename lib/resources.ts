import { Resource } from "@/types";
import { getAllResourcesFromFilesystem } from "./file-scanner";

/**
 * Get all resources for search functionality
 * Now uses the dynamic file scanner instead of hardcoded JSON files
 */
export async function getAllResources(): Promise<Resource[]> {
  try {
    const resources = await getAllResourcesFromFilesystem();
    return resources as Resource[];
  } catch (error) {
    console.error("Error loading resources:", error);
    return [];
  }
} 