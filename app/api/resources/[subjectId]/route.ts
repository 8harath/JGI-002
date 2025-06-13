import { NextResponse } from "next/server"
import { subjects } from "@/data/subjects"
import { ResourceFolder } from "@/types"

// This would typically come from a database
const getSubjectResources = (subjectId: number): ResourceFolder[] => {
  const subject = subjects.find((s) => s.id === subjectId)
  if (!subject) return []

  return [
    {
      name: "TLEP",
      description: "Teaching Learning Evaluation Plans",
      type: "tlep",
      resources: [
        {
          id: "tlep-1",
          name: "TLEP Document",
          type: "file",
          path: "tlep/main.pdf",
          fileType: "pdf"
        }
      ]
    },
    {
      name: "Notes",
      description: "Lecture notes and study materials",
      type: "notes",
      resources: [
        {
          id: "module-1",
          name: "Module 1",
          type: "folder",
          path: "notes/module-1",
          moduleNumber: 1,
          children: [
            {
              id: "module-1-notes",
              name: "Module 1 Notes",
              type: "file",
              path: "notes/module-1/notes.pdf",
              fileType: "pdf"
            }
          ]
        },
        {
          id: "module-2",
          name: "Module 2",
          type: "folder",
          path: "notes/module-2",
          moduleNumber: 2,
          children: [
            {
              id: "module-2-notes",
              name: "Module 2 Notes",
              type: "file",
              path: "notes/module-2/notes.pdf",
              fileType: "pdf"
            }
          ]
        }
        // Add more modules as needed
      ]
    },
    {
      name: "Presentations",
      description: "PPT slides and visual content",
      type: "presentations",
      resources: [
        {
          id: "module-1-ppt",
          name: "Module 1",
          type: "folder",
          path: "presentations/module-1",
          moduleNumber: 1,
          children: [
            {
              id: "module-1-slides",
              name: "Module 1 Slides",
              type: "file",
              path: "presentations/module-1/slides.pptx",
              fileType: "ppt"
            }
          ]
        }
        // Add more modules as needed
      ]
    },
    {
      name: "Activity 1",
      description: "First activity/assignment materials",
      type: "activity",
      resources: [
        {
          id: "activity-1-code",
          name: "Project Code",
          type: "file",
          path: "activity-1/code.zip",
          fileType: "code"
        },
        {
          id: "activity-1-doc",
          name: "Documentation",
          type: "file",
          path: "activity-1/documentation.pdf",
          fileType: "documentation"
        }
      ]
    },
    {
      name: "Activity 2",
      description: "Second activity/assignment materials",
      type: "activity",
      resources: [
        {
          id: "activity-2-code",
          name: "Project Code",
          type: "file",
          path: "activity-2/code.zip",
          fileType: "code"
        },
        {
          id: "activity-2-cert",
          name: "Certification",
          type: "file",
          path: "activity-2/certification.pdf",
          fileType: "certification"
        }
      ]
    },
    {
      name: "Previous Year Papers",
      description: "Exam papers and solutions",
      type: "papers",
      resources: [
        {
          id: "paper-2023",
          name: "2023 Question Paper",
          type: "file",
          path: "papers/2023.pdf",
          fileType: "pdf"
        }
      ]
    }
  ]
}

export async function GET(
  request: Request,
  { params }: { params: { subjectId: string } }
) {
  const subjectId = parseInt(params.subjectId)
  const resources = getSubjectResources(subjectId)
  
  return NextResponse.json(resources)
} 