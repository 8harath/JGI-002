"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Book } from "lucide-react"

export function LoadingSpinner() {
  return (
    <div className="loading-container">
      <div className="flex flex-col items-center">
        <div className="loading-spinner">
          <div className="relative animate-[page-flip_1.5s_ease-in-out_infinite]">
            <Book size={64} className="text-primary" />
          </div>
        </div>
        <p className="loading-text">Loading resources...</p>
      </div>
    </div>
  )
}

export function PageLoading({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate page loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className={isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-300"}>{children}</div>
    </>
  )
}
