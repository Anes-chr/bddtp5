import { NextRequest, NextResponse } from "next/server"

// In-memory storage for each deployment instance
// Each visitor/session has their own data
const progressStore = new Map<string, any>()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get("sessionId")

    if (!sessionId) {
      return NextResponse.json(
        { error: "sessionId required" },
        { status: 400 }
      )
    }

    // Get progress for this session
    const progress = progressStore.get(sessionId) || {
      completedLessons: [],
      completedQueries: [],
      completedChallenges: [],
      totalPoints: 0,
      lastUpdated: new Date().toISOString(),
    }

    return NextResponse.json(progress)
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId, ...progress } = body

    if (!sessionId) {
      return NextResponse.json(
        { error: "sessionId required" },
        { status: 400 }
      )
    }

    // Save/update progress for this session
    progressStore.set(sessionId, {
      ...progress,
      lastUpdated: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: "Progress saved",
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

