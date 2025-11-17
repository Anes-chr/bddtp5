export interface Query {
  id: number
  title: string
  difficulty: "easy" | "medium" | "hard"
  concept: string
  description: string
  sql: string
  explanation: string
  result?: string[]
}

export const queriesData: Query[] = [
  {
    id: 1,
    title: "Donner les noms et les salaires des footballeurs",
    difficulty: "easy",
    concept: "Projection",
    description: "This query demonstrates basic projection - selecting specific columns (Nom and Salaire) from the Footballeur table. Instead of showing all data (*), we choose only what we need.",
    sql: "SELECT Nom, Salaire FROM Footballeur;",
    explanation: "Simple SELECT statement that retrieves two columns: player names and their salaries. This is the foundation of SQL queries - asking for specific data. No filtering is applied, so ALL rows are returned.",
    result: ["Ahmed - 95000", "Brahim - 75000", "Karim - 82000", "Djilali - 88000", "Farid - 92000"]
  },
  {
    id: 2,
    title: "Donner les postes des footballeurs (sans duplicatas)",
    difficulty: "easy",
    concept: "DISTINCT",
    description: "Uses DISTINCT to retrieve unique positions only. If 5 players are 'Attaquant', DISTINCT shows it once. Essential for finding unique values in a column.",
    sql: "SELECT DISTINCT Poste FROM Footballeur;",
    explanation: "DISTINCT removes duplicate values. Without it, you'd see 'Attaquant' repeated for every attaquant. With DISTINCT, each position appears only once, giving you a clean list of all position types in the database.",
    result: ["Attaquant", "Defenseur", "Defenseur axial", "Ailier gauche", "Ailier droit", "Gardien de but"]
  },
  {
    id: 3,
    title: "Dates de début de contrat des défenseurs axiaux",
    difficulty: "easy",
    concept: "WHERE - Restriction",
    description: "Introduces the WHERE clause for filtering. Only shows contract start dates for players whose position is 'Defenseur axial'. This is restriction - limiting rows based on a condition.",
    sql: "SELECT DateDeb FROM Footballeur WHERE Poste = 'Defenseur axial';",
    explanation: "WHERE filters rows before displaying them. Think of it as a filter: 'Show me dates, BUT ONLY for defenseurs axiaux.' Every row is checked - if Poste = 'Defenseur axial', include it. Otherwise, skip it.",
    result: ["2015-07-10", "2014-11-25", "2016-05-22", "2012-03-28", "NULL"]
  },
  {
    id: 4,
    title: "Produit cartésien entre footballeurs et équipes",
    difficulty: "medium",
    concept: "Cartesian Product",
    description: "Creates a Cartesian product by listing two tables without a join condition. Every footballer is paired with every team. With 20 players and 6 teams, you get 120 rows!",
    sql: "SELECT * FROM Footballeur, Equipe;",
    explanation: "Without a JOIN condition, SQL creates ALL possible combinations. This is usually not what you want - it pairs each player with EVERY team, even teams they don't play for. It's important to understand this to appreciate why JOINs matter.",
    result: ["120 rows total", "Every player paired with every team"]
  },
  {
    id: 5,
    title: "Noms des footballeurs et noms de leurs équipes",
    difficulty: "medium",
    concept: "INNER JOIN",
    description: "Demonstrates INNER JOIN - the correct way to combine related data from two tables. Shows each player with their ACTUAL team by matching IdEqui values.",
    sql: "SELECT Footballeur.Nom, Equipe.Nom FROM Footballeur INNER JOIN Equipe ON Footballeur.IdEqui = Equipe.IdEqui;",
    explanation: "INNER JOIN connects rows from both tables when they share a common value (IdEqui). ON specifies the matching condition. Unlike Cartesian product (120 rows), this shows 20 rows - each player with their one team.",
    result: ["Ahmed - MC Alger", "Brahim - MC Alger", "Karim - USM Alger", "Djilali - USM Alger"]
  },
  {
    id: 6,
    title: "Numéros des footballeurs qui évoluent à Alger",
    difficulty: "medium",
    concept: "JOIN + WHERE",
    description: "Combines JOIN and WHERE to answer: 'Which players are in Alger?' First joins tables to access city information, then filters to Alger only.",
    sql: "SELECT Footballeur.IdFoot FROM Footballeur INNER JOIN Equipe ON Footballeur.IdEqui = Equipe.IdEqui WHERE Equipe.Ville = 'Alger';",
    explanation: "Two-step process: (1) JOIN connects players to their teams, giving us access to Ville column. (2) WHERE filters to only teams where Ville = 'Alger'. Result: IDs of players in Alger teams.",
    result: ["1", "2", "4", "5", "9", "14", "15", "16"]
  },
  {
    id: 7,
    title: "Footballeurs équipes 2 et 5, salaire > 80000 (3 solutions)",
    difficulty: "hard",
    concept: "Multiple Solutions",
    description: "Demonstrates SQL flexibility by solving one problem three different ways. All produce identical results - players from teams 2 or 5 earning over 80,000.",
    sql: `-- Solution 1: OR and AND
SELECT Nom FROM Footballeur WHERE (IdEqui = 2 OR IdEqui = 5) AND Salaire > 80000;

-- Solution 2: IN (cleanest!)
SELECT Nom FROM Footballeur WHERE IdEqui IN (2, 5) AND Salaire > 80000;

-- Solution 3: UNION
SELECT Nom FROM Footballeur WHERE IdEqui = 2 AND Salaire > 80000
UNION
SELECT Nom FROM Footballeur WHERE IdEqui = 5 AND Salaire > 80000;`,
    explanation: "Three approaches: (1) OR combines conditions. (2) IN is cleaner syntax. (3) UNION combines separate queries. All give the same answer!",
    result: ["Djilali", "Farid", "Nabil", "Rabah", "Abderrahmane"]
  },
  {
    id: 8,
    title: "Footballeurs qui jouent à différents postes",
    difficulty: "medium",
    concept: "Self-join",
    description: "Finds players with same name but different positions using a self-join.",
    sql: "SELECT F1.Nom FROM Footballeur F1 INNER JOIN Footballeur F2 ON F1.Nom = F2.Nom WHERE F1.Poste <> F2.Poste;",
    explanation: "Self-join compares table with itself. F1 and F2 are aliases for the same table. Looking for same names but different positions.",
    result: ["(Empty - no players with same name and different positions)"]
  },
  {
    id: 9,
    title: "Footballeurs dont la date de début est spécifiée",
    difficulty: "easy",
    concept: "NULL handling",
    description: "Shows players who HAVE a contract start date using IS NOT NULL.",
    sql: "SELECT Nom FROM Footballeur WHERE DateDeb IS NOT NULL;",
    explanation: "NULL means 'no value'. IS NOT NULL checks if a value exists. Don't use = NULL (doesn't work)! Use IS NULL or IS NOT NULL.",
    result: ["Ahmed", "Brahim", "Karim", "Djilali", "... (19 players total)"]
  },
  {
    id: 10,
    title: "Concaténation nom et poste",
    difficulty: "easy",
    concept: "CONCAT + Aliases",
    description: "Combines name and position into one column using CONCAT function.",
    sql: "SELECT CONCAT(Nom, ' ', Poste) AS 'Nom & Poste' FROM Footballeur;",
    explanation: "CONCAT joins strings. The space ' ' separates name and position. AS gives the result column a friendly name.",
    result: ["Ahmed Attaquant", "Brahim Defenseur", "Karim Defenseur axial"]
  },
  {
    id: 11,
    title: "Nombre de footballeurs",
    difficulty: "easy",
    concept: "COUNT",
    description: "Counts total number of rows using COUNT(*) aggregate function.",
    sql: "SELECT COUNT(*) AS 'Nombre de footballeurs' FROM Footballeur;",
    explanation: "COUNT(*) counts ALL rows in the table. Returns a single number. Most basic aggregate function.",
    result: ["20"]
  },
  {
    id: 12,
    title: "Footballeurs recrutés entre 2013 et 2017",
    difficulty: "easy",
    concept: "COUNT + BETWEEN",
    description: "Counts players hired within a specific date range using BETWEEN.",
    sql: "SELECT COUNT(*) FROM Footballeur WHERE DateDeb BETWEEN '2013-01-01' AND '2017-12-31';",
    explanation: "BETWEEN is inclusive (includes both dates). Combines filtering (WHERE) with counting (COUNT).",
    result: ["15"]
  },
  {
    id: 13,
    title: "Nombre d'attaquants à SBA",
    difficulty: "medium",
    concept: "JOIN + COUNT + Multiple conditions",
    description: "Counts attackers in SBA using JOIN and multiple WHERE conditions.",
    sql: "SELECT COUNT(*) FROM Footballeur INNER JOIN Equipe ON Footballeur.IdEqui = Equipe.IdEqui WHERE Footballeur.Poste = 'Attaquant' AND Equipe.Ville = 'SBA';",
    explanation: "Combines JOIN to access team city, WHERE with two conditions (position AND city), and COUNT to get the total.",
    result: ["1"]
  },
  {
    id: 14,
    title: "Nombre de postes dans USM Alger",
    difficulty: "medium",
    concept: "COUNT DISTINCT",
    description: "Counts unique positions in USM Alger team.",
    sql: "SELECT COUNT(DISTINCT Footballeur.Poste) FROM Footballeur INNER JOIN Equipe ON Footballeur.IdEqui = Equipe.IdEqui WHERE Equipe.Nom = 'USM Alger';",
    explanation: "COUNT(DISTINCT) counts unique values only. If team has 3 attackers, counts 'Attaquant' once, not three times.",
    result: ["5 different positions"]
  },
  {
    id: 15,
    title: "Footballeurs dont le nom commence par 'a'",
    difficulty: "easy",
    concept: "LIKE with wildcard",
    description: "Pattern matching for names starting with 'a' using LIKE and %.",
    sql: "SELECT Nom FROM Footballeur WHERE Nom LIKE 'a%';",
    explanation: "LIKE 'a%' means 'starts with a'. The % wildcard matches any characters after 'a'. Case-sensitivity depends on database settings.",
    result: ["Ahmed", "Abdallah", "Abdelkader", "Abderrahmane", "Abdelaziz"]
  },
  {
    id: 16,
    title: "Footballeurs dont le nom contient 'abd'",
    difficulty: "easy",
    concept: "LIKE + COUNT",
    description: "Counts players with 'abd' anywhere in their name.",
    sql: "SELECT COUNT(*) FROM Footballeur WHERE Nom LIKE '%abd%';",
    explanation: "%abd% matches 'abd' anywhere: beginning, middle, or end of the name.",
    result: ["4"]
  },
  {
    id: 17,
    title: "Nombre de noms contenant 'abd'",
    difficulty: "easy",
    concept: "COUNT DISTINCT",
    description: "Counts unique names containing 'abd' using COUNT DISTINCT.",
    sql: "SELECT COUNT(DISTINCT Nom) FROM Footballeur WHERE Nom LIKE '%abd%';",
    explanation: "Difference: Query 16 counts players (rows), this counts unique names. If two players named 'Abdallah', query 16 = 2, this query = 1.",
    result: ["4 unique names"]
  },
  {
    id: 18,
    title: "Différence entre salaire max et min",
    difficulty: "medium",
    concept: "MAX, MIN, Arithmetic",
    description: "Calculates salary range by subtracting minimum from maximum.",
    sql: "SELECT (MAX(Salaire) - MIN(Salaire)) AS 'Difference' FROM Footballeur;",
    explanation: "MAX finds highest (98000), MIN finds lowest (72000). Subtract: 98000 - 72000 = 26000. Shows salary spread.",
    result: ["26000"]
  },
  {
    id: 19,
    title: "Footballeurs dans équipe avec ailier gauche",
    difficulty: "hard",
    concept: "Self-join",
    description: "Shows all players whose team has at least one ailier gauche using self-join.",
    sql: "SELECT DISTINCT F1.Nom FROM Footballeur F1 INNER JOIN Footballeur F2 ON F1.IdEqui = F2.IdEqui WHERE F2.Poste = 'Ailier gauche';",
    explanation: "Self-join logic: F1 = all players, F2 = only ailier gauche. Join on same team. DISTINCT prevents duplicates if team has multiple ailier gauche.",
    result: ["All players from teams 1, 2, 3, 5"]
  },
  {
    id: 20,
    title: "Footballeurs gagnant plus qu'au moins un défenseur",
    difficulty: "hard",
    concept: "Subquery with ANY",
    description: "Shows players earning more than at least ONE defender using subquery with ANY.",
    sql: "SELECT Nom, Salaire FROM Footballeur WHERE Salaire > ANY (SELECT Salaire FROM Footballeur WHERE Poste = 'Defenseur');",
    explanation: "Subquery returns defender salaries [72000, 75000, 76000, 77000]. > ANY means greater than at least one. If your salary > 72000, you qualify!",
    result: ["Most players (earning more than lowest defender)"]
  },
  {
    id: 21,
    title: "Footballeurs gagnant plus que TOUS les défenseurs",
    difficulty: "hard",
    concept: "Subquery with ALL",
    description: "Shows players earning more than ALL defenders using subquery with ALL.",
    sql: "SELECT Nom, Salaire FROM Footballeur WHERE Salaire > ALL (SELECT Salaire FROM Footballeur WHERE Poste = 'Defenseur');",
    explanation: "> ALL is stricter than > ANY. Must be greater than the MAXIMUM defender salary. If max defender = 77000, you need > 77000.",
    result: ["Players earning > 77000"]
  },
  {
    id: 22,
    title: "Footballeurs de la même équipe qu'Ahmed",
    difficulty: "medium",
    concept: "Subquery",
    description: "Finds Ahmed's teammates using a subquery to get his team ID.",
    sql: "SELECT Nom FROM Footballeur WHERE IdEqui = (SELECT IdEqui FROM Footballeur WHERE Nom = 'Ahmed') AND Nom <> 'Ahmed';",
    explanation: "Step 1: Subquery finds Ahmed's team (returns 1). Step 2: Find all players in team 1. Step 3: Exclude Ahmed himself with <> 'Ahmed'.",
    result: ["Brahim", "Said", "Tahar", "Abdelaziz"]
  },
  {
    id: 23,
    title: "Footballeurs embauchés avant un défenseur",
    difficulty: "hard",
    concept: "Self-join with date comparison",
    description: "Shows players hired before their team's defenders with defender details.",
    sql: "SELECT F1.Nom, F1.DateDeb, F2.Nom AS 'Nom Defenseur', F2.DateDeb AS 'DateDeb Defenseur' FROM Footballeur F1 INNER JOIN Footballeur F2 ON F1.IdEqui = F2.IdEqui WHERE F2.Poste = 'Defenseur' AND F1.DateDeb < F2.DateDeb;",
    explanation: "Self-join: F1 = any player, F2 = only defenders. Same team (F1.IdEqui = F2.IdEqui). F1 hired before F2 (F1.DateDeb < F2.DateDeb).",
    result: ["Various player-defender pairs"]
  },
  {
    id: 24,
    title: "Équipes sans ailier droit",
    difficulty: "medium",
    concept: "NOT IN subquery",
    description: "Shows teams that don't have any ailier droit players.",
    sql: "SELECT Equipe.Nom FROM Equipe WHERE IdEqui NOT IN (SELECT IdEqui FROM Footballeur WHERE Poste = 'Ailier droit');",
    explanation: "Subquery returns team IDs that HAVE ailier droit [5]. NOT IN shows teams NOT in that list [1,2,3,4,6].",
    result: ["MC Alger", "USM Alger", "JS Kabylie", "CR Belouizdad", "ES Setif"]
  },
  {
    id: 25,
    title: "JS Kabylie recrutés même jour que MC Alger",
    difficulty: "hard",
    concept: "IN with subquery",
    description: "Finds JS Kabylie players hired on same dates as MC Alger players.",
    sql: "SELECT F1.Nom FROM Footballeur F1 INNER JOIN Equipe E1 ON F1.IdEqui = E1.IdEqui WHERE E1.Nom = 'JS Kabylie' AND F1.DateDeb IN (SELECT F2.DateDeb FROM Footballeur F2 INNER JOIN Equipe E2 ON F2.IdEqui = E2.IdEqui WHERE E2.Nom = 'MC Alger');",
    explanation: "Subquery gets all MC Alger hire dates. Main query checks if JS Kabylie players have matching dates using IN.",
    result: ["(Depends on matching dates in data)"]
  },
  {
    id: 26,
    title: "Footballeurs recrutés avant tous ceux de l'équipe 3",
    difficulty: "hard",
    concept: "Comparison with ALL",
    description: "Shows players hired before ALL team 3 players (before their earliest hire).",
    sql: "SELECT Nom FROM Footballeur WHERE DateDeb < ALL (SELECT DateDeb FROM Footballeur WHERE IdEqui = 3 AND DateDeb IS NOT NULL);",
    explanation: "< ALL means earlier than ALL dates. If team 3's earliest hire is 2014-11-25, you need hire date before that.",
    result: ["Ahmed", "Said"]
  },
  {
    id: 27,
    title: "Footballeurs avec même poste qu'Ahmed",
    difficulty: "medium",
    concept: "Subquery",
    description: "Finds all players with the same position as Ahmed.",
    sql: "SELECT Nom FROM Footballeur WHERE Poste = (SELECT Poste FROM Footballeur WHERE Nom = 'Ahmed') AND Nom <> 'Ahmed';",
    explanation: "Subquery finds Ahmed's position ('Attaquant'). Main query finds all Attaquants except Ahmed himself.",
    result: ["Farid", "Laid", "Rabah", "Abdallah"]
  },
  {
    id: 28,
    title: "Footballeurs triés par poste et salaire",
    difficulty: "medium",
    concept: "Multi-level ORDER BY",
    description: "Sorts by position alphabetically, then by salary descending within each position.",
    sql: "SELECT Nom, Poste, Salaire FROM Footballeur ORDER BY Poste ASC, Salaire DESC;",
    explanation: "Primary sort: Poste (A→Z). Secondary sort: Salaire (high→low) within each poste group. Creates organized, readable output.",
    result: ["Sorted by position, then salary within each position"]
  },
  {
    id: 29,
    title: "Salaire moyen des footballeurs",
    difficulty: "easy",
    concept: "AVG",
    description: "Calculates average salary across all players.",
    sql: "SELECT AVG(Salaire) AS 'Salaire moyen' FROM Footballeur;",
    explanation: "AVG adds all salaries and divides by count. Formula: (Sum of salaries) / (Number of players). Result shows typical salary.",
    result: ["83950.00"]
  },
  {
    id: 30,
    title: "Nombre de footballeurs USM Bel Abbes",
    difficulty: "medium",
    concept: "JOIN + COUNT",
    description: "Counts players in USM Bel Abbes team using JOIN.",
    sql: "SELECT COUNT(*) FROM Footballeur INNER JOIN Equipe ON Footballeur.IdEqui = Equipe.IdEqui WHERE Equipe.Nom = 'USM Bel Abbes';",
    explanation: "JOIN to access team name, WHERE to filter specific team, COUNT to get total players.",
    result: ["4 players"]
  },
  {
    id: 31,
    title: "Équipes et leur salaire maximum",
    difficulty: "medium",
    concept: "GROUP BY with MAX",
    description: "Shows highest salary for each team using GROUP BY.",
    sql: "SELECT IdEqui, MAX(Salaire) AS 'Salaire maximum' FROM Footballeur GROUP BY IdEqui;",
    explanation: "GROUP BY splits players into team groups. MAX applied to each group separately. One result row per team.",
    result: ["Team 1: 95000", "Team 2: 92000", "Team 3: 91000", "Team 4: 98000", "Team 5: 90000"]
  },
  {
    id: 32,
    title: "Footballeurs avec salaire max de leur équipe",
    difficulty: "hard",
    concept: "Correlated subquery",
    description: "Shows top earner(s) from each team using correlated subquery.",
    sql: "SELECT F.Nom, F.IdEqui, F.Salaire FROM Footballeur F WHERE F.Salaire = (SELECT MAX(F2.Salaire) FROM Footballeur F2 WHERE F2.IdEqui = F.IdEqui);",
    explanation: "Correlated subquery: For EACH player F, subquery finds their team's max salary. If player's salary equals team max, include them.",
    result: ["Ahmed (95000)", "Farid (92000)", "Abdallah (91000)", "Laid (98000)", "Rabah (90000)"]
  },
  {
    id: 33,
    title: "Postes et leur salaire moyen",
    difficulty: "medium",
    concept: "GROUP BY with AVG",
    description: "Calculates average salary for each position.",
    sql: "SELECT Poste, AVG(Salaire) AS 'Salaire moyen' FROM Footballeur GROUP BY Poste;",
    explanation: "GROUP BY position creates groups. AVG calculates average within each group. Shows which positions earn more.",
    result: ["Attaquant: 93250", "Defenseur: 75000", "Ailier gauche: 85750", "..."]
  },
  {
    id: 34,
    title: "Salaire moyen le plus bas par poste",
    difficulty: "hard",
    concept: "Nested subquery",
    description: "Finds the lowest average salary among all positions.",
    sql: "SELECT MIN(SalaireMoyen) FROM (SELECT AVG(Salaire) AS SalaireMoyen FROM Footballeur GROUP BY Poste) AS MoyennesParPoste;",
    explanation: "Inner query: Calculate AVG per position. Outer query: Find MIN of those averages. Two-step aggregation.",
    result: ["74000 (Gardien de but)"]
  },
  {
    id: 35,
    title: "Postes ayant le salaire moyen le plus bas",
    difficulty: "hard",
    concept: "HAVING with nested subquery",
    description: "Shows which position(s) have the lowest average salary.",
    sql: "SELECT Poste, AVG(Salaire) AS 'Salaire moyen' FROM Footballeur GROUP BY Poste HAVING AVG(Salaire) = (SELECT MIN(SalaireMoyen) FROM (SELECT AVG(Salaire) AS SalaireMoyen FROM Footballeur GROUP BY Poste) AS MoyennesParPoste);",
    explanation: "Like query 34 but also shows WHICH position. HAVING filters groups to only those matching the minimum average.",
    result: ["Gardien de but - 74000.00"]
  },
]
