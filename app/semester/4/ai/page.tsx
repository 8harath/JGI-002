import Link from "next/link"
import { SubjectList } from "@/components/subject-list"
import { subjects } from "@/data/subjects"
import { ArrowLeft, Brain } from "lucide-react"

export default function AIPage() {
  const aiSubjects = subjects.filter((subject) => subject.semesterId === 4)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/semester/4" className="back-button mb-4">
          <ArrowLeft size={16} />
          Back to Semester 4
        </Link>
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-primary p-3 border-2 border-foreground">
            <Brain className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold gradient-text">Artificial Intelligence</h1>
        </div>
        <p className="text-muted-foreground text-lg">Explore machine learning, neural networks, and AI applications</p>
      </div>

      <div className="mb-8">
        <h2 className="section-header">Subjects</h2>
        <SubjectList subjects={aiSubjects} semesterId={4} specializationPath="ai" />
      </div>
    </div>
  )
}
