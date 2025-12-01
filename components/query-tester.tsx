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

// Comprehensive mock data for all TP5 Aviation queries
const getMockResults = (queryId: number): any[] => {
  const mockData: Record<number, any[]> = {
    // Q1: Noms des pilotes de la compagnie Air France
    1: [
      { NomPilote: "Dupont" },
      { NomPilote: "Martin" },
      { NomPilote: "Bernard" },
    ],
    // Q2: Noms des constructeurs qui fabriquent des avions utilisés par Air Algérie
    2: [
      { NomConst: "Airbus" },
      { NomConst: "Boeing" },
    ],
    // Q3: Compagnies qui ont acheté au moins 3 avions de type Boeing 737
    3: [
      { NomComp: "Air France" },
      { NomComp: "Air Algérie" },
    ],
    // Q4: Avions de capacité > 200 places construits avant 2015 ou après 2020
    4: [
      { NumAvion: 101, NomAvion: "A380", Capacité: 555, Fabrication: "2012-03-15" },
      { NumAvion: 105, NomAvion: "B777", Capacité: 396, Fabrication: "2022-06-20" },
      { NumAvion: 108, NomAvion: "A350", Capacité: 300, Fabrication: "2023-01-10" },
    ],
    // Q5: Pilotes qui pilotent au moins 2 types d'avions différents
    5: [
      { NumPilote: 1, NomPilote: "Dupont", NbTypes: 3 },
      { NumPilote: 3, NomPilote: "Bernard", NbTypes: 2 },
    ],
    // Q6: Noms et capacités des avions triés par capacité décroissante
    6: [
      { NomAvion: "A380", Capacité: 555 },
      { NomAvion: "B777", Capacité: 396 },
      { NomAvion: "A350", Capacité: 300 },
      { NomAvion: "B787", Capacité: 242 },
      { NomAvion: "A320", Capacité: 180 },
    ],
    // Q7: Pilote(s) le plus expérimenté (plus d'heures de vol)
    7: [
      { NomPilote: "Dupont", TotalHeures: 15000 },
    ],
    // Q8: Avions jamais pilotés
    8: [
      { NumAvion: 109, NomAvion: "B747" },
      { NumAvion: 112, NomAvion: "A330" },
    ],
    // Q9: Constructeurs dont tous les avions ont capacité > 150
    9: [
      { NomConst: "Airbus" },
      { NomConst: "Boeing" },
    ],
    // Q10: Nombre d'avions par constructeur
    10: [
      { NomConst: "Airbus", NbAvions: 5 },
      { NomConst: "Boeing", NbAvions: 4 },
      { NomConst: "Embraer", NbAvions: 2 },
    ],
    // Q11: Pilotes qui ne pilotent que des Airbus
    11: [
      { NomPilote: "Martin" },
      { NomPilote: "Lefebvre" },
    ],
    // Q12: Capacité moyenne des avions par constructeur
    12: [
      { NomConst: "Airbus", CapacitéMoyenne: 310.5 },
      { NomConst: "Boeing", CapacitéMoyenne: 285.0 },
      { NomConst: "Embraer", CapacitéMoyenne: 120.0 },
    ],
    // Q13: Aéroports desservis par au moins 2 compagnies
    13: [
      { NomAéroport: "Paris CDG", NbCompagnies: 5 },
      { NomAéroport: "Alger Houari", NbCompagnies: 3 },
      { NomAéroport: "Londres Heathrow", NbCompagnies: 4 },
    ],
    // Q14: Pilotes qui ont piloté tous les types d'avions Boeing
    14: [
      { NomPilote: "Dupont" },
    ],
    // Q15: Compagnies qui utilisent des avions de tous les constructeurs
    15: [
      { NomComp: "Air France" },
    ],
    // Q16: Villes ayant un aéroport desservi par Air France et Air Algérie
    16: [
      { Ville: "Paris" },
      { Ville: "Marseille" },
    ],
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
            <Card className="p-4 md:p-6 bg-linear-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-2 border-green-500">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 mb-4">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
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
