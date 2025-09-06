import { SemesterGrid } from "@/components/semester-grid"
import { ContributorsButton } from "@/components/contributors-button"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="mb-8 sm:mb-12 text-center">
          <div className="mt-4 sm:mt-6">
            <ContributorsButton />
          </div>
        </div>

        <section className="mb-12 sm:mb-16">
          <h2 className="section-header text-center">Semesters</h2>
          <SemesterGrid />
        </section>
      </div>
    </main>
  )
}
