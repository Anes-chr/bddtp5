"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Database, Search, BookOpen, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { queriesData } from "@/lib/queries-data"
import { getProgress } from "@/lib/storage"

export default function QueriesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all")
  const [completedQueries, setCompletedQueries] = useState<number[]>([])

  useEffect(() => {
    const progress = getProgress()
    setCompletedQueries(progress.completedQueries)
  }, [])

  const difficulties = ["all", "easy", "medium", "hard"]

  const filteredQueries = queriesData.filter(query => {
    const matchesSearch = 
      query.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query.concept.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesDifficulty = selectedDifficulty === "all" || query.difficulty === selectedDifficulty

    return matchesSearch && matchesDifficulty
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-green-500"
      case "medium": return "bg-yellow-500"
      case "hard": return "bg-red-500"
      default: return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-linear-to-br from-blue-600 to-cyan-600 mb-6">
            <Database className="w-8 h-8 md:w-10 md:h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            All SQL Queries
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Browse all 35 queries from TP4
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8"
        >
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{queriesData.length}</div>
              <div className="text-xs md:text-sm text-muted-foreground">Total Queries</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl md:text-3xl font-bold text-green-600 mb-1">{completedQueries.length}</div>
              <div className="text-xs md:text-sm text-muted-foreground">Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                {Math.round((completedQueries.length / queriesData.length) * 100)}%
              </div>
              <div className="text-xs md:text-sm text-muted-foreground">Progress</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{filteredQueries.length}</div>
              <div className="text-xs md:text-sm text-muted-foreground">Showing</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 space-y-4"
        >
          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search queries by title, concept, or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                  {difficulties.map((difficulty) => (
                    <Button
                      key={difficulty}
                      variant={selectedDifficulty === difficulty ? "default" : "outline"}
                      onClick={() => setSelectedDifficulty(difficulty)}
                      className="capitalize whitespace-nowrap"
                      size="sm"
                    >
                      {difficulty}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Queries Grid */}
        <div className="grid gap-4 md:gap-6">
          {filteredQueries.map((query, index) => {
            const isCompleted = completedQueries.includes(query.id)

            return (
              <motion.div
                key={query.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index * 0.05, 0.5) }}
              >
                <Card className={`hover:shadow-xl transition-all ${isCompleted ? "border-green-500 border-2 bg-green-50 dark:bg-green-950" : "hover:border-primary"}`}>
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row items-start gap-4">
                      {/* Query Number */}
                      <div className="shrink-0">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-linear-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-white text-lg md:text-xl font-bold shadow-lg">
                          {query.id}
                        </div>
                      </div>

                      {/* Query Content */}
                      <div className="flex-1 w-full">
                        <div className="flex flex-col md:flex-row items-start justify-between mb-3 gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-lg md:text-xl font-bold">{query.title}</h3>
                              {isCompleted && (
                                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                              )}
                            </div>
                            <p className="text-sm md:text-base text-muted-foreground mb-2">
                              {query.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 mb-4">
                          <Badge className={`${getDifficultyColor(query.difficulty)} text-xs md:text-sm`}>
                            {query.difficulty}
                          </Badge>
                          <Badge variant="outline" className="text-xs md:text-sm">
                            {query.concept}
                          </Badge>
                        </div>

                        <Link href={`/query/${query.id}`} className="block">
                          <Button className="w-full" size="lg">
                            <BookOpen className="w-4 h-4 mr-2" />
                            {isCompleted ? "Review Query" : "View Details"}
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

        {filteredQueries.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Database className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-bold mb-2">No queries found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or filters
            </p>
            <Button onClick={() => { setSearchTerm(""); setSelectedDifficulty("all") }}>
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
