"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, Download, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react"

interface PDFViewerProps {
  isOpen: boolean
  onClose: () => void
  pdfUrl: string
  fileName: string
}

export function PDFViewer({ isOpen, onClose, pdfUrl, fileName }: PDFViewerProps) {
  const [scale, setScale] = useState(1.0)

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 3.0))
  }

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.5))
  }

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = pdfUrl
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] w-full h-[95vh] p-0 gap-0 bg-background">
        <DialogHeader className="px-4 py-3 border-b-2 border-accent bg-card">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-base sm:text-lg font-bold text-foreground truncate pr-4">
              {fileName}
            </DialogTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleZoomOut}
                className="h-8 w-8 p-0 border-2 border-accent"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium min-w-[60px] text-center">
                {Math.round(scale * 100)}%
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleZoomIn}
                className="h-8 w-8 p-0 border-2 border-accent"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                className="h-8 px-3 border-2 border-accent"
              >
                <Download className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Download</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0 border-2 border-accent"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>
        <div className="flex-1 overflow-auto bg-muted/30 p-4">
          <div className="flex justify-center">
            <div
              style={{
                transform: `scale(${scale})`,
                transformOrigin: "top center",
                transition: "transform 0.2s ease",
              }}
              className="bg-white shadow-lg"
            >
              <iframe
                src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1`}
                className="w-[210mm] h-[297mm] border-0"
                title={fileName}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
