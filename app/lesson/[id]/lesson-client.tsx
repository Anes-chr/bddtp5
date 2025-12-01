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
import { lessonsContent } from "@/lib/lessons-data"
import toast from "react-hot-toast"

export default function LessonClient() {
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
