"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  BookOpen, 
  Code2, 
  Trophy, 
  Flame, 
  Clock, 
  Target, 
  TrendingUp,
  Zap,
  ChevronRight,
  RotateCcw,
  Star,
  Layers,
  FileCode2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getProgress, getStatistics, resetProgress } from "@/lib/storage"
import { achievementsData, getUnlockedAchievements } from "@/lib/achievements-data"
import toast from "react-hot-toast"

export default function DashboardPage() {
  const [stats, setStats] = useState<ReturnType<typeof getStatistics> | null>(null)
  const [achievements, setAchievements] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const progress = getProgress()
    const statistics = getStatistics()
    setStats(statistics)
    
    const unlocked = getUnlockedAchievements({
      lessons: progress.completedLessons.length,
      queries: progress.completedQueries.length,
      challenges: progress.completedChallenges.length,
      points: progress.totalPoints,
      streak: progress.currentStreak,
    })
    setAchievements(unlocked)
  }, [])

  const handleResetProgress = () => {
    if (confirm("Are you sure you want to reset all your progress? This cannot be undone.")) {
      resetProgress()
      setStats(getStatistics())
      setAchievements([])
      toast.success("Progress has been reset!")
    }
  }

  if (!mounted || !stats) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg text-muted-foreground">Loading...</div>
      </div>
    )
  }

  const statCards = [
    { title: "Lessons", value: stats.lessonsCompleted, total: 8, icon: BookOpen, color: "from-blue-500 to-cyan-500", href: "/course" },
    { title: "Queries", value: stats.queriesCompleted, total: 16, icon: Code2, color: "from-green-500 to-emerald-500", href: "/queries" },
    { title: "Challenges", value: stats.challengesCompleted, total: 8, icon: Trophy, color: "from-orange-500 to-amber-500", href: "/practice" },
    { title: "Points", value: stats.totalPoints, total: stats.maxPoints, icon: Star, color: "from-purple-500 to-pink-500", href: "/practice" }
  ]

  const quickLinks = [
    { title: "Course", href: "/course", icon: BookOpen, color: "text-blue-400" },
    { title: "Cheatsheet", href: "/cheatsheet", icon: FileCode2, color: "text-green-400" },
    { title: "Flashcards", href: "/flashcards", icon: Layers, color: "text-purple-400" },
    { title: "Practice", href: "/practice", icon: Target, color: "text-orange-400" },
  ]

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-10 md:py-14 max-w-6xl space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-5xl font-bold gradient-text mb-2">Dashboard</h1>
          <p className="text-base md:text-lg text-muted-foreground">Track your SQL learning journey</p>
        </motion.div>

        {/* Overall Progress + Streak */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                {/* Circle Progress */}
                <div className="relative w-28 h-28 md:w-36 md:h-36 shrink-0">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="50%" cy="50%" r="42%" stroke="currentColor" strokeWidth="8%" fill="none" className="text-muted/30" />
                    <circle
                      cx="50%" cy="50%" r="42%"
                      stroke="url(#pg)"
                      strokeWidth="8%"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={`${stats.overallProgress * 2.64} 264`}
                      className="transition-all duration-1000"
                    />
                    <defs>
                      <linearGradient id="pg" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#a855f7" />
                        <stop offset="100%" stopColor="#ec4899" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl md:text-3xl font-bold">{stats.overallProgress}%</span>
                  </div>
                </div>
                
                {/* Stats */}
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-xl md:text-2xl font-bold mb-3">Overall Progress</h2>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm md:text-base">
                    <div className="flex items-center gap-2 bg-muted/30 px-3 py-1.5 rounded-full">
                      <Flame className="w-5 h-5 text-orange-500" />
                      <span className="font-medium">{stats.currentStreak} day streak</span>
                    </div>
                    <div className="flex items-center gap-2 bg-muted/30 px-3 py-1.5 rounded-full">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                      <span className="font-medium">Best: {stats.longestStreak}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-muted/30 px-3 py-1.5 rounded-full">
                      <Clock className="w-5 h-5 text-blue-500" />
                      <span className="font-medium">{stats.totalStudyTimeMinutes} min studied</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {statCards.map((stat, index) => {
            const Icon = stat.icon
            const progress = Math.round((stat.value / stat.total) * 100)
            return (
              <Link key={stat.title} href={stat.href}>
                <Card className="border bg-card/50 hover:border-primary/50 transition-all h-full">
                  <CardContent className="p-4 md:p-6">
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                      <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl md:text-3xl font-bold">{stat.value}</span>
                      <span className="text-sm text-muted-foreground">/{stat.total}</span>
                    </div>
                    <div className="w-full h-2 bg-muted/30 rounded-full mt-3 overflow-hidden">
                      <div className={`h-full bg-gradient-to-r ${stat.color} rounded-full`} style={{ width: `${progress}%` }} />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-sm font-semibold text-muted-foreground mb-4">QUICK ACTIONS</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {quickLinks.map((link) => {
              const Icon = link.icon
              return (
                <Link key={link.title} href={link.href}>
                  <Card className="border bg-card/50 hover:border-primary/50 transition-all group">
                    <CardContent className="p-4 flex items-center gap-3">
                      <Icon className={`w-5 h-5 ${link.color}`} />
                      <span className="text-base font-medium">{link.title}</span>
                      <ChevronRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-muted-foreground">ACHIEVEMENTS</h3>
            <span className="text-sm text-muted-foreground">{achievements.length}/{achievementsData.length}</span>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
            {achievementsData.slice(0, 12).map((achievement) => {
              const isUnlocked = achievements.includes(achievement.id)
              return (
                <div key={achievement.id} className="relative group">
                  <Card className={`border transition-all ${isUnlocked ? 'bg-card/50' : 'bg-muted/20 opacity-50'}`}>
                    <CardContent className="p-3 md:p-4 text-center">
                      <div className={`text-3xl md:text-4xl ${isUnlocked ? '' : 'grayscale'}`}>{achievement.icon}</div>
                      <p className="text-xs font-medium truncate mt-2">{achievement.title}</p>
                      {isUnlocked && (
                        <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-[10px] text-white">✓</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-popover rounded text-xs text-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none w-32 z-10 border shadow-lg">
                    <p className="font-medium">{achievement.title}</p>
                    <p className="text-muted-foreground">{achievement.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
          {achievementsData.length > 12 && (
            <p className="text-sm text-center text-muted-foreground mt-3">
              + {achievementsData.length - 12} more achievements
            </p>
          )}
        </motion.div>

        {/* Reset */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="pt-6 border-t"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base font-medium">Reset Progress</p>
              <p className="text-sm text-muted-foreground">Start fresh (cannot be undone)</p>
            </div>
            <Button variant="ghost" size="default" onClick={handleResetProgress} className="text-red-500 hover:text-red-600 hover:bg-red-500/10">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
