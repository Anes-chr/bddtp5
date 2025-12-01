# TP5 Complete Transformation Guide
## Transform TP4 SQL Learning Platform into TP5 (Aviation Database)

---

## 🎯 OBJECTIVE

Transform the existing TP4 (Football/Soccer Database) SQL learning webapp into a complete TP5 (Aviation Database) webapp. The TP5 focuses on advanced SQL concepts including **Jointures, Regroupement, Requêtes Imbriquées, Division Relationnelle, Vues, and Transactions**.

---

## 📊 TP5 DATABASE SCHEMA

### Tables Overview

```sql
-- AVION: Aircraft information
Avion (IdAvion, nom, catégorie, NbPlaces, DateConstruction, #IdConstructeur)

-- CONSTRUCTEUR: Aircraft manufacturers  
Constructeur (IdConstructeur, nom, pays)

-- PILOTE: Pilot information
Pilote (IdPilote, nom, prénom, nationalité)

-- PILOTER: Which pilots fly which aircraft (N:N relationship)
Piloter (#IdAvion, #IdPilote)

-- AÉROPORT: Airport information
Aéroport (IdAer, nom, ville)

-- DESSERT: Which aircraft serve which airports
Dessert (#IdAer, #IdAvion, NB_Fois_Semaine)

-- COMPAGNIE: Airline companies
Compagnie (IdCompagnie, nom, contact)

-- ACHAT: Purchase history of aircraft by companies
Achat (IdAchat, #IdAvion, #IdCompagnie, DateAchat, Quantité)
```

### Relationships Diagram
```
Constructeur ─────────┐
                      │ 1:N
                      ▼
                   Avion ◄──────── Piloter ────────► Pilote
                      │               │
                      │               │
                      ▼               │
                   Dessert ──────► Aéroport
                      │
                      │
                      ▼
                   Achat ◄─────────► Compagnie
```

---

## 📝 COMPLETE TP5 QUESTIONS & SOLUTIONS

### Question 1: Boeing 777 piloted by Algerian pilots before 2010
**Difficulty:** Medium  
**Concepts:** JOIN, WHERE, LIKE, YEAR()

```sql
SELECT DISTINCT a.IdAvion, a.nom
FROM Avion a
JOIN Piloter p ON a.IdAvion = p.IdAvion
JOIN Pilote pi ON p.IdPilote = pi.IdPilote
WHERE a.nom LIKE '%Boeing 777%'
AND pi.nationalité = 'Algérienne'
AND YEAR(a.DateConstruction) < 2010;
```

**Explanation:** This query chains three tables (Avion → Piloter → Pilote) to find Boeing 777 aircraft that are flown by Algerian pilots and were built before 2010. DISTINCT prevents duplicates when an aircraft has multiple Algerian pilots.

---

### Question 2: Aircraft piloted ONLY by Algerian pilots
**Difficulty:** Hard  
**Concepts:** NOT EXISTS, EXISTS, Exclusive filtering

```sql
SELECT a.IdAvion, a.nom
FROM Avion a
WHERE NOT EXISTS (
    SELECT 1
    FROM Piloter p
    JOIN Pilote pi ON p.IdPilote = pi.IdPilote
    WHERE p.IdAvion = a.IdAvion
    AND pi.nationalité != 'Algérienne'
)
AND EXISTS (
    SELECT 1
    FROM Piloter p
    JOIN Pilote pi ON p.IdPilote = pi.IdPilote
    WHERE p.IdAvion = a.IdAvion
    AND pi.nationalité = 'Algérienne'
);
```

**Explanation:** Two conditions must be met: (1) NO non-Algerian pilot flies this aircraft (NOT EXISTS), and (2) AT LEAST ONE Algerian pilot flies it (EXISTS). This ensures exclusivity.

---

### Question 3: Companies that haven't purchased any Boeing aircraft
**Difficulty:** Medium  
**Concepts:** NOT EXISTS, NOT IN

**Solution 1 - NOT EXISTS:**
```sql
SELECT c.IdCompagnie, c.nom
FROM Compagnie c
WHERE NOT EXISTS (
    SELECT 1
    FROM Achat ac
    JOIN Avion a ON ac.IdAvion = a.IdAvion
    WHERE ac.IdCompagnie = c.IdCompagnie
    AND a.nom LIKE '%Boeing%'
);
```

**Solution 2 - NOT IN:**
```sql
SELECT c.IdCompagnie, c.nom
FROM Compagnie c
WHERE c.IdCompagnie NOT IN (
    SELECT DISTINCT ac.IdCompagnie
    FROM Achat ac
    JOIN Avion a ON ac.IdAvion = a.IdAvion
    WHERE a.nom LIKE '%Boeing%'
);
```

**Explanation:** Both solutions exclude companies that have Boeing in their purchase history. NOT EXISTS is generally more performant and handles NULLs better.

---

### Question 4: Pilots who flew Boeing OR Airbus aircraft
**Difficulty:** Medium  
**Concepts:** Multiple JOINs, OR condition

```sql
SELECT DISTINCT pi.IdPilote, pi.nom, pi.prénom
FROM Pilote pi
JOIN Piloter p ON pi.IdPilote = p.IdPilote
JOIN Avion a ON p.IdAvion = a.IdAvion
JOIN Constructeur c ON a.IdConstructeur = c.IdConstructeur
WHERE c.nom = 'Boeing' OR c.nom = 'Airbus';
```

**Explanation:** Chain of joins from Pilote → Piloter → Avion → Constructeur to access the manufacturer name. OR means the pilot qualifies if they flew either manufacturer's aircraft.

---

### Question 5: Pilots who flew BOTH Boeing AND Airbus
**Difficulty:** Hard  
**Concepts:** EXISTS with AND, Conjunctive conditions

```sql
SELECT DISTINCT pi.IdPilote, pi.nom, pi.prénom
FROM Pilote pi
WHERE EXISTS (
    SELECT 1
    FROM Piloter p
    JOIN Avion a ON p.IdAvion = a.IdAvion
    JOIN Constructeur c ON a.IdConstructeur = c.IdConstructeur
    WHERE p.IdPilote = pi.IdPilote
    AND c.nom = 'Boeing'
)
AND EXISTS (
    SELECT 1
    FROM Piloter p
    JOIN Avion a ON p.IdAvion = a.IdAvion
    JOIN Constructeur c ON a.IdConstructeur = c.IdConstructeur
    WHERE p.IdPilote = pi.IdPilote
    AND c.nom = 'Airbus'
);
```

**Explanation:** Two separate EXISTS subqueries joined by AND. The pilot must have flown at least one Boeing AND at least one Airbus to qualify.

---

### Question 6: The most purchased aircraft by Air-Algérie
**Difficulty:** Medium  
**Concepts:** GROUP BY, SUM, ORDER BY, TOP

```sql
SELECT TOP 1 a.IdAvion, a.nom, SUM(ac.Quantité) as total_acheté
FROM Achat ac
JOIN Avion a ON ac.IdAvion = a.IdAvion
JOIN Compagnie c ON ac.IdCompagnie = c.IdCompagnie
WHERE c.nom = 'Air-Algérie'
GROUP BY a.IdAvion, a.nom
ORDER BY total_acheté DESC;
```

**Explanation:** Filter purchases by Air-Algérie, group by aircraft, sum quantities, and take the top result after sorting descending.

---

### Question 7: Companies that purchased ONLY Airbus aircraft
**Difficulty:** Hard  
**Concepts:** IN, NOT EXISTS, Exclusive constraint

```sql
SELECT c.IdCompagnie, c.nom
FROM Compagnie c
WHERE c.IdCompagnie IN (
    SELECT DISTINCT ac.IdCompagnie
    FROM Achat ac
    JOIN Avion a ON ac.IdAvion = a.IdAvion
)
AND NOT EXISTS (
    SELECT 1
    FROM Achat ac
    JOIN Avion a ON ac.IdAvion = a.IdAvion
    JOIN Constructeur con ON a.IdConstructeur = con.IdConstructeur
    WHERE ac.IdCompagnie = c.IdCompagnie
    AND con.nom != 'Airbus'
);
```

**Explanation:** Company must have made purchases (IN subquery) AND must not have purchased from any non-Airbus manufacturer (NOT EXISTS).

---

### Question 8: Average purchase quantity by aircraft category
**Difficulty:** Easy  
**Concepts:** GROUP BY, AVG, LEFT JOIN

```sql
SELECT a.catégorie, AVG(CAST(ac.Quantité as FLOAT)) as prix_moyen
FROM Avion a
LEFT JOIN Achat ac ON a.IdAvion = ac.IdAvion
GROUP BY a.catégorie;
```

**Explanation:** LEFT JOIN ensures categories with no purchases are included. AVG calculates the mean purchase quantity per category.

---

### Question 9: Airports served by ≥10 Boeing 767 flights per week
**Difficulty:** Medium  
**Concepts:** JOIN, WHERE, Specific model filtering

```sql
SELECT DISTINCT aer.IdAer, aer.nom, aer.ville
FROM Aéroport aer
JOIN Dessert d ON aer.IdAer = d.IdAer
JOIN Avion a ON d.IdAvion = a.IdAvion
WHERE a.nom LIKE '%Boeing 767%'
AND d.NB_Fois_Semaine >= 10;
```

**Explanation:** Filter specifically for Boeing 767 aircraft and check the weekly frequency threshold.

---

### Question 10: Airports served by ≥10 total Boeing flights per week
**Difficulty:** Medium  
**Concepts:** GROUP BY, SUM, HAVING

```sql
SELECT aer.IdAer, aer.nom, aer.ville, SUM(d.NB_Fois_Semaine) as total_par_semaine
FROM Aéroport aer
JOIN Dessert d ON aer.IdAer = d.IdAer
JOIN Avion a ON d.IdAvion = a.IdAvion
WHERE a.nom LIKE '%Boeing%'
GROUP BY aer.IdAer, aer.nom, aer.ville
HAVING SUM(d.NB_Fois_Semaine) >= 10;
```

**Explanation:** Unlike Q9, this sums ALL Boeing flights (any model) per airport and uses HAVING to filter groups.

---

### Question 11: Companies purchasing above-average quantity for an aircraft
**Difficulty:** Hard  
**Concepts:** Correlated subquery, AVG comparison

```sql
SELECT c.nom, a.nom, ac.Quantité
FROM Achat ac
JOIN Compagnie c ON ac.IdCompagnie = c.IdCompagnie
JOIN Avion a ON ac.IdAvion = a.IdAvion
WHERE ac.Quantité > (
    SELECT AVG(CAST(ac2.Quantité as FLOAT))
    FROM Achat ac2
    WHERE ac2.IdAvion = ac.IdAvion
);
```

**Explanation:** Correlated subquery calculates the average quantity for EACH specific aircraft, then compares the current purchase against that average.

---

### Question 12: Total sales per manufacturer
**Difficulty:** Easy  
**Concepts:** GROUP BY, SUM, LEFT JOIN chain

```sql
SELECT con.IdConstructeur, con.nom, SUM(ac.Quantité) as total_ventes
FROM Constructeur con
LEFT JOIN Avion a ON con.IdConstructeur = a.IdConstructeur
LEFT JOIN Achat ac ON a.IdAvion = ac.IdAvion
GROUP BY con.IdConstructeur, con.nom;
```

**Explanation:** LEFT JOINs ensure manufacturers with no aircraft or no sales are still included with NULL/0 totals.

---

### Question 13: Companies that purchased >5 different aircraft models
**Difficulty:** Medium  
**Concepts:** COUNT DISTINCT, HAVING, Multiple aggregations

```sql
SELECT c.IdCompagnie, c.nom, COUNT(DISTINCT ac.IdAvion) as nombre_avions, SUM(ac.Quantité) as total_achats
FROM Compagnie c
JOIN Achat ac ON c.IdCompagnie = ac.IdCompagnie
GROUP BY c.IdCompagnie, c.nom
HAVING COUNT(DISTINCT ac.IdAvion) > 5;
```

**Explanation:** COUNT(DISTINCT IdAvion) counts unique aircraft models, HAVING filters groups with more than 5.

---

### Question 14: Companies that purchased ALL Boeing aircraft types
**Difficulty:** Hard  
**Concepts:** Relational Division, NOT EXISTS, GROUP BY comparison

**Solution 1 - NOT EXISTS (Division):**
```sql
SELECT c.IdCompagnie, c.nom
FROM Compagnie c
WHERE NOT EXISTS (
    SELECT 1
    FROM Avion a
    JOIN Constructeur con ON a.IdConstructeur = con.IdConstructeur
    WHERE con.nom = 'Boeing'
    AND NOT EXISTS (
        SELECT 1
        FROM Achat ac
        WHERE ac.IdCompagnie = c.IdCompagnie
        AND ac.IdAvion = a.IdAvion
    )
);
```

**Solution 2 - GROUP BY:**
```sql
SELECT c.IdCompagnie, c.nom
FROM Compagnie c
JOIN Achat ac ON c.IdCompagnie = ac.IdCompagnie
JOIN Avion a ON ac.IdAvion = a.IdAvion
JOIN Constructeur con ON a.IdConstructeur = con.IdConstructeur
WHERE con.nom = 'Boeing'
GROUP BY c.IdCompagnie, c.nom
HAVING COUNT(DISTINCT a.IdAvion) = (
    SELECT COUNT(DISTINCT IdAvion)
    FROM Avion
    WHERE IdConstructeur = (SELECT IdConstructeur FROM Constructeur WHERE nom = 'Boeing')
);
```

**Explanation:** Relational division - find entities that have ALL elements from a set. NOT EXISTS pattern: "There is no Boeing aircraft that this company hasn't purchased."

---

### Question 15: Aircraft that serve ALL airports
**Difficulty:** Hard  
**Concepts:** Relational Division

**Solution 1 - NOT EXISTS:**
```sql
SELECT a.IdAvion, a.nom
FROM Avion a
WHERE NOT EXISTS (
    SELECT 1
    FROM Aéroport aer
    WHERE NOT EXISTS (
        SELECT 1
        FROM Dessert d
        WHERE d.IdAvion = a.IdAvion
        AND d.IdAer = aer.IdAer
    )
);
```

**Solution 2 - GROUP BY:**
```sql
SELECT a.IdAvion, a.nom
FROM Avion a
JOIN Dessert d ON a.IdAvion = d.IdAvion
GROUP BY a.IdAvion, a.nom
HAVING COUNT(DISTINCT d.IdAer) = (SELECT COUNT(IdAer) FROM Aéroport);
```

**Explanation:** Same division pattern - find aircraft for which there is NO airport that they DON'T serve.

---

### Question 16: Companies that purchased all products bought by company #3
**Difficulty:** Hard  
**Concepts:** Relational Division with reference entity

```sql
SELECT c.IdCompagnie, c.nom
FROM Compagnie c
WHERE NOT EXISTS (
    SELECT 1
    FROM Achat ac1
    WHERE ac1.IdCompagnie = 3
    AND NOT EXISTS (
        SELECT 1
        FROM Achat ac2
        WHERE ac2.IdCompagnie = c.IdCompagnie
        AND ac2.IdAvion = ac1.IdAvion
    )
)
AND c.IdCompagnie != 3;
```

**Explanation:** For each aircraft purchased by company 3, check if the current company also purchased it. The company must have ALL aircraft that company 3 has.

---

## 📚 FILES TO MODIFY

### 1. `lib/queries-data.ts`
Replace all 35 TP4 queries with the 16 TP5 queries (plus additional variations for dual solutions = ~20 queries total).

**Structure per query:**
```typescript
{
  id: 1,
  title: "Boeing 777 pilotés par des pilotes algériens avant 2010",
  difficulty: "medium",
  concept: "JOIN + WHERE + LIKE",
  description: "Combine tables to find specific aircraft by model, pilot nationality, and construction date",
  sql: "SELECT DISTINCT a.IdAvion, a.nom...",
  explanation: "This query chains Avion → Piloter → Pilote...",
  result: ["Sample result rows"]
}
```

### 2. `lib/lessons-data.ts`
Create 8 lessons covering TP5 concepts:

1. **SQL Basics & Joins Review** - Basic SELECT, JOINs between multiple tables
2. **Advanced Filtering** - WHERE with LIKE, YEAR(), date comparisons
3. **Aggregate Functions** - COUNT, SUM, AVG with GROUP BY
4. **HAVING Clause** - Filtering aggregated groups
5. **Subqueries** - IN, NOT IN, scalar subqueries
6. **EXISTS & NOT EXISTS** - Existence checks, exclusive conditions
7. **Relational Division** - The "all" pattern with double NOT EXISTS
8. **Complex Queries** - Correlated subqueries, combining concepts

### 3. `lib/challenges-data.ts`
Create 8 challenges:

1. **Beginner** - Basic JOINs and simple filters (Q1, Q4, Q8)
2. **Filtering Master** - WHERE with patterns (Q3, Q9)
3. **Aggregate Expert** - GROUP BY, HAVING (Q6, Q10, Q12, Q13)
4. **Exclusive Conditions** - ONLY/uniquement patterns (Q2, Q7)
5. **Subquery Ninja** - Correlated subqueries (Q11)
6. **EXISTS Master** - EXISTS/NOT EXISTS (Q3, Q5)
7. **Division Expert** - Relational division (Q14, Q15)
8. **Ultimate Challenge** - Q16 and complex combinations

### 4. `lib/cheatsheet-data.ts`
Add/update categories:
- **Relational Division** - Double NOT EXISTS pattern
- **Correlated Subqueries** - References to outer query
- **YEAR() Function** - Date extraction
- **Multiple Solutions** - NOT EXISTS vs NOT IN vs GROUP BY

### 5. `lib/flashcards-data.ts`
Add 35 flashcards covering:
- Aviation schema relationships
- Division relationnelle concept
- EXISTS vs NOT EXISTS
- Correlated vs uncorrelated subqueries
- HAVING vs WHERE
- LEFT JOIN usage
- Aggregate function nuances

### 6. `app/schema/page.tsx`
Update schema visualization:
- 8 tables instead of 3
- Show relationships: Constructeur→Avion, Avion↔Pilote, Avion↔Aéroport, Avion↔Compagnie
- Add sample data for aviation context

### 7. `app/questions/page.tsx`
Update to show all 16 TP5 questions in French.

### 8. `app/page.tsx`
Update homepage:
- Title: "Master SQL - TP5 Complete Guide"
- Stats: 16 Queries, 8 Lessons, 8 Challenges
- Description: "Jointures, Regroupement, Requêtes Imbriquées, Division"

### 9. Global text replacements:
- "Footballeur" → "Avion" / "Pilote" / "Compagnie" (context-dependent)
- "Equipe" → "Constructeur" / "Aéroport"
- "TP4" → "TP5"
- Update all football-related terminology to aviation

---

## 🎨 CONTENT THEME CHANGES

| TP4 (Football) | TP5 (Aviation) |
|----------------|----------------|
| Footballeur | Avion, Pilote |
| Equipe | Constructeur, Compagnie |
| Poste | Catégorie (avion) |
| Salaire | Quantité, NbPlaces |
| Ville | Pays, Ville (aéroport) |
| Match context | Flight/service context |

---

## 🔧 TECHNICAL NOTES

1. **Difficulty Mapping:**
   - Q1, Q4, Q8, Q9, Q12: Easy/Medium
   - Q3, Q6, Q10, Q13: Medium
   - Q2, Q5, Q7, Q11, Q14, Q15, Q16: Hard

2. **Key Concepts by Question:**
   - NOT EXISTS: Q2, Q3, Q7, Q14, Q15, Q16
   - Division: Q14, Q15, Q16
   - Correlated subquery: Q11
   - GROUP BY + HAVING: Q10, Q13, Q14, Q15

3. **Unique Features:**
   - Multiple solutions for Q3, Q14, Q15 (show both approaches)
   - French question text preserved for authenticity
   - Aviation domain examples throughout

---

## ✅ VALIDATION CHECKLIST

- [ ] All 16 queries implemented and explained
- [ ] Schema page shows 8 tables with relationships
- [ ] Lessons cover all advanced concepts
- [ ] Challenges test all difficulty levels
- [ ] Cheatsheet includes division pattern
- [ ] Flashcards cover new concepts
- [ ] Homepage updated with TP5 branding
- [ ] Questions page shows French originals
- [ ] All football references removed
- [ ] Navigation and routing work correctly

---

## 📁 SAMPLE DATA SUGGESTIONS

### Constructeur
| IdConstructeur | nom | pays |
|----------------|-----|------|
| 1 | Boeing | USA |
| 2 | Airbus | France |
| 3 | Embraer | Brazil |

### Avion
| IdAvion | nom | catégorie | NbPlaces | DateConstruction | IdConstructeur |
|---------|-----|-----------|----------|------------------|----------------|
| 1 | Boeing 777 | Long-courrier | 350 | 2008-05-15 | 1 |
| 2 | Airbus A320 | Moyen-courrier | 180 | 2015-03-22 | 2 |
| 3 | Boeing 767 | Long-courrier | 290 | 2005-11-10 | 1 |

### Pilote
| IdPilote | nom | prénom | nationalité |
|----------|-----|--------|-------------|
| 1 | Benali | Ahmed | Algérienne |
| 2 | Dupont | Jean | Française |
| 3 | Smith | John | Américaine |

### Compagnie
| IdCompagnie | nom | contact |
|-------------|-----|---------|
| 1 | Air-Algérie | contact@airalgerie.dz |
| 2 | Air France | contact@airfrance.fr |
| 3 | Emirates | contact@emirates.ae |

---

## 🚀 EXECUTION ORDER

1. Copy TP4 project to new folder
2. Update `lib/queries-data.ts` with all TP5 queries
3. Update `lib/lessons-data.ts` with aviation lessons
4. Update `lib/challenges-data.ts` with new challenges
5. Update `lib/cheatsheet-data.ts` with division patterns
6. Update `lib/flashcards-data.ts` with new concepts
7. Update `app/schema/page.tsx` for aviation schema
8. Update `app/questions/page.tsx` with TP5 questions
9. Update `app/page.tsx` homepage
10. Global search/replace for remaining text
11. Test all pages and functionality
12. Verify all links and navigation

---

**END OF TRANSFORMATION GUIDE**
