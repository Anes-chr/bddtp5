export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  color: string
  requirement: {
    type: "lessons" | "queries" | "challenges" | "points" | "streak" | "special"
    count: number
  }
}

export const achievementsData: Achievement[] = [
  // Lesson Achievements
  {
    id: "first_lesson",
    title: "First Steps",
    description: "Complete your first lesson",
    icon: "🎯",
    color: "from-green-500 to-emerald-500",
    requirement: { type: "lessons", count: 1 }
  },
  {
    id: "halfway_lessons",
    title: "Halfway There",
    description: "Complete 4 lessons",
    icon: "📚",
    color: "from-blue-500 to-cyan-500",
    requirement: { type: "lessons", count: 4 }
  },
  {
    id: "all_lessons",
    title: "Course Master",
    description: "Complete all 8 lessons",
    icon: "🎓",
    color: "from-purple-500 to-pink-500",
    requirement: { type: "lessons", count: 8 }
  },

  // Query Achievements
  {
    id: "first_query",
    title: "Query Beginner",
    description: "Run your first SQL query",
    icon: "💻",
    color: "from-orange-500 to-amber-500",
    requirement: { type: "queries", count: 1 }
  },
  {
    id: "ten_queries",
    title: "Query Explorer",
    description: "Run 10 different queries",
    icon: "🔍",
    color: "from-teal-500 to-cyan-500",
    requirement: { type: "queries", count: 10 }
  },
  {
    id: "fifteen_queries",
    title: "Query Expert",
    description: "Run 15 different queries",
    icon: "⚡",
    color: "from-yellow-500 to-orange-500",
    requirement: { type: "queries", count: 15 }
  },
  {
    id: "all_queries",
    title: "Query Master",
    description: "Run all 16 queries",
    icon: "👑",
    color: "from-red-500 to-pink-500",
    requirement: { type: "queries", count: 16 }
  },

  // Challenge Achievements
  {
    id: "first_challenge",
    title: "Challenger",
    description: "Complete your first challenge",
    icon: "🏆",
    color: "from-yellow-500 to-amber-500",
    requirement: { type: "challenges", count: 1 }
  },
  {
    id: "half_challenges",
    title: "Rising Star",
    description: "Complete 4 challenges",
    icon: "⭐",
    color: "from-indigo-500 to-purple-500",
    requirement: { type: "challenges", count: 4 }
  },
  {
    id: "all_challenges",
    title: "Challenge Champion",
    description: "Complete all 8 challenges",
    icon: "🏅",
    color: "from-amber-500 to-yellow-500",
    requirement: { type: "challenges", count: 8 }
  },

  // Points Achievements
  {
    id: "points_100",
    title: "Point Collector",
    description: "Earn 100 points",
    icon: "💎",
    color: "from-cyan-500 to-blue-500",
    requirement: { type: "points", count: 100 }
  },
  {
    id: "points_500",
    title: "High Scorer",
    description: "Earn 500 points",
    icon: "💰",
    color: "from-green-500 to-teal-500",
    requirement: { type: "points", count: 500 }
  },
  {
    id: "points_1000",
    title: "Point Master",
    description: "Earn 1000 points",
    icon: "🌟",
    color: "from-purple-500 to-violet-500",
    requirement: { type: "points", count: 1000 }
  },
  {
    id: "points_max",
    title: "Maximum Points",
    description: "Earn all 1850 points",
    icon: "🔥",
    color: "from-orange-500 to-red-500",
    requirement: { type: "points", count: 1850 }
  },

  // Streak Achievements
  {
    id: "streak_3",
    title: "Consistent",
    description: "Maintain a 3-day streak",
    icon: "🔥",
    color: "from-orange-500 to-red-500",
    requirement: { type: "streak", count: 3 }
  },
  {
    id: "streak_7",
    title: "Dedicated",
    description: "Maintain a 7-day streak",
    icon: "🔥",
    color: "from-red-500 to-rose-500",
    requirement: { type: "streak", count: 7 }
  },

  // Special Achievements
  {
    id: "speedrunner",
    title: "Speed Learner",
    description: "Complete 3 lessons in one day",
    icon: "⚡",
    color: "from-yellow-400 to-orange-500",
    requirement: { type: "special", count: 0 }
  },
  {
    id: "perfectionist",
    title: "Perfectionist",
    description: "Complete everything at 100%",
    icon: "✨",
    color: "from-violet-500 to-purple-500",
    requirement: { type: "special", count: 0 }
  },
]

export const getUnlockedAchievements = (stats: {
  lessons: number
  queries: number
  challenges: number
  points: number
  streak: number
}): string[] => {
  const unlocked: string[] = []

  achievementsData.forEach((achievement) => {
    const { type, count } = achievement.requirement

    switch (type) {
      case "lessons":
        if (stats.lessons >= count) unlocked.push(achievement.id)
        break
      case "queries":
        if (stats.queries >= count) unlocked.push(achievement.id)
        break
      case "challenges":
        if (stats.challenges >= count) unlocked.push(achievement.id)
        break
      case "points":
        if (stats.points >= count) unlocked.push(achievement.id)
        break
      case "streak":
        if (stats.streak >= count) unlocked.push(achievement.id)
        break
      case "special":
        // Special achievements require custom logic
        if (
          achievement.id === "perfectionist" &&
          stats.lessons === 8 &&
          stats.queries === 16 &&
          stats.challenges === 8
        ) {
          unlocked.push(achievement.id)
        }
        break
    }
  })

  return unlocked
}
