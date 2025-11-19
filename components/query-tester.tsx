"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { Play, CheckCircle, Table as TableIcon, BarChart3, RefreshCw } from "lucide-react"
import toast from "react-hot-toast"
import type { Query } from "@/lib/queries-data"
import { completeQuery } from "@/lib/storage"

interface QueryTesterProps {
  query: Query
}

// Comprehensive mock data for all query types
const getMockResults = (queryId: number): any[] => {
  const mockData: Record<number, any[]> = {
    1: [
      { Nom: "Benzema", Salaire: 95000 },
      { Nom: "Ramos", Salaire: 75000 },
      { Nom: "Messi", Salaire: 82000 },
      { Nom: "Ter Stegen", Salaire: 88000 },
      { Nom: "Pique", Salaire: 92000 },
      { Nom: "Muller", Salaire: 78000 },
    ],
    2: [
      { Poste: "Attaquant" },
      { Poste: "Defenseur" },
      { Poste: "Defenseur axial" },
      { Poste: "Ailier gauche" },
      { Poste: "Ailier droit" },
      { Poste: "Gardien de but" },
    ],
    3: [
      { DateDeb: "2015-07-10" },
      { DateDeb: "2014-11-25" },
      { DateDeb: "2016-05-22" },
      { DateDeb: "2012-03-28" },
      { DateDeb: "2017-01-15" },
    ],
    4: [
      { IdFoot: 1, "Footballeur.Nom": "Benzema", Equipe: 1, "Equipe.Id": 1, "Equipe.Nom": "Real Madrid" },
      { IdFoot: 1, "Footballeur.Nom": "Benzema", Equipe: 1, "Equipe.Id": 2, "Equipe.Nom": "FC Barcelona" },
      { IdFoot: 1, "Footballeur.Nom": "Benzema", Equipe: 1, "Equipe.Id": 3, "Equipe.Nom": "Manchester City" },
      { IdFoot: 2, "Footballeur.Nom": "Ramos", Equipe: 1, "Equipe.Id": 1, "Equipe.Nom": "Real Madrid" },
      { IdFoot: 2, "Footballeur.Nom": "Ramos", Equipe: 1, "Equipe.Id": 2, "Equipe.Nom": "FC Barcelona" },
    ],
    5: [
      { "Footballeur.Nom": "Benzema", "Equipe.Nom": "Real Madrid" },
      { "Footballeur.Nom": "Ramos", "Equipe.Nom": "Real Madrid" },
      { "Footballeur.Nom": "Messi", "Equipe.Nom": "FC Barcelona" },
      { "Footballeur.Nom": "Ter Stegen", "Equipe.Nom": "FC Barcelona" },
      { "Footballeur.Nom": "Pique", "Equipe.Nom": "FC Barcelona" },
    ],
    6: [
      { IdFoot: 1 },
      { IdFoot: 2 },
      { IdFoot: 4 },
      { IdFoot: 5 },
      { IdFoot: 9 },
      { IdFoot: 14 },
      { IdFoot: 15 },
      { IdFoot: 16 },
    ],
    7: [
      { Nom: "Benzema" },
      { Nom: "Ramos" },
      { Nom: "Pique" },
    ],
    8: [
      { Nom: "Benzema" },
      { Nom: "Messi" },
      { Nom: "Pique" },
      { Nom: "Muller" },
    ],
    9: [
      { Nom: "Benzema" },
      { Nom: "Ramos" },
      { Nom: "Messi" },
      { Nom: "Ter Stegen" },
      { Nom: "Pique" },
    ],
    10: [
      { "Nom & Poste": "Benzema Attaquant" },
      { "Nom & Poste": "Ramos Defenseur" },
      { "Nom & Poste": "Messi Ailier gauche" },
      { "Nom & Poste": "Ter Stegen Gardien de but" },
      { "Nom & Poste": "Pique Defenseur axial" },
    ],
    11: [{ "Nombre de footballeurs": 20 }],
    12: [{ "COUNT(*)": 15 }],
    13: [{ "COUNT(*)": 1 }],
    14: [{ "COUNT(DISTINCT Poste)": 5 }],
    15: [
      { Nom: "Messi" },
      { Nom: "Mbappe" },
      { Nom: "Modric" },
      { Nom: "Muller" },
      { Nom: "Mane" },
    ],
    16: [{ "COUNT(*)": 4 }],
    17: [{ "COUNT(DISTINCT Nom)": 4 }],
    18: [{ Difference: 26000 }],
    19: [
      { Nom: "Benzema" },
      { Nom: "Messi" },
      { Nom: "Pique" },
    ],
    20: [
      { Nom: "Benzema", Salaire: 95000 },
      { Nom: "Messi", Salaire: 82000 },
      { Nom: "Ter Stegen", Salaire: 88000 },
      { Nom: "Pique", Salaire: 92000 },
      { Nom: "Salah", Salaire: 98000 },
    ],
    21: [
      { Nom: "Benzema", Salaire: 95000 },
      { Nom: "Salah", Salaire: 98000 },
      { Nom: "Pique", Salaire: 92000 },
    ],
    22: [
      { Nom: "Ramos" },
      { Nom: "Modric" },
      { Nom: "Kroos" },
      { Nom: "Courtois" },
    ],
    23: [
      { Nom: "Benzema", DateDeb: "2015-07-10", "Defenseur.Nom": "Ramos", "Defenseur.DateDeb": "2014-11-25" },
      { Nom: "Messi", DateDeb: "2016-05-22", "Defenseur.Nom": "Ter Stegen", "Defenseur.DateDeb": "2012-03-28" },
    ],
    24: [
      { Nom: "Real Madrid" },
      { Nom: "Manchester City" },
    ],
    25: [
      { Nom: "Benzema" },
      { Nom: "Ramos" },
      { Nom: "Messi" },
    ],
    26: [
      { Nom: "Benzema" },
      { Nom: "Ramos" },
      { Nom: "Muller" },
    ],
    27: [
      { Nom: "Messi" },
      { Nom: "Pique" },
      { Nom: "Modric" },
    ],
    28: [
      { Nom: "Salah", Poste: "Ailier droit", Salaire: 98000 },
      { Nom: "Benzema", Poste: "Ailier droit", Salaire: 95000 },
      { Nom: "Salah", Poste: "Ailier gauche", Salaire: 92000 },
      { Nom: "Messi", Poste: "Ailier gauche", Salaire: 82000 },
      { Nom: "Muller", Poste: "Attaquant", Salaire: 78000 },
    ],
    29: [{ "Salaire moyen": 83950.00 }],
    30: [{ "COUNT(*)": 4 }],
    31: [
      { IdEqui: 1, "Salaire maximum": 95000 },
      { IdEqui: 2, "Salaire maximum": 92000 },
      { IdEqui: 3, "Salaire maximum": 91000 },
      { IdEqui: 4, "Salaire maximum": 98000 },
      { IdEqui: 5, "Salaire maximum": 90000 },
    ],
    32: [
      { Nom: "Benzema", IdEqui: 1, Salaire: 95000 },
      { Nom: "Pique", IdEqui: 2, Salaire: 92000 },
      { Nom: "De Bruyne", IdEqui: 3, Salaire: 91000 },
      { Nom: "Salah", IdEqui: 4, Salaire: 98000 },
      { Nom: "Muller", IdEqui: 5, Salaire: 90000 },
    ],
    33: [
      { Poste: "Attaquant", "Salaire moyen": 93250.00 },
      { Poste: "Defenseur", "Salaire moyen": 75000.00 },
      { Poste: "Defenseur axial", "Salaire moyen": 80500.00 },
      { Poste: "Ailier gauche", "Salaire moyen": 85750.00 },
      { Poste: "Gardien de but", "Salaire moyen": 74000.00 },
    ],
    34: [{ "AVG(Salaire)": 74000.00, Poste: "Gardien de but" }],
    35: [{ Poste: "Gardien de but", "Salaire moyen": 74000.00 }],
  }

  // Return specific mock data or generate generic result
  if (mockData[queryId]) {
    return mockData[queryId]
  }

  // Generic fallback for queries without specific mock data
  return [
    { Result: "Query executed successfully" },
    { Info: `${Math.floor(Math.random() * 10) + 1} rows affected` },
  ]
}

export default function QueryTester({ query }: QueryTesterProps) {
  const [isRunning, setIsRunning] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState<any[]>([])
  const [executionTime, setExecutionTime] = useState(0)

  const handleRunQuery = async () => {
    setIsRunning(true)
    toast.loading("Executing query...", { id: "query-exec" })

    const startTime = Date.now()

    // Simulate query execution delay (1-2 seconds)
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))

    const endTime = Date.now()
    const execTime = ((endTime - startTime) / 1000).toFixed(2)
    setExecutionTime(parseFloat(execTime))

    // Get mock results
    const mockData = getMockResults(query.id)
    setResults(mockData)
    setShowResults(true)
    setIsRunning(false)

    // Mark query as completed
    completeQuery(query.id)

    toast.success(`Query #${query.id} executed successfully! 🚀`, { 
      id: "query-exec",
      duration: 3000,
    })
  }

  const handleReset = () => {
    setShowResults(false)
    setResults([])
  }

  const getTableHeaders = () => {
    if (results.length === 0) return []
    return Object.keys(results[0])
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button
          onClick={handleRunQuery}
          disabled={isRunning}
          size="lg"
          className="flex-1"
        >
          {isRunning ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Executing...
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Run Query & See Results
            </>
          )}
        </Button>
        {showResults && (
          <Button
            onClick={handleReset}
            variant="outline"
            size="lg"
          >
            Clear
          </Button>
        )}
      </div>

      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-4 md:p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-2 border-green-500">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 mb-4">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <h4 className="font-bold text-base md:text-lg">Query Results</h4>
                <div className="ml-0 md:ml-auto flex items-center gap-2">
                  <TableIcon className="w-4 h-4" />
                  <span className="text-sm font-semibold">{results.length} {results.length === 1 ? 'row' : 'rows'}</span>
                </div>
              </div>

              {/* Results Table */}
              <div className="overflow-x-auto rounded-lg border border-green-200 dark:border-green-800">
                <table className="w-full min-w-full">
                  <thead className="bg-green-100 dark:bg-green-900">
                    <tr>
                      {getTableHeaders().map((header, index) => (
                        <th
                          key={index}
                          className="px-3 md:px-4 py-2 md:py-3 text-left font-semibold text-green-900 dark:text-green-100 text-sm md:text-base whitespace-nowrap"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900">
                    {results.map((row, rowIndex) => (
                      <motion.tr
                        key={rowIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: rowIndex * 0.05 }}
                        className="border-b border-green-100 dark:border-green-900 hover:bg-green-50 dark:hover:bg-green-950"
                      >
                        {getTableHeaders().map((header, cellIndex) => (
                          <td
                            key={cellIndex}
                            className="px-3 md:px-4 py-2 md:py-3 font-mono text-xs md:text-sm whitespace-nowrap"
                          >
                            {row[header] !== null && row[header] !== undefined
                              ? String(row[header])
                              : <span className="text-muted-foreground italic">NULL</span>
                            }
                          </td>
                        ))}
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Execution Stats */}
              <div className="mt-4 flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-6 text-xs md:text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  <span>Execution time: {executionTime}s</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-green-600 font-semibold">Success</span>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
