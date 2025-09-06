import { SemesterGrid } from "@/components/semester-grid"
import { ContributorsButton } from "@/components/contributors-button"
import type { Metadata } from "next"
import { generateWebsiteStructuredData } from "@/lib/structured-data"

export const metadata: Metadata = {
  title: "BCA Semester Resources - Comprehensive Study Materials | Jain University",
  description: "Access comprehensive study materials, notes, presentations, and resources for all BCA semesters. Download TLEP, assignments, previous year papers, and more for Computer Applications students at Jain University.",
  keywords: [
    "bca resources",
    "computer applications",
    "semester materials",
    "study notes",
    "presentations",
    "assignments",
    "previous year papers",
    "tlep",
    "jain university",
    "educational resources",
    "bca syllabus",
    "computer science materials"
  ],
  openGraph: {
    title: "BCA Semester Resources - Comprehensive Study Materials",
    description: "Access comprehensive study materials, notes, presentations, and resources for all BCA semesters at Jain University.",
    type: "website",
    url: "https://www.jainuniversity.live",
    siteName: "Jain University BCA Resources",
  },
  twitter: {
    card: "summary_large_image",
    title: "BCA Semester Resources - Comprehensive Study Materials",
    description: "Access comprehensive study materials, notes, presentations, and resources for all BCA semesters.",
  },
  alternates: {
    canonical: "https://www.jainuniversity.live",
  },
}

export default function Home() {
  const structuredData = generateWebsiteStructuredData()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="flex min-h-screen flex-col" role="main">
        <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
          <header className="mb-8 sm:mb-12 text-center">
            <h1 className="sr-only">BCA Semester Resources - Jain University</h1>
            <div className="mt-4 sm:mt-6">
              <ContributorsButton />
            </div>
          </header>

          <section className="mb-12 sm:mb-16" aria-labelledby="semesters-heading">
            <h2 id="semesters-heading" className="section-header text-center">Available Semesters</h2>
            <SemesterGrid />
          </section>
        </div>
      </main>
    </>
  )
}
