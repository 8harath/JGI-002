import { Resource } from "@/types";
import fs from "fs";
import path from "path";

/**
 * Get all resources for search functionality
 * Now uses the pre-generated manifest instead of filesystem scanning
 */
export async function getAllResources(): Promise<Resource[]> {
  try {
    const manifestPath = path.join(process.cwd(), "public", "manifest.json");
    const manifestData = fs.readFileSync(manifestPath, "utf-8");
    const manifest = JSON.parse(manifestData);

    const resources: Resource[] = [];

    // Convert manifest entries to Resource format
    for (const [key, categories] of Object.entries(manifest)) {
      const [semesterIdStr, ...slugParts] = key.split("-");
      const semesterId = parseInt(semesterIdStr);
      const subjectSlug = slugParts.join("-");

      for (const category of categories as any[]) {
        for (const file of category.files) {
          resources.push({
            id: `${key}-${file.name}`,
            title: file.name,
            type: file.type,
            semester: semesterId,
            subject: category.name,
            subjectSlug: subjectSlug,
            path: file.path,
          });
        }
      }
    }

    return resources;
  } catch (error) {
    console.error("Error loading resources:", error);
    return [];
  }
} 