"use client"

import Link from "next/link"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FilePreview } from "@/components/file-preview"
import { FileIcon, FolderIcon } from "lucide-react"
import type { Subject } from "@/types"

interface Folder {
  name: string
  description: string
}

interface FileExplorerProps {
  folders: Folder[]
  subject: Subject
}

// Mock files for demonstration
const mockFiles = [
  {
    name: "Lecture_1_Introduction.pdf",
    path: "/assets/documents/sample.pdf",
    size: "1.2 MB",
    type: "pdf",
  },
  {
    name: "Assignment_Guidelines.docx",
    path: "/assets/documents/sample.pdf",
    size: "450 KB",
    type: "docx",
  },
  {
    name: "Course_Overview.pptx",
    path: "/assets/documents/sample.pdf",
    size: "2.8 MB",
    type: "pptx",
  },
]

export function FileExplorer({ folders, subject }: FileExplorerProps) {
  const [selectedFolder, setSelectedFolder] = useState(folders[0].name)
  const [selectedFile, setSelectedFile] = useState<string | null>(null)

  // For demonstration, we'll show files only in the Notes folder
  const hasFiles = selectedFolder === "Notes"

  return (
    <div>
      <Tabs defaultValue={folders[0].name} onValueChange={setSelectedFolder}>
        <TabsList className="mb-4 md:mb-6 flex flex-wrap bg-background overflow-x-auto pb-1 scrollbar-hide">
          {folders.map((folder) => (
            <TabsTrigger
              key={folder.name}
              value={folder.name}
              className="mb-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border-2 border-foreground text-xs md:text-sm whitespace-nowrap"
            >
              {folder.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {folders.map((folder) => (
          <TabsContent key={folder.name} value={folder.name}>
            <Card className="retro-card">
              <CardContent className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-1 md:mb-2">{folder.name}</h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">{folder.description}</p>

                {hasFiles && folder.name === "Notes" ? (
                  <div>
                    <div className="border-2 border-accent rounded-lg overflow-hidden">
                      <div className="bg-card px-3 md:px-4 py-2 md:py-3 border-b-2 border-accent">
                        <div className="grid grid-cols-12 text-xs md:text-sm font-semibold text-foreground">
                          <div className="col-span-6">Name</div>
                          <div className="col-span-3">Type</div>
                          <div className="col-span-3">Size</div>
                        </div>
                      </div>
                      <div className="divide-y divide-accent/30">
                        {mockFiles.map((file, index) => (
                          <div
                            key={file.name}
                            className="grid grid-cols-12 px-3 md:px-4 py-2 md:py-3 hover:bg-accent/10 cursor-pointer transition-colors animate-fade-in"
                            style={{ animationDelay: `${index * 0.1}s` }}
                            onClick={() => setSelectedFile(file.path)}
                          >
                            <div className="col-span-6 flex items-center gap-1 md:gap-2">
                              <FileIcon className="h-3 w-3 md:h-4 md:w-4 text-accent flex-shrink-0" />
                              <span className="text-xs md:text-sm font-medium text-foreground truncate">
                                {file.name}
                              </span>
                            </div>
                            <div className="col-span-3 text-xs md:text-sm text-muted-foreground font-medium">
                              {file.type.toUpperCase()}
                            </div>
                            <div className="col-span-3 text-xs md:text-sm text-muted-foreground">{file.size}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {selectedFile && (
                      <div className="mt-4 md:mt-6">
                        <FilePreview filePath={selectedFile} onClose={() => setSelectedFile(null)} />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8 md:py-12 border-2 border-dashed border-accent rounded-lg bg-card">
                    <FolderIcon className="h-10 w-10 md:h-16 md:w-16 text-accent mx-auto mb-3 md:mb-4" />
                    <h4 className="text-base md:text-xl font-bold text-foreground mb-1 md:mb-2">No files available</h4>
                    <p className="text-xs md:text-sm text-muted-foreground max-w-md mx-auto px-2">
                      No files have been uploaded for this section yet. If you have access to materials, please{" "}
                      <a href="https://github.com" className="text-accent hover:underline font-semibold">
                        contribute
                      </a>{" "}
                      or{" "}
                      <Link href="/contact" className="text-accent hover:underline font-semibold">
                        contact us
                      </Link>
                      .
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
