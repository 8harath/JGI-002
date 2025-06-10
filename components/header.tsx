"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Github, Menu, X, Home, Mail } from "lucide-react"
import { Search } from "./search"
import { KeyboardShortcuts } from "./keyboard-shortcuts"
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  useKeyboardShortcuts();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <header className="bg-card border-b-2 border-foreground sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center hover:scale-105 transition-transform">
            <div className="relative w-14 h-14">
              <Image 
                src="/Logo/android-chrome-512x512.png" 
                alt="Jain University Logo" 
                width={56} 
                height={56} 
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

          {/* Mobile Menu Button */}
          <button
            className="md:hidden keyboard-button p-2 text-sm"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t-2 border-accent/30 mt-3 animate-fade-in">
            <div className="px-2 mb-4">
              <Search />
            </div>
            <nav className="flex flex-col space-y-3">
              <Link
                href="/"
                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors p-2 border-l-2 border-accent"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Home size={18} />
                <span>Home</span>
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors p-2 border-l-2 border-accent"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Mail size={18} />
                <span>Contact</span>
              </Link>
              <a
                href="https://github.com/8harath/JGI-002"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors p-2 border-l-2 border-accent"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Github size={18} />
                <span>GitHub</span>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
