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
    <div className="min-h-screen py-6 md:py-8">
      <div className="container mx-auto px-4 w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-5 md:mb-8"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-linear-to-br from-yellow-500 to-orange-500 mb-4">
            <Trophy className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 gradient-text">
            Practice Challenges
          </h1>
          <p className="text-base md:text-lg text-muted-foreground">
            Test your SQL skills with real-world challenges
          </p>
        </motion.div>

        {/* Score Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-5 md:mb-8"
        >
          <Card className="bg-linear-to-r from-purple-500 to-pink-500 text-white border-0">
            <CardContent className="p-4 md:p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 text-center">
                <div>
                  <div className="text-2xl md:text-3xl font-bold mb-1">{totalPoints}</div>
                  <div className="text-xs md:text-sm opacity-90">Points</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold mb-1">{completedChallenges.length}</div>
                  <div className="text-xs md:text-sm opacity-90">Completed</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold mb-1">{maxPoints}</div>
                  <div className="text-xs md:text-sm opacity-90">Total Points</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold mb-1">{completionPercentage}%</div>
                  <div className="text-xs md:text-sm opacity-90">Progress</div>
                </div>
              </div>

              <div className="mt-4 h-2 bg-white/30 rounded-full overflow-hidden">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {challengesData.map((challenge, index) => {
            const isCompleted = completedChallenges.includes(challenge.id)

            return (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index * 0.08, 0.4) }}
              >
                <Card className={`h-full hover:shadow-lg transition-all ${isCompleted ? "border-green-500 border-2" : ""}`}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between mb-2">
                      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-linear-to-br ${challenge.color} flex items-center justify-center shadow-lg`}>
                        <Trophy className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </div>
                      {isCompleted && (
                        <Badge variant="success" className="text-xs">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Done
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-base md:text-lg">{challenge.title}</CardTitle>
                    <p className="text-xs md:text-sm text-muted-foreground">{challenge.description}</p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between mb-3 flex-wrap gap-1.5">
                      <div className="flex items-center gap-1.5 md:gap-2">
                        <Badge className="text-xs">{challenge.difficulty}</Badge>
                        <span className="text-xs text-muted-foreground">
                          {challenge.questions.length} Q
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-lg md:text-xl font-bold text-primary">{challenge.points}</div>
                        <div className="text-[10px] text-muted-foreground">pts</div>
                      </div>
                    </div>

                    <Link href={`/challenge/${challenge.id}`}>
                      <Button className="w-full" size="sm">
                        {isCompleted ? "Retry" : "Start"}
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
