"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Github, Star, Calendar, Code, BookOpen, Award, X } from "lucide-react"
import { contributors } from "@/data/contributors"

interface ContributorsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ContributorsModal({ isOpen, onClose }: ContributorsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] md:max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-2 border-foreground p-4 md:p-6">
        <div className="absolute -top-3 -right-3 bg-primary text-primary-foreground w-8 h-8 rounded-full border-2 border-foreground flex items-center justify-center hover:bg-primary/90 transition-colors">
          <button onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <DialogHeader className="border-b-2 border-accent pb-4 mb-6">
          <DialogTitle className="text-2xl md:text-3xl font-bold gradient-text text-center">
            Our Amazing Contributors
          </DialogTitle>
          <p className="text-center text-muted-foreground mt-2 text-sm md:text-base">
            These dedicated students have helped build this resource archive
          </p>
        </DialogHeader>

        {/* Stats Section - Responsive */}
        <div className="grid grid-cols-3 gap-2 md:gap-4 mb-6">
          <Card className="retro-card">
            <CardContent className="p-3 md:p-4 text-center">
              <div className="bg-primary p-2 md:p-3 border-2 border-foreground inline-block mb-1 md:mb-2">
                <Code className="h-4 w-4 md:h-6 md:w-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold text-foreground">{contributors.length}</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Contributors</p>
            </CardContent>
          </Card>
          <Card className="retro-card">
            <CardContent className="p-3 md:p-4 text-center">
              <div className="bg-secondary p-2 md:p-3 border-2 border-foreground inline-block mb-1 md:mb-2">
                <BookOpen className="h-4 w-4 md:h-6 md:w-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold text-foreground">50+</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Resources</p>
            </CardContent>
          </Card>
          <Card className="retro-card">
            <CardContent className="p-3 md:p-4 text-center">
              <div className="bg-accent p-2 md:p-3 border-2 border-foreground inline-block mb-1 md:mb-2">
                <Award className="h-4 w-4 md:h-6 md:w-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold text-foreground">4</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Semesters</p>
            </CardContent>
          </Card>
        </div>

        {/* Contributors Grid - Responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {contributors.map((contributor, index) => (
            <Card key={index} className="retro-card animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-4 md:p-6">
                {/* Header with Avatar and Basic Info */}
                <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
                  <div className="relative">
                    <Avatar className="border-2 border-accent w-12 h-12 md:w-16 md:h-16">
                      <AvatarImage src={`https://github.com/${contributor.github}.png`} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-base md:text-lg">
                        {contributor.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -top-1 -right-1 bg-accent border-2 border-foreground rounded-full p-1">
                      <Star className="h-2 w-2 md:h-3 md:w-3 text-primary-foreground" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base md:text-xl font-bold text-foreground">{contributor.name}</h3>
                    <p className="text-sm text-secondary font-semibold">{contributor.specialization}</p>
                    <div className="flex items-center gap-1 md:gap-2 mt-1">
                      <Calendar className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
                      <span className="text-xs md:text-sm text-muted-foreground">Joined 2024</span>
                    </div>
                  </div>
                  <a
                    href={`https://github.com/${contributor.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="keyboard-button text-xs md:text-sm py-1 px-2 md:px-3"
                    aria-label={`${contributor.name}'s GitHub profile`}
                  >
                    <Github size={14} className="inline mr-1" />
                    GitHub
                  </a>
                </div>

                {/* Contributions Section */}
                <div className="border-t-2 border-accent/30 pt-3 md:pt-4">
                  <h4 className="text-xs md:text-sm font-bold text-foreground mb-2 md:mb-3 flex items-center gap-1 md:gap-2">
                    <BookOpen className="h-3 w-3 md:h-4 md:w-4 text-accent" />
                    Major Contributions ({contributor.contributions.length})
                  </h4>
                  <div className="space-y-1 md:space-y-2 max-h-[120px] overflow-y-auto pr-1">
                    {contributor.contributions.map((contribution, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 p-1 md:p-2 bg-accent/5 border border-accent/20 rounded"
                      >
                        <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-accent rounded-full mt-1.5 flex-shrink-0"></span>
                        <div>
                          <p className="text-xs md:text-sm font-medium text-foreground">{contribution}</p>
                          <p className="text-[10px] md:text-xs text-muted-foreground">Uploaded 2 weeks ago</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="border-t-2 border-accent/30 pt-3 md:pt-4 mt-3 md:mt-4">
                  <div className="grid grid-cols-3 gap-2 md:gap-4 text-center">
                    <div>
                      <p className="text-sm md:text-lg font-bold text-primary">{contributor.contributions.length}</p>
                      <p className="text-[10px] md:text-xs text-muted-foreground">Resources</p>
                    </div>
                    <div>
                      <p className="text-sm md:text-lg font-bold text-secondary">4.8</p>
                      <p className="text-[10px] md:text-xs text-muted-foreground">Rating</p>
                    </div>
                    <div>
                      <p className="text-sm md:text-lg font-bold text-accent">150+</p>
                      <p className="text-[10px] md:text-xs text-muted-foreground">Downloads</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action - Responsive */}
        <div className="mt-6 p-3 md:p-6 bg-accent/10 border-2 border-accent rounded-lg text-center">
          <h3 className="text-lg md:text-xl font-bold text-foreground mb-1 md:mb-2">Want to Contribute?</h3>
          <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
            Join our community of contributors and help fellow students.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 md:gap-3 justify-center">
            <a
              href="https://github.com/8harath/JGI-002"
              target="_blank"
              rel="noopener noreferrer"
              className="keyboard-button text-sm py-1.5"
            >
              <Github className="h-4 w-4 mr-1 inline" />
              Start Contributing
            </a>
            <button className="keyboard-button text-sm py-1.5" onClick={onClose}>
              <BookOpen className="h-4 w-4 mr-1 inline" />
              Browse Resources
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
