"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Download, X } from "lucide-react"
import { Document, Page, pdfjs } from "react-pdf"

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

interface FilePreviewProps {
  filePath: string
  onClose: () => void
}

export function FilePreview({ filePath, onClose }: FilePreviewProps) {
  const [numPages, setNumPages] = useState<number | null>(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const isPdf = filePath.toLowerCase().endsWith(".pdf")

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
    setLoading(false)
  }

  function onDocumentLoadError(error: any) {
    setError("Failed to load PDF.")
    setLoading(false)
  }

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
        <div className="border-2 border-accent rounded-md p-4 min-h-[400px] flex items-center justify-center">
          {isPdf ? (
            <div className="w-full flex flex-col items-center">
              {loading && <div className="animate-pulse text-muted-foreground">Loading PDF...</div>}
              {error && <div className="text-red-500">{error}</div>}
              <Document
                file={filePath}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading=""
                error=""
              >
                <Page pageNumber={pageNumber} width={600} />
              </Document>
              {numPages && numPages > 1 && (
                <div className="flex gap-2 mt-4">
                  <button
                    className="keyboard-button"
                    onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
                    disabled={pageNumber === 1}
                  >
                    Previous
                  </button>
                  <span className="text-xs text-muted-foreground">
                    Page {pageNumber} of {numPages}
                  </span>
                  <button
                    className="keyboard-button"
                    onClick={() => setPageNumber((p) => Math.min(numPages!, p + 1))}
                    disabled={pageNumber === numPages}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-card p-4 rounded text-center">
              <p className="text-foreground">Preview not available for this file type.</p>
              <p className="text-sm text-muted-foreground mt-2">File: {filePath}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
