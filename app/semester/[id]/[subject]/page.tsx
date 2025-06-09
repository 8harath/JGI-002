import Link from "next/link"
import { notFound } from "next/navigation"
import { FileExplorer } from "@/components/file-explorer"
import { semesters } from "@/data/semesters"
import { subjects } from "@/data/subjects"
import { ArrowLeft } from "lucide-react"

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href={`/semester/${semesterId}`} className="back-button mb-4">
          <ArrowLeft size={16} />
          Back to {semester.name}
        </Link>
        <h1 className="text-3xl font-bold text-foreground mb-2">{subject.name}</h1>
        <p className="text-muted-foreground">{subject.description}</p>
      </div>

      <div className="mb-8">
        <h2 className="section-header">Materials</h2>
        <FileExplorer folders={folders} subject={subject} />
      </div>
    </div>
  )
}
