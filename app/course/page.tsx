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
    description: "Master the fundamentals with simple queries and projections",
    duration: "30 min",
    queries: [1, 2, 6],
    difficulty: "Beginner",
  },
  {
    id: 2,
    title: "Filtering with WHERE & Operators",
    description: "Learn filtering with WHERE, compound conditions, and comparisons",
    duration: "45 min",
    queries: [3, 4],
    difficulty: "Beginner",
  },
  {
    id: 3,
    title: "Joins & Relationships",
    description: "Understand how to combine tables using INNER JOIN",
    duration: "60 min",
    queries: [1, 2, 5],
    difficulty: "Intermediate",
  },
  {
    id: 4,
    title: "Aggregate Functions",
    description: "COUNT, AVG, MAX, MIN - Master data aggregation",
    duration: "45 min",
    queries: [10, 12, 13],
    difficulty: "Intermediate",
  },
  {
    id: 5,
    title: "GROUP BY & HAVING",
    description: "Group data and filter groups for powerful analytics",
    duration: "60 min",
    queries: [5, 10, 12],
    difficulty: "Intermediate",
  },
  {
    id: 6,
    title: "Subqueries & Nested Queries",
    description: "Write queries inside queries for complex data retrieval",
    duration: "75 min",
    queries: [7, 8, 11],
    difficulty: "Advanced",
  },
  {
    id: 7,
    title: "Advanced Subqueries (ALL, Division)",
    description: "Master division queries and ALL operator",
    duration: "60 min",
    queries: [9, 14, 15],
    difficulty: "Advanced",
  },
  {
    id: 8,
    title: "Complex Queries & Set Operations",
    description: "Put it all together with INTERSECT and complex real-world queries",
    duration: "90 min",
    queries: [7, 14, 16],
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
    <div className="min-h-screen py-6 md:py-8">
      <div className="container mx-auto px-4 w-full max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-5 md:mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2 gradient-text">
            SQL Mastery Course
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mb-4">
            A structured learning path from beginner to expert
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5 text-sm">
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-primary" />
              <span>8 Lessons</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-primary" />
              <span>7+ Hours</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>16 Queries</span>
            </div>
          </div>
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-5 md:mb-8"
        >
          <Card className="bg-linear-to-r from-purple-500 to-pink-500 text-white border-0">
            <CardContent className="p-3 md:p-5">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-1">Your Progress</h3>
                  <p className="opacity-90 text-xs md:text-sm">Keep learning to unlock achievements!</p>
                </div>
                <div className="text-left md:text-right w-full md:w-auto">
                  <div className="text-2xl md:text-3xl font-bold">{completionPercentage}%</div>
                  <div className="text-xs opacity-90">{completedLessons.length} / {lessons.length} completed</div>
                </div>
              </div>
              <div className="mt-3 h-1.5 bg-white/30 rounded-full overflow-hidden">
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
        <div className="grid gap-3 md:gap-4">
          {lessons.map((lesson, index) => {
            const isCompleted = completedLessons.includes(lesson.id)

            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className={`hover:shadow-lg transition-all border-2 ${isCompleted ? 'border-green-500 bg-green-50 dark:bg-green-950' : 'hover:border-primary'}`}>
                  <CardContent className="p-3 md:p-4">
                    <div className="flex flex-col md:flex-row items-start gap-3 md:gap-4">
                      {/* Lesson Number */}
                      <div className="shrink-0">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-linear-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white text-lg md:text-xl font-bold shadow-lg">
                          {lesson.id}
                        </div>
                      </div>

                      {/* Lesson Content */}
                      <div className="flex-1 w-full">
                        <div className="flex flex-col md:flex-row items-start md:items-start justify-between mb-2 gap-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-base md:text-lg font-bold">{lesson.title}</h3>
                              {isCompleted && (
                                <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-600 shrink-0" />
                              )}
                            </div>
                            <p className="text-muted-foreground text-xs md:text-sm">{lesson.description}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-1.5 md:gap-2 mb-2">
                          <Badge variant="outline" className="font-semibold text-xs">
                            <Clock className="w-3 h-3 mr-1" />
                            {lesson.duration}
                          </Badge>
                          <Badge className={`${getDifficultyColor(lesson.difficulty)} text-xs`}>
                            {lesson.difficulty}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {lesson.queries.length} Queries
                          </Badge>
                        </div>

                        <Link href={`/lesson/${lesson.id}`} className="block">
                          <Button 
                            className="w-full"
                            size="default"
                          >
                            {isCompleted ? (
                              <>
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Review
                              </>
                            ) : (
                              <>
                                <Play className="w-4 h-4 mr-2" />
                                Start
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
          transition={{ delay: 0.5 }}
          className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4"
        >
          <Card className="hover:shadow-md transition-all">
            <CardContent className="p-3 md:p-4">
              <h4 className="font-bold text-sm mb-1">📊 Database Schema</h4>
              <p className="text-xs text-muted-foreground mb-2">Understand the structure</p>
              <Link href="/schema">
                <Button variant="outline" className="w-full" size="sm">View Schema</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-all">
            <CardContent className="p-3 md:p-4">
              <h4 className="font-bold text-sm mb-1">🎯 Practice Queries</h4>
              <p className="text-xs text-muted-foreground mb-2">Test your knowledge</p>
              <Link href="/practice">
                <Button variant="outline" className="w-full" size="sm">Start Practice</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-all">
            <CardContent className="p-3 md:p-4">
              <h4 className="font-bold text-sm mb-1">📚 All Queries</h4>
              <p className="text-xs text-muted-foreground mb-2">Browse complete library</p>
              <Link href="/queries">
                <Button variant="outline" className="w-full" size="sm">View All</Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
