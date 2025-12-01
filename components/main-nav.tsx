"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "./ui/button"
import { BookOpen, Database, Trophy, Home, Menu, X, Moon, Sun, HelpCircle, LayoutDashboard, FileCode2, Layers } from "lucide-react"

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Course", href: "/course", icon: BookOpen },
  { name: "Cheatsheet", href: "/cheatsheet", icon: FileCode2 },
  { name: "Flashcards", href: "/flashcards", icon: Layers },
  { name: "Practice", href: "/practice", icon: Trophy },
]

const moreNavigation = [
  { name: "Schema", href: "/schema", icon: Database },
  { name: "Questions", href: "/questions", icon: HelpCircle },
  { name: "Solutions", href: "/queries", icon: Database },
]

export default function MainNav() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [theme, setThemeState] = useState<"light" | "dark">("dark")

  useEffect(() => {
    // Get theme from localStorage on mount
    const stored = localStorage.getItem("theme") as "light" | "dark" | null
    const initialTheme = stored || "dark"
    setThemeState(initialTheme)
    setMounted(true)
  }, [])

  const setTheme = (newTheme: "light" | "dark") => {
    setThemeState(newTheme)
    localStorage.setItem("theme", newTheme)
    
    // Apply to DOM
    const html = document.documentElement
    html.classList.remove("light", "dark")
    html.classList.add(newTheme)
    html.style.colorScheme = newTheme
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 font-bold text-lg md:text-xl">
              <div className="w-8 h-8 rounded-lg bg-linear-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white">
                <Database className="w-5 h-5" />
              </div>
              <span className="hidden sm:inline">TP4 BDD</span>
              <span className="sm:hidden">TP4</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link key={item.name} href={item.href}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      size="sm"
                      className="relative"
                    >
                      <Icon className="w-4 h-4 mr-1.5" />
                      {item.name}
                      {isActive && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute inset-0 bg-primary rounded-md -z-10"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </Button>
                  </Link>
                )
              })}
              
              {/* TP Dropdown */}
              {(() => {
                const isTpActive = moreNavigation.some(item => pathname === item.href)
                return (
                  <div className="relative group">
                    <Button variant={isTpActive ? "default" : "ghost"} size="sm" className="gap-1.5">
                      <Database className="w-4 h-4" />
                      TP
                      <svg className="w-3 h-3 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </Button>
                    <div className="absolute top-full right-0 mt-1 w-48 bg-background/95 backdrop-blur-lg border border-border rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="p-2">
                        {moreNavigation.map((item) => {
                          const Icon = item.icon
                          const isActive = pathname === item.href
                          return (
                            <Link key={item.name} href={item.href}>
                              <Button
                                variant={isActive ? "secondary" : "ghost"}
                                size="sm"
                                className="w-full justify-start mb-1 last:mb-0"
                              >
                                <Icon className="w-4 h-4 mr-2" />
                                {item.name}
                              </Button>
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )
              })()}
            </div>

            {/* Theme Toggle & Mobile Menu Button */}
            <div className="flex items-center gap-2">
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    const newTheme = theme === "dark" ? "light" : "dark"
                    setTheme(newTheme)
                  }}
                  className="w-9 h-9"
                  title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                >
                  {theme === "dark" ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </Button>
              )}

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden w-9 h-9"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 right-0 z-40 bg-background border-b border-border md:hidden"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col gap-2">
                {[...navigation, ...moreNavigation].map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Button
                        variant={isActive ? "default" : "ghost"}
                        className="w-full justify-start text-base"
                      >
                        <Icon className="w-5 h-5 mr-3" />
                        {item.name}
                      </Button>
                    </Link>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
