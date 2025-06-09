import Link from "next/link"
import { notFound } from "next/navigation"
import { FileExplorer } from "@/components/file-explorer"
import { subjects } from "@/data/subjects"

export function generateStaticParams() {
  const daSubjects = subjects.filter((subject) => subject.semesterId === 4)

  return daSubjects.map((subject) => ({
    subject: subject.slug,
  }))
}

export default function DASubjectPage({
  params,
}: {
  params: { subject: string }
}) {
  const subjectSlug = params.subject
  const subject = subjects.find((s) => s.semesterId === 4 && s.slug === subjectSlug)

  if (!subject) {
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
        <Link
          href="/semester/4/da"
          className="text-purple-600 hover:text-purple-700 flex items-center gap-1 mb-4 font-medium hover:underline"
        >
          ← Back to Data Analytics
        </Link>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          {subject.name}
        </h1>
        <p className="text-slate-600 text-lg">{subject.description}</p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Materials</h2>
        <FileExplorer folders={folders} subject={subject} />
      </div>
    </div>
  )
}
