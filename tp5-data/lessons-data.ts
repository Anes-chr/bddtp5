export const lessonsContent = {
  "1": {
    title: "SQL Basics & Multi-Table Joins",
    description: "Master the fundamentals with the aviation database schema and multiple table joins",
    queryIds: [1, 5, 20],
    concepts: [
      {
        title: "The Aviation Database Schema",
        content: "The TP5 database models an aviation system with 8 interconnected tables: Avion (aircraft), Constructeur (manufacturers), Pilote (pilots), Piloter (pilot-aircraft assignments), Aéroport (airports), Dessert (service routes), Compagnie (airlines), and Achat (purchases).",
        example: "Avion ← Constructeur (which manufacturer built which aircraft)\nAvion ← → Pilote via Piloter (which pilots fly which aircraft)\nAvion ← → Aéroport via Dessert (which aircraft serve which airports)\nAvion ← → Compagnie via Achat (which airlines bought which aircraft)",
        explanation: "Understanding these relationships is crucial. Each table serves a specific purpose, and JOINs are how we connect them to answer complex questions."
      },
      {
        title: "Chaining Multiple JOINs",
        content: "Many questions require connecting 3, 4, or even more tables. Think of it as following a path through the relationships.",
        example: `SELECT pi.nom, a.nom as avion, con.nom as constructeur
FROM Pilote pi
JOIN Piloter p ON pi.IdPilote = p.IdPilote
JOIN Avion a ON p.IdAvion = a.IdAvion
JOIN Constructeur con ON a.IdConstructeur = con.IdConstructeur;`,
        explanation: "This query chains 4 tables: Pilote → Piloter → Avion → Constructeur. Each JOIN adds access to new columns. The order matters - you can only join to tables connected to what you've already joined."
      },
      {
        title: "Filtering with LIKE and YEAR()",
        content: "Pattern matching and date functions are essential for aviation data. LIKE finds partial matches, YEAR() extracts the year from dates.",
        example: `WHERE a.nom LIKE '%Boeing 777%'
AND YEAR(a.DateConstruction) < 2010`,
        explanation: "'%Boeing 777%' matches any aircraft name containing 'Boeing 777'. YEAR() extracts just the year from DateConstruction for comparison."
      },
      {
        title: "Using DISTINCT to Avoid Duplicates",
        content: "When joining tables with many-to-many relationships, duplicates often appear. DISTINCT ensures each result appears only once.",
        example: `SELECT DISTINCT a.IdAvion, a.nom
FROM Avion a
JOIN Piloter p ON a.IdAvion = p.IdAvion
-- Without DISTINCT, an aircraft with 5 pilots appears 5 times`,
        explanation: "If a Boeing 777 has 3 Algerian pilots, without DISTINCT it would appear 3 times in results. DISTINCT collapses these to one row."
      }
    ]
  },
  "2": {
    title: "Aggregate Functions & GROUP BY",
    description: "Count, sum, and average data across groups using aggregate functions",
    queryIds: [7, 9, 13, 14, 20],
    concepts: [
      {
        title: "Core Aggregate Functions",
        content: "SQL provides five main aggregate functions: COUNT (number of items), SUM (total), AVG (average), MIN (smallest), MAX (largest).",
        example: `SELECT 
  COUNT(*) as total_achats,
  SUM(Quantité) as total_unités,
  AVG(Quantité) as moyenne,
  MAX(Quantité) as plus_gros_achat
FROM Achat;`,
        explanation: "Each function collapses multiple rows into a single value. COUNT(*) counts rows, while COUNT(column) counts non-NULL values in that column."
      },
      {
        title: "GROUP BY Fundamentals",
        content: "GROUP BY splits rows into groups based on column values. Aggregate functions then calculate values for EACH group separately.",
        example: `SELECT con.nom, COUNT(*) as nb_avions, SUM(ac.Quantité) as total_vendus
FROM Constructeur con
JOIN Avion a ON con.IdConstructeur = a.IdConstructeur
JOIN Achat ac ON a.IdAvion = ac.IdAvion
GROUP BY con.nom;`,
        explanation: "This creates one group per constructor. For each group (Boeing, Airbus, etc.), it counts aircraft and sums sales. Result: one row per constructor with their stats."
      },
      {
        title: "COUNT DISTINCT",
        content: "COUNT(DISTINCT column) counts unique values only. Essential for counting 'how many different X'.",
        example: `SELECT c.nom, COUNT(DISTINCT ac.IdAvion) as nb_modeles_differents
FROM Compagnie c
JOIN Achat ac ON c.IdCompagnie = ac.IdCompagnie
GROUP BY c.nom;`,
        explanation: "If Air-Algérie bought Boeing 777 three times, COUNT(*) = 3 but COUNT(DISTINCT IdAvion) = 1. We're counting unique aircraft models, not individual purchases."
      },
      {
        title: "LEFT JOIN for Complete Results",
        content: "Use LEFT JOIN when you want to include entities with no matches (e.g., constructors with no sales).",
        example: `SELECT con.nom, SUM(ac.Quantité) as total_ventes
FROM Constructeur con
LEFT JOIN Avion a ON con.IdConstructeur = a.IdConstructeur
LEFT JOIN Achat ac ON a.IdAvion = ac.IdAvion
GROUP BY con.nom;`,
        explanation: "INNER JOIN would exclude constructors with no aircraft or no sales. LEFT JOIN includes them with NULL totals. Essential for complete reporting."
      }
    ]
  },
  "3": {
    title: "HAVING - Filtering Groups",
    description: "Filter aggregated results using HAVING clause",
    queryIds: [11, 14, 16, 18],
    concepts: [
      {
        title: "WHERE vs HAVING",
        content: "WHERE filters individual rows BEFORE grouping. HAVING filters groups AFTER aggregation. WHERE cannot use aggregate functions; HAVING can.",
        example: `-- WHERE: filter rows before grouping
SELECT con.nom, COUNT(*) as nb_avions
FROM Avion a
JOIN Constructeur con ON a.IdConstructeur = con.IdConstructeur
WHERE a.NbPlaces > 200  -- Filter individual aircraft
GROUP BY con.nom
HAVING COUNT(*) > 3;  -- Filter groups with more than 3 aircraft`,
        explanation: "First, WHERE keeps only aircraft with >200 seats. Then GROUP BY creates constructor groups. Finally, HAVING keeps only groups with >3 aircraft."
      },
      {
        title: "HAVING with SUM",
        content: "Use HAVING to filter based on totals, like finding airports with high weekly service frequency.",
        example: `SELECT aer.nom, SUM(d.NB_Fois_Semaine) as total_vols
FROM Aéroport aer
JOIN Dessert d ON aer.IdAer = d.IdAer
JOIN Avion a ON d.IdAvion = a.IdAvion
WHERE a.nom LIKE '%Boeing%'
GROUP BY aer.nom
HAVING SUM(d.NB_Fois_Semaine) >= 10;`,
        explanation: "WHERE filters to Boeing aircraft only. GROUP BY creates airport groups. SUM adds up weekly flights. HAVING keeps airports with ≥10 total Boeing flights per week."
      },
      {
        title: "HAVING with COUNT DISTINCT",
        content: "Filter groups based on the number of unique items they contain.",
        example: `SELECT c.nom
FROM Compagnie c
JOIN Achat ac ON c.IdCompagnie = ac.IdCompagnie
GROUP BY c.nom
HAVING COUNT(DISTINCT ac.IdAvion) > 5;`,
        explanation: "This finds companies that purchased more than 5 different aircraft models. COUNT(DISTINCT) counts unique aircraft; HAVING filters the groups."
      },
      {
        title: "HAVING with Subquery Comparison",
        content: "Compare group aggregates to values calculated by subqueries - essential for division queries.",
        example: `GROUP BY c.IdCompagnie
HAVING COUNT(DISTINCT a.IdAvion) = (
    SELECT COUNT(*) FROM Avion WHERE IdConstructeur = 1
);`,
        explanation: "This pattern is key for relational division: 'Companies that bought ALL Boeing aircraft.' The subquery counts total Boeing planes; HAVING ensures the company bought that exact number."
      }
    ]
  },
  "4": {
    title: "Subqueries & IN / NOT IN",
    description: "Write queries within queries for complex data retrieval",
    queryIds: [3, 4, 8],
    concepts: [
      {
        title: "Subqueries in WHERE",
        content: "A subquery is a SELECT inside another SELECT. It can return a single value or a list of values.",
        example: `SELECT c.nom
FROM Compagnie c
WHERE c.IdCompagnie IN (
    SELECT DISTINCT ac.IdCompagnie
    FROM Achat ac
    JOIN Avion a ON ac.IdAvion = a.IdAvion
    WHERE a.nom LIKE '%Boeing%'
);`,
        explanation: "The inner query returns a list of company IDs that bought Boeing. The outer query then selects companies whose ID is IN that list."
      },
      {
        title: "NOT IN for Exclusion",
        content: "NOT IN excludes rows where the value appears in the subquery result. Great for finding 'who hasn't done X'.",
        example: `SELECT c.IdCompagnie, c.nom
FROM Compagnie c
WHERE c.IdCompagnie NOT IN (
    SELECT DISTINCT ac.IdCompagnie
    FROM Achat ac
    JOIN Avion a ON ac.IdAvion = a.IdAvion
    WHERE a.nom LIKE '%Boeing%'
);`,
        explanation: "This finds companies that have NEVER purchased a Boeing. The subquery lists Boeing buyers; NOT IN excludes them."
      },
      {
        title: "Scalar Subqueries",
        content: "A scalar subquery returns exactly one value. It can be used anywhere a single value is expected.",
        example: `SELECT a.nom, a.NbPlaces
FROM Avion a
WHERE a.NbPlaces > (SELECT AVG(NbPlaces) FROM Avion);`,
        explanation: "The subquery calculates the average seat count (one number). The outer query finds aircraft with more seats than that average."
      },
      {
        title: "NOT IN Caution with NULLs",
        content: "NOT IN can behave unexpectedly if the subquery returns NULL values. NOT EXISTS is safer.",
        example: `-- If subquery returns (1, 2, NULL), NOT IN might return no rows!
-- Safer alternative:
WHERE NOT EXISTS (SELECT 1 FROM ... WHERE ...)`,
        explanation: "NULL comparisons are tricky. 'x NOT IN (1, 2, NULL)' is never TRUE because we can't know if x equals the unknown (NULL). Prefer NOT EXISTS for robustness."
      }
    ]
  },
  "5": {
    title: "EXISTS & NOT EXISTS",
    description: "Check for existence or absence of related data",
    queryIds: [2, 3, 6, 8],
    concepts: [
      {
        title: "EXISTS - Checking for Presence",
        content: "EXISTS returns TRUE if the subquery returns at least one row. It's often faster than IN because it stops at the first match.",
        example: `SELECT c.nom
FROM Compagnie c
WHERE EXISTS (
    SELECT 1
    FROM Achat ac
    WHERE ac.IdCompagnie = c.IdCompagnie
);`,
        explanation: "For each company, check if at least one purchase exists. EXISTS doesn't care about the actual values - just whether rows exist. 'SELECT 1' is conventional to show we don't need columns."
      },
      {
        title: "NOT EXISTS - Checking for Absence",
        content: "NOT EXISTS returns TRUE if the subquery returns zero rows. Perfect for finding 'who hasn't done X'.",
        example: `SELECT c.nom
FROM Compagnie c
WHERE NOT EXISTS (
    SELECT 1
    FROM Achat ac
    JOIN Avion a ON ac.IdAvion = a.IdAvion
    WHERE ac.IdCompagnie = c.IdCompagnie
    AND a.nom LIKE '%Boeing%'
);`,
        explanation: "For each company, check that NO Boeing purchase exists. NOT EXISTS handles NULLs gracefully (unlike NOT IN)."
      },
      {
        title: "Exclusive Conditions Pattern",
        content: "Combine NOT EXISTS and EXISTS to find 'only X, nothing else' patterns.",
        example: `SELECT a.nom
FROM Avion a
WHERE NOT EXISTS (
    SELECT 1 FROM Piloter p JOIN Pilote pi ON p.IdPilote = pi.IdPilote
    WHERE p.IdAvion = a.IdAvion AND pi.nationalité != 'Algérienne'
)
AND EXISTS (
    SELECT 1 FROM Piloter p JOIN Pilote pi ON p.IdPilote = pi.IdPilote
    WHERE p.IdAvion = a.IdAvion AND pi.nationalité = 'Algérienne'
);`,
        explanation: "Two conditions: (1) No non-Algerian pilots fly this aircraft (NOT EXISTS). (2) At least one Algerian does (EXISTS). Combined = ONLY Algerian pilots."
      },
      {
        title: "EXISTS vs IN Performance",
        content: "EXISTS is often faster for large datasets because it stops searching once it finds a match. IN must process all results first.",
        example: `-- EXISTS stops at first match
WHERE EXISTS (SELECT 1 FROM BigTable WHERE ...)
-- IN builds complete list first
WHERE col IN (SELECT col FROM BigTable)`,
        explanation: "For a subquery returning millions of rows, EXISTS can be much faster. For small lists, IN is equally good and often more readable."
      }
    ]
  },
  "6": {
    title: "Correlated Subqueries",
    description: "Subqueries that reference the outer query",
    queryIds: [12],
    concepts: [
      {
        title: "What Makes a Subquery Correlated?",
        content: "A correlated subquery references columns from the outer query. It executes once for EACH row of the outer query, not just once overall.",
        example: `SELECT c.nom, a.nom, ac.Quantité
FROM Achat ac
JOIN Compagnie c ON ac.IdCompagnie = c.IdCompagnie
JOIN Avion a ON ac.IdAvion = a.IdAvion
WHERE ac.Quantité > (
    SELECT AVG(ac2.Quantité)
    FROM Achat ac2
    WHERE ac2.IdAvion = ac.IdAvion  -- References outer query!
);`,
        explanation: "The subquery calculates AVG(Quantité) for the SAME aircraft (ac2.IdAvion = ac.IdAvion). For each purchase, it computes the average for THAT specific aircraft, then compares."
      },
      {
        title: "Correlated vs Non-Correlated",
        content: "Non-correlated subqueries can run independently. Correlated subqueries depend on the outer query and run once per outer row.",
        example: `-- Non-correlated: runs once, returns one value
WHERE Quantité > (SELECT AVG(Quantité) FROM Achat)

-- Correlated: runs for each row, value changes
WHERE Quantité > (SELECT AVG(Quantité) FROM Achat WHERE IdAvion = outer.IdAvion)`,
        explanation: "Non-correlated: Compare to global average. Correlated: Compare to aircraft-specific average. The correlated version answers 'above average for THIS aircraft'."
      },
      {
        title: "Performance Considerations",
        content: "Correlated subqueries can be slow because they execute once per row. Consider alternatives like JOINs with derived tables.",
        example: `-- Alternative using derived table (often faster)
SELECT c.nom, a.nom, ac.Quantité
FROM Achat ac
JOIN (
    SELECT IdAvion, AVG(Quantité) as avg_qty
    FROM Achat GROUP BY IdAvion
) avgs ON ac.IdAvion = avgs.IdAvion
WHERE ac.Quantité > avgs.avg_qty;`,
        explanation: "This calculates all averages once (in the derived table), then joins. For large datasets, this can be significantly faster than a correlated subquery."
      }
    ]
  },
  "7": {
    title: "Relational Division",
    description: "Find entities that have ALL items from a set",
    queryIds: [15, 16, 17, 18, 19],
    concepts: [
      {
        title: "The Division Problem",
        content: "Relational division answers 'Who has ALL of X?' - Companies that bought ALL Boeing planes, Aircraft that serve ALL airports, etc.",
        example: `-- Question: Which companies purchased ALL Boeing aircraft?
-- Logic: Find companies where there is NO Boeing they DIDN'T buy`,
        explanation: "Division is tricky because SQL has no direct 'FOR ALL' operator. We use double negation: 'NOT EXISTS ... NOT EXISTS' = 'there is no X that this entity doesn't have'."
      },
      {
        title: "Double NOT EXISTS Pattern",
        content: "The classic division pattern: 'There does NOT EXIST an item X that this entity does NOT have.'",
        example: `SELECT c.IdCompagnie, c.nom
FROM Compagnie c
WHERE NOT EXISTS (
    SELECT 1 FROM Avion a
    JOIN Constructeur con ON a.IdConstructeur = con.IdConstructeur
    WHERE con.nom = 'Boeing'
    AND NOT EXISTS (
        SELECT 1 FROM Achat ac
        WHERE ac.IdCompagnie = c.IdCompagnie
        AND ac.IdAvion = a.IdAvion
    )
);`,
        explanation: "Outer NOT EXISTS: 'There is no Boeing aircraft...' Inner NOT EXISTS: '...that this company hasn't bought.' Combined: The company has bought ALL Boeing aircraft."
      },
      {
        title: "Division with GROUP BY",
        content: "Alternative approach: Count distinct items the entity has and compare to total items that should be had.",
        example: `SELECT c.IdCompagnie, c.nom
FROM Compagnie c
JOIN Achat ac ON c.IdCompagnie = ac.IdCompagnie
JOIN Avion a ON ac.IdAvion = a.IdAvion
JOIN Constructeur con ON a.IdConstructeur = con.IdConstructeur
WHERE con.nom = 'Boeing'
GROUP BY c.IdCompagnie, c.nom
HAVING COUNT(DISTINCT a.IdAvion) = (
    SELECT COUNT(*) FROM Avion WHERE IdConstructeur = 
    (SELECT IdConstructeur FROM Constructeur WHERE nom = 'Boeing')
);`,
        explanation: "Count Boeing planes this company bought. Compare to total Boeing planes. If equal, they bought all of them. More intuitive but requires the count to be exact."
      },
      {
        title: "Division with Reference Entity",
        content: "Find entities with all items that ANOTHER entity has: 'Companies with all products bought by Company 3'.",
        example: `SELECT c.nom FROM Compagnie c
WHERE NOT EXISTS (
    SELECT 1 FROM Achat ref WHERE ref.IdCompagnie = 3
    AND NOT EXISTS (
        SELECT 1 FROM Achat ac
        WHERE ac.IdCompagnie = c.IdCompagnie
        AND ac.IdAvion = ref.IdAvion
    )
) AND c.IdCompagnie != 3;`,
        explanation: "For each aircraft bought by Company 3, check if current company also bought it. 'No aircraft of Company 3 is missing from this company's purchases.'"
      }
    ]
  },
  "8": {
    title: "Complex Query Patterns",
    description: "Combine all concepts for advanced data analysis",
    queryIds: [2, 6, 8, 12, 19],
    concepts: [
      {
        title: "Multi-Condition Patterns",
        content: "Real-world queries often combine multiple patterns: JOINs, subqueries, EXISTS, and aggregations.",
        example: `-- Companies that bought ONLY Airbus (no other manufacturer)
SELECT c.nom FROM Compagnie c
WHERE c.IdCompagnie IN (SELECT IdCompagnie FROM Achat)  -- Has purchases
AND NOT EXISTS (  -- No non-Airbus purchases
    SELECT 1 FROM Achat ac
    JOIN Avion a ON ac.IdAvion = a.IdAvion
    JOIN Constructeur con ON a.IdConstructeur = con.IdConstructeur
    WHERE ac.IdCompagnie = c.IdCompagnie AND con.nom != 'Airbus'
);`,
        explanation: "Combines IN (has made purchases) with NOT EXISTS (no other manufacturer). Think through each condition separately, then combine."
      },
      {
        title: "Choosing the Right Approach",
        content: "Many queries can be solved multiple ways. Choose based on clarity, performance, and what the data looks like.",
        example: `-- NOT EXISTS approach (handles NULLs, often faster)
WHERE NOT EXISTS (SELECT 1 FROM Table WHERE condition)

-- NOT IN approach (simpler to read, risky with NULLs)
WHERE col NOT IN (SELECT col FROM Table)

-- LEFT JOIN approach (visual, good for debugging)
LEFT JOIN Table t ON condition WHERE t.col IS NULL`,
        explanation: "NOT EXISTS is safest for 'does not exist' patterns. NOT IN is readable but NULL-sensitive. LEFT JOIN + IS NULL is visual and easy to debug."
      },
      {
        title: "Query Building Strategy",
        content: "For complex queries: (1) Identify what you need. (2) Find the path through tables. (3) Add conditions. (4) Test incrementally.",
        example: `-- Step 1: What tables do I need?
-- Pilote, Piloter, Avion, Constructeur

-- Step 2: How do they connect?
FROM Pilote pi
JOIN Piloter p ON pi.IdPilote = p.IdPilote
JOIN Avion a ON p.IdAvion = a.IdAvion
JOIN Constructeur c ON a.IdConstructeur = c.IdConstructeur

-- Step 3: What conditions?
WHERE c.nom = 'Boeing' AND pi.nationalité = 'Algérienne'`,
        explanation: "Don't write the whole query at once. Build it step by step, testing each part. Add JOINs one at a time, verify data, then add WHERE conditions."
      },
      {
        title: "Debugging Complex Queries",
        content: "When a query doesn't work: simplify, check row counts at each step, verify JOIN conditions match the schema.",
        example: `-- Check your JOINs by counting
SELECT COUNT(*) FROM Avion;  -- 50 aircraft
SELECT COUNT(*) FROM Avion a JOIN Piloter p ON a.IdAvion = p.IdAvion;  -- Should be >= 50 if some have pilots

-- If count drops unexpectedly, check your ON conditions`,
        explanation: "A common error is wrong JOIN columns. If you expect 50 aircraft but get 5 after a JOIN, the ON condition might be wrong. Always verify with simple counts first."
      }
    ]
  }
}
