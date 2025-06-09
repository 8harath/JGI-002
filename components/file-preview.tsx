"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Download, X } from "lucide-react"

interface FilePreviewProps {
  filePath: string
  onClose: () => void
}

export function FilePreview({ filePath, onClose }: FilePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // In a real implementation, we would use PDF.js to render the PDF
    // For this demo, we'll just show a placeholder
    const loadPDF = async () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = `
          <div class="bg-card p-4 rounded text-center">
            <p class="text-foreground">PDF Preview would be rendered here using PDF.js</p>
            <p class="text-sm text-muted-foreground mt-2">File: ${filePath}</p>
          </div>
        `
      }
    }

    loadPDF()
  }, [filePath])

  return (
    <Card className="retro-card">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-foreground">File Preview</h3>
          <div className="flex gap-2">
            <button className="keyboard-button text-sm relative" onClick={() => window.open(filePath, "_blank")}>
              <Download className="h-4 w-4 mr-1 inline" />
              Download
            </button>
            <button className="back-button" onClick={onClose}>
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="border-2 border-accent rounded-md p-4 min-h-[400px]" ref={containerRef}>
          <div className="flex items-center justify-center h-full">
            <div className="animate-pulse text-muted-foreground">Loading preview...</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
