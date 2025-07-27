import Link from "next/link"
import { notFound } from "next/navigation"
import { FileExplorer } from "@/components/file-explorer"
import { semesters } from "@/data/semesters"
import { subjects } from "@/data/subjects"
import { getResourceFolders, getResourceFolderDisplayName } from "@/lib/resource-folders"
import { ArrowLeft, Search as SearchIcon, Home } from "lucide-react"
import { Search } from "@/components/search"

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
      case "previous-year-papers":
        description = "Previous semester exam papers"
        break
      case "presentations":
        description = "PowerPoint presentations and slides"
        break
      case "activity-1":
        description = "Class Activity 1 assignments"
        break
      case "activity-2":
        description = "Class Activity 2 assignments"
        break
      default:
        description = `${displayName} resources and materials`
    }
    
    return {
      name: displayName,
      description
    }
  })

  return (
    <div className="container mx-auto px-4 py-4 md:py-8">
      {/* Mobile-optimized header with breadcrumb navigation */}
      <div className="mb-4 md:mb-6">
        <div className="flex items-center justify-between mb-3">
          {/* Breadcrumb navigation for mobile */}
          <div className="flex items-center gap-2">
            <Link href="/" className="mobile-breadcrumb-link">
              <Home size={14} />
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link href={`/semester/${semesterId}`} className="mobile-breadcrumb-link">
              {semester.name}
            </Link>
          </div>
          
          {/* Quick search for mobile */}
          <button
            className="md:hidden mobile-action-button"
            onClick={() => {
              document.dispatchEvent(new KeyboardEvent('keydown', {
                key: 'k',
                ctrlKey: true
              }))
            }}
            aria-label="Search resources"
          >
            <SearchIcon size={16} />
          </button>
        </div>
        
        <Link href={`/semester/${semesterId}`} className="mobile-back-button mb-3 md:mb-4">
          <ArrowLeft size={14} />
          <span className="text-sm font-medium">Back to {semester.name}</span>
        </Link>
        
        <div className="mb-3">
          <h1 className="text-lg md:text-2xl lg:text-3xl font-bold text-foreground mb-1">
            {subject.name}
          </h1>
          <p className="text-sm md:text-base text-muted-foreground hidden md:block">
            {subject.description}
          </p>
        </div>
      </div>

      {/* Mobile contextual search */}
      <div className="md:hidden mb-6">
        <div className="bg-card border-2 border-foreground p-3 rounded-lg">
          <Search />
        </div>
      </div>

      {/* File explorer section */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold uppercase border-b-2 border-accent pb-1 md:pb-2">
            Resources
          </h2>
        </div>
        
        {folders.length > 0 ? (
          <FileExplorer folders={folders} subject={subject} />
        ) : (
          <div className="text-center py-12 md:py-16">
            <div className="bg-card border-2 border-dashed border-accent rounded-lg p-6 md:p-8">
              <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">No resources yet</h3>
              <p className="text-sm md:text-base text-muted-foreground mb-4">
                Help build this collection by contributing study materials.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="https://github.com/8harath/JGI-002"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-action-button-large"
                >
                  Contribute Resources
                </a>
                <Link href="/contact" className="mobile-action-button-large secondary">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
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
