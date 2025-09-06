import Link from "next/link"
import { notFound } from "next/navigation"
import { SubjectList } from "@/components/subject-list"
import { semesters } from "@/data/semesters"
import { subjects } from "@/data/subjects"
import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"
import { generateSemesterStructuredData, generateBreadcrumbStructuredData } from "@/lib/structured-data"

export function generateStaticParams() {
  return semesters
    .filter((semester) => semester.isActive)
    .map((semester) => ({
      id: semester.id.toString(),
    }))
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const semesterId = Number.parseInt(params.id)
  const semester = semesters.find((s) => s.id === semesterId)
  
  if (!semester || !semester.isActive) {
    return {
      title: "Semester Not Found",
      description: "The requested semester could not be found.",
    }
  }

  const semesterSubjects = subjects.filter((subject) => subject.semesterId === semesterId)
  const subjectNames = semesterSubjects.map(s => s.name).join(", ")

  return {
    title: `${semester.name} - BCA Semester Resources | Jain University`,
    description: `${semester.description}. Subjects include: ${subjectNames}. Access comprehensive study materials, notes, presentations, and resources for ${semester.name} students.`,
    keywords: [
      semester.name.toLowerCase(),
      "bca semester",
      "computer applications",
      "study materials",
      "educational resources",
      "jain university",
      ...semesterSubjects.map(s => s.name.toLowerCase()),
      ...semesterSubjects.map(s => s.slug.replace(/-/g, " "))
    ],
    openGraph: {
      title: `${semester.name} - BCA Semester Resources`,
      description: `${semester.description}. Access comprehensive study materials and resources.`,
      type: "website",
      url: `https://www.jainuniversity.live/semester/${semesterId}`,
    },
    twitter: {
      card: "summary",
      title: `${semester.name} - BCA Semester Resources`,
      description: `${semester.description}. Access comprehensive study materials and resources.`,
    },
    alternates: {
      canonical: `https://www.jainuniversity.live/semester/${semesterId}`,
    },
  }
}

export default function SemesterPage({ params }: { params: { id: string } }) {
  const semesterId = Number.parseInt(params.id)
  const semester = semesters.find((s) => s.id === semesterId)

  if (!semester || !semester.isActive) {
    notFound()
  }

  const semesterSubjects = subjects.filter((subject) => subject.semesterId === semesterId)
  const structuredData = generateSemesterStructuredData(semesterId)
  const breadcrumbData = generateBreadcrumbStructuredData(
    ["/", `/semester/${semesterId}`],
    ["Home", semester.name]
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8">
        <nav className="mb-3 sm:mb-4 md:mb-6" aria-label="Breadcrumb">
          <Link href="/" className="back-button mb-2 sm:mb-3 md:mb-4">
            <ArrowLeft size={14} className="sm:hidden" aria-hidden="true" />
            <ArrowLeft size={16} className="hidden sm:block" aria-hidden="true" />
            Back to Home
          </Link>
        </nav>
        
        <header className="mb-3 sm:mb-4 md:mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-1 sm:mb-1 md:mb-2 leading-tight">{semester.name}</h1>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">{semester.description}</p>
        </header>

        <section className="mb-4 sm:mb-6 md:mb-8" aria-labelledby="subjects-heading">
          <h2 id="subjects-heading" className="section-header">Available Subjects</h2>
          <SubjectList subjects={semesterSubjects} semesterId={semesterId} />
        </section>
      </div>
    </>
  )
}
