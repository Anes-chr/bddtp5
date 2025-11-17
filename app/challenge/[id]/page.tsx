"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CheckCircle2, Trophy, Eye, EyeOff } from "lucide-react"
import CodeBlock from "@/components/code-block"
import { challengesData } from "@/lib/challenges-data"
import { queriesData } from "@/lib/queries-data"
import { completeChallenge, getProgress } from "@/lib/storage"
import toast from "react-hot-toast"

export default function ChallengePage() {
  const params = useParams()
  const router = useRouter()
  const challengeId = params.id as string
  const challenge = challengesData.find(c => c.id === parseInt(challengeId))

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [showButtons, setShowButtons] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [answers, setAnswers] = useState<boolean[]>([])

  useEffect(() => {
    const progress = getProgress()
    setIsCompleted(progress.completedChallenges.includes(parseInt(challengeId)))
  }, [challengeId])

  if (!challenge) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="p-6 max-w-md w-full">
          <CardTitle>Challenge not found</CardTitle>
          <Button onClick={() => router.push("/practice")} className="mt-4 w-full">
            Back to Practice
          </Button>
        </Card>
      </div>
    )
  }

  const question = challenge.questions[currentQuestion]
  const correctQuery = queriesData.find(q => q.id === question.correctQueryId)
  const progress = ((currentQuestion + 1) / challenge.questions.length) * 100

  const handleShowAnswer = () => {
    setShowAnswer(true)
    setShowButtons(true)
  }

  const handleCorrect = () => {
    const newAnswers = [...answers, true]
    setAnswers(newAnswers)
    setScore(score + 1)
    toast.success("✅ Correct! Well done!", { duration: 2000 })
    
    setTimeout(() => {
      if (currentQuestion < challenge.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setShowAnswer(false)
        setShowButtons(false)
      } else {
        handleComplete(newAnswers)
      }
    }, 1500)
  }

  const handleIncorrect = () => {
    const newAnswers = [...answers, false]
    setAnswers(newAnswers)
    toast.error("❌ Not quite! Review the answer and try the next one.", { duration: 2000 })
    
    setTimeout(() => {
      if (currentQuestion < challenge.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setShowAnswer(false)
        setShowButtons(false)
      } else {
        handleComplete(newAnswers)
      }
    }, 2000)
  }

  const handleComplete = (finalAnswers: boolean[]) => {
    const correctCount = finalAnswers.filter(Boolean).length
    const totalPoints = Math.round((correctCount / challenge.questions.length) * challenge.points)
    
    completeChallenge(parseInt(challengeId), totalPoints)
    setIsCompleted(true)
    
    toast.success(`🎉 Challenge complete! You earned ${totalPoints} points!`, {
      duration: 4000,
    })
  }

  if (isCompleted && answers.length === challenge.questions.length) {
    const correctCount = answers.filter(Boolean).length
    const percentage = Math.round((correctCount / challenge.questions.length) * 100)
    const earnedPoints = Math.round((correctCount / challenge.questions.length) * challenge.points)

    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-2xl w-full"
        >
          <Card className="border-2 border-green-500">
            <CardContent className="p-8 text-center">
              <Trophy className="w-20 h-20 mx-auto mb-6 text-yellow-500" />
              <h2 className="text-3xl font-bold mb-4">Challenge Complete!</h2>
              <p className="text-xl mb-6">You scored {correctCount} out of {challenge.questions.length}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-secondary rounded-lg">
                  <div className="text-3xl font-bold text-primary">{percentage}%</div>
                  <div className="text-sm text-muted-foreground">Accuracy</div>
                </div>
                <div className="p-4 bg-secondary rounded-lg">
                  <div className="text-3xl font-bold text-primary">{earnedPoints}</div>
                  <div className="text-sm text-muted-foreground">Points Earned</div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button onClick={() => router.push("/practice")} variant="outline" className="flex-1">
                  Back to Practice
                </Button>
                <Button onClick={() => router.push("/course")} className="flex-1">
                  Continue Learning
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => router.push("/practice")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Practice
        </Button>

        {/* Header */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{challenge.title}</h1>
                <p className="text-muted-foreground">{challenge.description}</p>
              </div>
              <Badge className="text-lg px-4 py-2">{challenge.difficulty}</Badge>
            </div>

            <div className="mb-2 flex items-center justify-between text-sm">
              <span>Progress: {currentQuestion + 1} / {challenge.questions.length}</span>
              <span>Score: {score} / {currentQuestion + 1}</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Question {currentQuestion + 1}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-xl font-semibold">{question.question}</div>

                <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border-l-4 border-blue-500">
                  <p className="font-semibold mb-1">💡 Hint:</p>
                  <p>{question.hint}</p>
                </div>

                {showAnswer && correctQuery && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                  >
                    <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border-l-4 border-green-500">
                      <p className="font-semibold mb-3">✅ Correct Answer:</p>
                      <CodeBlock code={correctQuery.sql} />
                      <p className="mt-3 text-sm">{correctQuery.explanation}</p>
                    </div>
                  </motion.div>
                )}

                <div className="space-y-3">
                  {!showAnswer ? (
                    <Button
                      onClick={handleShowAnswer}
                      variant="outline"
                      className="w-full"
                      size="lg"
                    >
                      <Eye className="w-5 h-5 mr-2" />
                      Check Answer
                    </Button>
                  ) : (
                    <div className="flex gap-4">
                      <Button
                        onClick={handleCorrect}
                        className="flex-1"
                        size="lg"
                      >
                        <CheckCircle2 className="w-5 h-5 mr-2" />
                        I Got It Right!
                      </Button>
                      <Button
                        onClick={handleIncorrect}
                        variant="secondary"
                        className="flex-1"
                        size="lg"
                      >
                        <EyeOff className="w-5 h-5 mr-2" />
                        Wasn't Right
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

