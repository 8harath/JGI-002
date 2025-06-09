import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Book, Code, Database, Globe, FileText, Terminal, Server, Shield, Cpu, BarChart3 } from "lucide-react"
import type { Subject } from "@/types"

interface SubjectListProps {
  subjects: Subject[]
  semesterId: number
  specializationPath?: string
}

// Map subject names to appropriate icons
const getSubjectIcon = (subjectName: string) => {
  const name = subjectName.toLowerCase()

  if (name.includes("programming") || name.includes("python") || name.includes("java") || name.includes("c ")) {
    return Code
  } else if (name.includes("data") || name.includes("database") || name.includes("dbms")) {
    return Database
  } else if (name.includes("network") || name.includes("internet") || name.includes("web")) {
    return Globe
  } else if (name.includes("operating") || name.includes("system")) {
    return Server
  } else if (name.includes("security") || name.includes("cyber")) {
    return Shield
  } else if (name.includes("hardware") || name.includes("digital")) {
    return Cpu
  } else if (name.includes("analytics") || name.includes("statistics")) {
    return BarChart3
  } else if (name.includes("lab")) {
    return Terminal
  } else if (name.includes("english") || name.includes("language") || name.includes("constitution")) {
    return FileText
  } else {
    return Book
  }
}

export function SubjectList({ subjects, semesterId, specializationPath }: SubjectListProps) {
  const getSubjectPath = (subject: Subject) => {
    if (specializationPath) {
      return `/semester/${semesterId}/${specializationPath}/${subject.slug}`
    }
    return `/semester/${semesterId}/${subject.slug}`
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {subjects.map((subject, index) => {
        const SubjectIcon = getSubjectIcon(subject.name)

        return (
          <div key={subject.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
            <Link href={getSubjectPath(subject)}>
              <Card className="subject-card group">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary p-2 border-2 border-foreground mt-1 flex-shrink-0">
                      <SubjectIcon className="h-4 w-4 md:h-5 md:w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm md:text-base text-foreground group-hover:text-primary transition-colors mb-1">
                        {subject.name}
                      </h3>
                      <p className="text-xs md:text-sm text-muted-foreground">{subject.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        )
      })}
    </div>
  )
}
