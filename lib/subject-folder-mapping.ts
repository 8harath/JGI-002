/**
 * Maps subject slugs to their actual folder names in the file system
 * This allows us to maintain clean URLs while supporting various folder naming conventions
 */

export interface SubjectFolderMapping {
  semesterId: number;
  subjectSlug: string;
  folderName: string;
  basePath: string; // Base path where files are stored
}

export const subjectFolderMappings: SubjectFolderMapping[] = [
  // Semester 1 - Located in public/Resources/Semister - 1/
  {
    semesterId: 1,
    subjectSlug: "fundamentals-of-computer-applications",
    folderName: "FCA",
    basePath: "/Resources/Semister - 1",
  },
  {
    semesterId: 1,
    subjectSlug: "fundamentals-of-computer-application-lab",
    folderName: "FCA_LAB",
    basePath: "/Resources/Semister - 1",
  },
  {
    semesterId: 1,
    subjectSlug: "fundamentals-of-mathematics",
    folderName: "FOM",
    basePath: "/Resources/Semister - 1",
  },
  {
    semesterId: 1,
    subjectSlug: "general-english",
    folderName: "GENERAL ENGLISH",
    basePath: "/Resources/Semister - 1",
  },
  {
    semesterId: 1,
    subjectSlug: "languages",
    folderName: "LANGUAGES",
    basePath: "/Resources/Semister - 1",
  },
  {
    semesterId: 1,
    subjectSlug: "mmhv",
    folderName: "MMHV",
    basePath: "/Resources/Semister - 1",
  },
  {
    semesterId: 1,
    subjectSlug: "programming-in-c",
    folderName: "PIC",
    basePath: "/Resources/Semister - 1",
  },
  {
    semesterId: 1,
    subjectSlug: "programming-in-c-lab",
    folderName: "PIC LAB",
    basePath: "/Resources/Semister - 1",
  },

  // Semester 2 - Located in public/CLG STUFF!/SEM - II/
  {
    semesterId: 2,
    subjectSlug: "digital-design",
    folderName: "DD",
    basePath: "/CLG STUFF!/SEM - II",
  },
  {
    semesterId: 2,
    subjectSlug: "data-structures",
    folderName: "DS",
    basePath: "/CLG STUFF!/SEM - II",
  },
  {
    semesterId: 2,
    subjectSlug: "data-structures-lab",
    folderName: "DS LAB",
    basePath: "/CLG STUFF!/SEM - II",
  },
  {
    semesterId: 2,
    subjectSlug: "general-english-2",
    folderName: "GENERAL ENGLISH",
    basePath: "/CLG STUFF!/SEM - II",
  },
  {
    semesterId: 2,
    subjectSlug: "languages-2",
    folderName: "KANNADA",
    basePath: "/CLG STUFF!/SEM - II",
  },
  {
    semesterId: 2,
    subjectSlug: "mmhv-2",
    folderName: "MMHV",
    basePath: "/CLG STUFF!/SEM - II",
  },
  {
    semesterId: 2,
    subjectSlug: "operating-system",
    folderName: "OS",
    basePath: "/CLG STUFF!/SEM - II",
  },
  {
    semesterId: 2,
    subjectSlug: "programming-in-java",
    folderName: "PIJ",
    basePath: "/CLG STUFF!/SEM - II",
  },
  {
    semesterId: 2,
    subjectSlug: "programming-in-java-lab",
    folderName: "PIJ LAB",
    basePath: "/CLG STUFF!/SEM - II",
  },

  // Semester 3 - Located in public/CLG STUFF!/SEM - III/
  {
    semesterId: 3,
    subjectSlug: "computer-networks",
    folderName: "CN",
    basePath: "/CLG STUFF!/SEM - III",
  },
  {
    semesterId: 3,
    subjectSlug: "cn-lab",
    folderName: "CN - LAB",
    basePath: "/CLG STUFF!/SEM - III",
  },
  {
    semesterId: 3,
    subjectSlug: "database-management-systems",
    folderName: "DBMS",
    basePath: "/CLG STUFF!/SEM - III",
  },
  {
    semesterId: 3,
    subjectSlug: "dbms-lab",
    folderName: "DBMS - LAB",
    basePath: "/CLG STUFF!/SEM - III",
  },
  {
    semesterId: 3,
    subjectSlug: "environmental-studies",
    folderName: "Environmental Studies",
    basePath: "/CLG STUFF!/SEM - III",
  },
  {
    semesterId: 3,
    subjectSlug: "pcm",
    folderName: "PCM",
    basePath: "/CLG STUFF!/SEM - III",
  },
  {
    semesterId: 3,
    subjectSlug: "software-engineering",
    folderName: "Software Engineering",
    basePath: "/CLG STUFF!/SEM - III",
  },
  {
    semesterId: 3,
    subjectSlug: "open-electives",
    folderName: "AI",
    basePath: "/CLG STUFF!/SEM - III",
  },

  // Semester 4 - Located in public/CLG STUFF!/SEM-IV/
  {
    semesterId: 4,
    subjectSlug: "introduction-to-data-analytics-lab",
    folderName: "IDA-LAB",
    basePath: "/CLG STUFF!/SEM-IV",
  },
  {
    semesterId: 4,
    subjectSlug: "network-administration",
    folderName: "NA-LAB",
    basePath: "/CLG STUFF!/SEM-IV",
  },
  {
    semesterId: 4,
    subjectSlug: "programming-in-python-lab",
    folderName: "PP-LAB",
    basePath: "/CLG STUFF!/SEM-IV",
  },
];

/**
 * Get folder mapping for a specific subject
 */
export function getSubjectFolderMapping(
  semesterId: number,
  subjectSlug: string
): SubjectFolderMapping | undefined {
  return subjectFolderMappings.find(
    (mapping) =>
      mapping.semesterId === semesterId && mapping.subjectSlug === subjectSlug
  );
}

/**
 * Get all folder mappings for a semester
 */
export function getSemesterFolderMappings(
  semesterId: number
): SubjectFolderMapping[] {
  return subjectFolderMappings.filter(
    (mapping) => mapping.semesterId === semesterId
  );
}
