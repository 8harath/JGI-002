import { semesters } from "@/data/semesters"
import { subjects } from "@/data/subjects"

export function generateWebsiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Jain University BCA Resources",
    "description": "Comprehensive study materials and resources for Bachelor of Computer Applications (BCA) students",
    "url": "https://www.jainuniversity.live",
    "logo": "https://www.jainuniversity.live/Logo/favicon-32x32.png",
    "sameAs": [
      "https://www.jainuniversity.ac.in"
    ],
    "offers": {
      "@type": "Course",
      "name": "Bachelor of Computer Applications (BCA)",
      "description": "Comprehensive BCA program with semester-wise study materials and resources",
      "provider": {
        "@type": "EducationalOrganization",
        "name": "Jain University"
      }
    }
  }
}

export function generateSemesterStructuredData(semesterId: number) {
  const semester = semesters.find(s => s.id === semesterId)
  if (!semester) return null

  const semesterSubjects = subjects.filter(subject => subject.semesterId === semesterId)
  
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": `${semester.name} - BCA Semester`,
    "description": semester.description,
    "url": `https://www.jainuniversity.live/semester/${semesterId}`,
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Jain University"
    },
    "courseMode": "online",
    "educationalLevel": "undergraduate",
    "hasCourseInstance": semesterSubjects.map(subject => ({
      "@type": "CourseInstance",
      "name": subject.name,
      "description": subject.description,
      "url": `https://www.jainuniversity.live/semester/${semesterId}/${subject.slug}`
    }))
  }
}

export function generateSubjectStructuredData(semesterId: number, subjectSlug: string) {
  const semester = semesters.find(s => s.id === semesterId)
  const subject = subjects.find(s => s.semesterId === semesterId && s.slug === subjectSlug)
  
  if (!semester || !subject) return null

  const materials = ["TLEP", "Notes", "Presentations", "Activity 1", "Activity 2", "Previous Year Papers"]
  
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": subject.name,
    "description": subject.description,
    "url": `https://www.jainuniversity.live/semester/${semesterId}/${subjectSlug}`,
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Jain University"
    },
    "courseMode": "online",
    "educationalLevel": "undergraduate",
    "isPartOf": {
      "@type": "Course",
      "name": `${semester.name} - BCA Semester`,
      "url": `https://www.jainuniversity.live/semester/${semesterId}`
    },
    "learningResourceType": materials.map(material => ({
      "@type": "LearningResource",
      "name": material,
      "description": `${material} for ${subject.name}`
    }))
  }
}

export function generateBreadcrumbStructuredData(path: string[], titles: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": path.map((url, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": titles[index],
      "item": `https://www.jainuniversity.live${url}`
    }))
  }
}
