export interface Flashcard {
  id: number;
  question: string;
  answer: string;
  hint?: string;
  codeExample?: string;
  category: "basics" | "joins" | "aggregates" | "subqueries" | "exists" | "division" | "patterns" | "functions";
}

export const flashcardsData: Flashcard[] = [
  // BASICS
  {
    id: 1,
    question: "What is the purpose of DISTINCT?",
    answer: "DISTINCT eliminates duplicate rows from the result set, returning only unique combinations of the selected columns.",
    hint: "Think about what happens when you join tables with many-to-many relationships",
    codeExample: `SELECT DISTINCT a.nom FROM Avion a
JOIN Piloter p ON a.IdAvion = p.IdAvion;
-- Returns each aircraft once even if multiple pilots fly it`,
    category: "basics"
  },
  {
    id: 2,
    question: "When do you use LIKE vs = ?",
    answer: "Use = for exact matches. Use LIKE for pattern matching with wildcards: % matches any characters, _ matches one character.",
    hint: "% = any length, _ = exactly one character",
    codeExample: `WHERE nom = 'Boeing 777'     -- Exact match
WHERE nom LIKE 'Boeing%'    -- Starts with Boeing
WHERE nom LIKE '%777%'      -- Contains 777
WHERE nom LIKE 'Boeing ___' -- Boeing + 3 chars`,
    category: "basics"
  },
  {
    id: 3,
    question: "How do you extract the year from a date?",
    answer: "Use YEAR(date_column) to extract just the year as an integer. Works for filtering and grouping by year.",
    hint: "Similar functions: MONTH(), DAY()",
    codeExample: `SELECT * FROM Avion
WHERE YEAR(DateConstruction) < 2010;
-- Returns aircraft built before 2010`,
    category: "functions"
  },
  
  // JOINS
  {
    id: 4,
    question: "What's the difference between INNER JOIN and LEFT JOIN?",
    answer: "INNER JOIN returns only rows with matches in both tables. LEFT JOIN returns all rows from the left table, with NULL for non-matching right table columns.",
    hint: "LEFT JOIN is essential for 'including those with no matches'",
    codeExample: `-- INNER: Only constructors with aircraft
SELECT c.nom FROM Constructeur c
INNER JOIN Avion a ON c.IdConstructeur = a.IdConstructeur;

-- LEFT: All constructors, even without aircraft
SELECT c.nom, a.nom FROM Constructeur c
LEFT JOIN Avion a ON c.IdConstructeur = a.IdConstructeur;`,
    category: "joins"
  },
  {
    id: 5,
    question: "How do you chain multiple JOINs?",
    answer: "Add JOINs sequentially, each connecting to a table already in the query. The order matters - you must have a path through the relationships.",
    hint: "Think of it as following a chain: A → B → C → D",
    codeExample: `SELECT pi.nom, a.nom, con.nom
FROM Pilote pi
JOIN Piloter p ON pi.IdPilote = p.IdPilote
JOIN Avion a ON p.IdAvion = a.IdAvion
JOIN Constructeur con ON a.IdConstructeur = con.IdConstructeur;`,
    category: "joins"
  },
  {
    id: 6,
    question: "What is a self-join?",
    answer: "A self-join joins a table to itself using different aliases. Useful for comparing rows within the same table.",
    hint: "You need two different aliases for the same table",
    codeExample: `-- Find pilots from the same country
SELECT p1.nom, p2.nom, p1.nationalité
FROM Pilote p1
JOIN Pilote p2 ON p1.nationalité = p2.nationalité
WHERE p1.IdPilote < p2.IdPilote;`,
    category: "joins"
  },

  // AGGREGATES
  {
    id: 7,
    question: "What are the 5 main aggregate functions?",
    answer: "COUNT (number of rows), SUM (total), AVG (average), MIN (smallest), MAX (largest). All collapse multiple rows into one value.",
    hint: "COUNT(*) counts rows; COUNT(column) counts non-NULL values",
    codeExample: `SELECT 
  COUNT(*) as total,
  SUM(Quantité) as total_qty,
  AVG(Quantité) as avg_qty,
  MIN(prix) as cheapest,
  MAX(prix) as most_expensive
FROM Achat;`,
    category: "aggregates"
  },
  {
    id: 8,
    question: "What is COUNT(DISTINCT column)?",
    answer: "COUNT(DISTINCT column) counts unique values only. Essential for 'how many different X' questions.",
    hint: "COUNT(*) = total rows, COUNT(DISTINCT col) = unique values",
    codeExample: `-- How many different aircraft did each company buy?
SELECT c.nom, COUNT(DISTINCT ac.IdAvion) as unique_aircraft
FROM Compagnie c
JOIN Achat ac ON c.IdCompagnie = ac.IdCompagnie
GROUP BY c.nom;`,
    category: "aggregates"
  },
  {
    id: 9,
    question: "What is GROUP BY used for?",
    answer: "GROUP BY divides rows into groups based on column values. Aggregate functions then calculate values for EACH group separately.",
    hint: "Non-aggregated columns in SELECT must be in GROUP BY",
    codeExample: `SELECT c.nom, COUNT(*) as nb_avions
FROM Constructeur c
JOIN Avion a ON c.IdConstructeur = a.IdConstructeur
GROUP BY c.nom;
-- One row per constructor with their aircraft count`,
    category: "aggregates"
  },
  {
    id: 10,
    question: "WHERE vs HAVING - what's the difference?",
    answer: "WHERE filters individual rows BEFORE grouping. HAVING filters groups AFTER aggregation. Only HAVING can use aggregate functions.",
    hint: "WHERE → GROUP BY → HAVING (execution order)",
    codeExample: `SELECT con.nom, COUNT(*) as nb
FROM Avion a JOIN Constructeur con ON ...
WHERE a.NbPlaces > 200      -- Filter rows first
GROUP BY con.nom
HAVING COUNT(*) > 3;        -- Filter groups after`,
    category: "aggregates"
  },

  // SUBQUERIES
  {
    id: 11,
    question: "What is a scalar subquery?",
    answer: "A scalar subquery returns exactly ONE value (one row, one column). It can be used anywhere a single value is expected.",
    hint: "Must return exactly one value or the query errors",
    codeExample: `SELECT a.nom FROM Avion a
WHERE a.NbPlaces > (SELECT AVG(NbPlaces) FROM Avion);
-- Compare each aircraft to the single average value`,
    category: "subqueries"
  },
  {
    id: 12,
    question: "What is a correlated subquery?",
    answer: "A correlated subquery references columns from the outer query. It executes once for EACH row of the outer query.",
    hint: "Look for references to outer table aliases in the subquery",
    codeExample: `SELECT * FROM Achat ac
WHERE ac.Quantité > (
    SELECT AVG(ac2.Quantité) FROM Achat ac2
    WHERE ac2.IdAvion = ac.IdAvion  -- References outer!
);`,
    category: "subqueries"
  },
  {
    id: 13,
    question: "How does IN work with a subquery?",
    answer: "IN checks if a value exists in the list returned by the subquery. The subquery should return a single column.",
    hint: "IN (list) = matches any value in the list",
    codeExample: `SELECT c.nom FROM Compagnie c
WHERE c.IdCompagnie IN (
    SELECT ac.IdCompagnie FROM Achat ac
    JOIN Avion a ON ac.IdAvion = a.IdAvion
    WHERE a.nom LIKE '%Boeing%'
);`,
    category: "subqueries"
  },
  {
    id: 14,
    question: "Why is NOT IN dangerous with NULLs?",
    answer: "If the subquery returns any NULL values, NOT IN may return zero rows because comparisons with NULL are unknown, not false.",
    hint: "Use NOT EXISTS instead for safety",
    codeExample: `-- DANGEROUS: If subquery returns (1, 2, NULL)
WHERE id NOT IN (SELECT nullable_col FROM table)
-- Returns no rows because: x != NULL is UNKNOWN

-- SAFER alternative:
WHERE NOT EXISTS (SELECT 1 FROM table WHERE ...)`,
    category: "subqueries"
  },

  // EXISTS
  {
    id: 15,
    question: "What does EXISTS do?",
    answer: "EXISTS returns TRUE if the subquery returns at least one row. It doesn't care about the actual values - just whether rows exist.",
    hint: "'SELECT 1' in EXISTS is conventional - the value doesn't matter",
    codeExample: `SELECT c.nom FROM Compagnie c
WHERE EXISTS (
    SELECT 1 FROM Achat ac
    WHERE ac.IdCompagnie = c.IdCompagnie
);
-- Companies that have at least one purchase`,
    category: "exists"
  },
  {
    id: 16,
    question: "How does NOT EXISTS work?",
    answer: "NOT EXISTS returns TRUE if the subquery returns ZERO rows. Perfect for 'entity that doesn't have X' patterns.",
    hint: "NOT EXISTS handles NULLs gracefully (unlike NOT IN)",
    codeExample: `SELECT c.nom FROM Compagnie c
WHERE NOT EXISTS (
    SELECT 1 FROM Achat ac
    JOIN Avion a ON ac.IdAvion = a.IdAvion
    WHERE ac.IdCompagnie = c.IdCompagnie
    AND a.nom LIKE '%Boeing%'
);
-- Companies that never bought a Boeing`,
    category: "exists"
  },
  {
    id: 17,
    question: "How do you express 'ONLY X, nothing else'?",
    answer: "Combine EXISTS (has at least one X) with NOT EXISTS (no non-X). This pattern ensures exclusive membership.",
    hint: "Two conditions: has X AND doesn't have non-X",
    codeExample: `SELECT a.nom FROM Avion a
WHERE EXISTS (
    SELECT 1 FROM Piloter p JOIN Pilote pi ON ...
    WHERE p.IdAvion = a.IdAvion AND pi.nationalité = 'Algérienne'
)
AND NOT EXISTS (
    SELECT 1 FROM Piloter p JOIN Pilote pi ON ...
    WHERE p.IdAvion = a.IdAvion AND pi.nationalité != 'Algérienne'
);
-- Aircraft flown ONLY by Algerian pilots`,
    category: "exists"
  },

  // DIVISION
  {
    id: 18,
    question: "What is relational division?",
    answer: "Division answers 'Who has ALL of X?' - finding entities that have every item from a specific set (e.g., companies that bought ALL Boeing aircraft).",
    hint: "SQL has no direct 'FOR ALL' - use double negation",
    codeExample: `-- Companies that bought ALL Boeing aircraft
-- Logic: No Boeing exists that this company didn't buy`,
    category: "division"
  },
  {
    id: 19,
    question: "Explain the double NOT EXISTS pattern",
    answer: "Double NOT EXISTS implements division: 'There does NOT EXIST an item X that this entity does NOT have.' It's the SQL equivalent of ∀ (for all).",
    hint: "NOT EXISTS(... NOT EXISTS ...) = has ALL",
    codeExample: `SELECT c.nom FROM Compagnie c
WHERE NOT EXISTS (
    -- No Boeing aircraft...
    SELECT 1 FROM Avion a JOIN Constructeur con ON ...
    WHERE con.nom = 'Boeing'
    AND NOT EXISTS (
        -- ...that this company hasn't bought
        SELECT 1 FROM Achat ac
        WHERE ac.IdCompagnie = c.IdCompagnie
        AND ac.IdAvion = a.IdAvion
    )
);`,
    category: "division"
  },
  {
    id: 20,
    question: "How do you implement division with GROUP BY?",
    answer: "Count distinct items the entity has and compare to total items. If counts match, entity has all items.",
    hint: "HAVING COUNT(DISTINCT x) = (SELECT COUNT(*) ...)",
    codeExample: `SELECT c.nom FROM Compagnie c
JOIN Achat ac ON c.IdCompagnie = ac.IdCompagnie
JOIN Avion a ON ac.IdAvion = a.IdAvion
WHERE a.IdConstructeur = 1  -- Boeing
GROUP BY c.IdCompagnie
HAVING COUNT(DISTINCT a.IdAvion) = (
    SELECT COUNT(*) FROM Avion WHERE IdConstructeur = 1
);`,
    category: "division"
  },
  {
    id: 21,
    question: "How do you find entities with same items as another entity?",
    answer: "Division against a reference entity: 'No item of entity X is missing from entity Y.' Uses the same double NOT EXISTS with reference filter.",
    hint: "Reference entity's items become the 'all' set",
    codeExample: `-- Companies with all aircraft that Company 3 has
SELECT c.nom FROM Compagnie c
WHERE NOT EXISTS (
    SELECT 1 FROM Achat ref WHERE ref.IdCompagnie = 3
    AND NOT EXISTS (
        SELECT 1 FROM Achat ac
        WHERE ac.IdCompagnie = c.IdCompagnie
        AND ac.IdAvion = ref.IdAvion
    )
) AND c.IdCompagnie != 3;`,
    category: "division"
  },

  // PATTERNS
  {
    id: 22,
    question: "How do you debug a complex query?",
    answer: "Build incrementally: start with the simplest join, verify row counts, add one join at a time, check counts, then add conditions.",
    hint: "Count rows after each step to catch errors early",
    codeExample: `-- Step 1: Verify base table
SELECT COUNT(*) FROM Avion;  -- 50 aircraft

-- Step 2: Add first join, check count
SELECT COUNT(*) FROM Avion a
JOIN Piloter p ON a.IdAvion = p.IdAvion;

-- Step 3: Continue adding joins...`,
    category: "patterns"
  },
  {
    id: 23,
    question: "LEFT JOIN + IS NULL pattern - what does it do?",
    answer: "This pattern finds rows from the left table that have NO matching rows in the right table. Alternative to NOT EXISTS.",
    hint: "Visual and easy to debug",
    codeExample: `-- Aircraft with no pilots
SELECT a.nom FROM Avion a
LEFT JOIN Piloter p ON a.IdAvion = p.IdAvion
WHERE p.IdPilote IS NULL;

-- Equivalent to:
WHERE NOT EXISTS (SELECT 1 FROM Piloter WHERE ...)`,
    category: "patterns"
  },
  {
    id: 24,
    question: "How do you find the maximum value in each group?",
    answer: "Use GROUP BY with MAX(), then optionally join back to get the full row. Or use a correlated subquery.",
    hint: "MAX gives the value; you need another step to get the row",
    codeExample: `-- Highest quantity purchase per company
SELECT c.nom, a.nom, ac.Quantité
FROM Achat ac
JOIN Compagnie c ON ac.IdCompagnie = c.IdCompagnie
JOIN Avion a ON ac.IdAvion = a.IdAvion
WHERE ac.Quantité = (
    SELECT MAX(ac2.Quantité) FROM Achat ac2
    WHERE ac2.IdCompagnie = ac.IdCompagnie
);`,
    category: "patterns"
  },

  // FUNCTIONS
  {
    id: 25,
    question: "How do you handle NULL values?",
    answer: "Use IS NULL / IS NOT NULL to test for NULLs. Use COALESCE(col, default) to replace NULL with a default value.",
    hint: "NULL != NULL is UNKNOWN, not TRUE",
    codeExample: `-- Find aircraft without construction date
WHERE DateConstruction IS NULL

-- Replace NULL with default
SELECT COALESCE(prix, 0) as prix FROM Achat

-- IFNULL is MySQL-specific alternative
SELECT IFNULL(prix, 0) as prix FROM Achat`,
    category: "functions"
  },
  {
    id: 26,
    question: "What is BETWEEN used for?",
    answer: "BETWEEN low AND high is inclusive range comparison. Equivalent to >= low AND <= high.",
    hint: "BETWEEN is inclusive on both ends",
    codeExample: `-- Aircraft built between 2010 and 2020
SELECT * FROM Avion
WHERE YEAR(DateConstruction) BETWEEN 2010 AND 2020;

-- Same as:
WHERE YEAR(DateConstruction) >= 2010
  AND YEAR(DateConstruction) <= 2020`,
    category: "functions"
  },
  {
    id: 27,
    question: "How do you concatenate strings in SQL?",
    answer: "Use CONCAT() function or the || operator (varies by database). Useful for combining columns in output.",
    hint: "CONCAT handles NULL better than ||",
    codeExample: `-- MySQL/SQL Server
SELECT CONCAT(nom, ' - ', pays) as full_name FROM Compagnie;

-- Standard SQL (PostgreSQL)
SELECT nom || ' - ' || pays as full_name FROM Compagnie;`,
    category: "functions"
  },
  {
    id: 28,
    question: "What is CASE WHEN used for?",
    answer: "CASE provides conditional logic in SQL - like if/else. Returns different values based on conditions.",
    hint: "Useful for categorizing or transforming data",
    codeExample: `SELECT a.nom,
  CASE 
    WHEN a.NbPlaces < 100 THEN 'Small'
    WHEN a.NbPlaces < 300 THEN 'Medium'
    ELSE 'Large'
  END as size_category
FROM Avion a;`,
    category: "functions"
  },

  // More patterns
  {
    id: 29,
    question: "How do you find duplicates in a table?",
    answer: "GROUP BY the columns that should be unique, then HAVING COUNT(*) > 1 to find groups with duplicates.",
    hint: "GROUP BY + HAVING COUNT > 1",
    codeExample: `-- Find duplicate pilot names
SELECT nom, COUNT(*) as count
FROM Pilote
GROUP BY nom
HAVING COUNT(*) > 1;`,
    category: "patterns"
  },
  {
    id: 30,
    question: "UNION vs UNION ALL - what's the difference?",
    answer: "UNION combines results and removes duplicates. UNION ALL combines results and keeps all duplicates. UNION ALL is faster.",
    hint: "UNION = UNION ALL + DISTINCT",
    codeExample: `-- All constructors and companies (unique list)
SELECT nom FROM Constructeur
UNION
SELECT nom FROM Compagnie;

-- Keep duplicates (faster)
SELECT nom FROM Constructeur
UNION ALL
SELECT nom FROM Compagnie;`,
    category: "patterns"
  },
  {
    id: 31,
    question: "How do you limit results to top N?",
    answer: "Use LIMIT N (MySQL/PostgreSQL) or TOP N (SQL Server) to restrict output rows. Combine with ORDER BY for meaningful results.",
    hint: "Always ORDER BY before LIMIT for predictable results",
    codeExample: `-- Top 5 largest aircraft
SELECT nom, NbPlaces FROM Avion
ORDER BY NbPlaces DESC
LIMIT 5;

-- SQL Server:
SELECT TOP 5 nom, NbPlaces FROM Avion
ORDER BY NbPlaces DESC;`,
    category: "patterns"
  },
  {
    id: 32,
    question: "What is a derived table (inline view)?",
    answer: "A subquery in the FROM clause that acts as a temporary table. Useful for complex aggregations or step-by-step logic.",
    hint: "Must give the derived table an alias",
    codeExample: `SELECT con.nom, stats.total_sold
FROM Constructeur con
JOIN (
    SELECT a.IdConstructeur, SUM(ac.Quantité) as total_sold
    FROM Avion a JOIN Achat ac ON a.IdAvion = ac.IdAvion
    GROUP BY a.IdConstructeur
) stats ON con.IdConstructeur = stats.IdConstructeur;`,
    category: "patterns"
  },

  // Advanced
  {
    id: 33,
    question: "EXISTS vs IN - when to use which?",
    answer: "Use EXISTS for large subqueries (stops at first match). Use IN for small lists or when you need the actual values. Avoid NOT IN with NULLs.",
    hint: "EXISTS often faster for large datasets",
    codeExample: `-- EXISTS: Stops at first match
WHERE EXISTS (SELECT 1 FROM BigTable WHERE ...)

-- IN: Builds complete list first
WHERE col IN (SELECT col FROM SmallTable)`,
    category: "exists"
  },
  {
    id: 34,
    question: "How do you express 'at least N' in SQL?",
    answer: "Use HAVING COUNT(*) >= N after GROUP BY. This filters groups to those with at least N members.",
    hint: "HAVING works on groups, not individual rows",
    codeExample: `-- Companies that bought at least 3 different aircraft
SELECT c.nom FROM Compagnie c
JOIN Achat ac ON c.IdCompagnie = ac.IdCompagnie
GROUP BY c.IdCompagnie, c.nom
HAVING COUNT(DISTINCT ac.IdAvion) >= 3;`,
    category: "aggregates"
  },
  {
    id: 35,
    question: "How do you test a query before running it?",
    answer: "Start with SELECT COUNT(*) instead of full output. Remove columns gradually to isolate issues. Use LIMIT/TOP to see sample rows.",
    hint: "Test incrementally, verify counts at each step",
    codeExample: `-- Step 1: Count to verify query logic
SELECT COUNT(*) FROM ... WHERE ...;

-- Step 2: Sample output
SELECT * FROM ... WHERE ... LIMIT 10;

-- Step 3: Full output once confident
SELECT * FROM ... WHERE ...;`,
    category: "patterns"
  }
];

export const flashcardCategories = [
  { id: "basics", name: "SQL Basics", count: 3, icon: "BookOpen" },
  { id: "joins", name: "JOINs", count: 3, icon: "Link" },
  { id: "aggregates", name: "Aggregates & GROUP BY", count: 4, icon: "Calculator" },
  { id: "subqueries", name: "Subqueries", count: 4, icon: "Layers" },
  { id: "exists", name: "EXISTS & NOT EXISTS", count: 4, icon: "Search" },
  { id: "division", name: "Relational Division", count: 4, icon: "Divide" },
  { id: "patterns", name: "Query Patterns", count: 8, icon: "Code" },
  { id: "functions", name: "SQL Functions", count: 5, icon: "Function" }
];
