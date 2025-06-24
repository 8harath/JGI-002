import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-card border-t-2 border-foreground mt-auto text-center text-xs py-3">
      <div className="flex flex-col items-center justify-center gap-1">
        <p className="text-muted-foreground">© 2024 Jain University Resource Archive. Open source educational project by Bharath.</p>
        <div className="flex flex-wrap items-center justify-center gap-3 mt-1">
          <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors underline">
            Contact
          </Link>
          <a
            href="https://github.com/8harath/JGI-002"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors underline"
          >
            GitHub
          </a>
          <span className="text-muted-foreground">|</span>
          <a href="/cookies" className="text-muted-foreground hover:text-primary transition-colors underline">
            Cookies
          </a>
          <a href="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors underline">
            Privacy Policy
          </a>
        </div>
        <div className="mt-1 text-[10px] text-muted-foreground">
          This site uses cookies for basic analytics and session management. No personal data is sold or shared. See our <a href="/privacy-policy" className="underline hover:text-primary">Privacy Policy</a> for details.
        </div>
      </div>
    </footer>
  )
}
