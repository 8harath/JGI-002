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
