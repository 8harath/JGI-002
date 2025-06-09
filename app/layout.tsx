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
  icons: {
    icon: [
      { url: '/Logo/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/Logo/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/Logo/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/Logo/safari-pinned-tab.svg',
      },
    ],
  },
  manifest: '/Logo/site.webmanifest',
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.jainuniversity.live",
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
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/Logo/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/Logo/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/Logo/apple-touch-icon.png" />
        <link rel="manifest" href="/Logo/site.webmanifest" />
        <link rel="mask-icon" href="/Logo/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </head>
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
