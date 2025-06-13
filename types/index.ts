export interface Subject {
  id: number
  semesterId: number
  name: string
  slug: string
  description: string
}

export interface Semester {
  id: number
  name: string
  description: string
  isActive: boolean
  subjectCount: number
}

export interface Contributor {
  name: string
  specialization: string
  contributions: string[]
  github: string
}

export interface Resource {
  id: string
  name: string
  type: 'file' | 'folder'
  path: string
  description?: string
  children?: Resource[]
  fileType?: 'pdf' | 'doc' | 'ppt' | 'code' | 'certification' | 'documentation' | 'file'
  moduleNumber?: number
}

export interface ResourceFolder {
  name: string
  description: string
  type: 'tlep' | 'notes' | 'presentations' | 'activity' | 'papers'
  resources: Resource[]
}

export interface SubjectResources {
  subjectId: number
  folders: ResourceFolder[]
}
