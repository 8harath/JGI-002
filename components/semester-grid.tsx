"use client"

import Link from "next/link"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Lock, AlertCircle, X, Github, Mail } from "lucide-react"
import { semesters } from "@/data/semesters"

export function SemesterGrid() {
  const [showPopup, setShowPopup] = useState<number | null>(null)

  const handleInactiveSemesterClick = (semesterId: number) => {
    setShowPopup(semesterId)
  }

  const closePopup = () => {
    setShowPopup(null)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
      {semesters.map((semester, index) => (
        <div key={semester.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
          {semester.isActive ? (
            <Link href={`/semester/${semester.id}`}>
              <Card className="semester-card group">
                <CardContent className="p-3 sm:p-4 md:p-6">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className="bg-primary p-2 sm:p-2 md:p-3 border-2 border-foreground flex-shrink-0">
                      <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-primary-foreground" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                        {semester.name}
                      </h3>
                      <p className="text-xs sm:text-xs md:text-sm text-secondary font-medium">{semester.subjectCount} subjects</p>
                    </div>
                  </div>
                  <p className="text-xs sm:text-xs md:text-sm text-muted-foreground leading-relaxed">{semester.description}</p>
                </CardContent>
              </Card>
            </Link>
          ) : (
            <>
              <Card
                className="semester-card opacity-90 hover:opacity-100"
                onClick={() => handleInactiveSemesterClick(semester.id)}
              >
                <CardContent className="p-3 sm:p-4 md:p-6">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className="bg-muted p-2 sm:p-2 md:p-3 border-2 border-foreground flex-shrink-0">
                      <Lock className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-muted-foreground" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-foreground leading-tight">{semester.name}</h3>
                      <p className="text-xs sm:text-xs md:text-sm text-muted-foreground font-medium">Coming Soon</p>
                    </div>
                  </div>
                  <p className="text-xs sm:text-xs md:text-sm text-muted-foreground leading-relaxed">{semester.description}</p>
                </CardContent>
              </Card>

              {showPopup === semester.id && (
                <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
                  <div className="bg-card border-2 border-foreground p-4 sm:p-5 rounded-lg max-w-sm w-full relative animate-fade-in max-h-[90vh] overflow-y-auto">
                    {/* Close button */}
                    <button
                      onClick={closePopup}
                      className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 bg-primary text-primary-foreground w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
                      aria-label="Close popup"
                    >
                      <X size={16} className="sm:hidden" />
                      <X size={18} className="hidden sm:block" />
                    </button>

                    {/* Header */}
                    <div className="text-center mb-3 sm:mb-4">
                      <div className="bg-accent/20 p-2 sm:p-3 rounded-full inline-block mb-2 sm:mb-3">
                        <AlertCircle className="h-6 w-6 sm:h-8 sm:w-8 text-accent" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold gradient-text mb-1">{semester.name} Resources</h3>
                      <p className="text-xs text-muted-foreground">Coming soon! Help us build this collection.</p>
                    </div>

                    {/* Content - Simplified for mobile */}
                    <div className="space-y-3 sm:space-y-4">
                      <div className="bg-accent/10 border-2 border-accent p-2 sm:p-3 rounded-lg">
                        <p className="text-xs sm:text-sm text-foreground leading-relaxed">
                          We're looking for lecture notes, question papers, assignments, and other study materials for{" "}
                          {semester.name}.
                        </p>
                      </div>

                      <div className="flex flex-col gap-2">
                        <a
                          href="https://github.com/8harath/JGI-002"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="keyboard-button text-xs sm:text-sm w-full py-2 sm:py-2"
                        >
                          <Github className="h-3 w-3 sm:h-4 sm:w-4 mr-1 inline" />
                          Contribute via GitHub
                        </a>
                        <Link href="/contact" className="keyboard-button text-xs sm:text-sm w-full py-2 sm:py-2" onClick={closePopup}>
                          <Mail className="h-3 w-3 sm:h-4 sm:w-4 mr-1 inline" />
                          Contact Us
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  )
}
