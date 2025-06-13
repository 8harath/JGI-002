import Link from "next/link"
import { notFound } from "next/navigation"
import { semesters } from "@/data/semesters"
import { subjects } from "@/data/subjects"
import { ArrowLeft, Languages } from "lucide-react"
import { FileExplorer } from "@/components/file-explorer"

const languageNames: Record<string, string> = {
  kannada: "Kannada",
  hindi: "Hindi",
  sanskrit: "Sanskrit",
}

export function generateStaticParams() {
  const params = []
  for (const semester of semesters.filter((s) => s.isActive)) {
    for (const language of Object.keys(languageNames)) {
      params.push({
        id: semester.id.toString(),
        language,
      })
    }
  }
  return params
}

export default function LanguagePage({
  params,
}: {
  params: { id: string; language: string }
}) {
  const semesterId = Number.parseInt(params.id)
  const semester = semesters.find((s) => s.id === semesterId)
  const subject = subjects.find((s) => s.semesterId === semesterId && s.slug === "languages")
  const languageName = languageNames[params.language]

  if (!semester || !semester.isActive || !subject || !languageName) {
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
      <div className="mb-8">
        <Link href={`/semester/${semesterId}/languages`} className="back-button mb-4">
          <ArrowLeft size={16} />
          Back to Languages
        </Link>
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-primary p-3 border-2 border-foreground">
            <Languages className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold gradient-text">{languageName}</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          {semesterId === 1
            ? `Learn ${languageName} language basics and fundamentals`
            : `Advanced ${languageName} language studies and literature`}
        </p>
      </div>

      <div className="mb-8">
        <h2 className="section-header">Materials</h2>
        <FileExplorer folders={folders} subject={subject} />
      </div>
    </div>
  )
} 