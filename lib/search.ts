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

// Simple fuzzy matching function
function fuzzyMatch(text: string, query: string): number {
  const textLower = text.toLowerCase();
  const queryLower = query.toLowerCase();
  
  if (textLower.includes(queryLower)) {
    return 1; // Exact match
  }
  
  // Check for fuzzy match (characters in order)
  let textIndex = 0;
  let queryIndex = 0;
  
  while (textIndex < textLower.length && queryIndex < queryLower.length) {
    if (textLower[textIndex] === queryLower[queryIndex]) {
      queryIndex++;
    }
    textIndex++;
  }
  
  return queryIndex === queryLower.length ? 0.5 : 0; // Partial match
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

      // Calculate relevance score with fuzzy matching
      let relevance = 0;
      
      searchTerms.forEach((term) => {
        // Title matches are most important
        const titleMatch = fuzzyMatch(resource.title, term);
        if (titleMatch > 0) relevance += titleMatch * 4;
        
        // Subject matches are second most important
        const subjectMatch = fuzzyMatch(resource.subject, term);
        if (subjectMatch > 0) relevance += subjectMatch * 3;
        
        // Description matches are third most important
        const descMatch = fuzzyMatch(description, term);
        if (descMatch > 0) relevance += descMatch * 2;
        
        // Type matches are least important
        const typeMatch = fuzzyMatch(resource.type, term);
        if (typeMatch > 0) relevance += typeMatch * 1;
        
        // Bonus for exact word matches
        if (title.includes(term)) relevance += 0.5;
        if (subject.includes(term)) relevance += 0.3;
        if (description.includes(term)) relevance += 0.2;
        if (type.includes(term)) relevance += 0.1;
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