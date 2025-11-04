import { promises as fs } from "fs";
import path from "path";
import { getSubjectFolderMapping } from "./subject-folder-mapping";

export interface FileItem {
  name: string;
  path: string;
  size: string;
  type: string;
  category: string; // TLEP, Notes, Modules, etc.
}

export interface FolderCategory {
  name: string;
  description: string;
  files: FileItem[];
}

/**
 * Get file extension and type
 */
function getFileType(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  if (!ext) return "unknown";
  return ext.substring(1); // Remove the dot
}

/**
 * Format file size
 */
function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
}

/**
 * Normalize category names for consistent display
 */
function normalizeCategoryName(folderName: string): string {
  const normalized: { [key: string]: string } = {
    "TLEP": "TLEP",
    "MODULES": "Modules",
    "JAIN MODULES": "Modules",
    "Modules": "Modules",
    "ASSIGNMENTS": "Assignments",
    "Activities": "Activities",
    "ACTIVITY_S": "Activities",
    "Presentations": "Presentations",
    "PYP": "Previous Year Papers",
    "Previous Year Papers": "Previous Year Papers",
    "Notes": "Notes",
    "Faculty Uploads": "Faculty Uploads",
    "Entropy": "Entropy Materials",
    "Lifeline": "Lifeline Materials",
  };

  return normalized[folderName] || folderName;
}

/**
 * Get category description
 */
function getCategoryDescription(categoryName: string): string {
  const descriptions: { [key: string]: string } = {
    "TLEP": "Teaching Learning Evaluation Plans",
    "Modules": "Course modules and study materials",
    "Assignments": "Assignment materials and guidelines",
    "Activities": "Activity and project materials",
    "Presentations": "PPT slides and presentation materials",
    "Previous Year Papers": "Previous year exam papers and solutions",
    "Notes": "Lecture notes and study materials",
    "Lab Assignments": "Laboratory assignments and experiments",
    "Faculty Uploads": "Materials uploaded by faculty",
    "Entropy Materials": "Additional learning materials",
    "Lifeline Materials": "Quick reference and summary materials",
  };

  return descriptions[categoryName] || "Study materials and resources";
}

/**
 * Recursively scan a directory and organize files by category
 */
async function scanDirectory(
  dirPath: string,
  basePath: string,
  category: string = ""
): Promise<FileItem[]> {
  const files: FileItem[] = [];

  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      // Skip system files
      if (entry.name === "desktop.ini" || entry.name.startsWith(".")) {
        continue;
      }

      const fullPath = path.join(dirPath, entry.name);
      const relativePath = fullPath.replace(path.join(process.cwd(), "public"), "");
      const urlPath = relativePath.replace(/\\/g, "/");

      if (entry.isDirectory()) {
        // Recursively scan subdirectories
        const subCategory = category || entry.name;
        const subFiles = await scanDirectory(fullPath, basePath, subCategory);
        files.push(...subFiles);
      } else if (entry.isFile()) {
        // Get file stats
        const stats = await fs.stat(fullPath);

        files.push({
          name: entry.name,
          path: encodeURI(urlPath),
          size: formatFileSize(stats.size),
          type: getFileType(entry.name),
          category: category || "General",
        });
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dirPath}:`, error);
  }

  return files;
}

/**
 * Get all files for a subject organized by categories
 */
export async function getSubjectFiles(
  semesterId: number,
  subjectSlug: string
): Promise<FolderCategory[]> {
  const mapping = getSubjectFolderMapping(semesterId, subjectSlug);

  if (!mapping) {
    console.warn(`No folder mapping found for ${subjectSlug} in semester ${semesterId}`);
    return [];
  }

  const subjectPath = path.join(
    process.cwd(),
    "public",
    mapping.basePath,
    mapping.folderName
  );

  try {
    // Check if directory exists
    await fs.access(subjectPath);

    // Get all files with their categories
    const allFiles = await scanDirectory(subjectPath, mapping.basePath);

    // Group files by category
    const categoriesMap = new Map<string, FileItem[]>();

    for (const file of allFiles) {
      const categoryName = normalizeCategoryName(file.category);
      if (!categoriesMap.has(categoryName)) {
        categoriesMap.set(categoryName, []);
      }
      categoriesMap.get(categoryName)!.push(file);
    }

    // Convert to FolderCategory array
    const categories: FolderCategory[] = [];

    for (const [categoryName, files] of categoriesMap) {
      categories.push({
        name: categoryName,
        description: getCategoryDescription(categoryName),
        files: files.sort((a, b) => a.name.localeCompare(b.name)),
      });
    }

    // Sort categories by a predefined order
    const categoryOrder = [
      "TLEP",
      "Modules",
      "Presentations",
      "Notes",
      "Assignments",
      "Activities",
      "Previous Year Papers",
      "Lab Assignments",
    ];

    categories.sort((a, b) => {
      const indexA = categoryOrder.indexOf(a.name);
      const indexB = categoryOrder.indexOf(b.name);

      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB;
      } else if (indexA !== -1) {
        return -1;
      } else if (indexB !== -1) {
        return 1;
      } else {
        return a.name.localeCompare(b.name);
      }
    });

    return categories;
  } catch (error) {
    console.error(`Error reading subject files for ${subjectSlug}:`, error);
    return [];
  }
}

/**
 * Get all resources across all semesters for search functionality
 */
export async function getAllResourcesFromFilesystem(): Promise<any[]> {
  const resources: any[] = [];
  const { subjectFolderMappings } = await import("./subject-folder-mapping");
  const { subjects } = await import("@/data/subjects");

  for (const mapping of subjectFolderMappings) {
    try {
      const categories = await getSubjectFiles(mapping.semesterId, mapping.subjectSlug);
      const subject = subjects.find(
        (s) => s.semesterId === mapping.semesterId && s.slug === mapping.subjectSlug
      );

      if (!subject) continue;

      for (const category of categories) {
        for (const file of category.files) {
          resources.push({
            id: `${mapping.semesterId}-${mapping.subjectSlug}-${file.name}`,
            title: file.name,
            description: `${category.name} - ${category.description}`,
            type: category.name,
            semester: mapping.semesterId,
            subject: subject.name,
            subjectSlug: mapping.subjectSlug,
            path: file.path,
          });
        }
      }
    } catch (error) {
      console.error(`Error loading resources for ${mapping.subjectSlug}:`, error);
    }
  }

  return resources;
}
