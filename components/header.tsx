"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Github, Menu, X, Home, Mail, Search as SearchIcon } from "lucide-react"
import { Search } from "./search"
import { KeyboardShortcuts } from "./keyboard-shortcuts"
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts"
import { useIsMobile } from "@/components/ui/use-mobile"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isMobile = useIsMobile()
  useKeyboardShortcuts();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <header className="bg-card border-b-2 border-foreground sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2 md:py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center hover:scale-105 transition-transform">
            <div className="relative w-10 h-10 md:w-14 md:h-14">
              <Image 
                src="/Logo/android-chrome-512x512.png" 
                alt="JU" 
                width={isMobile ? 40 : 56} 
                height={isMobile ? 40 : 56} 
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Search className="hidden lg:flex" />
            <KeyboardShortcuts />
            <Link href="/" className="text-foreground hover:text-primary transition-colors font-medium">
              Home
            </Link>
            <Link href="/contact" className="text-foreground hover:text-primary transition-colors font-medium">
              Contact
            </Link>
            <a
              href="https://github.com/8harath/JGI-002"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors"
              aria-label="GitHub repository"
            >
              <Github size={20} />
            </a>
          </nav>

          {/* Mobile Actions - Optimized for one-hand usage */}
          <div className="md:hidden flex items-center gap-2">
            {/* Quick Search Button - Priority action */}
            <button
              className="mobile-action-button"
              onClick={() => {
                document.dispatchEvent(new KeyboardEvent('keydown', {
                  key: 'k',
                  ctrlKey: true
                }))
              }}
              aria-label="Quick search"
            >
              <SearchIcon size={18} />
            </button>
            
            {/* Simplified Menu Toggle */}
            <button
              className="mobile-action-button"
              onClick={toggleMobileMenu}
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Streamlined for quick access */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-accent/30 mt-2 animate-fade-in">
            {/* Essential navigation only */}
            <nav className="space-y-1">
              <Link
                href="/"
                className="mobile-nav-item"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Home size={16} />
                <span className="font-medium">Home</span>
              </Link>
              <Link
                href="/contact"
                className="mobile-nav-item"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Mail size={16} />
                <span className="font-medium">Contact</span>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
