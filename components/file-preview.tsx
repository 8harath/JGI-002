"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Download, X } from "lucide-react"
import { Document, Page, pdfjs } from "react-pdf"

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

interface FilePreviewProps {
  filePath: string
  onClose: () => void
}

export function FilePreview({ filePath, onClose }: FilePreviewProps) {
  const [numPages, setNumPages] = useState<number | null>(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [containerWidth, setContainerWidth] = useState<number | null>(null)
  const [fileSize, setFileSize] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const isPdf = filePath.toLowerCase().endsWith(".pdf")
  const MAX_PDF_SIZE = 15 * 1024 * 1024 // 15MB limit for browser preview

  // Check file size before loading PDF
  useEffect(() => {
    if (!isPdf) return

    const checkFileSize = async () => {
      try {
        const response = await fetch(filePath, { method: 'HEAD' })
        const size = parseInt(response.headers.get('content-length') || '0')
        setFileSize(size)

        if (size > MAX_PDF_SIZE) {
          setError(
            `File is too large to preview (${(size / 1024 / 1024).toFixed(1)}MB). Maximum size is ${MAX_PDF_SIZE / 1024 / 1024}MB. Please download to view.`
          )
          setLoading(false)
        }
      } catch (err) {
        console.error('Failed to check file size:', err)
        // Continue loading if we can't check size
      }
    }

    checkFileSize()
  }, [filePath, isPdf, MAX_PDF_SIZE])

  useEffect(() => {
    function updateWidth() {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      }
    }
    updateWidth()
    window.addEventListener("resize", updateWidth)
    return () => window.removeEventListener("resize", updateWidth)
  }, [])

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
        <div ref={containerRef} className="border-2 border-accent rounded-md p-4 min-h-[400px] overflow-auto" style={{ maxHeight: '80vh' }}>
          {isPdf ? (
            <div className="w-full flex flex-col">
              {loading && !error && <div className="animate-pulse text-muted-foreground">Loading PDF...</div>}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded p-4 text-red-700">
                  <p className="font-semibold mb-2">Cannot Preview File</p>
                  <p className="text-sm">{error}</p>
                </div>
              )}
              {!error && fileSize !== null && fileSize <= MAX_PDF_SIZE && (
                <Document
                  file={filePath}
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={onDocumentLoadError}
                  loading=""
                  error=""
                >
                  <Page pageNumber={pageNumber} width={containerWidth || undefined} />
                </Document>
              )}
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
