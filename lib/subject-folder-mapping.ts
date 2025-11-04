/**
 * Maps subject slugs to their actual folder names in the file system
 * This allows us to maintain clean URLs while supporting various folder naming conventions
 */

import mappingsData from './subject-folder-mapping.json';

export interface SubjectFolderMapping {
  semesterId: number;
  subjectSlug: string;
  folderName: string;
  basePath: string; // Base path where files are stored
}

export const subjectFolderMappings: SubjectFolderMapping[] = mappingsData;

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
