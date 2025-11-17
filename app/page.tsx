"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Database, Trophy, Zap, Target, CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const features = [
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
              <span className="text-2xl md:text-4xl lg:text-5xl">Like a Pro</span>
            </h1>

            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-6 md:mb-8 max-w-3xl mx-auto px-4">
              Your complete interactive guide to mastering database queries with TP4
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 px-4">
              <Link href="/course" className="w-full sm:w-auto">
                <Button size="lg" className="w-full text-base md:text-lg py-6 md:py-7 px-6 md:px-8">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Start Learning
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/queries" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full text-base md:text-lg py-6 md:py-7 px-6 md:px-8">
                  <Database className="w-5 h-5 mr-2" />
                  Browse Queries
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

      {/* Features */}
      <section className="py-12 md:py-20 px-4 bg-secondary/30">
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
            {features.map((feature, index) => {
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

      {/* Concepts */}
      <section className="py-12 md:py-20 px-4">
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
              Core SQL concepts covered in this course
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
                  Ready to Begin?
                </h2>
                <p className="text-lg md:text-xl mb-6 md:mb-8 opacity-90">
                  Start your journey to SQL mastery today
                </p>
                <Link href="/course">
                  <Button size="lg" variant="secondary" className="text-base md:text-lg py-6 md:py-7 px-6 md:px-8">
                    <Zap className="w-5 h-5 mr-2" />
                    Start Course Now
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
