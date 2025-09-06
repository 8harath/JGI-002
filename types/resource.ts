export interface Resource {
  id: string;
  title: string;
  name?: string; // Keep name as optional for backward compatibility
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
