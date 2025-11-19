"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "./ui/button"
import { BookOpen, Database, Trophy, Home, Menu, X, Moon, Sun, HelpCircle } from "lucide-react"

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Course", href: "/course", icon: BookOpen },
  { name: "TP Schema", href: "/schema", icon: Database },
  { name: "TP Questions", href: "/questions", icon: HelpCircle },
  { name: "TP Solutions", href: "/queries", icon: Database },
  { name: "Practice", href: "/practice", icon: Trophy },
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
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white">
                <Database className="w-5 h-5" />
              </div>
              <span className="hidden sm:inline">TP4 SQL Master</span>
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
                      className="relative"
                    >
                      <Icon className="w-4 h-4 mr-2" />
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
                {navigation.map((item) => {
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
