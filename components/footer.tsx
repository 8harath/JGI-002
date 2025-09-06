import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-card border-t-2 border-foreground mt-auto text-center text-xs py-3 sm:py-4">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex flex-col items-center justify-center gap-1 sm:gap-2">
          <p className="text-muted-foreground text-xs sm:text-xs leading-relaxed">© 2024 Jain University Resource Archive. Open source educational project by Bharath.</p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-1">
            <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors underline text-xs sm:text-xs">
              Contact
            </Link>
            <a
              href="https://github.com/8harath/JGI-002"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors underline text-xs sm:text-xs"
            >
              GitHub
            </a>
            <span className="text-muted-foreground text-xs">|</span>
            <a href="/cookies" className="text-muted-foreground hover:text-primary transition-colors underline text-xs sm:text-xs">
              Cookies
            </a>
            <a href="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors underline text-xs sm:text-xs">
              Privacy Policy
            </a>
          </div>
          <div className="mt-1 text-[9px] sm:text-[10px] text-muted-foreground leading-relaxed px-2">
            This site uses cookies for basic analytics and session management. No personal data is sold or shared. See our <a href="/privacy-policy" className="underline hover:text-primary">Privacy Policy</a> for details.
          </div>
        </div>
      </div>
    </footer>
  )
}
