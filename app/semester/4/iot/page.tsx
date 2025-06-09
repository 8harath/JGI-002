import Link from "next/link"
import { SubjectList } from "@/components/subject-list"
import { subjects } from "@/data/subjects"
import { ArrowLeft, Wifi } from "lucide-react"

export default function IoTPage() {
  const iotSubjects = subjects.filter((subject) => subject.semesterId === 4)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link
          href="/semester/4"
          className="text-accent hover:text-primary flex items-center gap-1 mb-4 font-medium transition-colors"
        >
          <ArrowLeft size={18} /> Back to Semester 4
        </Link>
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-primary p-3 border-2 border-foreground">
            <Wifi className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold gradient-text">Internet of Things</h1>
        </div>
        <p className="text-muted-foreground text-lg">Connected devices and IoT applications</p>
      </div>

      <div className="mb-8">
        <h2 className="section-header">Subjects</h2>
        <SubjectList subjects={iotSubjects} semesterId={4} specializationPath="iot" />
      </div>
    </div>
  )
}
