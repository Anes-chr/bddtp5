export interface Challenge {
  id: number;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard" | "expert";
  concepts: string[];
  questions: {
    id: number;
    text: string;
    hint?: string;
    correctQueryId: number;
  }[];
}

export const challengesData: Challenge[] = [
  {
    id: 1,
    title: "Basic JOINs & Filtering",
    description: "Master multi-table queries and filtering with LIKE, YEAR(), and DISTINCT",
    difficulty: "easy",
    concepts: ["JOIN", "LIKE", "YEAR()", "DISTINCT"],
    questions: [
      {
        id: 1,
        text: "List all aircraft with their constructor name",
        hint: "Join Avion with Constructeur using IdConstructeur",
        correctQueryId: 1
      },
      {
        id: 2,
        text: "Find all Boeing 777 aircraft built before 2010",
        hint: "Use LIKE for partial name match and YEAR() for date comparison",
        correctQueryId: 5
      },
      {
        id: 3,
        text: "List distinct aircraft piloted by Algerian pilots",
        hint: "Chain Avion → Piloter → Pilote and filter by nationality with DISTINCT",
        correctQueryId: 20
      }
    ]
  },
  {
    id: 2,
    title: "Aggregate Functions Challenge",
    description: "Practice COUNT, SUM, AVG with GROUP BY",
    difficulty: "easy",
    concepts: ["COUNT", "SUM", "AVG", "GROUP BY"],
    questions: [
      {
        id: 1,
        text: "Count how many aircraft each constructor has built",
        hint: "GROUP BY constructor name, COUNT aircraft",
        correctQueryId: 7
      },
      {
        id: 2,
        text: "Calculate total aircraft purchased by each airline",
        hint: "SUM the Quantité field grouped by company",
        correctQueryId: 13
      },
      {
        id: 3,
        text: "Find the number of distinct pilots per aircraft",
        hint: "GROUP BY aircraft, COUNT DISTINCT pilots",
        correctQueryId: 9
      }
    ]
  },
  {
    id: 3,
    title: "HAVING Clause Mastery",
    description: "Filter grouped results using HAVING",
    difficulty: "medium",
    concepts: ["HAVING", "COUNT", "SUM", "GROUP BY"],
    questions: [
      {
        id: 1,
        text: "Find constructors with more than 5 aircraft models",
        hint: "GROUP BY constructor, HAVING COUNT(*) > 5",
        correctQueryId: 11
      },
      {
        id: 2,
        text: "Find airports served by Boeing aircraft more than 10 times per week",
        hint: "Filter Boeing first, GROUP BY airport, HAVING SUM(frequency) >= 10",
        correctQueryId: 14
      },
      {
        id: 3,
        text: "Find companies that bought more than 3 different aircraft models",
        hint: "HAVING COUNT(DISTINCT IdAvion) > 3",
        correctQueryId: 16
      }
    ]
  },
  {
    id: 4,
    title: "Subqueries & IN/NOT IN",
    description: "Write nested queries for complex filtering",
    difficulty: "medium",
    concepts: ["IN", "NOT IN", "Subquery", "Scalar Subquery"],
    questions: [
      {
        id: 1,
        text: "Find companies that have purchased any Boeing aircraft",
        hint: "Use IN with a subquery that finds Boeing buyers",
        correctQueryId: 3
      },
      {
        id: 2,
        text: "Find companies that have never purchased a Boeing",
        hint: "Use NOT IN to exclude Boeing buyers",
        correctQueryId: 4
      },
      {
        id: 3,
        text: "Find pilots who fly aircraft with above-average seat capacity",
        hint: "Subquery calculates AVG(NbPlaces), outer query filters",
        correctQueryId: 8
      }
    ]
  },
  {
    id: 5,
    title: "EXISTS & NOT EXISTS Patterns",
    description: "Check for existence or absence of related data",
    difficulty: "medium",
    concepts: ["EXISTS", "NOT EXISTS", "Correlated Subquery"],
    questions: [
      {
        id: 1,
        text: "Find aircraft that have at least one pilot assigned",
        hint: "EXISTS with subquery checking Piloter table",
        correctQueryId: 2
      },
      {
        id: 2,
        text: "Find aircraft flown ONLY by Algerian pilots",
        hint: "NOT EXISTS for non-Algerian pilots AND EXISTS for Algerian pilots",
        correctQueryId: 6
      },
      {
        id: 3,
        text: "Find companies that have never purchased Airbus aircraft",
        hint: "NOT EXISTS checking for Airbus purchases",
        correctQueryId: 8
      }
    ]
  },
  {
    id: 6,
    title: "Correlated Subqueries",
    description: "Subqueries that reference the outer query",
    difficulty: "hard",
    concepts: ["Correlated Subquery", "AVG", "Comparison"],
    questions: [
      {
        id: 1,
        text: "Find purchases where quantity exceeds average for that aircraft",
        hint: "The subquery calculates AVG for the SAME aircraft (reference outer IdAvion)",
        correctQueryId: 12
      },
      {
        id: 2,
        text: "Find airports with above-average weekly service for their region",
        hint: "Compare each airport's total to the average of its region",
        correctQueryId: 12
      }
    ]
  },
  {
    id: 7,
    title: "Relational Division",
    description: "Find entities that have ALL items from a set",
    difficulty: "expert",
    concepts: ["Division", "Double NOT EXISTS", "COUNT DISTINCT"],
    questions: [
      {
        id: 1,
        text: "Find companies that have purchased ALL Boeing aircraft",
        hint: "Double NOT EXISTS: no Boeing exists that this company hasn't bought",
        correctQueryId: 15
      },
      {
        id: 2,
        text: "Find companies that bought the same aircraft as Company 3",
        hint: "Division with reference entity: no aircraft of Company 3 is missing",
        correctQueryId: 17
      },
      {
        id: 3,
        text: "Find aircraft that serve ALL airports",
        hint: "No airport exists that this aircraft doesn't serve",
        correctQueryId: 19
      }
    ]
  },
  {
    id: 8,
    title: "Complex Query Patterns",
    description: "Combine all concepts for advanced analysis",
    difficulty: "expert",
    concepts: ["Multiple Concepts", "Query Strategy"],
    questions: [
      {
        id: 1,
        text: "Find companies that bought ONLY Airbus aircraft (nothing else)",
        hint: "Combine: has purchases (EXISTS) + no non-Airbus purchases (NOT EXISTS)",
        correctQueryId: 6
      },
      {
        id: 2,
        text: "List the top constructor by total aircraft sold to each continent",
        hint: "Needs GROUP BY, aggregate, and ranking logic",
        correctQueryId: 18
      },
      {
        id: 3,
        text: "Find pilots who fly all aircraft types from their country's manufacturer",
        hint: "Combine nationality filtering with division pattern",
        correctQueryId: 19
      }
    ]
  }
];
