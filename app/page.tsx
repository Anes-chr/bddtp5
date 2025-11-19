"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Database, Trophy, Zap, Target, CheckCircle, ArrowRight, HelpCircle } from "lucide-react"
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
      icon: Database,
      title: "TP Schema",
      description: "Understand the database structure and table relationships",
      href: "/schema",
      color: "from-orange-500 to-amber-500",
    },
    {
      step: 3,
      icon: HelpCircle,
      title: "TP Questions",
      description: "Read all 35 problems and understand requirements",
      href: "/questions",
      color: "from-purple-500 to-violet-500",
    },
    {
      step: 4,
      icon: Database,
      title: "TP Solutions",
      description: "Study the SQL solutions and explanations",
      href: "/queries",
      color: "from-cyan-500 to-teal-500",
    },
    {
      step: 5,
      icon: Trophy,
      title: "Practice",
      description: "Test your skills with interactive challenges",
      href: "/practice",
      color: "from-red-500 to-red-600",
    },
    {
      step: 6,
      icon: CheckCircle,
      title: "Revision",
      description: "Review and reinforce your understanding",
      href: "/course",
      color: "from-sky-400 to-blue-500",
    },
  ]

  const concepts = [
    "Projection & Selection",
    "WHERE & Filtering",
    "INNER JOIN",
    "Aggregate Functions",
    "GROUP BY & HAVING",
    "Subqueries",
    "ANY & ALL Operators",
    "Complex Queries",
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 md:py-20 px-4">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 md:mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-24 md:h-24 rounded-2xl md:rounded-3xl bg-gradient-to-br from-purple-600 to-pink-600 mb-6 md:mb-8 shadow-2xl">
              <Database className="w-8 h-8 md:w-12 md:h-12 text-white" />
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6">
              <span className="gradient-text">Master SQL</span>
              <br />
              <span className="text-2xl md:text-4xl lg:text-5xl">TP4 Complete Guide</span>
            </h1>

            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-6 md:mb-8 max-w-3xl mx-auto px-4">
              Your structured learning roadmap to SQL mastery
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 px-4">
              <Link href="/course" className="w-full sm:w-auto">
                <Button size="lg" className="w-full text-base md:text-lg py-6 md:py-7 px-6 md:px-8">
                  <Zap className="w-5 h-5 mr-2" />
                  Start Learning Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/schema" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full text-base md:text-lg py-6 md:py-7 px-6 md:px-8">
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
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-12 md:mb-20"
          >
            {[
              { label: "SQL Queries", value: "35" },
              { label: "Lessons", value: "8" },
              { label: "Challenges", value: "4" },
              { label: "Points", value: "800" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card className="border-2 hover:border-primary transition-all">
                  <CardContent className="p-4 md:p-6 text-center">
                    <div className="text-3xl md:text-4xl font-bold text-primary mb-1 md:mb-2">{stat.value}</div>
                    <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
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
              Follow these 6 steps to master SQL extraction queries
            </p>
          </motion.div>

          {/* Desktop Roadmap */}
          <div className="hidden md:block relative mx-auto max-w-5xl" style={{ height: '1750px' }}>
            {/* The Road SVG */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none" 
              viewBox="0 0 1000 1750" 
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
                   C 275 1435, 500 1435, 500 1550
                   L 500 1700"
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
                   C 275 1435, 500 1435, 500 1550
                   L 500 1700"
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
                   C 275 1435, 500 1435, 500 1550
                   L 500 1700"
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
              const isLast = index === 5
              
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
                top: '1550px',
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
                Complete all 6 steps to become an expert
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to <span className="gradient-text">Excel</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              A comprehensive platform designed for your success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {[
              {
                icon: BookOpen,
                title: "8 Structured Lessons",
                description: "Progress from beginner to expert with our carefully designed course",
                color: "from-blue-500 to-cyan-500",
                href: "/course"
              },
              {
                icon: Database,
                title: "35 Real SQL Queries",
                description: "Practice with actual queries from TP4 with detailed explanations",
                color: "from-purple-500 to-pink-500",
                href: "/queries"
              },
              {
                icon: Trophy,
                title: "Interactive Challenges",
                description: "Test your knowledge and earn points with hands-on practice",
                color: "from-yellow-500 to-orange-500",
                href: "/practice"
              },
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Link href={feature.href}>
                    <Card className="h-full hover:shadow-2xl transition-all hover:-translate-y-2 border-2 hover:border-primary">
                      <CardContent className="p-6 md:p-8">
                        <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 md:mb-6 shadow-lg`}>
                          <Icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold mb-3">{feature.title}</h3>
                        <p className="text-sm md:text-base text-muted-foreground mb-4">
                          {feature.description}
                        </p>
                        <Button variant="ghost" className="group">
                          Explore
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
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
      <section className="py-12 md:py-20 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What You'll <span className="gradient-text">Master</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              Core SQL concepts covered in this complete guide
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {concepts.map((concept, index) => (
              <motion.div
                key={concept}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="hover:shadow-lg transition-all">
                  <CardContent className="p-4 md:p-6 text-center">
                    <CheckCircle className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 md:mb-3 text-green-600" />
                    <p className="font-semibold text-sm md:text-base">{concept}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-r from-purple-600 to-pink-600 border-0 text-white">
              <CardContent className="p-8 md:p-12 text-center">
                <Target className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 md:mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Begin Your Journey?
                </h2>
                <p className="text-lg md:text-xl mb-6 md:mb-8 opacity-90">
                  Follow the structured timeline to master SQL TP4 queries
                </p>
                <Link href="/course">
                  <Button size="lg" variant="secondary" className="text-base md:text-lg py-6 md:py-7 px-6 md:px-8">
                    <Zap className="w-5 h-5 mr-2" />
                    Start Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
