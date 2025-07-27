import fs from 'fs';
import path from 'path';

export interface FileInfo {
  name: string;
  path: string;
  size: number;
  type: string;
  extension: string;
}

export interface FolderStructure {
  [folderName: string]: FileInfo[];
}

export interface SubjectFiles {
  subject: string;
  folders: FolderStructure;
  totalFiles: number;
}

export function getFileExtensionType(extension: string): string {
  const typeMap: { [key: string]: string } = {
    '.pdf': 'PDF',
    '.pptx': 'PowerPoint',
    '.ppt': 'PowerPoint', 
    '.docx': 'Word Document',
    '.doc': 'Word Document',
    '.txt': 'Text',
    '.xlsx': 'Excel',
    '.xls': 'Excel',
    '.zip': 'Archive',
    '.rar': 'Archive',
    '.jpg': 'Image',
    '.jpeg': 'Image',
    '.png': 'Image',
    '.gif': 'Image',
    '.mp4': 'Video',
    '.avi': 'Video',
    '.mov': 'Video',
    '.mp3': 'Audio',
    '.wav': 'Audio',
  };
  
  return typeMap[extension.toLowerCase()] || 'File';
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

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
