import fs from 'fs'
import path from 'path'
import { Resource, ResourceFolder } from '@/types'

const PUBLIC_PATH = path.join(process.cwd(), 'public')

export async function getAllResources(): Promise<Resource[]> {
  const dataDirectory = path.join(process.cwd(), "data");
  const resources: Resource[] = [];

  try {
    const semesters = await fs.promises.readdir(dataDirectory);
    
    for (const semester of semesters) {
      const semesterPath = path.join(dataDirectory, semester);
      const semesterStats = await fs.promises.stat(semesterPath);
      
      if (semesterStats.isDirectory()) {
        const subjects = await fs.promises.readdir(semesterPath);
        
        for (const subject of subjects) {
          const subjectPath = path.join(semesterPath, subject);
          const subjectStats = await fs.promises.stat(subjectPath);
          
          if (subjectStats.isDirectory()) {
            const files = await fs.promises.readdir(subjectPath);
            
            for (const file of files) {
              if (file.endsWith(".json")) {
                const filePath = path.join(subjectPath, file);
                const content = await fs.promises.readFile(filePath, "utf-8");
                const resourceData = JSON.parse(content);
                
                resources.push({
                  ...resourceData,
                  semester: parseInt(semester.replace("semester", "")),
                  subject,
                  path: filePath,
                });
              }
            }
          }
        }
      }
    }
  } catch (error) {
    console.error("Error loading resources:", error);
  }

  return resources;
}

export function getSubjectResources(semesterId: number, subjectId: number): ResourceFolder[] {
  const subjectPath = path.join(PUBLIC_PATH, 'semesters', semesterId.toString(), subjectId.toString())
  
  console.log(`Checking subject path: ${subjectPath}`)

  if (!fs.existsSync(subjectPath)) {
    console.log(`Subject path does not exist: ${subjectPath}`)
    return []
  }

  const folders = fs.readdirSync(subjectPath)
  console.log(`Found folders in subject path: ${folders}`)
  
  return folders.map((folderName: string) => {
    const folderPath = path.join(subjectPath, folderName)
    const stats = fs.statSync(folderPath)
    
    if (!stats.isDirectory()) {
      console.log(`Skipping non-directory item: ${folderName}`)
      return null
    }

    const resources: Resource[] = []
    const files = fs.readdirSync(folderPath)
    console.log(`Reading files in folder ${folderName}: ${files}`)

    // Handle Notes and Presentations specially (they have modules)
    if (folderName === 'notes' || folderName === 'presentations') {
      const moduleFolders = files.filter((file: string) => 
        fs.statSync(path.join(folderPath, file)).isDirectory()
      )

      moduleFolders.forEach((moduleFolder: string) => {
        const moduleNumber = parseInt(moduleFolder.split('-')[1])
        const modulePath = path.join(folderPath, moduleFolder)
        const moduleFiles = fs.readdirSync(modulePath)
        
        resources.push({
          id: `${folderName}-${moduleFolder}`,
          name: `Module ${moduleNumber}`,
          type: 'folder',
          path: `semesters/${semesterId}/${subjectId}/${folderName}/${moduleFolder}`,
          moduleNumber,
          children: moduleFiles.map((file: string) => {
            const resource: Resource = {
              id: `${folderName}-${moduleFolder}-${file}`,
              name: file.split('.')[0].replace(/-/g, ' '),
              type: 'file',
              path: `semesters/${semesterId}/${subjectId}/${folderName}/${moduleFolder}/${file}`,
              fileType: getFileType(file)
            }
            return resource
          })
        } as Resource)
      })
    } 
    // Handle Activities specially (they have code and documentation)
    else if (folderName.startsWith('activity')) {
      files.forEach((file: string) => {
        const resource: Resource = {
          id: `${folderName}-${file}`,
          name: getActivityFileName(file),
          type: 'file',
          path: `semesters/${semesterId}/${subjectId}/${folderName}/${file}`,
          fileType: getActivityFileType(file)
        }
        resources.push(resource as Resource)
      })
    }
    // Handle other folders (TLEP, papers)
    else {
      files.forEach((file: string) => {
        const resource: Resource = {
          id: `${folderName}-${file}`,
          name: file.split('.')[0].replace(/-/g, ' '),
          type: 'file',
          path: `semesters/${semesterId}/${subjectId}/${folderName}/${file}`,
          fileType: getFileType(file)
        }
        resources.push(resource as Resource)
      })
    }

    // Get the explicit type from getFolderType
    const folderType = getFolderType(folderName)

    // Only return a ResourceFolder if we have a recognized type and resources
    if (folderType === undefined || resources.length === 0) {
      return null // Will be filtered out by the .filter call below
    }

    return {
      name: getFolderDisplayName(folderName),
      description: getFolderDescription(folderName),
      type: folderType,
      resources
    }
  }).filter((folder): folder is ResourceFolder => {
    // The null check here is important as getFolderType might return undefined for some folder names
    return folder !== null && folder.resources.length > 0
  })
}

function getFileType(filename: string): "pdf" | "doc" | "ppt" | "file" | undefined {
  const ext = path.extname(filename).toLowerCase()
  switch (ext) {
    case '.pdf':
      return 'pdf'
    case '.doc':
    case '.docx':
      return 'doc'
    case '.ppt':
    case '.pptx':
      return 'ppt'
    default:
      return 'file'
  }
}

function getActivityFileType(filename: string): "code" | "certification" | "documentation" | "pdf" | "doc" | "ppt" | "file" | undefined {
  if (filename.includes('code') || filename.endsWith('.zip')) {
    return 'code'
  }
  if (filename.includes('cert')) {
    return 'certification'
  }
  if (filename.includes('doc')) {
    return 'documentation'
  }
  return getFileType(filename)
}

function getActivityFileName(filename: string): string {
  if (filename.includes('code')) {
    return 'Project Code'
  }
  if (filename.includes('cert')) {
    return 'Certification'
  }
  if (filename.includes('doc')) {
    return 'Documentation'
  }
  return filename.split('.')[0].replace(/-/g, ' ')
}

function getFolderDisplayName(folderName: string): string {
  switch (folderName) {
    case 'tlep':
      return 'TLEP'
    case 'notes':
      return 'Notes'
    case 'presentations':
      return 'Presentations'
    case 'activity-1':
      return 'Activity 1'
    case 'activity-2':
      return 'Activity 2'
    case 'papers':
      return 'Previous Year Papers'
    default:
      return folderName.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ')
  }
}

function getFolderDescription(folderName: string): string {
  switch (folderName) {
    case 'tlep':
      return 'Teaching Learning Evaluation Plans'
    case 'notes':
      return 'Lecture notes and study materials'
    case 'presentations':
      return 'PPT slides and visual content'
    case 'activity-1':
      return 'First activity/assignment materials'
    case 'activity-2':
      return 'Second activity/assignment materials'
    case 'papers':
      return 'Exam papers and solutions'
    default:
      return ''
  }
}

function getFolderType(folderName: string): "tlep" | "notes" | "presentations" | "activity" | "papers" | undefined {
  switch (folderName) {
    case 'tlep':
      return 'tlep'
    case 'notes':
      return 'notes'
    case 'presentations':
      return 'presentations'
    case 'activity-1':
    case 'activity-2':
      return 'activity'
    case 'papers':
      return 'papers'
    default:
      return undefined // Explicitly return undefined for unrecognized types
  }
} 