import { SemesterGrid } from "@/components/semester-grid"
import { ContributorsButton } from "@/components/contributors-button"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-4 animate-fade-in">
            Jain University Resource Archive
          </h1>
          <p className="text-xl text-muted-foreground animate-slide-up">Organized, accessible, open-source.</p>
          <div className="mt-6">
            <ContributorsButton />
          </div>
        </div>

        <section className="mb-16">
          <h2 className="section-header text-center">Semesters</h2>
          <SemesterGrid />
        </section>
      </div>
    </main>
  )
}
