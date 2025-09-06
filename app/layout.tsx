import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageLoading } from "@/components/loading"
import { getAllResources } from "@/lib/resources"
import { SearchProvider } from "@/lib/search-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "BCA Semester Resources - Jain University",
    template: "%s | Jain University BCA Resources"
  },
  description: "Comprehensive study materials, notes, presentations, and resources for BCA students across all semesters. Access TLEP, assignments, previous year papers, and more at Jain University.",
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
    "computer science materials",
    "academic resources"
  ],
  authors: [{ name: "Bharath K" }],
  creator: "Bharath K",
  publisher: "Jain University",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
    title: "BCA Semester Resources - Jain University",
    description: "Comprehensive study materials, notes, presentations, and resources for BCA students across all semesters.",
    siteName: "Jain University BCA Resources",
    images: [
      {
        url: '/Logo/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Jain University BCA Resources',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BCA Semester Resources - Jain University",
    description: "Comprehensive study materials, notes, presentations, and resources for BCA students across all semesters.",
    creator: "@jainuniversity",
    images: ['/Logo/twitter-image.png'],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  verification: {
    google: "your-google-site-verification",
    yandex: "your-yandex-verification",
    yahoo: "your-yahoo-verification",
  },
  category: 'education',
  classification: 'Educational Resources',
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'format-detection': 'telephone=no',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const resources = await getAllResources();

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.jainuniversity.live" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className={inter.className}>
        <SearchProvider resources={resources}>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <PageLoading>{children}</PageLoading>
            </main>
            <Footer />
          </div>
        </SearchProvider>
      </body>
    </html>
  )
}
