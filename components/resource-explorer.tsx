"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, File, Folder, FileText, Code, Award, BookOpen, Book, Presentation, FlaskConical, ScrollText } from "lucide-react"
import { Resource, ResourceFolder } from "@/types"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

interface ResourceExplorerProps {
  folders: ResourceFolder[]
  subjectId: number
}

// Map folder names to appropriate icons
const getFolderIcon = (folderType: string) => {
  switch (folderType) {
    case 'tlep':
      return ScrollText
    case 'notes':
      return Book
    case 'presentations':
      return Presentation
    case 'activity':
      return FlaskConical
    case 'papers':
      return FileText
    default:
      return Folder
  }
}

export function ResourceExplorer({ folders, subjectId }: ResourceExplorerProps) {
  const [selectedFolder, setSelectedFolder] = useState<ResourceFolder | null>(null)

  if (selectedFolder) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setSelectedFolder(null)}
          className="back-button mb-4"
        >
          <ChevronLeft size={16} />
          Back to Materials
        </button>
        <div className="bg-card rounded-lg border p-4">
          <h3 className="text-lg font-semibold mb-4">{selectedFolder.name}</h3>
          <p className="text-sm text-muted-foreground mb-4">{selectedFolder.description}</p>
          <ResourceTree resources={selectedFolder.resources} subjectId={subjectId} />
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {folders.map((folder, index) => {
        const FolderIcon = getFolderIcon(folder.type)
        return (
          <div key={folder.name} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
            <Card className="subject-card group cursor-pointer" onClick={() => setSelectedFolder(folder)}>
              <CardContent className="p-4 md:p-6">
                <div className="flex items-start gap-3">
                  <div className="bg-primary p-2 border-2 border-foreground mt-1 flex-shrink-0">
                    <FolderIcon className="h-4 w-4 md:h-5 md:w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm md:text-base text-foreground group-hover:text-primary transition-colors mb-1">
                      {folder.name}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground">{folder.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      })}
    </div>
  )
}

interface ResourceTreeProps {
  resources: Resource[]
  subjectId: number
  level?: number
}

function ResourceTree({ resources, subjectId, level = 0 }: ResourceTreeProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set())

  const toggleFolder = (resourceId: string) => {
    const newExpanded = new Set(expandedFolders)
    if (newExpanded.has(resourceId)) {
      newExpanded.delete(resourceId)
    } else {
      newExpanded.add(resourceId)
    }
    setExpandedFolders(newExpanded)
  }

  const getFileIcon = (fileType?: string) => {
    switch (fileType) {
      case 'pdf':
        return <FileText className="h-4 w-4" />
      case 'code':
        return <Code className="h-4 w-4" />
      case 'certification':
        return <Award className="h-4 w-4" />
      case 'documentation':
        return <BookOpen className="h-4 w-4" />
      default:
        return <File className="h-4 w-4" />
    }
  }

  return (
    <div className={cn("space-y-1", level > 0 && "ml-6")}>
      {resources.map((resource) => (
        <div key={resource.id}>
          {resource.type === 'folder' ? (
            <div>
              <button
                onClick={() => toggleFolder(resource.id)}
                className="flex items-center gap-2 text-sm hover:text-primary transition-colors w-full text-left p-2 rounded-md hover:bg-accent"
              >
                {expandedFolders.has(resource.id) ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
                <Folder className="h-4 w-4" />
                <span>{resource.name}</span>
                {resource.moduleNumber && (
                  <span className="text-xs text-muted-foreground">(Module {resource.moduleNumber})</span>
                )}
              </button>
              {expandedFolders.has(resource.id) && resource.children && (
                <ResourceTree resources={resource.children} subjectId={subjectId} level={level + 1} />
              )}
            </div>
          ) : (
            <a
              href={`/${resource.path}`}
              className="flex items-center gap-2 text-sm hover:text-primary transition-colors p-2 rounded-md hover:bg-accent"
            >
              {getFileIcon(resource.fileType)}
              <span>{resource.name}</span>
            </a>
          )}
        </div>
      ))}
    </div>
  )
} 