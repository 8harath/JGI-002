import Link from "next/link"
import { notFound } from "next/navigation"
import { FileExplorer } from "@/components/file-explorer"
import { subjects } from "@/data/subjects"
import { getResourceFolders, getResourceFolderDisplayName } from "@/lib/resource-folders"

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

  const folders = getResourceFolders(subject).map(folderName => {
    const displayName = getResourceFolderDisplayName(folderName)
    let description = ""
    
    switch (folderName) {
      case "tlep":
        description = "Teaching Learning Evaluation Plans"
        break
      case "notes":
        description = "Lecture notes and study materials"
        break
      case "presentations":
        description = "PPT slides and visual content"
        break
      case "activity-1":
        description = "First activity/assignment materials"
        break
      case "activity-2":
        description = "Second activity/assignment materials"
        break
      case "previous-year-papers":
        description = "Exam papers and solutions"
        break
      case "programs":
        description = "Lab programs and source code"
        break
      case "outputs":
        description = "Program outputs and results"
        break
      default:
        description = `${displayName} materials`
    }
    
    return { name: displayName, description }
  })

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
