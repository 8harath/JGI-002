import Link from "next/link"
import { useIsMobile } from "@/components/ui/use-mobile"

export function Footer() {
  return (
    <footer className="bg-card border-t-2 border-foreground mt-auto">
      <div className="container mx-auto px-4 py-4 md:py-6">
        {/* Mobile-optimized footer */}
        <div className="text-center space-y-3">
          <p className="text-xs md:text-sm text-muted-foreground">
            © 2024 Jain University Resource Archive
          </p>
          
          {/* Essential links only on mobile */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <Link 
              href="/contact" 
              className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors underline"
            >
              Contact
            </Link>
            <a
              href="https://github.com/8harath/JGI-002"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors underline"
            >
              GitHub
            </a>
            
            {/* Desktop-only links */}
            <span className="hidden md:inline text-muted-foreground">|</span>
            <Link 
              href="/cookies" 
              className="hidden md:inline text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors underline"
            >
              Cookies
            </Link>
            <Link 
              href="/privacy-policy" 
              className="hidden md:inline text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors underline"
            >
              Privacy Policy
            </Link>
          </div>

          {/* Simplified privacy notice for mobile */}
          <div className="text-[10px] md:text-xs text-muted-foreground">
            <span className="md:hidden">
              Open source educational project
            </span>
            <span className="hidden md:inline">
              This site uses cookies for basic analytics and session management. No personal data is sold or shared. 
              See our <Link href="/privacy-policy" className="underline hover:text-primary">Privacy Policy</Link> for details.
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
