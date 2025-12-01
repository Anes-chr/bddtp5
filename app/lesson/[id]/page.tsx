import { lessonsContent } from "@/lib/lessons-data"
import LessonClient from "./lesson-client"

export function generateStaticParams() {
  return Object.keys(lessonsContent).map((id) => ({
    id: id,
  }))
}

export default function LessonPage() {
  return <LessonClient />
}
