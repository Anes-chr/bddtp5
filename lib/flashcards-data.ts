export interface Flashcard {
  id: number
  category: string
  question: string
  answer: string
  hint?: string
  codeExample?: string
}

export const flashcardsData: Flashcard[] = [
  // Basic Concepts
  {
    id: 1,
    category: "Basics",
    question: "What does SQL stand for?",
    answer: "Structured Query Language",
    hint: "It's a language for managing databases"
  },
  {
    id: 2,
    category: "Basics",
    question: "What is the purpose of the SELECT statement?",
    answer: "To retrieve data from one or more tables in a database",
    hint: "It's the most commonly used SQL command",
    codeExample: "SELECT * FROM Employees;"
  },
  {
    id: 3,
    category: "Basics",
    question: "What does the asterisk (*) mean in SELECT * FROM table?",
    answer: "It means 'all columns' - it selects every column from the table",
    hint: "It's a wildcard character"
  },
  {
    id: 4,
    category: "Basics",
    question: "What is a primary key?",
    answer: "A column (or combination of columns) that uniquely identifies each row in a table. It cannot contain NULL values and must be unique.",
    hint: "Think about unique identification"
  },
  {
    id: 5,
    category: "Basics",
    question: "What is a foreign key?",
    answer: "A column that creates a link between two tables by referencing the primary key of another table. It enforces referential integrity.",
    hint: "It creates relationships between tables"
  },

  // WHERE Clause
  {
    id: 6,
    category: "Filtering",
    question: "What is the purpose of the WHERE clause?",
    answer: "To filter records and retrieve only rows that satisfy a specified condition",
    hint: "It's used for conditional filtering",
    codeExample: "SELECT * FROM Employees WHERE Position = 'Manager';"
  },
  {
    id: 7,
    category: "Filtering",
    question: "What's the difference between = and LIKE in SQL?",
    answer: "= matches exact values, while LIKE is used for pattern matching with wildcards (% for multiple characters, _ for single character)",
    hint: "One is exact, one uses patterns",
    codeExample: "WHERE LastName LIKE 'Sm%'"
  },
  {
    id: 8,
    category: "Filtering",
    question: "How do you check for NULL values in SQL?",
    answer: "Use IS NULL or IS NOT NULL. You cannot use = NULL because NULL represents unknown, and unknown cannot equal anything.",
    hint: "NULL is not the same as empty or zero",
    codeExample: "WHERE ShippedDate IS NULL"
  },
  {
    id: 9,
    category: "Filtering",
    question: "What does the BETWEEN operator do?",
    answer: "It filters values within a specified range, inclusive of both endpoints",
    hint: "It's inclusive on both ends",
    codeExample: "WHERE Salary BETWEEN 30000 AND 70000"
  },
  {
    id: 10,
    category: "Filtering",
    question: "What is the IN operator used for?",
    answer: "To specify multiple possible values for a column. It's a shorthand for multiple OR conditions.",
    hint: "Think of a list of acceptable values",
    codeExample: "WHERE DeptId IN (1, 2, 3)"
  },

  // Sorting & Grouping
  {
    id: 11,
    category: "Sorting",
    question: "What is the default sort order in ORDER BY?",
    answer: "Ascending (ASC). Use DESC for descending order.",
    hint: "A comes before Z by default"
  },
  {
    id: 12,
    category: "Sorting",
    question: "Can you ORDER BY a column that's not in the SELECT list?",
    answer: "Yes, you can order by any column in the table, even if it's not selected (with some database-specific exceptions when using DISTINCT)",
    hint: "The sort doesn't depend on what you display"
  },
  {
    id: 13,
    category: "Grouping",
    question: "What is the purpose of GROUP BY?",
    answer: "To arrange identical data into groups, typically used with aggregate functions to perform calculations on each group",
    hint: "Think of grouping students by class",
    codeExample: "SELECT Department, COUNT(*) FROM Employees GROUP BY Department"
  },
  {
    id: 14,
    category: "Grouping",
    question: "What's the difference between WHERE and HAVING?",
    answer: "WHERE filters individual rows BEFORE grouping, HAVING filters groups AFTER aggregation. WHERE cannot use aggregate functions, HAVING can.",
    hint: "Before vs. after grouping"
  },

  // Aggregate Functions
  {
    id: 15,
    category: "Aggregates",
    question: "Name the 5 main aggregate functions in SQL",
    answer: "COUNT(), SUM(), AVG(), MIN(), MAX()",
    hint: "Count, add, average, smallest, largest"
  },
  {
    id: 16,
    category: "Aggregates",
    question: "What's the difference between COUNT(*) and COUNT(column)?",
    answer: "COUNT(*) counts all rows including NULLs. COUNT(column) counts only non-NULL values in that specific column.",
    hint: "One counts rows, one counts values"
  },
  {
    id: 17,
    category: "Aggregates",
    question: "How do you count only unique values?",
    answer: "Use COUNT(DISTINCT column)",
    hint: "Combine COUNT with something",
    codeExample: "SELECT COUNT(DISTINCT DeptId) FROM Employees"
  },

  // Joins
  {
    id: 18,
    category: "Joins",
    question: "What is an INNER JOIN?",
    answer: "A join that returns only rows where there is a match in BOTH tables being joined",
    hint: "Only the intersection",
    codeExample: "SELECT * FROM Employees E INNER JOIN Departments D ON E.DeptId = D.Id"
  },
  {
    id: 19,
    category: "Joins",
    question: "What is a LEFT JOIN (or LEFT OUTER JOIN)?",
    answer: "A join that returns ALL rows from the left table, and matching rows from the right table. Non-matching right side gets NULL.",
    hint: "Everything from left, matching from right"
  },
  {
    id: 20,
    category: "Joins",
    question: "What is a Cartesian Product?",
    answer: "When you join tables without a join condition, every row from the first table is combined with every row from the second table (n × m rows)",
    hint: "Also called a CROSS JOIN"
  },
  {
    id: 21,
    category: "Joins",
    question: "What is a self-join?",
    answer: "A join where a table is joined with itself. It's useful for comparing rows within the same table.",
    hint: "The table is used twice with different aliases",
    codeExample: "SELECT A.Name, B.Name FROM Employees A, Employees B WHERE A.DeptId = B.DeptId AND A.Id <> B.Id"
  },

  // Subqueries
  {
    id: 22,
    category: "Subqueries",
    question: "What is a subquery?",
    answer: "A query nested inside another query. It can be used in SELECT, FROM, WHERE, or HAVING clauses.",
    hint: "A query within a query"
  },
  {
    id: 23,
    category: "Subqueries",
    question: "What is a correlated subquery?",
    answer: "A subquery that references columns from the outer query. It's executed once for each row processed by the outer query.",
    hint: "The inner query depends on the outer query"
  },
  {
    id: 24,
    category: "Subqueries",
    question: "What does the EXISTS operator do?",
    answer: "It returns TRUE if the subquery returns at least one row, FALSE if the subquery returns no rows",
    hint: "It checks for existence, not values",
    codeExample: "WHERE EXISTS (SELECT 1 FROM Employees E WHERE E.DeptId = D.Id)"
  },

  // Set Operations
  {
    id: 25,
    category: "Sets",
    question: "What's the difference between UNION and UNION ALL?",
    answer: "UNION removes duplicate rows from the combined result. UNION ALL keeps all rows including duplicates and is faster.",
    hint: "One removes duplicates, one doesn't"
  },
  {
    id: 26,
    category: "Sets",
    question: "What does INTERSECT return?",
    answer: "Only the rows that appear in BOTH query results",
    hint: "The common elements"
  },
  {
    id: 27,
    category: "Sets",
    question: "What does EXCEPT (or MINUS) return?",
    answer: "Rows from the first query that are NOT in the second query",
    hint: "Subtraction of sets"
  },

  // Constraints & Keys
  {
    id: 28,
    category: "Constraints",
    question: "What is referential integrity?",
    answer: "A rule ensuring that foreign key values must match an existing primary key value in the referenced table (or be NULL if allowed)",
    hint: "It maintains relationships between tables"
  },
  {
    id: 29,
    category: "Constraints",
    question: "What are the main types of SQL constraints?",
    answer: "PRIMARY KEY, FOREIGN KEY, UNIQUE, NOT NULL, CHECK, DEFAULT",
    hint: "Rules that restrict data in tables"
  },
  {
    id: 30,
    category: "Constraints",
    question: "What is the difference between UNIQUE and PRIMARY KEY?",
    answer: "Both ensure uniqueness, but PRIMARY KEY cannot be NULL and there can only be one per table. A table can have multiple UNIQUE constraints and they can contain NULL.",
    hint: "One is stricter than the other"
  },

  // Advanced Concepts
  {
    id: 31,
    category: "Advanced",
    question: "What is normalization?",
    answer: "The process of organizing database tables to minimize data redundancy and dependency. Common forms are 1NF, 2NF, 3NF, and BCNF.",
    hint: "It reduces data duplication"
  },
  {
    id: 32,
    category: "Advanced",
    question: "What is the order of SQL clause execution?",
    answer: "FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT",
    hint: "It's not the order you write them"
  },
  {
    id: 33,
    category: "Advanced",
    question: "What is an alias in SQL?",
    answer: "A temporary name given to a table or column to make queries more readable. Created using the AS keyword (optional in some databases).",
    hint: "A nickname for tables or columns",
    codeExample: "SELECT FirstName AS EmpName FROM Employees E"
  },
  {
    id: 34,
    category: "Advanced",
    question: "What is the difference between DELETE and TRUNCATE?",
    answer: "DELETE removes rows one by one (can use WHERE, can be rolled back, fires triggers). TRUNCATE removes all rows at once (faster, cannot use WHERE, usually cannot be rolled back).",
    hint: "One is careful, one is fast"
  },
  {
    id: 35,
    category: "Advanced",
    question: "What does DISTINCT do?",
    answer: "Removes duplicate rows from the result set, returning only unique combinations of the selected columns",
    hint: "No repeating rows",
    codeExample: "SELECT DISTINCT Department FROM Employees"
  }
]

export const flashcardCategories = [
  "All",
  "Basics",
  "Filtering",
  "Sorting",
  "Grouping",
  "Aggregates",
  "Joins",
  "Subqueries",
  "Sets",
  "Constraints",
  "Advanced"
]
