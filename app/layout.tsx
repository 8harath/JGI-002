import type React from "react"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageLoading } from "@/components/loading"

export const metadata = {
  title: "Jain University Resource Archive",
  description: "Academic resources for Jain University students",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
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
