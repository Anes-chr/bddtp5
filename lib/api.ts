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
  try {
    const sessionId = getOrCreateSessionId()
    const response = await fetch(`${API_BASE}/progress?sessionId=${sessionId}`)
    
    if (!response.ok) {
      throw new Error("Failed to fetch progress")
    }
    
    return await response.json()
  } catch (error) {
    console.error("API call failed, using localStorage:", error)
    // Fallback to localStorage
    return null
  }
}

// Save progress to API (backend)
export async function saveProgressToApi(progress: any): Promise<boolean> {
  try {
    const sessionId = getOrCreateSessionId()
    const response = await fetch(`${API_BASE}/progress`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionId,
        ...progress,
      }),
    })
    
    if (!response.ok) {
      throw new Error("Failed to save progress")
    }
    
    return true
  } catch (error) {
    console.error("Failed to save progress to API:", error)
    // Still save to localStorage as fallback
    return false
  }
}

// Utility function for API calls
export async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: data.error || "An error occurred",
      }
    }

    return {
      success: true,
      data,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}


