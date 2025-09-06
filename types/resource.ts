export interface Resource {
  id: string;
  name: string;
  description?: string;
  type: string;
  semester: number;
  subject: string;
  path: string;
  url?: string;
  size?: number;
  lastModified?: Date;
  tags?: string[];
  author?: string;
  version?: string;
}
