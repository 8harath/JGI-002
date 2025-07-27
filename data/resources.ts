import { scanAllSemester1Subjects } from '@/lib/file-scanner';
import type { SubjectFiles, FileInfo } from '@/lib/file-utils';

export interface Resource {
  semester: number;
  subject: string;
  title: string;
  file: string;
  description: string;
  category: string;
  size?: number;
  type?: string;
  extension?: string;
}

// Function to generate resources dynamically from file system
export function generateSemester1Resources(): Resource[] {
  const resources: Resource[] = [];
  
  try {
    const subjectFiles = scanAllSemester1Subjects();
    
    const subjectSlugMap: { [key: string]: string } = {
      'Fundamentals of Computer Applications': 'fundamentals-of-computer-applications',
      'Fundamentals of Mathematics': 'fundamentals-of-mathematics', 
      'General English': 'general-english',
      'Languages - Hindi': 'languages-hindi',
      'Languages - Kannada': 'languages-kannada',
      'Languages - Sanskrit': 'languages-sanskrit',
      'MMHV': 'mmhv',
      'Programming in C': 'programming-in-c',
      'Programming in C Lab': 'programming-in-c-lab',
      'Fundamentals of Computer Application Lab': 'fundamentals-of-computer-application-lab'
    };

    subjectFiles.forEach((subjectData: SubjectFiles) => {
      const subjectSlug = subjectSlugMap[subjectData.subject];
      
      if (subjectSlug) {
        Object.entries(subjectData.folders).forEach(([folderName, files]) => {
          files.forEach((file: FileInfo) => {
            resources.push({
              semester: 1,
              subject: subjectSlug,
              title: file.name.replace(/\.[^/.]+$/, ""), // Remove extension from title
              file: file.path,
              description: `${file.type} file from ${folderName} category`,
              category: folderName,
              size: file.size,
              type: file.type,
              extension: file.extension
            });
          });
        });
      }
    });
  } catch (error) {
    console.error('Error generating semester 1 resources:', error);
  }

  return resources;
}

// Static resources for other semesters (keeping existing structure)
export const staticResources: Resource[] = [
  // Semester 4 resources (keeping as placeholder)
  {
    semester: 4,
    subject: "ai",
    title: "Module 1: Introduction",
    file: "/resources/semester-4/ai/module1.pdf",
    description: "Introduction to AI concepts.",
    category: "modules"
  },
  {
    semester: 4,
    subject: "cs", 
    title: "Module 1: Basics",
    file: "/resources/semester-4/cs/module1.pdf",
    description: "Basics of Computer Science.",
    category: "modules"
  },
  // Add more static resources for other semesters as needed
];

// Combined resources function
export function getAllResources(): Resource[] {
  const semester1Resources = generateSemester1Resources();
  return [...semester1Resources, ...staticResources];
}

// For backward compatibility, export the resources array
export const resources = getAllResources();