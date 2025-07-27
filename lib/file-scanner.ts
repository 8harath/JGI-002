import fs from 'fs';
import path from 'path';
import { getFileExtensionType, type FileInfo, type FolderStructure, type SubjectFiles } from './file-utils';

// Re-export types for backward compatibility
export type { FileInfo, FolderStructure, SubjectFiles } from './file-utils';

export function scanSubjectDirectory(subjectPath: string): SubjectFiles {
  const subject = path.basename(subjectPath);
  const folders: FolderStructure = {};
  let totalFiles = 0;

  try {
    if (!fs.existsSync(subjectPath)) {
      return { subject, folders: {}, totalFiles: 0 };
    }

    const items = fs.readdirSync(subjectPath, { withFileTypes: true });
    
    for (const item of items) {
      if (item.isDirectory()) {
        const folderPath = path.join(subjectPath, item.name);
        const files: FileInfo[] = [];
        
        try {
          const folderItems = fs.readdirSync(folderPath, { withFileTypes: true });
          
          for (const fileItem of folderItems) {
            if (fileItem.isFile()) {
              const filePath = path.join(folderPath, fileItem.name);
              const stats = fs.statSync(filePath);
              const extension = path.extname(fileItem.name);
              
              files.push({
                name: fileItem.name,
                path: `/Resources/1/${subject}/${item.name}/${fileItem.name}`,
                size: stats.size,
                type: getFileExtensionType(extension),
                extension: extension
              });
              
              totalFiles++;
            }
          }
        } catch (error) {
          console.warn(`Error reading folder ${folderPath}:`, error);
        }
        
        folders[item.name] = files;
      }
    }
  } catch (error) {
    console.error(`Error scanning subject directory ${subjectPath}:`, error);
  }

  return { subject, folders, totalFiles };
}

export function scanAllSemester1Subjects(): SubjectFiles[] {
  const semester1Path = path.join(process.cwd(), 'public', 'Resources', '1');
  const subjects: SubjectFiles[] = [];

  try {
    if (!fs.existsSync(semester1Path)) {
      console.warn('Semester 1 directory not found:', semester1Path);
      return [];
    }

    const items = fs.readdirSync(semester1Path, { withFileTypes: true });
    
    for (const item of items) {
      if (item.isDirectory()) {
        const subjectPath = path.join(semester1Path, item.name);
        
        // Special handling for Languages folder
        if (item.name === 'Languages') {
          try {
            const languageItems = fs.readdirSync(subjectPath, { withFileTypes: true });
            
            for (const langItem of languageItems) {
              if (langItem.isDirectory()) {
                const langPath = path.join(subjectPath, langItem.name);
                const langSubject = scanSubjectDirectory(langPath);
                langSubject.subject = `Languages - ${langItem.name}`;
                
                // Update paths to include Languages folder
                Object.keys(langSubject.folders).forEach(folderName => {
                  langSubject.folders[folderName].forEach(file => {
                    file.path = `/Resources/1/Languages/${langItem.name}/${folderName}/${file.name}`;
                  });
                });
                
                subjects.push(langSubject);
              }
            }
          } catch (error) {
            console.warn('Error reading Languages directory:', error);
          }
        } else {
          subjects.push(scanSubjectDirectory(subjectPath));
        }
      }
    }
  } catch (error) {
    console.error('Error scanning semester 1 directory:', error);
  }

  return subjects;
}
