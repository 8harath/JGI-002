import { Resource } from "@/types/resource";
import { promises as fs } from "fs";
import path from "path";

export async function getAllResources(): Promise<Resource[]> {
  const dataDirectory = path.join(process.cwd(), "data");
  const resources: Resource[] = [];

  try {
    const semesters = await fs.readdir(dataDirectory);
    
    for (const semester of semesters) {
      const semesterPath = path.join(dataDirectory, semester);
      const semesterStats = await fs.stat(semesterPath);
      
      if (semesterStats.isDirectory()) {
        const subjects = await fs.readdir(semesterPath);
        
        for (const subject of subjects) {
          const subjectPath = path.join(semesterPath, subject);
          const subjectStats = await fs.stat(subjectPath);
          
          if (subjectStats.isDirectory()) {
            const files = await fs.readdir(subjectPath);
            
            for (const file of files) {
              if (file.endsWith(".json")) {
                const filePath = path.join(subjectPath, file);
                const content = await fs.readFile(filePath, "utf-8");
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