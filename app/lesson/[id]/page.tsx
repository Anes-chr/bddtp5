"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, ChevronRight, CheckCircle2 } from "lucide-react"
import CodeBlock from "@/components/code-block"
import QueryTester from "@/components/query-tester"
import { queriesData } from "@/lib/queries-data"
import { completeLesson, getProgress } from "@/lib/storage"
import toast from "react-hot-toast"

const lessonsContent = {
  "1": {
    title: "SQL Basics & SELECT Statements",
    description: "Master the fundamentals of SQL with SELECT, projection, and basic filtering",
    queryIds: [1, 2, 3, 9, 10, 15],
    concepts: [
      {
        title: "Introduction to SQL",
        content: "SQL (Structured Query Language) is the standard language for communicating with databases. It allows you to retrieve, insert, update, and delete data. In this course, we'll focus on data retrieval using the SELECT statement.",
        example: "SELECT * FROM TableName;",
        explanation: "This is the simplest query. The asterisk (*) means 'all columns'. It asks the database to show every piece of data in the table."
      },
      {
        title: "The SELECT Statement",
        content: "The SELECT statement is used to select data from a database. The data returned is stored in a result table, called the result-set.",
        example: "SELECT Nom, Salaire FROM Footballeur;",
        explanation: "Here, we are asking for only the 'Nom' and 'Salaire' columns. This is called 'Projection' - choosing specific columns to view."
      },
      {
        title: "Eliminating Duplicates (DISTINCT)",
        content: "Sometimes a table contains duplicate values. The DISTINCT keyword is used to return only distinct (different) values.",
        example: "SELECT DISTINCT Poste FROM Footballeur;",
        explanation: "If multiple players have the same position (e.g., 'Attaquant'), this query will list 'Attaquant' only once. It gives you a list of unique positions."
      },
      {
        title: "Handling NULL Values",
        content: "NULL represents a missing or unknown value. It is not the same as zero or an empty string. You cannot use = NULL to check for it.",
        example: "SELECT Nom FROM Footballeur WHERE DateDeb IS NOT NULL;",
        explanation: "We use IS NULL or IS NOT NULL to check for missing values. This query finds players who have a known contract start date."
      }
    ]
  },
  "2": {
    title: "Filtering with WHERE & Operators",
    description: "Learn powerful filtering techniques with WHERE, LIKE, BETWEEN, and IN",
    queryIds: [3, 7, 12, 15, 16, 17],
    concepts: [
      {
        title: "The WHERE Clause",
        content: "The WHERE clause is used to filter records. It extracts only those records that fulfill a specified condition.",
        example: "SELECT * FROM Footballeur WHERE Salaire > 80000;",
        explanation: "This query returns only the players who earn more than 80,000. Rows that don't meet this condition are excluded."
      },
      {
        title: "Comparison Operators",
        content: "SQL supports standard operators: = (equal), <> or != (not equal), > (greater or equal), < (less or equal).",
        example: "SELECT Nom FROM Footballeur WHERE Poste = 'Attaquant';",
        explanation: "Finds all players where the 'Poste' column exactly matches the text 'Attaquant'."
      },
      {
        title: "Pattern Matching (LIKE)",
        content: "The LIKE operator is used in a WHERE clause to search for a specified pattern in a column. The percent sign (%) represents zero, one, or multiple characters.",
        example: "SELECT Nom FROM Footballeur WHERE Nom LIKE 'M%';",
        explanation: "Finds any values that start with 'M'. 'Messi', 'Mbappe', 'Modric' would all match."
      },
      {
        title: "Logical Operators (AND, OR)",
        content: "The AND and OR operators are used to filter records based on more than one condition. AND requires ALL conditions to be true. OR requires AT LEAST ONE condition to be true.",
        example: "SELECT Nom FROM Footballeur WHERE Salaire > 80000 AND Poste = 'Attaquant';",
        explanation: "Finds players who are BOTH attackers AND earn more than 80,000."
      }
    ]
  },
  "3": {
    title: "Joins & Relationships",
    description: "Understand how to combine tables using INNER JOIN and cartesian products",
    queryIds: [4, 5, 6, 13, 14, 30],
    concepts: [
      {
        title: "Relational Databases",
        content: "In a relational database, data is split into related tables to reduce redundancy. For example, instead of storing team details with every player, we store players in one table and teams in another, linking them with an ID.",
        example: "Footballeur (IdEqui) -> Equipe (IdEqui)",
        explanation: "The 'IdEqui' column in the Footballeur table is a Foreign Key that points to the 'IdEqui' Primary Key in the Equipe table."
      },
      {
        title: "INNER JOIN",
        content: "The INNER JOIN keyword selects records that have matching values in both tables.",
        example: "SELECT Footballeur.Nom, Equipe.Nom FROM Footballeur INNER JOIN Equipe ON Footballeur.IdEqui = Equipe.IdEqui;",
        explanation: "This combines rows from Footballeur and Equipe where the IdEqui matches. You get the player's name alongside their team's name."
      },
      {
        title: "Cartesian Product",
        content: "If you join two tables without a condition, you get a Cartesian product: every row from the first table paired with every row from the second table.",
        example: "SELECT * FROM Footballeur, Equipe;",
        explanation: "With 20 players and 6 teams, this returns 120 rows (20 * 6). It's rarely useful but important to understand why the ON clause is necessary."
      },
      {
        title: "Joining with Filtering",
        content: "You can combine JOINs with WHERE clauses to filter the joined data.",
        example: "SELECT F.Nom FROM Footballeur F JOIN Equipe E ON F.IdEqui = E.IdEqui WHERE E.Ville = 'Madrid';",
        explanation: "First joins players to teams, then filters to keep only those teams located in 'Madrid'."
      }
    ]
  },
  "4": {
    title: "Aggregate Functions",
    description: "COUNT, AVG, MAX, MIN, SUM - Master data aggregation",
    queryIds: [11, 12, 16, 17, 18, 29],
    concepts: [
      {
        title: "What are Aggregate Functions?",
        content: "Aggregate functions perform a calculation on a set of values and return a single value. They are often used to summarize data.",
        example: "SELECT COUNT(*) FROM Footballeur;",
        explanation: "Counts the total number of rows in the table."
      },
      {
        title: "Common Functions",
        content: "AVG() returns the average value. SUM() returns the sum. MAX() returns the largest value. MIN() returns the smallest value.",
        example: "SELECT AVG(Salaire) FROM Footballeur;",
        explanation: "Calculates the average salary of all players."
      },
      {
        title: "Aliases (AS)",
        content: "SQL aliases are used to give a table, or a column in a table, a temporary name. This makes results more readable.",
        example: "SELECT MAX(Salaire) AS SalaireMax FROM Footballeur;",
        explanation: "The result column will be named 'SalaireMax' instead of 'MAX(Salaire)'."
      },
      {
        title: "COUNT DISTINCT",
        content: "You can count unique values by combining COUNT and DISTINCT.",
        example: "SELECT COUNT(DISTINCT Poste) FROM Footballeur;",
        explanation: "Counts how many different positions exist, ignoring duplicates."
      }
    ]
  },
  "5": {
    title: "GROUP BY & HAVING",
    description: "Group data and filter groups for powerful analytics",
    queryIds: [31, 33, 34, 35],
    concepts: [
      {
        title: "The GROUP BY Statement",
        content: "The GROUP BY statement groups rows that have the same values into summary rows, like 'find the number of customers in each country'.",
        example: "SELECT IdEqui, COUNT(*) FROM Footballeur GROUP BY IdEqui;",
        explanation: "This counts how many players are in EACH team. It creates one result row per team ID."
      },
      {
        title: "Using Aggregates with GROUP BY",
        content: "GROUP BY is often used with aggregate functions (COUNT, MAX, MIN, SUM, AVG) to group the result-set by one or more columns.",
        example: "SELECT Poste, AVG(Salaire) FROM Footballeur GROUP BY Poste;",
        explanation: "Calculates the average salary for EACH position separately."
      },
      {
        title: "The HAVING Clause",
        content: "The HAVING clause was added to SQL because the WHERE keyword could not be used with aggregate functions. WHERE filters rows; HAVING filters groups.",
        example: "SELECT IdEqui, AVG(Salaire) FROM Footballeur GROUP BY IdEqui HAVING AVG(Salaire) > 85000;",
        explanation: "First groups by team and calculates avg salary. Then keeps ONLY the teams where that average is greater than 85,000."
      }
    ]
  },
  "6": {
    title: "Subqueries & Nested Queries",
    description: "Write queries inside queries for complex data retrieval",
    queryIds: [22, 24, 25, 26, 27],
    concepts: [
      {
        title: "What is a Subquery?",
        content: "A subquery is a query nested inside another query. It's used to return data that will be used in the main query as a condition to further restrict the data to be retrieved.",
        example: "SELECT Nom FROM Footballeur WHERE IdEqui = (SELECT IdEqui FROM Equipe WHERE Nom = 'Real Madrid');",
        explanation: "The inner query finds the ID of 'Real Madrid'. The outer query then uses that ID to find players."
      },
      {
        title: "Scalar Subqueries",
        content: "A scalar subquery returns a single value (one row, one column). It can be used anywhere a single value is valid.",
        example: "SELECT Nom FROM Footballeur WHERE Salaire > (SELECT AVG(Salaire) FROM Footballeur);",
        explanation: "Finds players who earn more than the global average salary."
      },
      {
        title: "The IN Operator with Subqueries",
        content: "If a subquery returns a list of values, you can use the IN operator.",
        example: "SELECT Nom FROM Footballeur WHERE IdEqui IN (SELECT IdEqui FROM Equipe WHERE Ville = 'Madrid');",
        explanation: "Finds players whose team ID is in the list of IDs for teams in Madrid."
      },
      {
        title: "NOT IN",
        content: "NOT IN is the opposite. It selects rows where the value does NOT exist in the list.",
        example: "SELECT Nom FROM Equipe WHERE IdEqui NOT IN (SELECT DISTINCT IdEqui FROM Footballeur);",
        explanation: "Finds teams that have NO players (their ID is not in the list of player team IDs)."
      }
    ]
  },
  "7": {
    title: "Advanced Subqueries (ANY, ALL)",
    description: "Master comparison operators with subqueries",
    queryIds: [20, 21, 23],
    concepts: [
      {
        title: "The ANY Operator",
        content: "The ANY operator returns true if any of the subquery values meet the condition. It's like a flexible OR.",
        example: "SELECT Nom FROM Footballeur WHERE Salaire > ANY (SELECT Salaire FROM Footballeur WHERE Poste = 'Defenseur');",
        explanation: "Finds players who earn more than AT LEAST ONE defender (i.e., more than the lowest-paid defender)."
      },
      {
        title: "The ALL Operator",
        content: "The ALL operator returns true only if ALL of the subquery values meet the condition. It's stricter.",
        example: "SELECT Nom FROM Footballeur WHERE Salaire > ALL (SELECT Salaire FROM Footballeur WHERE Poste = 'Defenseur');",
        explanation: "Finds players who earn more than EVERY single defender (i.e., more than the highest-paid defender)."
      },
      {
        title: "Correlated Subqueries",
        content: "A correlated subquery uses values from the outer query. It executes once for each row processed by the outer query.",
        example: "SELECT Nom, Salaire FROM Footballeur F1 WHERE Salaire > (SELECT AVG(Salaire) FROM Footballeur F2 WHERE F2.IdEqui = F1.IdEqui);",
        explanation: "Finds players who earn more than the average salary OF THEIR OWN TEAM."
      }
    ]
  },
  "8": {
    title: "Complex Queries & Optimization",
    description: "Put it all together with complex real-world queries",
    queryIds: [8, 19, 28, 32],
    concepts: [
      {
        title: "Self-Joins",
        content: "A self-join is a regular join, but the table is joined with itself. This is useful for comparing rows within the same table.",
        example: "SELECT A.Nom AS Player1, B.Nom AS Player2 FROM Footballeur A, Footballeur B WHERE A.IdEqui = B.IdEqui AND A.Nom <> B.Nom;",
        explanation: "Finds pairs of players who are in the same team."
      },
      {
        title: "Multiple Joins",
        content: "You can join more than two tables. Just add more JOIN clauses.",
        example: "SELECT P.Nom, T.Nom, S.Nom FROM Player P JOIN Team T ON P.TeamId = T.Id JOIN Sponsor S ON T.SponsorId = S.Id;",
        explanation: "Connects Players to Teams, and Teams to Sponsors."
      },
      {
        title: "UNION Operator",
        content: "The UNION operator is used to combine the result-set of two or more SELECT statements.",
        example: "SELECT Nom FROM Footballeur WHERE Salaire > 90000 UNION SELECT Nom FROM Footballeur WHERE Poste = 'Gardien';",
        explanation: "Combines high earners and goalkeepers into one list. Duplicates are removed by default."
      },
      {
        title: "Query Optimization Tips",
        content: "Writing efficient SQL is important. Use indexes, avoid SELECT * when not needed, and prefer joins over subqueries where possible.",
        example: "SELECT Nom FROM Footballeur WHERE IdEqui = 1;",
        explanation: "Simple, indexed lookups are faster than complex calculations or pattern matching."
      }
    ]
  }
}

export default function LessonPage() {
  const params = useParams()
  const router = useRouter()
  const lessonId = params.id as string
  const lesson = lessonsContent[lessonId as keyof typeof lessonsContent]

  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [isLessonCompleted, setIsLessonCompleted] = useState(false)

  useEffect(() => {
    const progress = getProgress()
    setIsLessonCompleted(progress.completedLessons.includes(parseInt(lessonId)))
  }, [lessonId])

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="p-6 max-w-md w-full">
          <CardTitle>Lesson not found</CardTitle>
          <Button onClick={() => router.push("/course")} className="mt-4 w-full">
            Back to Course
          </Button>
        </Card>
      </div>
    )
  }

  const concept = lesson.concepts[currentStep]
  const queries = lesson.queryIds.map(id => queriesData.find(q => q.id === id)).filter(Boolean)

  const handleNext = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep])
    }
    if (currentStep < lesson.concepts.length - 1) {
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleCompleteLesson = () => {
    completeLesson(parseInt(lessonId))
    setIsLessonCompleted(true)
    toast.success(`🎉 Lesson ${lessonId} completed!`, {
      duration: 4000,
    })
    setTimeout(() => {
      router.push("/course")
    }, 1500)
  }

  return (
    <div className="min-h-screen py-4 md:py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push("/course")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Course
          </Button>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 gradient-text">
                Lesson {lessonId}: {lesson.title}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">{lesson.description}</p>
            </div>
            <Badge variant="secondary" className="text-base md:text-lg px-4 py-2">
              {currentStep + 1} / {lesson.concepts.length}
            </Badge>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6 md:mb-8">
          <div className="flex gap-1 md:gap-2 mb-2">
            {lesson.concepts.map((_, index) => (
              <motion.div
                key={index}
                className={`h-2 flex-1 rounded-full ${
                  completedSteps.includes(index)
                    ? "bg-green-500"
                    : index === currentStep
                    ? "bg-primary"
                    : "bg-secondary"
                }`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: index * 0.1 }}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="mb-6 md:mb-8">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                    {currentStep + 1}
                  </div>
                  <CardTitle className="text-2xl md:text-3xl">{concept.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose prose-sm md:prose-lg max-w-none dark:prose-invert">
                  <p className="text-base md:text-lg leading-relaxed">{concept.content}</p>
                </div>

                <div>
                  <h4 className="font-bold text-base md:text-lg mb-3">💡 Example:</h4>
                  <CodeBlock code={concept.example} />
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border-l-4 border-blue-500">
                  <p className="font-semibold mb-2 text-sm md:text-base">🔍 What this means:</p>
                  <p className="text-sm md:text-base">{concept.explanation}</p>
                </div>
              </CardContent>
            </Card>

            {/* Practice Queries */}
            <Card>
              <CardHeader>
                <CardTitle>🎯 Practice Queries</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {queries.slice(currentStep * 2, currentStep * 2 + 2).map((query) => query && (
                  <div key={query.id} className="space-y-4">
                    <div className="flex flex-col md:flex-row items-start justify-between gap-3">
                      <div>
                        <h4 className="font-bold text-base md:text-lg mb-2">
                          Query #{query.id}: {query.title}
                        </h4>
                        <p className="text-sm md:text-base text-muted-foreground mb-3">{query.description}</p>
                      </div>
                      <Badge className="self-start">{query.difficulty}</Badge>
                    </div>

                    <CodeBlock code={query.sql} />

                    <div className="p-4 bg-secondary rounded-lg">
                      <p className="font-semibold mb-2 text-sm md:text-base">📖 Explanation:</p>
                      <p className="text-sm md:text-base">{query.explanation}</p>
                    </div>

                    <QueryTester query={query} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-6 md:mt-8 gap-4">
          <Button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            variant="outline"
            size="lg"
            className="w-full md:w-auto"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <div className="flex items-center gap-2">
            {completedSteps.length === lesson.concepts.length && !isLessonCompleted && (
              <Badge variant="secondary" className="text-sm md:text-base px-4 py-2">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                All Steps Complete!
              </Badge>
            )}
            {isLessonCompleted && (
              <Badge variant="success" className="text-sm md:text-base px-4 py-2">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Lesson Completed!
              </Badge>
            )}
          </div>

          {currentStep === lesson.concepts.length - 1 ? (
            <Button
              onClick={handleCompleteLesson}
              size="lg"
              disabled={isLessonCompleted}
              className="w-full md:w-auto"
            >
              {isLessonCompleted ? "Completed" : "Complete Lesson"}
              <CheckCircle2 className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleNext} size="lg" className="w-full md:w-auto">
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
