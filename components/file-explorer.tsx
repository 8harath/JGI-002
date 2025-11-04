"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileIcon, FolderIcon, Loader2 } from "lucide-react"
import { PDFViewer } from "@/components/pdf-viewer"
import type { Subject } from "@/types"

interface FileItem {
  name: string
  path: string
  size: string
  type: string
  category: string
}

interface FolderCategory {
  name: string
  description: string
  files: FileItem[]
}

interface FileExplorerProps {
  subject: Subject
}

export function FileExplorer({ subject }: FileExplorerProps) {
  const [categories, setCategories] = useState<FolderCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedFolder, setSelectedFolder] = useState<string>("")
  const [pdfViewerOpen, setPdfViewerOpen] = useState(false)
  const [selectedPdf, setSelectedPdf] = useState<{ url: string; name: string } | null>(null)

  const handleFileClick = (file: FileItem) => {
    // Check if file is a PDF
    if (file.type.toUpperCase() === 'PDF' || file.name.toLowerCase().endsWith('.pdf')) {
      setSelectedPdf({ url: file.path, name: file.name })
      setPdfViewerOpen(true)
    } else {
      // For non-PDF files, open in new tab
      window.open(file.path, '_blank')
    }
  }

  useEffect(() => {
    async function fetchFiles() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(
          `/api/subject-files?semesterId=${subject.semesterId}&subjectSlug=${subject.slug}`
        )

        if (!response.ok) {
          throw new Error("Failed to fetch files")
        }

        const data = await response.json()

        if (data.success && data.data.length > 0) {
          setCategories(data.data)
          setSelectedFolder(data.data[0].name)
        } else {
          setCategories([])
        }
      } catch (err) {
        console.error("Error fetching files:", err)
        setError("Failed to load files. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchFiles()
  }, [subject.semesterId, subject.slug])

  if (loading) {
    return (
      <Card className="retro-card">
        <CardContent className="p-6 sm:p-8 md:p-12">
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-accent animate-spin mb-4" />
            <p className="text-sm sm:text-base text-muted-foreground">Loading files...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="retro-card">
        <CardContent className="p-6 sm:p-8 md:p-12">
          <div className="text-center py-12">
            <FolderIcon className="h-12 w-12 sm:h-16 sm:w-16 text-accent/50 mx-auto mb-4" />
            <h4 className="text-base sm:text-lg md:text-xl font-bold text-foreground mb-2">Error Loading Files</h4>
            <p className="text-sm sm:text-base text-muted-foreground">{error}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (categories.length === 0) {
    return (
      <Card className="retro-card">
        <CardContent className="p-6 sm:p-8 md:p-12">
          <div className="text-center py-12 border-2 border-dashed border-accent rounded-lg bg-card">
            <FolderIcon className="h-12 w-12 sm:h-16 sm:w-16 text-accent mx-auto mb-4" />
            <h4 className="text-base sm:text-lg md:text-xl font-bold text-foreground mb-2">No Files Available</h4>
            <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto px-4">
              No files have been uploaded for this subject yet. If you have access to materials, please{" "}
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
        </CardContent>
      </Card>
    )
  }

  return (
    <div>
      <Tabs value={selectedFolder} onValueChange={setSelectedFolder}>
        <TabsList className="mb-4 sm:mb-6 flex flex-nowrap md:flex-wrap overflow-x-auto md:overflow-x-visible pb-1 scrollbar-hide snap-x snap-mandatory md:snap-none relative bg-background">
          {categories.map((category) => (
            <TabsTrigger
              key={category.name}
              value={category.name}
              className="mb-1 sm:mb-2 border-t-2 border-t-accent data-[state=active]:border-t-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border-2 border-foreground text-xs sm:text-sm whitespace-nowrap mx-0.5 sm:mx-1 snap-center min-w-[100px] sm:min-w-[120px] px-3 sm:px-4 py-2"
            >
              {category.name}
            </TabsTrigger>
          ))}
          {/* Gradient overlay for right edge, only on mobile */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-background to-transparent z-10 md:hidden" />
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.name} value={category.name}>
            <Card className="retro-card">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-foreground mb-1 sm:mb-2">{category.name}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">{category.description}</p>

                {category.files.length > 0 ? (
                  <div>
                    <div className="border-2 border-accent rounded-lg overflow-hidden">
                      <div className="bg-card px-3 sm:px-4 py-2 sm:py-3 border-b-2 border-accent">
                        <div className="grid grid-cols-12 text-xs sm:text-sm font-semibold text-foreground">
                          <div className="col-span-6">Name</div>
                          <div className="col-span-3">Type</div>
                          <div className="col-span-3">Size</div>
                        </div>
                      </div>
                      <div className="divide-y divide-accent/30">
                        {category.files.map((file, index) => (
                          <div
                            key={`${file.name}-${index}`}
                            className="grid grid-cols-12 px-3 sm:px-4 py-2 sm:py-3 hover:bg-accent/10 cursor-pointer transition-colors animate-fade-in"
                            style={{ animationDelay: `${index * 0.05}s` }}
                            onClick={() => handleFileClick(file)}
                          >
                            <div className="col-span-6 flex items-center gap-2 min-w-0">
                              <FileIcon className="h-3 w-3 sm:h-4 sm:w-4 text-accent flex-shrink-0" />
                              <span className="text-xs sm:text-sm font-medium text-foreground truncate">
                                {file.name}
                              </span>
                            </div>
                            <div className="col-span-3 text-xs sm:text-sm text-muted-foreground font-medium uppercase">
                              {file.type}
                            </div>
                            <div className="col-span-3 text-xs sm:text-sm text-muted-foreground">{file.size}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 border-2 border-dashed border-accent rounded-lg bg-card">
                    <FolderIcon className="h-12 w-12 sm:h-16 sm:w-16 text-accent mx-auto mb-3" />
                    <h4 className="text-sm sm:text-base font-bold text-foreground mb-1">No files in this category</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Files will appear here once they are uploaded.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* PDF Viewer Modal */}
      {selectedPdf && (
        <PDFViewer
          isOpen={pdfViewerOpen}
          onClose={() => {
            setPdfViewerOpen(false)
            setSelectedPdf(null)
          }}
          pdfUrl={selectedPdf.url}
          fileName={selectedPdf.name}
        />
      )}
    </div>
  )
}
