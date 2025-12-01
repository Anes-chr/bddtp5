import { getProgress, saveProgress, UserProgress } from "./storage"

// API helper for communicating with backend
// This file handles all API calls and can be configured for different backends

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

// Session management (in-memory for each instance)
let sessionId: string | null = null

export function getOrCreateSessionId(): string {
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    if (typeof window !== "undefined") {
      sessionStorage.setItem("sessionId", sessionId)
    }
  }
  return sessionId
}

// Get stored progress from API (backend) or localStorage fallback
export async function getProgressFromApi(): Promise<any> {
  // In desktop/static mode, we just use localStorage
  return getProgress()
}

// Save progress to API (backend)
export async function saveProgressToApi(progress: any): Promise<boolean> {
  // In desktop/static mode, we just use localStorage
  saveProgress(progress)
  return true
}

// Utility function for API calls
export async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  // Mock API calls for static export
  console.log(`Mock API call to ${endpoint}`, options)
  return {
    success: true,
    data: {} as T
  }
}


