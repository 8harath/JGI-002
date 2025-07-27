import { Subject } from "@/types"

/**
 * Get the available resource folders for a subject
 */
export function getResourceFolders(subject: Subject): string[] {
  if (subject.isLab) {
    return ["tlep", "programs", "outputs"]
  } else {
    return ["notes", "previous-year-papers", "presentations", "activity-1", "activity-2", "tlep"]
  }
}

/**
 * Check if a subject has a specific resource folder
 */
export function hasResourceFolder(subject: Subject, folderName: string): boolean {
  const folders = getResourceFolders(subject)
  return folders.includes(folderName)
}

/**
 * Get the resource folder display names
 */
export function getResourceFolderDisplayName(folderName: string): string {
  const displayNames: Record<string, string> = {
    "notes": "Notes",
    "previous-year-papers": "Previous Year Papers",
    "presentations": "Presentations", 
    "activity-1": "Activity 1",
    "activity-2": "Activity 2",
    "tlep": "TLEP",
    "programs": "Programs",
    "outputs": "Outputs"
  }
  
  return displayNames[folderName] || folderName
}

/**
 * Check if a subject is a lab subject based on its name
 */
export function isLabSubject(subjectName: string): boolean {
  return subjectName.toLowerCase().includes("lab")
}
