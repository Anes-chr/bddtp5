// Local storage utilities for persisting user progress

export interface UserProgress {
  completedLessons: number[]
  completedQueries: number[]
  completedChallenges: number[]
  totalPoints: number
  lastUpdated: string
}

const STORAGE_KEY = 'tp4_user_progress'

export const getProgress = (): UserProgress => {
  if (typeof window === 'undefined') {
    return getDefaultProgress()
  }

  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) {
    return getDefaultProgress()
  }

  try {
    return JSON.parse(stored)
  } catch {
    return getDefaultProgress()
  }
}

export const saveProgress = (progress: UserProgress) => {
  if (typeof window === 'undefined') return

  progress.lastUpdated = new Date().toISOString()
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}

export const completeLesson = (lessonId: number) => {
  const progress = getProgress()
  if (!progress.completedLessons.includes(lessonId)) {
    progress.completedLessons.push(lessonId)
    saveProgress(progress)
  }
}

export const completeQuery = (queryId: number) => {
  const progress = getProgress()
  if (!progress.completedQueries.includes(queryId)) {
    progress.completedQueries.push(queryId)
    saveProgress(progress)
  }
}

export const completeChallenge = (challengeId: number, points: number) => {
  const progress = getProgress()
  if (!progress.completedChallenges.includes(challengeId)) {
    progress.completedChallenges.push(challengeId)
    progress.totalPoints += points
    saveProgress(progress)
  }
}

export const resetProgress = () => {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}

function getDefaultProgress(): UserProgress {
  return {
    completedLessons: [],
    completedQueries: [],
    completedChallenges: [],
    totalPoints: 0,
    lastUpdated: new Date().toISOString(),
  }
}

