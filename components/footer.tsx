"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Heart, Github, Linkedin, Database, BookOpen, Trophy, FileCode2, Layers, LayoutDashboard } from "lucide-react"

const quickLinks = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Course", href: "/course", icon: BookOpen },
  { name: "Cheatsheet", href: "/cheatsheet", icon: FileCode2 },
  { name: "Flashcards", href: "/flashcards", icon: Layers },
  { name: "Practice", href: "/practice", icon: Trophy },
]

const resourceLinks = [
  { name: "TP Schema", href: "/schema" },
  { name: "TP Questions", href: "/questions" },
  { name: "TP Solutions", href: "/queries" },
]

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="mt-20 border-t border-slate-800 bg-gradient-to-b from-background to-slate-950"
    >
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white">
                <Database className="w-6 h-6" />
              </div>
              <span>SQL Master</span>
            </Link>
            <p className="text-muted-foreground text-sm mb-4">
              Master Bdd with interactive lessons, real-world examples, and hands-on practice challenges.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/Anes-chr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://dz.linkedin.com/in/anes-chouari-5b2a73317"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-muted-foreground hover:text-white transition-colors text-sm flex items-center gap-2"
                  >
                    <link.icon className="w-4 h-4" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">TP Resources</h4>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-muted-foreground hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Stats */}
          <div>
            <h4 className="font-semibold mb-4">Platform Stats</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-slate-800/50">
                <p className="text-2xl font-bold text-blue-400">8</p>
                <p className="text-xs text-muted-foreground">Lessons</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-800/50">
                <p className="text-2xl font-bold text-green-400">16</p>
                <p className="text-xs text-muted-foreground">Queries</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-800/50">
                <p className="text-2xl font-bold text-orange-400">8</p>
                <p className="text-xs text-muted-foreground">Challenges</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-800/50">
                <p className="text-2xl font-bold text-purple-400">35</p>
                <p className="text-xs text-muted-foreground">Flashcards</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm flex items-center gap-2">
            Made with <Heart className="w-4 h-4 text-red-500 animate-pulse" /> for 1CS Students
          </p>
          <p className="text-sm text-muted-foreground">
            © 2025 SQL Master Guide. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  )
}


