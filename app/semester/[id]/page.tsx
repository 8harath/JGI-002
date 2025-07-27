import Link from "next/link"
import { notFound } from "next/navigation"
import { SubjectList } from "@/components/subject-list"
import { semesters } from "@/data/semesters"
import { subjects } from "@/data/subjects"
import { ArrowLeft, Search as SearchIcon } from "lucide-react"
import { Search } from "@/components/search"

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
    <div className="container mx-auto px-4 py-4 md:py-8">
      {/* Mobile-optimized header */}
      <div className="mb-4 md:mb-6">
        <Link href="/" className="mobile-back-button mb-3 md:mb-4">
          <ArrowLeft size={14} />
          <span className="text-sm font-medium">Back</span>
        </Link>
        
        <div className="flex items-center justify-between mb-3 md:mb-2">
          <h1 className="text-xl md:text-3xl font-bold text-foreground">{semester.name}</h1>
          
          {/* Quick search access for mobile */}
          <button
            className="md:hidden mobile-action-button"
            onClick={() => {
              document.dispatchEvent(new KeyboardEvent('keydown', {
                key: 'k',
                ctrlKey: true
              }))
            }}
            aria-label="Search subjects"
          >
            <SearchIcon size={16} />
          </button>
        </div>
        
        <p className="text-sm md:text-base text-muted-foreground hidden md:block">
          {semester.description}
        </p>
      </div>

      {/* Mobile search bar - contextual */}
      <div className="md:hidden mb-6">
        <div className="bg-card border-2 border-foreground p-3 rounded-lg">
          <Search />
        </div>
      </div>

      {/* Subjects section */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold uppercase border-b-2 border-accent pb-1 md:pb-2">
            Subjects ({semesterSubjects.length})
          </h2>
        </div>
        <SubjectList subjects={semesterSubjects} semesterId={semesterId} />
      </div>
    </div>
  )
}
