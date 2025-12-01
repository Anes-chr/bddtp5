import { queriesData } from "@/lib/queries-data"
import QueryClient from "./query-client"

export function generateStaticParams() {
  return queriesData.map((query) => ({
    id: query.id.toString(),
  }))
}

export default function QueryDetailPage() {
  return <QueryClient />
}


