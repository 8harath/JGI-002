import { SemesterGrid } from "@/components/semester-grid"
import { ContributorsButton } from "@/components/contributors-button"
import { Search } from "@/components/search"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="container mx-auto px-4 py-4 md:py-8">
        {/* Mobile-first hero section - Reduced visual clutter */}
        <div className="mb-8 md:mb-12 text-center">
          <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold gradient-text mb-2 md:mb-4 animate-fade-in">
            JU Resources
          </h1>
          <p className="text-sm md:text-xl text-muted-foreground animate-slide-up mb-4 md:mb-6">
            Quick access to study materials
          </p>
          
          {/* Mobile-priority search - Always visible on mobile */}
          <div className="md:hidden mb-6">
            <div className="bg-card border-2 border-foreground p-3 rounded-lg">
              <Search />
            </div>
          </div>
          
          {/* Contributors moved to bottom on mobile */}
          <div className="hidden md:block">
            <ContributorsButton />
          </div>
        </div>

        {/* Streamlined semester access */}
        <section className="mb-8 md:mb-16">
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold uppercase border-b-2 border-accent pb-2 mb-4 md:mb-6 text-center md:text-left">
            Choose Semester
          </h2>
          <SemesterGrid />
        </section>

        {/* Contributors at bottom for mobile */}
        <div className="md:hidden text-center mt-8">
          <ContributorsButton />
        </div>
      </div>
    </main>
  )
}
