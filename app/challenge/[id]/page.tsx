import { challengesData } from "@/lib/challenges-data"
import ChallengeClient from "./challenge-client"

export function generateStaticParams() {
  return challengesData.map((challenge) => ({
    id: challenge.id.toString(),
  }))
}

export default function ChallengePage() {
  return <ChallengeClient />
}

