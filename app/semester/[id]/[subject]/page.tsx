import Link from "next/link"
import { notFound } from "next/navigation"
import { FileExplorer } from "@/components/file-explorer"
import { semesters } from "@/data/semesters"
import { subjects } from "@/data/subjects"
import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"
import { generateSubjectStructuredData, generateBreadcrumbStructuredData } from "@/lib/structured-data"

export function generateStaticParams() {
  const paths: { id: string; subject: string }[] = []

  semesters
    .filter((semester) => semester.isActive)
    .forEach((semester) => {
      const semesterSubjects = subjects.filter((subject) => subject.semesterId === semester.id)

      semesterSubjects.forEach((subject) => {
        paths.push({
          id: semester.id.toString(),
          subject: subject.slug,
        })
      })
    })

  return paths
}

export async function generateMetadata({ params }: { params: { id: string; subject: string } }): Promise<Metadata> {
  const semesterId = Number.parseInt(params.id)
  const subjectSlug = params.subject

  const semester = semesters.find((s) => s.id === semesterId)
  const subject = subjects.find((s) => s.semesterId === semesterId && s.slug === subjectSlug)

  if (!semester || !semester.isActive || !subject) {
    return {
      title: "Subject Not Found",
      description: "The requested subject could not be found.",
    }
  }

  const materials = ["TLEP", "Notes", "Presentations", "Activity 1", "Activity 2", "Previous Year Papers"]
  const materialsText = materials.join(", ")

  return {
    title: `${subject.name} - ${semester.name} Study Materials | Jain University`,
    description: `${subject.description}. Access comprehensive study materials including ${materialsText.toLowerCase()} for ${subject.name} in ${semester.name}. Download notes, presentations, assignments, and previous year papers.`,
    keywords: [
      subject.name.toLowerCase(),
      subject.slug.replace(/-/g, " "),
      semester.name.toLowerCase(),
      "study materials",
      "notes",
      "presentations",
      "assignments",
      "previous year papers",
      "bca subject",
      "computer applications",
      "jain university",
      "educational resources"
    ],
    openGraph: {
      title: `${subject.name} - ${semester.name} Study Materials`,
      description: `${subject.description}. Access comprehensive study materials and resources.`,
      type: "website",
      url: `https://www.jainuniversity.live/semester/${semesterId}/${subjectSlug}`,
    },
    twitter: {
      card: "summary",
      title: `${subject.name} - ${semester.name} Study Materials`,
      description: `${subject.description}. Access comprehensive study materials and resources.`,
    },
    alternates: {
      canonical: `https://www.jainuniversity.live/semester/${semesterId}/${subjectSlug}`,
    },
  }
}

export default function SubjectPage({
  params,
}: {
  params: { id: string; subject: string }
}) {
  const semesterId = Number.parseInt(params.id)
  const subjectSlug = params.subject

  const semester = semesters.find((s) => s.id === semesterId)
  const subject = subjects.find((s) => s.semesterId === semesterId && s.slug === subjectSlug)

  if (!semester || !semester.isActive || !subject) {
    notFound()
  }

  const folders = [
    { name: "TLEP", description: "Teaching Learning Evaluation Plans" },
    { name: "Notes", description: "Lecture notes and study materials" },
    { name: "Presentations", description: "PPT slides and visual content" },
    { name: "Activity 1", description: "First activity/assignment materials" },
    { name: "Activity 2", description: "Second activity/assignment materials" },
    { name: "Previous Year Papers", description: "Exam papers and solutions" },
  ]

  const structuredData = generateSubjectStructuredData(semesterId, subjectSlug)
  const breadcrumbData = generateBreadcrumbStructuredData(
    ["/", `/semester/${semesterId}`, `/semester/${semesterId}/${subjectSlug}`],
    ["Home", semester.name, subject.name]
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
        <nav className="mb-4 sm:mb-6" aria-label="Breadcrumb">
          <Link href={`/semester/${semesterId}`} className="back-button mb-3 sm:mb-4">
            <ArrowLeft size={14} className="sm:hidden" aria-hidden="true" />
            <ArrowLeft size={16} className="hidden sm:block" aria-hidden="true" />
            Back to {semester.name}
          </Link>
        </nav>
        
        <header className="mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-1 sm:mb-2 leading-tight">{subject.name}</h1>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">{subject.description}</p>
        </header>

        <section className="mb-6 sm:mb-8" aria-labelledby="materials-heading">
          <h2 id="materials-heading" className="section-header">Study Materials</h2>
          <FileExplorer folders={folders} subject={subject} />
        </section>
      </div>
    </>
  )
}
