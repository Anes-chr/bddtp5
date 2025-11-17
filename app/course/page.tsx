"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Clock, CheckCircle, Play } from "lucide-react"
import Link from "next/link"
import { getProgress } from "@/lib/storage"

const lessons = [
  {
    id: 1,
    title: "SQL Basics & SELECT Statements",
    description: "Master the fundamentals of SQL with SELECT, projection, and basic filtering",
    duration: "30 min",
    queries: [1, 2, 3, 9, 10, 15],
    difficulty: "Beginner",
  },
  {
    id: 2,
    title: "Filtering with WHERE & Operators",
    description: "Learn powerful filtering techniques with WHERE, LIKE, BETWEEN, and IN",
    duration: "45 min",
    queries: [3, 7, 12, 15, 16, 17],
    difficulty: "Beginner",
  },
  {
    id: 3,
    title: "Joins & Relationships",
    description: "Understand how to combine tables using INNER JOIN and cartesian products",
    duration: "60 min",
    queries: [4, 5, 6, 13, 14, 30],
    difficulty: "Intermediate",
  },
  {
    id: 4,
    title: "Aggregate Functions",
    description: "COUNT, AVG, MAX, MIN, SUM - Master data aggregation",
    duration: "45 min",
    queries: [11, 12, 16, 17, 18, 29],
    difficulty: "Intermediate",
  },
  {
    id: 5,
    title: "GROUP BY & HAVING",
    description: "Group data and filter groups for powerful analytics",
    duration: "60 min",
    queries: [31, 33, 34, 35],
    difficulty: "Intermediate",
  },
  {
    id: 6,
    title: "Subqueries & Nested Queries",
    description: "Write queries inside queries for complex data retrieval",
    duration: "75 min",
    queries: [22, 24, 25, 26, 27],
    difficulty: "Advanced",
  },
  {
    id: 7,
    title: "Advanced Subqueries (ANY, ALL)",
    description: "Master comparison operators with subqueries",
    duration: "60 min",
    queries: [20, 21, 23],
    difficulty: "Advanced",
  },
  {
    id: 8,
    title: "Complex Queries & Optimization",
    description: "Put it all together with complex real-world queries",
    duration: "90 min",
    queries: [8, 19, 28, 32],
    difficulty: "Advanced",
  },
]

export default function CoursePage() {
  const [completedLessons, setCompletedLessons] = useState<number[]>([])

  useEffect(() => {
    const progress = getProgress()
    setCompletedLessons(progress.completedLessons)
  }, [])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-500"
      case "Intermediate": return "bg-yellow-500"
      case "Advanced": return "bg-red-500"
      default: return "bg-gray-500"
    }
  }

  const completionPercentage = Math.round((completedLessons.length / lessons.length) * 100)

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            SQL Mastery Course
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-6">
            A structured learning path from beginner to expert
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <span>8 Comprehensive Lessons</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <span>7+ Hours of Content</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span>35 Practical Queries</span>
            </div>
          </div>
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8 md:mb-12"
        >
          <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2">Your Progress</h3>
                  <p className="opacity-90 text-sm md:text-base">Keep learning to unlock achievements!</p>
                </div>
                <div className="text-left md:text-right w-full md:w-auto">
                  <div className="text-3xl md:text-4xl font-bold">{completionPercentage}%</div>
                  <div className="text-sm opacity-90">{completedLessons.length} / {lessons.length} lessons completed</div>
                </div>
              </div>
              <div className="mt-4 h-2 bg-white/30 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${completionPercentage}%` }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="h-full bg-white"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Lessons Grid */}
        <div className="grid gap-4 md:gap-6">
          {lessons.map((lesson, index) => {
            const isCompleted = completedLessons.includes(lesson.id)

            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`hover:shadow-xl transition-all border-2 ${isCompleted ? 'border-green-500 bg-green-50 dark:bg-green-950' : 'hover:border-primary'}`}>
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6">
                      {/* Lesson Number */}
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white text-xl md:text-2xl font-bold shadow-lg">
                          {lesson.id}
                        </div>
                      </div>

                      {/* Lesson Content */}
                      <div className="flex-1 w-full">
                        <div className="flex flex-col md:flex-row items-start md:items-start justify-between mb-3 gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-xl md:text-2xl font-bold">{lesson.title}</h3>
                              {isCompleted && (
                                <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-600 flex-shrink-0" />
                              )}
                            </div>
                            <p className="text-muted-foreground text-sm md:text-base">{lesson.description}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-4">
                          <Badge variant="outline" className="font-semibold text-xs md:text-sm">
                            <Clock className="w-3 h-3 mr-1" />
                            {lesson.duration}
                          </Badge>
                          <Badge className={`${getDifficultyColor(lesson.difficulty)} text-xs md:text-sm`}>
                            {lesson.difficulty}
                          </Badge>
                          <Badge variant="secondary" className="text-xs md:text-sm">
                            {lesson.queries.length} Queries
                          </Badge>
                        </div>

                        <Link href={`/lesson/${lesson.id}`} className="block">
                          <Button 
                            className="w-full"
                            size="lg"
                          >
                            {isCompleted ? (
                              <>
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Review Lesson
                              </>
                            ) : (
                              <>
                                <Play className="w-4 h-4 mr-2" />
                                Start Lesson
                              </>
                            )}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Additional Resources */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
        >
          <Card className="hover:shadow-lg transition-all">
            <CardContent className="p-4 md:p-6">
              <h4 className="font-bold text-lg mb-2">📊 Database Schema</h4>
              <p className="text-sm text-muted-foreground mb-4">Understand the structure</p>
              <Link href="/schema">
                <Button variant="outline" className="w-full">View Schema</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all">
            <CardContent className="p-4 md:p-6">
              <h4 className="font-bold text-lg mb-2">🎯 Practice Queries</h4>
              <p className="text-sm text-muted-foreground mb-4">Test your knowledge</p>
              <Link href="/practice">
                <Button variant="outline" className="w-full">Start Practice</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all">
            <CardContent className="p-4 md:p-6">
              <h4 className="font-bold text-lg mb-2">📚 All Queries</h4>
              <p className="text-sm text-muted-foreground mb-4">Browse complete library</p>
              <Link href="/queries">
                <Button variant="outline" className="w-full">View All</Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
