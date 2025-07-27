"use client"

import Link from "next/link"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Lock, AlertCircle, X, Github, Mail, ChevronRight } from "lucide-react"
import { semesters } from "@/data/semesters"
import { useIsMobile } from "@/components/ui/use-mobile"

export function SemesterGrid() {
  const [showPopup, setShowPopup] = useState<number | null>(null)
  const isMobile = useIsMobile()

  const handleInactiveSemesterClick = (semesterId: number) => {
    setShowPopup(semesterId)
  }

  const closePopup = () => {
    setShowPopup(null)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
      {semesters.map((semester, index) => (
        <div key={semester.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
          {semester.isActive ? (
            <Link href={`/semester/${semester.id}`}>
              <Card className="mobile-semester-card group">
                <CardContent className="p-4 md:p-6">
                  {/* Mobile-optimized layout */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary p-2 md:p-3 border-2 border-foreground rounded-md md:rounded-none">
                        <BookOpen className="h-4 w-4 md:h-6 md:w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="text-base md:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {semester.name}
                        </h3>
                        <p className="text-xs md:text-sm text-muted-foreground font-medium">
                          {semester.subjectCount} subjects
                        </p>
                      </div>
                    </div>
                    {/* Visual indicator for mobile */}
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors md:hidden" />
                  </div>
                  
                  {/* Description - hidden on small mobile screens */}
                  <p className="text-xs md:text-sm text-muted-foreground mt-2 hidden xs:block md:block">
                    {semester.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ) : (
            <>
              <Card
                className="mobile-semester-card opacity-75 hover:opacity-90"
                onClick={() => handleInactiveSemesterClick(semester.id)}
              >
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-muted p-2 md:p-3 border-2 border-foreground rounded-md md:rounded-none">
                        <Lock className="h-4 w-4 md:h-6 md:w-6 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="text-base md:text-xl font-bold text-foreground">{semester.name}</h3>
                        <p className="text-xs md:text-sm text-muted-foreground font-medium">Coming Soon</p>
                      </div>
                    </div>
                    <AlertCircle className="h-4 w-4 text-muted-foreground md:hidden" />
                  </div>
                  
                  <p className="text-xs md:text-sm text-muted-foreground mt-2 hidden xs:block md:block">
                    {semester.description}
                  </p>
                </CardContent>
              </Card>

              {/* Mobile-optimized popup */}
              {showPopup === semester.id && (
                <div className="fixed inset-0 bg-foreground/40 backdrop-blur-sm flex items-end md:items-center justify-center z-50">
                  <div className="bg-card border-2 border-foreground w-full md:max-w-sm md:w-full relative animate-slide-up md:animate-fade-in md:rounded-lg">
                    {/* Mobile: Slide up from bottom, Desktop: Center modal */}
                    <div className="p-5 md:p-6 rounded-t-lg md:rounded-lg">
                      {/* Close button - optimized for thumb reach */}
                      <button
                        onClick={closePopup}
                        className="absolute top-3 right-3 md:-top-3 md:-right-3 bg-primary text-primary-foreground w-8 h-8 rounded-full border-2 border-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
                        aria-label="Close"
                      >
                        <X size={16} />
                      </button>

                      {/* Simplified header for mobile */}
                      <div className="text-center mb-4">
                        <div className="bg-accent/20 p-3 rounded-full inline-block mb-3">
                          <AlertCircle className="h-6 w-6 md:h-8 md:w-8 text-accent" />
                        </div>
                        <h3 className="text-lg md:text-xl font-bold gradient-text mb-1">
                          {isMobile ? semester.name : `${semester.name} Resources`}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {isMobile ? "Help us add resources" : "Coming soon! Help us build this collection."}
                        </p>
                      </div>

                      {/* Streamlined content */}
                      <div className="space-y-4">
                        {!isMobile && (
                          <div className="bg-accent/10 border border-accent p-3 rounded-lg">
                            <p className="text-sm text-foreground">
                              We're looking for lecture notes, question papers, assignments, and other study materials for{" "}
                              {semester.name}.
                            </p>
                          </div>
                        )}

                        {/* Touch-friendly action buttons */}
                        <div className="flex flex-col gap-3">
                          <a
                            href="https://github.com/8harath/JGI-002"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mobile-action-button-large"
                          >
                            <Github className="h-5 w-5" />
                            <span className="font-medium">Contribute Resources</span>
                          </a>
                          <Link 
                            href="/contact" 
                            className="mobile-action-button-large secondary" 
                            onClick={closePopup}
                          >
                            <Mail className="h-5 w-5" />
                            <span className="font-medium">Contact Us</span>
                          </Link>
                        </div>
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
