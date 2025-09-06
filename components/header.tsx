"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Github, Menu, X, Home, Mail } from "lucide-react"
import { Search } from "./search"
import { KeyboardShortcuts } from "./keyboard-shortcuts"
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  
  useKeyboardShortcuts();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollThreshold = window.innerWidth < 768 ? 50 : 100 // Lower threshold for mobile
      
      // Show header when scrolling up or at the top
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsHeaderVisible(true)
      }
      // Always show header at the very top
      else if (currentScrollY === 0) {
        setIsHeaderVisible(true)
      } 
      // Hide header when scrolling down (but not if mobile menu is open)
      else if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold && !mobileMenuOpen) {
        setIsHeaderVisible(false)
      }
      
      setLastScrollY(currentScrollY)
    }

    // Throttle scroll events for better performance
    let ticking = false
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledHandleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll)
    }
  }, [lastScrollY, mobileMenuOpen])

  // Always show header when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      setIsHeaderVisible(true)
    }
  }, [mobileMenuOpen])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <header className={`bg-card/95 backdrop-blur-sm border-b-2 border-foreground sticky top-0 z-50 shadow-sm transition-all duration-300 ease-in-out ${
      isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center hover:scale-105 transition-transform">
            <div className="relative w-10 h-10 sm:w-14 sm:h-14">
              <Image 
                src="/Logo/android-chrome-512x512.png" 
                alt="Jain University Logo" 
                width={56} 
                height={56} 
                className="object-contain"
                priority
              />
            </div>
            <div className="ml-2 sm:ml-3">
              <h1 className="text-sm sm:text-lg md:text-xl font-bold gradient-text leading-tight">Jain University Resource Archive</h1>
              <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">Organized, accessible, open-source</p>
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
            <nav className="flex flex-col space-y-2">
              <Link
                href="/"
                className="flex items-center gap-3 text-foreground hover:text-primary transition-colors p-3 border-l-2 border-accent hover:bg-accent/10 rounded-r-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Home size={20} />
                <span className="font-medium">Home</span>
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-3 text-foreground hover:text-primary transition-colors p-3 border-l-2 border-accent hover:bg-accent/10 rounded-r-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Mail size={20} />
                <span className="font-medium">Contact</span>
              </Link>
              <a
                href="https://github.com/8harath/JGI-002"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-foreground hover:text-primary transition-colors p-3 border-l-2 border-accent hover:bg-accent/10 rounded-r-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Github size={20} />
                <span className="font-medium">GitHub</span>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
