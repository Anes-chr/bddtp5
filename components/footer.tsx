"use client"

import { motion } from "framer-motion"
import { Heart, Github, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="mt-20 border-t"
    >
      <div className="container mx-auto px-4 py-12">
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            className="flex items-center justify-center gap-2 text-2xl font-bold"
          >
            <span className="gradient-text">TP4 Ultimate Guide</span>
          </motion.div>
          
          <p className="text-muted-foreground flex items-center justify-center gap-2">
            Made with <Heart className="w-4 h-4 text-red-500 animate-pulse" /> for 1CS Students
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-secondary transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-secondary transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
          
          <p className="text-sm text-muted-foreground">
            © 2025 TP4 Guide. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  )
}

