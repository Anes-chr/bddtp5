// Local storage utilities for persisting user progress

export interface StudySession {
  date: string
  lessonsCompleted: number
  queriesRun: number
  challengesCompleted: number
  timeSpentMinutes: number
}

export interface UserProgress {
  completedLessons: number[]
  completedQueries: number[]
  completedChallenges: number[]
  totalPoints: number
  currentStreak: number
  longestStreak: number
  lastStudyDate: string
  totalStudyTimeMinutes: number
  flashcardsStudied: number[]
  unlockedAchievements: string[]
  studyHistory: StudySession[]
  lastUpdated: string
}

const STORAGE_KEY = 'tp4_user_progress'
const SESSION_START_KEY = 'tp4_session_start'

export const getProgress = (): UserProgress => {
  if (typeof window === 'undefined') {
    return getDefaultProgress()
  }

  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) {
    return getDefaultProgress()
  }

  try {
    const progress = JSON.parse(stored)
    // Migrate old progress format
    return {
      ...getDefaultProgress(),
      ...progress,
    }
  } catch {
    return getDefaultProgress()
  }
}

export const saveProgress = (progress: UserProgress) => {
  if (typeof window === 'undefined') return

  progress.lastUpdated = new Date().toISOString()
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}

// Streak management
export const updateStreak = () => {
  const progress = getProgress()
  const today = new Date().toDateString()
  const lastStudy = progress.lastStudyDate ? new Date(progress.lastStudyDate).toDateString() : null
  
  if (lastStudy === today) {
    // Already studied today, no change
    return progress.currentStreak
  }
  
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayString = yesterday.toDateString()
  
  if (lastStudy === yesterdayString) {
    // Studied yesterday, increment streak
    progress.currentStreak += 1
  } else if (lastStudy !== today) {
    // Missed a day, reset streak
    progress.currentStreak = 1
  }
  
  progress.longestStreak = Math.max(progress.longestStreak, progress.currentStreak)
  progress.lastStudyDate = new Date().toISOString()
  saveProgress(progress)
  
  return progress.currentStreak
}

// Session time tracking
export const startStudySession = () => {
  if (typeof window === 'undefined') return
  localStorage.setItem(SESSION_START_KEY, Date.now().toString())
}

export const endStudySession = () => {
  if (typeof window === 'undefined') return 0
  
  const startTime = localStorage.getItem(SESSION_START_KEY)
  if (!startTime) return 0
  
  const elapsedMinutes = Math.floor((Date.now() - parseInt(startTime)) / 60000)
  
  const progress = getProgress()
  progress.totalStudyTimeMinutes += elapsedMinutes
  saveProgress(progress)
  
  localStorage.removeItem(SESSION_START_KEY)
  return elapsedMinutes
}

export const completeLesson = (lessonId: number) => {
  const progress = getProgress()
  if (!progress.completedLessons.includes(lessonId)) {
    progress.completedLessons.push(lessonId)
    updateStreak()
    saveProgress(progress)
  }
}

export const completeQuery = (queryId: number) => {
  const progress = getProgress()
  if (!progress.completedQueries.includes(queryId)) {
    progress.completedQueries.push(queryId)
    updateStreak()
    saveProgress(progress)
  }
}

export const completeChallenge = (challengeId: number, points: number) => {
  const progress = getProgress()
  if (!progress.completedChallenges.includes(challengeId)) {
    progress.completedChallenges.push(challengeId)
    progress.totalPoints += points
    updateStreak()
    saveProgress(progress)
  }
}

export const studyFlashcard = (flashcardId: number) => {
  const progress = getProgress()
  if (!progress.flashcardsStudied.includes(flashcardId)) {
    progress.flashcardsStudied.push(flashcardId)
    saveProgress(progress)
  }
}

export const unlockAchievement = (achievementId: string) => {
  const progress = getProgress()
  if (!progress.unlockedAchievements.includes(achievementId)) {
    progress.unlockedAchievements.push(achievementId)
    saveProgress(progress)
    return true // Was newly unlocked
  }
  return false // Already unlocked
}

export const resetProgress = () => {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
  localStorage.removeItem(SESSION_START_KEY)
}

// Statistics calculation
export const getStatistics = () => {
  const progress = getProgress()
  
  const lessonProgress = Math.round((progress.completedLessons.length / 8) * 100)
  const queryProgress = Math.round((progress.completedQueries.length / 35) * 100)
  const challengeProgress = Math.round((progress.completedChallenges.length / 8) * 100)
  const overallProgress = Math.round(
    ((progress.completedLessons.length + progress.completedQueries.length + progress.completedChallenges.length) / 51) * 100
  )
  
  return {
    lessonProgress,
    queryProgress,
    challengeProgress,
    overallProgress,
    lessonsCompleted: progress.completedLessons.length,
    queriesCompleted: progress.completedQueries.length,
    challengesCompleted: progress.completedChallenges.length,
    totalPoints: progress.totalPoints,
    maxPoints: 1850,
    currentStreak: progress.currentStreak,
    longestStreak: progress.longestStreak,
    totalStudyTimeMinutes: progress.totalStudyTimeMinutes,
    flashcardsStudied: progress.flashcardsStudied.length,
    achievementsUnlocked: progress.unlockedAchievements.length,
  }
}

function getDefaultProgress(): UserProgress {
  return {
    completedLessons: [],
    completedQueries: [],
    completedChallenges: [],
    totalPoints: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastStudyDate: '',
    totalStudyTimeMinutes: 0,
    flashcardsStudied: [],
    unlockedAchievements: [],
    studyHistory: [],
    lastUpdated: new Date().toISOString(),
  }
}


