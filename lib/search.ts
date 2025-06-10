import { Resource } from "@/types/resource";

export interface SearchResult {
  id: string;
  title: string;
  description?: string;
  type: string;
  semester: number;
  subject: string;
  path: string;
  relevance: number;
}

export function searchResources(
  query: string,
  resources: Resource[]
): SearchResult[] {
  if (!query.trim()) return [];

  const searchTerms = query.toLowerCase().split(" ").filter(Boolean);
  
  return resources
    .map((resource) => {
      const title = resource.title.toLowerCase();
      const description = resource.description?.toLowerCase() || "";
      const subject = resource.subject.toLowerCase();
      const type = resource.type.toLowerCase();

      // Calculate relevance score
      let relevance = 0;
      
      searchTerms.forEach((term) => {
        // Title matches are most important
        if (title.includes(term)) relevance += 3;
        // Subject matches are second most important
        if (subject.includes(term)) relevance += 2;
        // Description matches are third most important
        if (description.includes(term)) relevance += 1;
        // Type matches are least important
        if (type.includes(term)) relevance += 0.5;
      });

      return {
        id: resource.id,
        title: resource.title,
        description: resource.description,
        type: resource.type,
        semester: resource.semester,
        subject: resource.subject,
        path: resource.path,
        relevance,
      };
    })
    .filter((result) => result.relevance > 0)
    .sort((a, b) => b.relevance - a.relevance);
} 