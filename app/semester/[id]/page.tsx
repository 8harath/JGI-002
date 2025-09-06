import Link from "next/link"
import { notFound } from "next/navigation"
import { SubjectList } from "@/components/subject-list"
import { semesters } from "@/data/semesters"
import { subjects } from "@/data/subjects"
import { ArrowLeft } from "lucide-react"

export function generateStaticParams() {
  return semesters
    .filter((semester) => semester.isActive)
    .map((semester) => ({
      id: semester.id.toString(),
    }))
}

export default function SemesterPage({ params }: { params: { id: string } }) {
  const semesterId = Number.parseInt(params.id)
  const semester = semesters.find((s) => s.id === semesterId)

  if (!semester || !semester.isActive) {
    notFound()
  }

  const semesterSubjects = subjects.filter((subject) => subject.semesterId === semesterId)

  return (
    <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8">
      <div className="mb-3 sm:mb-4 md:mb-6">
        <Link href="/" className="back-button mb-2 sm:mb-3 md:mb-4">
          <ArrowLeft size={14} className="sm:hidden" />
          <ArrowLeft size={16} className="hidden sm:block" />
          Back to Home
        </Link>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-1 sm:mb-1 md:mb-2 leading-tight">{semester.name}</h1>
        <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">{semester.description}</p>
      </div>

      <div className="mb-4 sm:mb-6 md:mb-8">
        <h2 className="section-header">Subjects</h2>
        <SubjectList subjects={semesterSubjects} semesterId={semesterId} />
      </div>
    </div>
  )
}
