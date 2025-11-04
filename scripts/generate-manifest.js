const fs = require('fs').promises;
const path = require('path');

// Import the subject folder mappings
const subjectFolderMappings = require('../lib/subject-folder-mapping.json');

/**
 * Category configurations for organizing files
 */
const CATEGORY_CONFIG = [
  {
    name: 'TLEP',
    keywords: ['tlep', 'teaching', 'learning'],
    description: 'Teaching Learning Enhancement Plans',
  },
  {
    name: 'Modules',
    keywords: ['module', 'unit'],
    description: 'Course modules and units',
  },
  {
    name: 'Presentations',
    keywords: ['ppt', 'presentation', 'slide'],
    description: 'Lecture presentations and slides',
  },
  {
    name: 'Question Papers',
    keywords: ['question', 'qp', 'exam', 'test'],
    description: 'Previous year question papers and exams',
  },
  {
    name: 'Lab',
    keywords: ['lab', 'practical', 'experiment'],
    description: 'Laboratory manuals and practical exercises',
  },
  {
    name: 'Notes',
    keywords: ['note', 'summary'],
    description: 'Study notes and summaries',
  },
  {
    name: 'Others',
    keywords: [],
    description: 'Other course materials',
  },
];

/**
 * Format file size in human-readable format
 */
function formatFileSize(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Categorize a file based on its name
 */
function categorizeFile(fileName) {
  const lowerName = fileName.toLowerCase();

  for (const category of CATEGORY_CONFIG) {
    if (category.keywords.length === 0) continue;

    for (const keyword of category.keywords) {
      if (lowerName.includes(keyword)) {
        return category.name;
      }
    }
  }

  return 'Others';
}

/**
 * Recursively scan a directory and collect all files
 */
async function scanDirectory(dirPath, basePath) {
  const files = [];

  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);

      if (entry.isDirectory()) {
        // Recursively scan subdirectories
        const subFiles = await scanDirectory(fullPath, basePath);
        files.push(...subFiles);
      } else if (entry.isFile()) {
        try {
          const stats = await fs.stat(fullPath);
          const relativePath = path.relative(path.join(process.cwd(), 'public'), fullPath);
          const webPath = '/' + relativePath.replace(/\\/g, '/');

          const fileExt = path.extname(entry.name).slice(1).toUpperCase();
          const category = categorizeFile(entry.name);

          files.push({
            name: entry.name,
            path: webPath,
            size: formatFileSize(stats.size),
            type: fileExt || 'FILE',
            category: category,
          });
        } catch (error) {
          console.warn(`Warning: Could not stat file ${fullPath}:`, error.message);
        }
      }
    }
  } catch (error) {
    console.warn(`Warning: Could not read directory ${dirPath}:`, error.message);
  }

  return files;
}

/**
 * Organize files into categories
 */
function organizeIntoCategories(files) {
  const categoryMap = new Map();

  // Initialize all categories
  for (const config of CATEGORY_CONFIG) {
    categoryMap.set(config.name, {
      name: config.name,
      description: config.description,
      files: [],
    });
  }

  // Distribute files into categories
  for (const file of files) {
    const category = categoryMap.get(file.category);
    if (category) {
      category.files.push(file);
    }
  }

  // Convert to array and filter out empty categories
  const categories = Array.from(categoryMap.values())
    .filter(cat => cat.files.length > 0)
    .map(cat => ({
      ...cat,
      files: cat.files.sort((a, b) => a.name.localeCompare(b.name)),
    }));

  return categories;
}

/**
 * Get files for a specific subject
 */
async function getSubjectFiles(semesterId, subjectSlug, mapping) {
  const subjectPath = path.join(
    process.cwd(),
    'public',
    mapping.basePath,
    mapping.folderName
  );

  console.log(`Scanning: Semester ${semesterId} - ${subjectSlug} (${mapping.folderName})`);

  try {
    await fs.access(subjectPath);
  } catch {
    console.log(`  ⚠ Folder not found: ${subjectPath}`);
    return [];
  }

  const allFiles = await scanDirectory(subjectPath, mapping.basePath);
  const categories = organizeIntoCategories(allFiles);

  console.log(`  ✓ Found ${categories.length} categories with ${allFiles.length} total files`);

  return categories;
}

/**
 * Generate the complete manifest
 */
async function generateManifest() {
  console.log('🔍 Generating file manifest...\n');

  const manifest = {};

  // Process each subject mapping
  for (const mapping of subjectFolderMappings) {
    const key = `${mapping.semesterId}-${mapping.subjectSlug}`;
    const categories = await getSubjectFiles(
      mapping.semesterId,
      mapping.subjectSlug,
      mapping
    );
    manifest[key] = categories;
  }

  // Write manifest to file
  const manifestPath = path.join(process.cwd(), 'public', 'manifest.json');
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));

  console.log(`\n✅ Manifest generated successfully: ${manifestPath}`);
  console.log(`📊 Total subjects processed: ${Object.keys(manifest).length}`);
}

// Run the manifest generation
generateManifest().catch((error) => {
  console.error('❌ Error generating manifest:', error);
  process.exit(1);
});
