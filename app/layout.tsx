import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageLoading } from "@/components/loading"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Resource Management System",
  description: "A comprehensive platform for managing and organizing educational resources across different semesters. Built with Next.js and TypeScript.",
  keywords: ["resource management", "education", "learning materials", "semester resources", "academic resources", "Next.js", "TypeScript"],
  authors: [{ name: "Bharath K" }],
  creator: "Bharath K",
  publisher: "Resource Management Team",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-domain.com",
    title: "Resource Management System",
    description: "A comprehensive platform for managing and organizing educational resources across different semesters.",
    siteName: "Resource Management System",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resource Management System",
    description: "A comprehensive platform for managing and organizing educational resources across different semesters.",
    creator: "@your-twitter-handle",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    google: "your-google-site-verification",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-grow">
            <PageLoading>{children}</PageLoading>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  )
}
