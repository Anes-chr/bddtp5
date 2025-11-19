import { queriesData } from "./queries-data"

export interface ChallengeQuestion {
  id: number
  question: string
  correctQueryId: number
  hint: string
}

export interface Challenge {
  id: number
  title: string
  description: string
  difficulty: "Easy" | "Medium" | "Hard"
  points: number
  icon: string
  color: string
  questions: ChallengeQuestion[]
}

export const challengesData: Challenge[] = [
  {
    id: 1,
    title: "Beginner Challenge",
    description: "Master basic SELECT and WHERE queries",
    difficulty: "Easy",
    points: 100,
    icon: "Target",
    color: "from-green-500 to-emerald-500",
    questions: [
      {
        id: 1,
        question: "Select the names and salaries of all players",
        correctQueryId: 1,
        hint: "Use SELECT with two columns from Footballeur table"
      },
      {
        id: 2,
        question: "Get unique positions from the players table",
        correctQueryId: 2,
        hint: "Use DISTINCT to remove duplicates"
      },
      {
        id: 3,
        question: "Find players whose names start with 'a'",
        correctQueryId: 15,
        hint: "Use LIKE with % wildcard"
      },
      {
        id: 4,
        question: "Count the total number of players",
        correctQueryId: 11,
        hint: "Use COUNT(*) function"
      },
      {
        id: 5,
        question: "Find dates of contract start for defenders",
        correctQueryId: 3,
        hint: "Use WHERE clause with Poste = 'Defenseur axial'"
      },
    ]
  },
  {
    id: 2,
    title: "JOIN Master",
    description: "Combine tables like a pro",
    difficulty: "Medium",
    points: 200,
    icon: "Zap",
    color: "from-yellow-500 to-orange-500",
    questions: [
      {
        id: 1,
        question: "Show player names with their team names",
        correctQueryId: 5,
        hint: "Use INNER JOIN to combine Footballeur and Equipe"
      },
      {
        id: 2,
        question: "Find player IDs who play in Alger",
        correctQueryId: 6,
        hint: "JOIN tables and filter by Ville = 'Alger'"
      },
      {
        id: 3,
        question: "Count attaquants in SBA city",
        correctQueryId: 13,
        hint: "Use JOIN with WHERE for position and city"
      },
      {
        id: 4,
        question: "Understand cartesian product between tables",
        correctQueryId: 4,
        hint: "SELECT * FROM two tables without JOIN condition"
      },
    ]
  },
  {
    id: 3,
    title: "Aggregate Expert",
    description: "GROUP BY and HAVING challenges",
    difficulty: "Medium",
    points: 200,
    icon: "Trophy",
    color: "from-blue-500 to-cyan-500",
    questions: [
      {
        id: 1,
        question: "Calculate average salary of all players",
        correctQueryId: 29,
        hint: "Use AVG() function on Salaire column"
      },
      {
        id: 2,
        question: "Find maximum salary for each team",
        correctQueryId: 31,
        hint: "Use GROUP BY IdEqui and MAX(Salaire)"
      },
      {
        id: 3,
        question: "Get salary difference between max and min",
        correctQueryId: 18,
        hint: "Subtract MIN from MAX salary"
      },
      {
        id: 4,
        question: "Calculate average salary by position",
        correctQueryId: 33,
        hint: "Use GROUP BY Poste with AVG(Salaire)"
      },
      {
        id: 5,
        question: "Count players in USM Bel Abbes",
        correctQueryId: 30,
        hint: "Use COUNT with JOIN on team name"
      },
    ]
  },
  {
    id: 4,
    title: "Subquery Ninja",
    description: "Master nested queries and subqueries",
    difficulty: "Hard",
    points: 300,
    icon: "Trophy",
    color: "from-red-500 to-pink-500",
    questions: [
      {
        id: 1,
        question: "Find teammates of Ahmed",
        correctQueryId: 22,
        hint: "Use subquery to get Ahmed's team ID"
      },
      {
        id: 2,
        question: "Players earning more than at least one defender",
        correctQueryId: 20,
        hint: "Use subquery with > ANY"
      },
      {
        id: 3,
        question: "Players earning more than ALL defenders",
        correctQueryId: 21,
        hint: "Use subquery with > ALL (stricter than ANY)"
      },
      {
        id: 4,
        question: "Find teams without any 'ailier droit'",
        correctQueryId: 24,
        hint: "Use NOT IN with subquery"
      },
    ]
  },
  {
    id: 5,
    title: "Advanced Joins Master",
    description: "Complex JOIN operations and multi-table queries",
    difficulty: "Hard",
    points: 250,
    icon: "Database",
    color: "from-indigo-500 to-purple-500",
    questions: [
      {
        id: 1,
        question: "Find players with same position as Ahmed",
        correctQueryId: 27,
        hint: "Use subquery to get Ahmed's position"
      },
      {
        id: 2,
        question: "Players in teams with 'ailier gauche'",
        correctQueryId: 19,
        hint: "Use self-join on same team"
      },
      {
        id: 3,
        question: "Find top earner from each team",
        correctQueryId: 32,
        hint: "Use correlated subquery with MAX salary"
      },
    ]
  },
  {
    id: 6,
    title: "SQL Sorting & Ordering",
    description: "Master ORDER BY and complex sorting",
    difficulty: "Medium",
    points: 150,
    icon: "Zap",
    color: "from-pink-500 to-rose-500",
    questions: [
      {
        id: 1,
        question: "Sort players by position and salary",
        correctQueryId: 28,
        hint: "Use ORDER BY Poste ASC, Salaire DESC"
      },
      {
        id: 2,
        question: "Get names containing 'abd'",
        correctQueryId: 16,
        hint: "Use LIKE with wildcards and COUNT"
      },
      {
        id: 3,
        question: "Concatenate name and position",
        correctQueryId: 10,
        hint: "Use CONCAT function with AS alias"
      },
    ]
  },
  {
    id: 7,
    title: "Complex Subqueries",
    description: "Multiple nested queries and comparisons",
    difficulty: "Hard",
    points: 300,
    icon: "Trophy",
    color: "from-violet-500 to-purple-500",
    questions: [
      {
        id: 1,
        question: "Find players hired before ANY defender",
        correctQueryId: 23,
        hint: "Use date comparison with self-join"
      },
      {
        id: 2,
        question: "Get lowest average salary position",
        correctQueryId: 35,
        hint: "Use nested subqueries with GROUP BY and HAVING"
      },
      {
        id: 3,
        question: "Find min average salary across positions",
        correctQueryId: 34,
        hint: "Use subquery to calculate averages first"
      },
    ]
  },
  {
    id: 8,
    title: "Data Extraction Expert",
    description: "Everything combined - advanced queries",
    difficulty: "Hard",
    points: 350,
    icon: "Database",
    color: "from-orange-500 to-red-500",
    questions: [
      {
        id: 1,
        question: "Players from teams 2 & 5 with salary > 80000",
        correctQueryId: 7,
        hint: "Use WHERE with (OR and AND) or IN clause"
      },
      {
        id: 2,
        question: "Get all unique player positions",
        correctQueryId: 2,
        hint: "Use DISTINCT Poste"
      },
      {
        id: 3,
        question: "Find JS Kabylie players same day as MC Alger",
        correctQueryId: 25,
        hint: "Use IN with subquery for matching dates"
      },
      {
        id: 4,
        question: "Find positions with lowest average salary",
        correctQueryId: 35,
        hint: "Combine GROUP BY, HAVING, and subqueries"
      },
    ]
  },
]


