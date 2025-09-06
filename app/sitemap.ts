import { MetadataRoute } from 'next'
import { semesters } from '@/data/semesters'
import { subjects } from '@/data/subjects'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.jainuniversity.live'
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
  ]

  // Semester pages
  const semesterPages = semesters
    .filter(semester => semester.isActive)
    .map(semester => ({
      url: `${baseUrl}/semester/${semester.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

  // Subject pages
  const subjectPages = semesters
    .filter(semester => semester.isActive)
    .flatMap(semester => {
      const semesterSubjects = subjects.filter(subject => subject.semesterId === semester.id)
      return semesterSubjects.map(subject => ({
        url: `${baseUrl}/semester/${semester.id}/${subject.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }))
    })

  return [...staticPages, ...semesterPages, ...subjectPages]
}
