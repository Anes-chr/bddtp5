"use client"

import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, BookOpen, Lightbulb } from "lucide-react"
import CodeBlock from "@/components/code-block"
import QueryTester from "@/components/query-tester"
import { queriesData } from "@/lib/queries-data"

export default function QueryClient() {
  const params = useParams()
  const router = useRouter()
  const queryId = parseInt(params.id as string)
  const query = queriesData.find(q => q.id === queryId)

  if (!query) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-6">
          <CardTitle>Query not found</CardTitle>
          <Button onClick={() => router.push("/queries")} className="mt-4">
            Back to Queries
          </Button>
        </Card>
      </div>
    )
  }

  const getDifficultyVariant = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "success"
      case "medium": return "warning"
      case "hard": return "destructive"
      default: return "default"
    }
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => router.push("/queries")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to All Queries
        </Button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-linear-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
              {query.id}
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-3">{query.title}</h1>
              <div className="flex items-center gap-3">
                <Badge variant={getDifficultyVariant(query.difficulty) as any} className="text-sm">
                  {query.difficulty.toUpperCase()}
                </Badge>
                <Badge variant="outline" className="text-sm">
                  {query.concept}
                </Badge>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                What This Query Does
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed">{query.description}</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* SQL Code */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>SQL Query</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock code={query.sql} />
            </CardContent>
          </Card>
        </motion.div>

        {/* Explanation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Detailed Explanation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed">{query.explanation}</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Expected Results */}
        {query.result && query.result.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-6"
          >
            <Card>
              <CardHeader>
                <CardTitle>Expected Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {query.result.map((res, idx) => (
                    <div key={idx} className="p-3 bg-secondary rounded font-mono text-sm">
                      {res}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Query Tester */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <QueryTester query={query} />
        </motion.div>

        {/* Navigation to Next/Previous */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex items-center justify-between mt-8"
        >
          {query.id > 1 && (
            <Button
              variant="outline"
              onClick={() => router.push(`/query/${query.id - 1}`)}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Query #{query.id - 1}
            </Button>
          )}
          <div className="flex-1"></div>
          {query.id < 35 && (
            <Button
              variant="outline"
              onClick={() => router.push(`/query/${query.id + 1}`)}
            >
              Query #{query.id + 1}
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Button>
          )}
        </motion.div>
      </div>
    </div>
  )
}
