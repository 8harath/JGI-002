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
