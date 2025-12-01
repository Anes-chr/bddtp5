"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BookOpen, Search, Database, AlertCircle } from "lucide-react"

const questions = [
  { id: 1, title: "Boeing 777 + Algerian Pilots + Before 2010", question: "Donner les avions Boeing 777 pilotés par des pilotes algériens et apparus avant 2010.", difficulty: "Intermediate", category: "Joins" },
  { id: 2, title: "Aircraft Piloted ONLY by Algerians", question: "Donner les avions qui sont pilotés uniquement par des pilotes algériens.", difficulty: "Advanced", category: "Subqueries" },
  { id: 3, title: "Companies Without Boeing Purchases", question: "Donner les compagnies qui n'ont acheté aucun avion dont le nom contient Boeing. Proposer deux solutions: avec NOT EXISTS et avec NOT IN.", difficulty: "Intermediate", category: "Subqueries" },
  { id: 4, title: "Pilots Flying Boeing OR Airbus", question: "Donner les pilotes qui ont piloté des avions construits par Boeing ou Airbus.", difficulty: "Intermediate", category: "Joins" },
  { id: 5, title: "Pilots Flying Boeing AND Airbus", question: "Donner les pilotes qui ont piloté à la fois des avions du constructeur Boeing et Airbus.", difficulty: "Advanced", category: "Subqueries" },
  { id: 6, title: "Most Purchased Aircraft by Air-Algérie", question: "Donner l'avion le plus acheté par Air-Algérie.", difficulty: "Intermediate", category: "Aggregation" },
  { id: 7, title: "Companies Buying ONLY Airbus", question: "Donner les compagnies qui ont acheté uniquement des avions Airbus.", difficulty: "Advanced", category: "Subqueries" },
  { id: 8, title: "Average Quantity per Category", question: "Donner le prix moyen des avions par catégorie.", difficulty: "Beginner", category: "Aggregation" },
  { id: 9, title: "Airports with ≥10 Boeing 767/week", question: "Donner les aéroports desservis par au moins 10 avions Boeing 767 par semaine.", difficulty: "Intermediate", category: "Joins" },
  { id: 10, title: "Airports with ≥10 Boeing (all)/week", question: "Donner les aéroports desservis par au moins 10 avions Boeing (tous modèles) par semaine.", difficulty: "Intermediate", category: "Grouping" },
  { id: 11, title: "Above-Average Purchases", question: "Donner le nom des compagnies et le nom des avions pour les compagnies ayant acheté un avion en quantité supérieure à la moyenne des ventes de ce même avion parmi toutes les compagnies.", difficulty: "Advanced", category: "Subqueries" },
  { id: 12, title: "Total Sales per Constructor", question: "Donner pour chaque constructeur: l'identificateur, le nom, le total des ventes réalisées.", difficulty: "Beginner", category: "Aggregation" },
  { id: 13, title: "Companies with >5 Different Models", question: "Donner l'identificateur, le nom et le total des achats réalisés pour les compagnies qui ont acheté plus de 5 avions différents.", difficulty: "Intermediate", category: "Grouping" },
  { id: 14, title: "Companies with ALL Boeing Types", question: "Donner les compagnies qui ont acheté tous les types d'avions du constructeur Boeing. Proposer deux solutions: avec NOT EXISTS et avec GROUP BY.", difficulty: "Advanced", category: "Division" },
  { id: 15, title: "Aircraft Serving ALL Airports", question: "Donner les avions qui desservent tous les aéroports. Proposer deux solutions: avec NOT EXISTS et avec GROUP BY.", difficulty: "Advanced", category: "Division" },
  { id: 16, title: "Same Purchases as Company 3", question: "Donner les compagnies qui ont acheté tous les produits achetés par la compagnie dont l'identificateur est 3.", difficulty: "Advanced", category: "Division" },
]

const categories = ["All", ...Array.from(new Set(questions.map(q => q.category)))]
const difficulties = ["All", "Beginner", "Intermediate", "Advanced"]

export default function QuestionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedDifficulty, setSelectedDifficulty] = useState("All")
  const [showSchema, setShowSchema] = useState(false)

  const filtered = questions.filter(q => {
    const matchesSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          q.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || q.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === "All" || q.difficulty === selectedDifficulty
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Intermediate": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "Advanced": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "🌱"
      case "Intermediate": return "📈"
      case "Advanced": return "🚀"
      default: return "❓"
    }
  }

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-linear-to-br from-blue-600 to-cyan-600 mb-4 md:mb-6 shadow-lg">
            <Database className="w-8 h-8 md:w-10 md:h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            TP5 - SQL d'Extraction Avancé
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-6">
            Jointures, Regroupement, Requêtes Imbriquées, Division Relationnelle
          </p>
        </motion.div>

        {/* TP Information Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <Button
            onClick={() => setShowSchema(!showSchema)}
            variant={showSchema ? "default" : "outline"}
            size="lg"
            className="w-full md:w-auto"
          >
            <AlertCircle className="w-5 h-5 mr-2" />
            {showSchema ? "Hide" : "Show"} TP Information & Schema
          </Button>

          {showSchema && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 space-y-6"
            >
              {/* TP Header */}
              <Card className="bg-linear-to-r from-purple-600/10 to-pink-600/10 border-2 border-purple-600/20">
                <CardContent className="p-6 md:p-8">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">TP N°5 - SQL d'Extraction & Concepts Avancés</h2>
                  <p className="text-base md:text-lg text-muted-foreground font-semibold mb-4">
                    Concepts: Jointure, Regroupement, Requêtes Imbriquées, Division, Vues, Transactions
                  </p>
                </CardContent>
              </Card>

              {/* Database Schema */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl md:text-2xl">Database Schema - Aviation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Avion Table */}
                  <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border-l-4 border-blue-600">
                    <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-2">Avion (Aircraft)</h3>
                    <p className="font-mono text-sm">
                      (<span className="font-bold text-blue-600">IdAvion</span>, nom, catégorie, NbPlaces, DateConstruction, <span className="text-purple-600">#IdConstructeur</span>)
                    </p>
                  </div>

                  {/* Constructeur Table */}
                  <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg border-l-4 border-green-600">
                    <h3 className="text-lg font-bold text-green-600 dark:text-green-400 mb-2">Constructeur (Manufacturer)</h3>
                    <p className="font-mono text-sm">
                      (<span className="font-bold text-green-600">IdConstructeur</span>, nom, pays)
                    </p>
                  </div>

                  {/* Pilote Table */}
                  <div className="bg-pink-50 dark:bg-pink-950/30 p-4 rounded-lg border-l-4 border-pink-600">
                    <h3 className="text-lg font-bold text-pink-600 dark:text-pink-400 mb-2">Pilote (Pilot)</h3>
                    <p className="font-mono text-sm">
                      (<span className="font-bold text-pink-600">IdPilote</span>, nom, prénom, nationalité)
                    </p>
                  </div>

                  {/* Piloter Table */}
                  <div className="bg-orange-50 dark:bg-orange-950/30 p-4 rounded-lg border-l-4 border-orange-600">
                    <h3 className="text-lg font-bold text-orange-600 dark:text-orange-400 mb-2">Piloter (Flies)</h3>
                    <p className="font-mono text-sm">
                      (<span className="text-blue-600">#IdAvion</span>, <span className="text-pink-600">#IdPilote</span>)
                    </p>
                  </div>

                  {/* Aéroport Table */}
                  <div className="bg-cyan-50 dark:bg-cyan-950/30 p-4 rounded-lg border-l-4 border-cyan-600">
                    <h3 className="text-lg font-bold text-cyan-600 dark:text-cyan-400 mb-2">Aéroport (Airport)</h3>
                    <p className="font-mono text-sm">
                      (<span className="font-bold text-cyan-600">IdAer</span>, nom, ville)
                    </p>
                  </div>

                  {/* Dessert Table */}
                  <div className="bg-yellow-50 dark:bg-yellow-950/30 p-4 rounded-lg border-l-4 border-yellow-600">
                    <h3 className="text-lg font-bold text-yellow-600 dark:text-yellow-400 mb-2">Dessert (Serves)</h3>
                    <p className="font-mono text-sm">
                      (<span className="text-cyan-600">#IdAer</span>, <span className="text-blue-600">#IdAvion</span>, NB_Fois_Semaine)
                    </p>
                  </div>

                  {/* Compagnie Table */}
                  <div className="bg-indigo-50 dark:bg-indigo-950/30 p-4 rounded-lg border-l-4 border-indigo-600">
                    <h3 className="text-lg font-bold text-indigo-600 dark:text-indigo-400 mb-2">Compagnie (Airline)</h3>
                    <p className="font-mono text-sm">
                      (<span className="font-bold text-indigo-600">IdCompagnie</span>, nom, contact)
                    </p>
                  </div>

                  {/* Achat Table */}
                  <div className="bg-red-50 dark:bg-red-950/30 p-4 rounded-lg border-l-4 border-red-600">
                    <h3 className="text-lg font-bold text-red-600 dark:text-red-400 mb-2">Achat (Purchase)</h3>
                    <p className="font-mono text-sm">
                      (<span className="font-bold text-red-600">IdAchat</span>, <span className="text-blue-600">#IdAvion</span>, <span className="text-indigo-600">#IdCompagnie</span>, DateAchat, Quantité)
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-secondary/30 rounded-lg p-4 md:p-6 mb-8 space-y-4"
        >
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter Buttons */}
          <div className="space-y-3">
            <div>
              <label className="text-sm font-semibold mb-2 block">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(cat)}
                    className="text-xs md:text-sm"
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold mb-2 block">Difficulty</label>
              <div className="flex flex-wrap gap-2">
                {difficulties.map(diff => (
                  <Button
                    key={diff}
                    variant={selectedDifficulty === diff ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedDifficulty(diff)}
                    className="text-xs md:text-sm"
                  >
                    {diff}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Questions Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8"
        >
          {filtered.length > 0 ? (
            filtered.map((question, index) => (
              <motion.div
                key={question.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="h-full hover:shadow-lg transition-all border-l-4 border-l-purple-600 hover:border-l-pink-600">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-sm font-bold text-primary">Q{question.id}</span>
                      <span className="text-xl">{getDifficultyIcon(question.difficulty)}</span>
                    </div>
                    <CardTitle className="text-base md:text-lg line-clamp-2">
                      {question.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground line-clamp-4">
                      {question.question}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs">
                        {question.category}
                      </Badge>
                      <Badge className={`text-xs ${getDifficultyColor(question.difficulty)}`}>
                        {question.difficulty}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground text-lg">No questions found matching your filters</p>
            </div>
          )}
        </motion.div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <p className="text-muted-foreground text-sm md:text-base">
            Showing {filtered.length} of {questions.length} questions
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            💡 Tip: Click "Show TP Information & Schema" to see the Aviation database structure
          </p>
        </motion.div>
      </div>
    </div>
  )
}
