"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BookOpen, Search, Database, AlertCircle } from "lucide-react"

const questions = [
  { id: 1, title: "Projection with Columns", question: "Donner les noms et les salaires des footballeurs.", difficulty: "Beginner", category: "Projection" },
  { id: 2, title: "DISTINCT for Unique Values", question: "Donner les postes des footballeurs (apres elimination des duplicatas).", difficulty: "Beginner", category: "Projection" },
  { id: 3, title: "WHERE with Conditions", question: "Donner les dates de debut de contrat des defenseurs axiaux.", difficulty: "Beginner", category: "Filtering" },
  { id: 4, title: "Cartesian Product", question: "Faire le produit cartesien entre footballeurs et equipes.", difficulty: "Beginner", category: "Joins" },
  { id: 5, title: "INNER JOIN Basics", question: "Donner les noms des footballeurs et les noms de leurs equipes.", difficulty: "Intermediate", category: "Joins" },
  { id: 6, title: "JOIN with WHERE", question: "Donner les numeros des footballeurs qui evoluent a Alger.", difficulty: "Intermediate", category: "Joins" },
  { id: 7, title: "Multiple Conditions", question: "Donner les noms des footballeurs des equipes 2 et 5, et dont le salaire est superieur a 80000. Proposer trois solutions differentes.", difficulty: "Intermediate", category: "Filtering" },
  { id: 8, title: "Grouping & Aggregation", question: "Donner les noms des footballeurs qui jouent a differents postes.", difficulty: "Intermediate", category: "Grouping" },
  { id: 9, title: "IS NOT NULL", question: "Donner les noms des footballeurs dont la date de debut de contrat est specifiee.", difficulty: "Beginner", category: "Filtering" },
  { id: 10, title: "CONCAT Function", question: "Afficher pour chaque footballeur la concatenation de son nom et son poste separes par un espace en utilisant la fonction 'concat' et lui donner comme libelle a l'affichage ''Nom & Poste''", difficulty: "Intermediate", category: "Functions" },
  { id: 11, title: "COUNT Function", question: "Donner le nombre des footballeurs", difficulty: "Beginner", category: "Aggregation" },
  { id: 12, title: "COUNT with BETWEEN", question: "Donner le nombre des footballeurs qui ont ete recrutes entre le 2013-01-01 et le 2017-12-31.", difficulty: "Intermediate", category: "Aggregation" },
  { id: 13, title: "JOIN & COUNT", question: "Donner le nombre des attaquants evoluent a SBA.", difficulty: "Intermediate", category: "Aggregation" },
  { id: 14, title: "COUNT DISTINCT", question: "Donner le nombre de postes dans l'equipe de USM Alger.", difficulty: "Intermediate", category: "Aggregation" },
  { id: 15, title: "LIKE Pattern Matching", question: "Donner le nom des footballeurs dont le nom commence par 'a'", difficulty: "Intermediate", category: "Filtering" },
  { id: 16, title: "LIKE with COUNT", question: "Donner le nombre des footballeurs dont le nom contient la chaine 'abd'.", difficulty: "Intermediate", category: "Filtering" },
  { id: 17, title: "COUNT with LIKE", question: "Donner le nombre de noms contenant la chaine 'abd'.", difficulty: "Intermediate", category: "Aggregation" },
  { id: 18, title: "MAX & MIN Functions", question: "Afficher la difference entre le salaire le plus eleve et le salaire le plus bas. Nommer le resultat 'Difference'.", difficulty: "Intermediate", category: "Aggregation" },
  { id: 19, title: "Subquery Existence", question: "Donner les noms des footballeurs qui evoluent dans une equipe avec au moins un ailier gauche.", difficulty: "Advanced", category: "Subqueries" },
  { id: 20, title: "ANY Operator", question: "Donner le salaire et le nom des footballeurs gagnant plus qu'un (au moins un) defenseur.", difficulty: "Advanced", category: "Subqueries" },
  { id: 21, title: "ALL Operator", question: "Donner le salaire et le nom des footballeurs gagnant plus que tous les defenseurs.", difficulty: "Advanced", category: "Subqueries" },
  { id: 22, title: "Nested WHERE", question: "Trouver les noms des footballeurs ayant la meme equipe que Ahmed.", difficulty: "Advanced", category: "Subqueries" },
  { id: 23, title: "Complex Subquery", question: "Donner le nom et la date de debut de contrat des footballeurs embauches avant au moins un de leur defenseur ; donner egalement le nom et la date de debut de contrat de leur defenseur.", difficulty: "Advanced", category: "Subqueries" },
  { id: 24, title: "NOT EXISTS", question: "Donner les equipes qui n'ont pas d'ailier droit.", difficulty: "Advanced", category: "Subqueries" },
  { id: 25, title: "Multiple Join", question: "Donner les noms des footballeurs de l'equipe JS Kabylie recruter le meme jour qu'un footballeur de l'equipe MC Alger.", difficulty: "Advanced", category: "Joins" },
  { id: 26, title: "ALL Comparison", question: "Donner les noms des footballeurs rectruter avant tous les footballeurs de l'equipe 3.", difficulty: "Advanced", category: "Subqueries" },
  { id: 27, title: "Self Join", question: "Donner les noms des footballeurs ayant le meme poste que Ahmed.", difficulty: "Advanced", category: "Joins" },
  { id: 28, title: "ORDER BY Multiple", question: "Donner les noms, postes et salaires des footballeurs par poste croissant (du gardien de but a l'attaquant) et, pour chaque poste, par salaire decroissant.", difficulty: "Advanced", category: "Sorting" },
  { id: 29, title: "AVG Function", question: "Donner le salaire moyen des footballeurs.", difficulty: "Intermediate", category: "Aggregation" },
  { id: 30, title: "COUNT with JOIN", question: "Donner le nombre de footballeurs de l'equipe USM Bel Abbes.", difficulty: "Intermediate", category: "Aggregation" },
  { id: 31, title: "GROUP BY & MAX", question: "Donner les numeros des equipes et leur salaire maximum ?", difficulty: "Intermediate", category: "Grouping" },
  { id: 32, title: "GROUP BY with MAX", question: "Donner les noms des footballeurs ayant le salaire maximum de chaque equipe.", difficulty: "Advanced", category: "Grouping" },
  { id: 33, title: "GROUP BY & AVG", question: "Donner les postes et leur salaire moyen", difficulty: "Intermediate", category: "Grouping" },
  { id: 34, title: "GROUP BY & ORDER BY", question: "Donner le salaire moyen le plus bas par poste", difficulty: "Advanced", category: "Grouping" },
  { id: 35, title: "HAVING with AVG", question: "Donner les postes ayant le salaire moyen le plus bas.", difficulty: "Advanced", category: "Grouping" },
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
            TP4 - SQL d'extraction
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-6">
            Complete Problem Set with Database Schema
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
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Fiche de TP N°4 - SQL d'extraction</h2>
                  <p className="text-base md:text-lg text-muted-foreground font-semibold mb-4">
                    Concepts: Projection, Restriction, Fonction d'agrégat
                  </p>
                </CardContent>
              </Card>

              {/* Database Schema */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl md:text-2xl">Database Schema</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Equipe Table */}
                  <div className="bg-blue-50 dark:bg-blue-950/30 p-4 md:p-6 rounded-lg border-l-4 border-blue-600">
                    <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-3">Equipe (Team)</h3>
                    <div className="space-y-2 font-mono text-sm md:text-base">
                      <p><span className="font-bold text-blue-600">IdEqui</span> : INT PRIMARY KEY - Team ID</p>
                      <p><span className="font-bold text-blue-600">Nom</span> : VARCHAR(100) - Team Name</p>
                      <p><span className="font-bold text-blue-600">Ville</span> : VARCHAR(50) - City where the team resides</p>
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground mt-3">
                      Stores information about football teams: their identifiers, names, and home cities.
                    </p>
                  </div>

                  {/* Footballeur Table */}
                  <div className="bg-pink-50 dark:bg-pink-950/30 p-4 md:p-6 rounded-lg border-l-4 border-pink-600">
                    <h3 className="text-lg font-bold text-pink-600 dark:text-pink-400 mb-3">Footballeur (Footballer)</h3>
                    <div className="space-y-2 font-mono text-sm md:text-base">
                      <p><span className="font-bold text-pink-600">IdFoot</span> : INT PRIMARY KEY - Footballer ID</p>
                      <p><span className="font-bold text-pink-600">Nom</span> : VARCHAR(100) - Footballer Name</p>
                      <p><span className="font-bold text-pink-600">Poste</span> : VARCHAR(50) - Position (Defender, Attacker, Goalkeeper, etc.)</p>
                      <p><span className="font-bold text-pink-600">DateDeb</span> : DATE - Contract start date</p>
                      <p><span className="font-bold text-pink-600">Salaire</span> : DECIMAL - Salary</p>
                      <p><span className="font-bold text-pink-600">#IdEqui</span> : INT FOREIGN KEY - References Equipe(IdEqui)</p>
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground mt-3">
                      Contains information about footballers: their names, positions, contract dates, salaries, and team affiliations.
                    </p>
                  </div>

                  {/* Relationship */}
                  <div className="bg-purple-50 dark:bg-purple-950/30 p-4 md:p-6 rounded-lg border-l-4 border-purple-600">
                    <h3 className="text-lg font-bold text-purple-600 dark:text-purple-400 mb-3">Relationship</h3>
                    <p className="text-sm md:text-base">
                      <span className="font-bold">One-to-Many</span>: Each team can have many footballers, but each footballer belongs to only one team.
                    </p>
                    <p className="text-xs md:text-sm text-muted-foreground mt-2">
                      The Footballeur table references the Equipe table via the IdEqui foreign key.
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
            💡 Tip: Read the TP information above to understand the database schema before solving these problems
          </p>
        </motion.div>
      </div>
    </div>
  )
}
