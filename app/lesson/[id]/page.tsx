"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, ChevronRight, CheckCircle2 } from "lucide-react"
import CodeBlock from "@/components/code-block"
import QueryTester from "@/components/query-tester"
import { queriesData } from "@/lib/queries-data"
import { completeLesson, getProgress } from "@/lib/storage"
import toast from "react-hot-toast"

const lessonsContent = {
  "1": {
    title: "SQL Basics & SELECT Statements",
    description: "Master the fundamentals of SQL",
    queryIds: [1, 2, 3, 9, 10, 15],
    concepts: [
      {
        title: "What is SELECT?",
        content: "SELECT is the most fundamental SQL command. It allows you to retrieve data from a database. Think of it as asking the database a question: 'Show me this information.'",
        example: "SELECT Nom, Salaire FROM Footballeur;",
        explanation: "This query asks: 'Show me the names and salaries of all football players.'"
      },
      {
        title: "Projection: Choosing Columns",
        content: "Projection means selecting specific columns. Instead of showing all data (SELECT *), you choose only what you need. This makes queries faster and results clearer.",
        example: "SELECT Nom FROM Footballeur;",
        explanation: "Only shows player names, nothing else. Clean and focused."
      },
      {
        title: "DISTINCT: Removing Duplicates",
        content: "When you want unique values only, use DISTINCT. If 5 players are 'Attaquant', DISTINCT shows it once.",
        example: "SELECT DISTINCT Poste FROM Footballeur;",
        explanation: "Shows each position type only once, even if multiple players share it."
      },
    ]
  },
  "2": {
    title: "Filtering with WHERE & Operators",
    description: "Learn to filter data effectively",
    queryIds: [3, 7, 12, 15, 16, 17],
    concepts: [
      {
        title: "The WHERE Clause",
        content: "WHERE is how you filter rows. It's like saying 'Show me data, but ONLY if it meets this condition.' Without WHERE, you get everything. With WHERE, you get exactly what you need.",
        example: "SELECT * FROM Footballeur WHERE Salaire > 80000;",
        explanation: "Shows only players earning more than 80,000. The rest are filtered out."
      },
      {
        title: "Pattern Matching with LIKE",
        content: "LIKE lets you search for patterns. Use % for 'anything' and _ for 'one character'. Perfect for partial name searches.",
        example: "SELECT Nom FROM Footballeur WHERE Nom LIKE 'a%';",
        explanation: "Finds all names starting with 'a'. The % means 'followed by anything'."
      },
      {
        title: "Multiple Conditions: AND/OR",
        content: "Combine conditions with AND (both must be true) or OR (either can be true). Use parentheses to group complex logic.",
        example: "SELECT Nom FROM Footballeur WHERE (IdEqui = 2 OR IdEqui = 5) AND Salaire > 80000;",
        explanation: "Players from team 2 OR 5, AND earning over 80,000. All conditions must match."
      },
    ]
  },
  "3": {
    title: "Joins & Relationships",
    description: "Connect tables to unlock powerful queries",
    queryIds: [4, 5, 6, 13, 14, 30],
    concepts: [
      {
        title: "Why Joins?",
        content: "Data is split across multiple tables for efficiency. Joins let you combine them. Think of it as connecting puzzle pieces - each table is a piece, joins show the full picture.",
        example: "SELECT Footballeur.Nom, Equipe.Nom FROM Footballeur INNER JOIN Equipe ON Footballeur.IdEqui = Equipe.IdEqui;",
        explanation: "Connects players to their teams using the IdEqui field. Now we see player names with team names."
      },
      {
        title: "INNER JOIN Explained",
        content: "INNER JOIN shows only rows that have a match in BOTH tables. If a player has no team (NULL IdEqui), they won't appear. Only complete matches are shown.",
        example: "FROM Footballeur INNER JOIN Equipe ON Footballeur.IdEqui = Equipe.IdEqui",
        explanation: "ON specifies the matching condition. Here: player's team ID must equal a team's ID."
      },
      {
        title: "Cartesian Product (Cross Join)",
        content: "Without a JOIN condition, you get ALL combinations. 20 players × 6 teams = 120 rows! Usually not useful, but important to understand.",
        example: "SELECT * FROM Footballeur, Equipe;",
        explanation: "Every player paired with every team. Rarely what you want, but shows why joins matter."
      },
    ]
  },
}

export default function LessonPage() {
  const params = useParams()
  const router = useRouter()
  const lessonId = params.id as string
  const lesson = lessonsContent[lessonId as keyof typeof lessonsContent]

  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [isLessonCompleted, setIsLessonCompleted] = useState(false)

  useEffect(() => {
    const progress = getProgress()
    setIsLessonCompleted(progress.completedLessons.includes(parseInt(lessonId)))
  }, [lessonId])

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="p-6 max-w-md w-full">
          <CardTitle>Lesson not found</CardTitle>
          <Button onClick={() => router.push("/course")} className="mt-4 w-full">
            Back to Course
          </Button>
        </Card>
      </div>
    )
  }

  const concept = lesson.concepts[currentStep]
  const queries = lesson.queryIds.map(id => queriesData.find(q => q.id === id)).filter(Boolean)

  const handleNext = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep])
    }
    if (currentStep < lesson.concepts.length - 1) {
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleCompleteLesson = () => {
    completeLesson(parseInt(lessonId))
    setIsLessonCompleted(true)
    toast.success(`🎉 Lesson ${lessonId} completed!`, {
      duration: 4000,
    })
    setTimeout(() => {
      router.push("/course")
    }, 1500)
  }

  return (
    <div className="min-h-screen py-4 md:py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push("/course")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Course
          </Button>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 gradient-text">
                Lesson {lessonId}: {lesson.title}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">{lesson.description}</p>
            </div>
            <Badge variant="secondary" className="text-base md:text-lg px-4 py-2">
              {currentStep + 1} / {lesson.concepts.length}
            </Badge>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6 md:mb-8">
          <div className="flex gap-1 md:gap-2 mb-2">
            {lesson.concepts.map((_, index) => (
              <motion.div
                key={index}
                className={`h-2 flex-1 rounded-full ${
                  completedSteps.includes(index)
                    ? "bg-green-500"
                    : index === currentStep
                    ? "bg-primary"
                    : "bg-secondary"
                }`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: index * 0.1 }}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="mb-6 md:mb-8">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                    {currentStep + 1}
                  </div>
                  <CardTitle className="text-2xl md:text-3xl">{concept.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose prose-sm md:prose-lg max-w-none dark:prose-invert">
                  <p className="text-base md:text-lg leading-relaxed">{concept.content}</p>
                </div>

                <div>
                  <h4 className="font-bold text-base md:text-lg mb-3">💡 Example:</h4>
                  <CodeBlock code={concept.example} />
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border-l-4 border-blue-500">
                  <p className="font-semibold mb-2 text-sm md:text-base">🔍 What this means:</p>
                  <p className="text-sm md:text-base">{concept.explanation}</p>
                </div>
              </CardContent>
            </Card>

            {/* Practice Queries */}
            <Card>
              <CardHeader>
                <CardTitle>🎯 Practice Queries</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {queries.slice(currentStep * 2, currentStep * 2 + 2).map((query) => query && (
                  <div key={query.id} className="space-y-4">
                    <div className="flex flex-col md:flex-row items-start justify-between gap-3">
                      <div>
                        <h4 className="font-bold text-base md:text-lg mb-2">
                          Query #{query.id}: {query.title}
                        </h4>
                        <p className="text-sm md:text-base text-muted-foreground mb-3">{query.description}</p>
                      </div>
                      <Badge className="self-start">{query.difficulty}</Badge>
                    </div>

                    <CodeBlock code={query.sql} />

                    <div className="p-4 bg-secondary rounded-lg">
                      <p className="font-semibold mb-2 text-sm md:text-base">📖 Explanation:</p>
                      <p className="text-sm md:text-base">{query.explanation}</p>
                    </div>

                    <QueryTester query={query} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-6 md:mt-8 gap-4">
          <Button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            variant="outline"
            size="lg"
            className="w-full md:w-auto"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <div className="flex items-center gap-2">
            {completedSteps.length === lesson.concepts.length && !isLessonCompleted && (
              <Badge variant="secondary" className="text-sm md:text-base px-4 py-2">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                All Steps Complete!
              </Badge>
            )}
            {isLessonCompleted && (
              <Badge variant="success" className="text-sm md:text-base px-4 py-2">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Lesson Completed!
              </Badge>
            )}
          </div>

          {currentStep === lesson.concepts.length - 1 ? (
            <Button
              onClick={handleCompleteLesson}
              size="lg"
              disabled={isLessonCompleted}
              className="w-full md:w-auto"
            >
              {isLessonCompleted ? "Completed" : "Complete Lesson"}
              <CheckCircle2 className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleNext} size="lg" className="w-full md:w-auto">
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
