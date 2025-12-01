"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Database, Trophy, Zap, Target, CheckCircle, ArrowRight, HelpCircle, FileCode2, Layers, LayoutDashboard } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const roadmapSteps = [
    {
      step: 1,
      icon: BookOpen,
      title: "Course",
      description: "Learn SQL fundamentals and master database concepts",
      href: "/course",
      color: "from-pink-500 to-rose-500",
    },
    {
      step: 2,
      icon: FileCode2,
      title: "Cheatsheet",
      description: "Quick reference guide for SQL syntax and commands",
      href: "/cheatsheet",
      color: "from-green-500 to-emerald-500",
    },
    {
      step: 3,
      icon: Database,
      title: "TP Schema",
      description: "Understand the database structure and table relationships",
      href: "/schema",
      color: "from-orange-500 to-amber-500",
    },
    {
      step: 4,
      icon: HelpCircle,
      title: "TP Questions",
      description: "Read all 35 problems and understand requirements",
      href: "/questions",
      color: "from-purple-500 to-violet-500",
    },
    {
      step: 5,
      icon: Database,
      title: "TP Solutions",
      description: "Study the SQL solutions and explanations",
      href: "/queries",
      color: "from-cyan-500 to-teal-500",
    },
    {
      step: 6,
      icon: Layers,
      title: "Flashcards",
      description: "Memorize key concepts with interactive flashcards",
      href: "/flashcards",
      color: "from-indigo-500 to-purple-500",
    },
    {
      step: 7,
      icon: Trophy,
      title: "Practice",
      description: "Test your skills with interactive challenges",
      href: "/practice",
      color: "from-red-500 to-orange-500",
    },
    {
      step: 8,
      icon: CheckCircle,
      title: "Master It!",
      description: "Review progress and achieve SQL mastery",
      href: "/dashboard",
      color: "from-sky-400 to-blue-500",
    },
  ]

  const concepts = [
    "Multi-Table JOINs",
    "EXISTS & NOT EXISTS",
    "Correlated Subqueries",
    "Relational Division",
    "GROUP BY & HAVING",
    "IN & NOT IN",
    "Aggregate Functions",
    "Complex Query Patterns",
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 md:py-16 px-4">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-transparent" />
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 md:mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-linear-to-br from-purple-600 to-pink-600 mb-5 md:mb-6 shadow-xl"
            >
              <Database className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold mb-3 md:mb-4">
              <span className="gradient-text">Master SQL</span>
              <br />
              <span className="text-xl md:text-3xl text-muted-foreground">TP5: Advanced SELECT Queries</span>
            </h1>

            <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto px-4">
              Master complex SELECT operations with the Aviation Database — JOINs, Division, EXISTS & more
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 px-4">
              <Link href="/course" className="w-full sm:w-auto">
                <Button size="lg" className="w-full text-base py-6 px-6 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  <Zap className="w-5 h-5 mr-2" />
                  Start Learning
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/schema" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full text-base py-6 px-6">
                  <Database className="w-5 h-5 mr-2" />
                  View Schema
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-4 gap-3 md:gap-6 mb-8 md:mb-12"
          >
            {[
              { label: "Tables", value: "8", icon: Database, color: "text-blue-400" },
              { label: "Queries", value: "20", icon: BookOpen, color: "text-green-400" },
              { label: "Flashcards", value: "35", icon: Layers, color: "text-orange-400" },
              { label: "Lessons", value: "8", icon: Trophy, color: "text-purple-400" },
            ].map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Card className="border hover:border-primary/50 transition-all">
                    <CardContent className="p-3 md:p-6 text-center">
                      <Icon className={`w-5 h-5 md:w-7 md:h-7 mx-auto mb-2 ${stat.color}`} />
                      <div className="text-xl md:text-3xl font-bold text-primary">{stat.value}</div>
                      <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Roadmap Section - BRAND NEW DESIGN */}
      <section className="py-12 md:py-20 px-4 bg-secondary/30 overflow-hidden">
        <div className="container mx-auto max-w-6xl relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-24"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Your Learning <span className="gradient-text">Roadmap</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              Follow these 8 steps to master SQL extraction queries
            </p>
          </motion.div>

          {/* Desktop Roadmap */}
          <div className="hidden md:block relative mx-auto max-w-5xl" style={{ height: '2200px' }}>
            {/* The Road SVG */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none" 
              viewBox="0 0 1000 2200" 
              preserveAspectRatio="xMidYMin meet"
              style={{ overflow: 'visible' }}
            >
              <defs>
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.3"/>
                </filter>
                <linearGradient id="roadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#334155" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
              </defs>
              
              {/* Road Border */}
              <path
                d="M 500 20 
                   C 500 90, 725 90, 725 170
                   C 725 285, 275 285, 275 400
                   C 275 515, 725 515, 725 630
                   C 725 745, 275 745, 275 860
                   C 275 975, 725 975, 725 1090
                   C 725 1205, 275 1205, 275 1320
                   C 275 1435, 725 1435, 725 1550
                   C 725 1665, 275 1665, 275 1780
                   C 275 1895, 500 1895, 500 2000
                   L 500 2150"
                stroke="hsl(var(--border))"
                strokeWidth="120"
                fill="none"
                strokeLinecap="round"
                className="opacity-50"
              />
              
              {/* Main Road */}
              <path
                d="M 500 20 
                   C 500 90, 725 90, 725 170
                   C 725 285, 275 285, 275 400
                   C 275 515, 725 515, 725 630
                   C 725 745, 275 745, 275 860
                   C 275 975, 725 975, 725 1090
                   C 725 1205, 275 1205, 275 1320
                   C 275 1435, 725 1435, 725 1550
                   C 725 1665, 275 1665, 275 1780
                   C 275 1895, 500 1895, 500 2000
                   L 500 2150"
                stroke="url(#roadGradient)" 
                strokeWidth="100"
                fill="none"
                strokeLinecap="round"
                filter="url(#shadow)"
              />
              
              {/* Center Dashed Line */}
              <path
                d="M 500 20 
                   C 500 90, 725 90, 725 170
                   C 725 285, 275 285, 275 400
                   C 275 515, 725 515, 725 630
                   C 725 745, 275 745, 275 860
                   C 275 975, 725 975, 725 1090
                   C 725 1205, 275 1205, 275 1320
                   C 275 1435, 725 1435, 725 1550
                   C 725 1665, 275 1665, 275 1780
                   C 275 1895, 500 1895, 500 2000
                   L 500 2150"
                stroke="white"
                strokeWidth="4"
                fill="none"
                strokeDasharray="20 30"
                opacity="0.6"
              />
            </svg>

            {/* Steps */}
            {roadmapSteps.map((step, index) => {
              const Icon = step.icon
              const isRight = index % 2 === 0
              
              // Taller Y positions (approx 15% increase)
              const yPos = 170 + (index * 230)
              
              // Marker Position (Narrower path: 27.5% - 72.5%)
              const markerLeft = isRight ? '72.5%' : '27.5%'
              const markerTop = `${yPos}px`
              
              // Connector Width (Adjusted for narrower path)
              const connectorWidth = '56.5%'
              
              // Content Position
              let contentStyle = {}
              if (isRight) {
                  contentStyle = { right: '84%', top: markerTop, transform: 'translate(0, -50%)' }
              } else {
                  // Left side
                  contentStyle = { left: '84%', top: markerTop, transform: 'translate(0, -50%)' }
              }

              return (
                <div key={step.step}>
                  {/* Connector Line */}
                  <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.3 }}
                    className="absolute h-1 bg-primary/30 z-0"
                    style={{
                      top: markerTop,
                      left: isRight ? 'auto' : '27.5%',
                      right: isRight ? '27.5%' : 'auto',
                      width: connectorWidth,
                      transformOrigin: isRight ? 'right' : 'left'
                    }}
                  />

                  {/* Marker on the Road */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="absolute z-20"
                    style={{ 
                      left: markerLeft, 
                      top: markerTop,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <div className="relative group cursor-pointer">
                      {/* Pulse Effect */}
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.color} opacity-40 blur-lg group-hover:opacity-70 transition-opacity animate-pulse`} />
                      
                      {/* Main Circle */}
                      <div className={`relative w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-2xl border-4 border-white dark:border-slate-900 transition-transform group-hover:scale-110`}>
                        <span className="text-2xl font-black text-white">{step.step}</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Content Card */}
                  <motion.div
                    initial={{ opacity: 0, x: isRight ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.2 }}
                    className="absolute w-80 lg:w-96 z-10"
                    style={contentStyle}
                  >
                    <Link href={step.href}>
                      <Card className={`border-2 hover:border-primary transition-all hover:shadow-xl group bg-card/95 backdrop-blur-sm`}>
                        <CardContent className="p-6">
                          <div className={`flex flex-col ${isRight ? 'items-end text-right' : 'items-start text-left'}`}>
                            <div className={`p-3 rounded-xl bg-gradient-to-br ${step.color} mb-4 shadow-md inline-flex`}>
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                              {step.description}
                            </p>
                            <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform p-0 h-auto font-semibold text-primary">
                              Start Learning
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                </div>
              )
            })}

            {/* Final Target - Desktop */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.5 }}
              className="absolute z-20 left-0 right-0 mx-auto w-fit"
              style={{ 
                top: '2000px',
                transform: 'translateY(-50%)'
              }}
            >
              <div className="flex flex-col items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-2xl mb-4 animate-pulse border-4 border-white dark:border-slate-900">
                  <Target className="w-12 h-12 text-white" />
                </div>
                <div className="bg-card/90 backdrop-blur px-6 py-3 rounded-full border shadow-lg text-center">
                  <h3 className="text-xl font-bold gradient-text">SQL Mastery Achieved!</h3>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Mobile Roadmap - Simple Vertical */}
          <div className="md:hidden space-y-6">
            {roadmapSteps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={step.href}>
                    <Card className="overflow-hidden border-2 hover:border-primary hover:shadow-xl transition-all">
                      <div className={`h-2 bg-gradient-to-r ${step.color}`} />
                      <CardContent className="p-5">
                        <div className="flex items-start gap-4">
                          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                            <span className="text-lg font-black text-white">{step.step}</span>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                              <Icon className="w-5 h-5" />
                              {step.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-3">
                              {step.description}
                            </p>
                            <Button variant="ghost" size="sm">
                              Start
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              )
            })}
            
            {/* Mobile Target */}
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-xl mb-3 animate-pulse">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">SQL Mastery Achieved!</h3>
              <p className="text-sm text-muted-foreground text-center max-w-xs">
                Complete all 8 steps to become an expert
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Tools Section */}
      <section className="py-12 md:py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-2">
              Learning <span className="gradient-text">Tools</span>
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Everything for TP5 mastery
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: LayoutDashboard, title: "Dashboard", description: "Track progress", href: "/dashboard", color: "from-blue-500 to-indigo-500" },
              { icon: FileCode2, title: "Cheatsheet", description: "SQL reference", href: "/cheatsheet", color: "from-green-500 to-emerald-500" },
              { icon: Layers, title: "Flashcards", description: "Study cards", href: "/flashcards", color: "from-purple-500 to-pink-500" },
              { icon: Trophy, title: "Practice", description: "Challenges", href: "/practice", color: "from-orange-500 to-amber-500" }
            ].map((tool, index) => {
              const Icon = tool.icon
              return (
                <motion.div
                  key={tool.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={tool.href}>
                    <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1 border hover:border-primary group">
                      <CardContent className="p-4 md:p-6">
                        <div className={`w-10 h-10 md:w-14 md:h-14 rounded-xl bg-linear-to-br ${tool.color} flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}>
                          <Icon className="w-5 h-5 md:w-7 md:h-7 text-white" />
                        </div>
                        <h3 className="text-base md:text-lg font-bold">{tool.title}</h3>
                        <p className="text-xs md:text-sm text-muted-foreground">{tool.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Concepts Section */}
      <section className="py-12 md:py-16 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-6 md:mb-10"
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-2">
              What You&apos;ll <span className="gradient-text">Master</span>
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Essential SQL concepts covered
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
          >
            {concepts.map((concept, index) => (
              <motion.div
                key={concept}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
              >
                <Card className="border hover:border-primary transition-all">
                  <CardContent className="p-3 md:p-4 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-400 shrink-0" />
                    <span className="text-xs md:text-sm font-medium">{concept}</span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="border bg-linear-to-br from-purple-900/20 to-pink-900/20 overflow-hidden relative">
              <div className="absolute inset-0 bg-grid-pattern opacity-10" />
              <CardContent className="p-8 md:p-12 text-center relative z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-xl bg-linear-to-br from-purple-600 to-pink-600 mb-5 md:mb-6"
                >
                  <Target className="w-7 h-7 md:w-8 md:h-8 text-white" />
                </motion.div>
                <h2 className="text-xl md:text-3xl font-bold mb-3">
                  Ready to Master SQL?
                </h2>
                <p className="text-sm md:text-base text-muted-foreground mb-6 max-w-lg mx-auto">
                  Start your learning journey today with our comprehensive course
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link href="/course" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full py-6 px-6 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      <BookOpen className="w-5 h-5 mr-2" />
                      Start Course
                    </Button>
                  </Link>
                  <Link href="/queries" className="w-full sm:w-auto">
                    <Button size="lg" variant="outline" className="w-full py-6 px-6">
                      <Database className="w-5 h-5 mr-2" />
                      Browse Queries
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
