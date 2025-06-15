import Link from "next/link"
import { notFound } from "next/navigation"
import { LanguageSelector } from "@/components/language-selector"
import { semesters } from "@/data/semesters"
import { subjects } from "@/data/subjects"
import { ArrowLeft, Languages } from "lucide-react"

export function generateStaticParams() {
  return semesters
    .filter((semester) => semester.isActive)
    .map((semester) => ({
      id: semester.id.toString(),
    }))
}

export default function LanguagesPage({ params }: { params: { id: string } }) {
  const semesterId = Number.parseInt(params.id)
  const semester = semesters.find((s) => s.id === semesterId)
  const subject = subjects.find((s) => 
    s.semesterId === semesterId && 
    (s.slug === "languages" || s.slug === "languages-2")
  )

  if (!semester || !semester.isActive || !subject) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href={`/semester/${semesterId}`} className="back-button mb-4">
          <ArrowLeft size={16} />
          Back to {semester.name}
        </Link>
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-primary p-3 border-2 border-foreground">
            <Languages className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold gradient-text">Languages</h1>
        </div>
        <p className="text-muted-foreground text-lg">{subject.description}</p>
      </div>

      <div className="mb-8">
        <h2 className="section-header">Choose a Language</h2>
        <LanguageSelector semesterId={semesterId} />
      </div>
    </div>
  )
} 