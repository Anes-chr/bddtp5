"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trophy, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { getProgress } from "@/lib/storage"
import { challengesData } from "@/lib/challenges-data"

export default function PracticePage() {
  const [completedChallenges, setCompletedChallenges] = useState<number[]>([])
  const [totalPoints, setTotalPoints] = useState(0)

  useEffect(() => {
    const progress = getProgress()
    setCompletedChallenges(progress.completedChallenges)
    setTotalPoints(progress.totalPoints)
  }, [])

  const maxPoints = challengesData.reduce((sum, c) => sum + c.points, 0)
  const completionPercentage = Math.round((totalPoints / maxPoints) * 100)

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 mb-6">
            <Trophy className="w-8 h-8 md:w-10 md:h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Practice Challenges
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Test your SQL skills with real-world challenges
          </p>
        </motion.div>

        {/* Score Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8 md:mb-12"
        >
          <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
            <CardContent className="p-6 md:p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center">
                <div>
                  <div className="text-3xl md:text-4xl font-bold mb-2">{totalPoints}</div>
                  <div className="text-xs md:text-sm opacity-90">Points Earned</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold mb-2">{completedChallenges.length}</div>
                  <div className="text-xs md:text-sm opacity-90">Challenges Complete</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold mb-2">{maxPoints}</div>
                  <div className="text-xs md:text-sm opacity-90">Total Points</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold mb-2">{completionPercentage}%</div>
                  <div className="text-xs md:text-sm opacity-90">Progress</div>
                </div>
              </div>

              <div className="mt-6 h-3 bg-white/30 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${completionPercentage}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-white rounded-full"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {challengesData.map((challenge, index) => {
            const isCompleted = completedChallenges.includes(challenge.id)

            // No icon needed, just show Trophy for all challenges

            return (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index * 0.1, 0.5) }}
              >
                <Card className={`h-full hover:shadow-2xl transition-all ${isCompleted ? "border-green-500 border-2" : ""}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${challenge.color} flex items-center justify-center shadow-lg`}>
                        <Trophy className="w-7 h-7 md:w-8 md:h-8 text-white" />
                      </div>
                      {isCompleted && (
                        <Badge variant="success" className="text-xs md:text-sm">
                          <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                          Completed
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl md:text-2xl">{challenge.title}</CardTitle>
                    <p className="text-sm md:text-base text-muted-foreground">{challenge.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                      <div className="flex items-center gap-2 md:gap-4">
                        <Badge className="text-xs md:text-sm">{challenge.difficulty}</Badge>
                        <span className="text-xs md:text-sm text-muted-foreground">
                          {challenge.questions.length} questions
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-xl md:text-2xl font-bold text-primary">{challenge.points}</div>
                        <div className="text-xs text-muted-foreground">points</div>
                      </div>
                    </div>

                    <Link href={`/challenge/${challenge.id}`}>
                      <Button
                        className="w-full"
                        size="lg"
                      >
                        {isCompleted ? "Retry Challenge" : "Start Challenge"}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
