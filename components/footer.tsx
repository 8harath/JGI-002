import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-card border-t-2 border-foreground mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-muted-foreground text-sm">
              © 2024 Jain University Resource Archive. Open source educational project.
            </p>
            <p className="text-muted-foreground text-sm mt-1 flex items-center justify-center md:justify-start gap-1">
              Made with{" "}
              <span className="animate-pulse-heart text-primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="inline-block">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </span>{" "}
              by Bharath
            </p>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
              Contact
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
