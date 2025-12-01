# TP5 Transformation - Complete Prompt for AI Agent

## Mission
Transform the TP4 SQL learning webapp into a complete TP5 version covering **advanced SELECT queries, relational division, and complex query patterns** with the **Aviation Database Schema**.

---

## Source Project
**Location:** A Next.js webapp with:
- App Router (Next.js 16+)
- TypeScript
- Tailwind CSS v4
- Framer Motion animations
- shadcn/ui components

---

## Files Provided (in `/tp5-data/` folder)

| File | Description |
|------|-------------|
| `queries-data.ts` | 20 SQL queries covering joins, aggregates, exists, division |
| `lessons-data.ts` | 8 lessons with concepts and code examples |
| `challenges-data.ts` | 8 challenges with questions referencing query IDs |
| `schema-data.ts` | Complete aviation schema (8 tables, relationships) |
| `flashcards-data.ts` | 35 flashcards covering all SQL concepts |

---

## Transformation Steps

### 1. Update Package.json
```json
{
  "name": "tp5-sql-webapp",
  "description": "TP5: Advanced SELECT Queries - Aviation Database"
}
```

### 2. Update lib/ Data Files
Copy files from `tp5-data/` to `lib/`:
- `queries-data.ts` → Replace existing
- `lessons-data.ts` → Replace existing  
- `challenges-data.ts` → Replace existing
- `schema-data.ts` → NEW file (enhanced schema page)
- `flashcards-data.ts` → Replace existing

### 3. Update Homepage (app/page.tsx)

#### Title & Description
```tsx
title: "TP5: Advanced SELECT Queries"
description: "Master complex SELECT operations with the Aviation Database"
```

#### Roadmap Steps (8 steps in snake path)
1. **Course** - Learn SELECT patterns → /course
2. **Cheatsheet** - SQL quick reference → /cheatsheet  
3. **TP Schema** - Aviation database (8 tables) → /schema
4. **TP Questions** - 20 complex queries → /questions
5. **TP Solutions** - Detailed explanations → /queries
6. **Flashcards** - Test your memory → /flashcards
7. **Practice** - Interactive SQL challenges → /practice
8. **Master It!** - Complete all challenges → /challenges

#### Stats Section (4 columns)
- 8 Tables (Aviation schema)
- 20 Queries (Complex patterns)
- 35 Flashcards (Concept review)
- 8 Lessons (Query patterns)

### 4. Update Schema Page (app/schema/page.tsx)

Display the 8-table Aviation schema:
- **Constructeur** - Aircraft manufacturers
- **Avion** - Aircraft with specs
- **Pilote** - Pilots
- **Piloter** - Pilot-Aircraft assignments (junction)
- **Aéroport** - Airports
- **Dessert** - Service routes (junction)
- **Compagnie** - Airlines
- **Achat** - Aircraft purchases (junction)

Show relationships:
- Constructeur 1→N Avion
- Pilote N↔N Avion via Piloter
- Avion N↔N Aéroport via Dessert
- Compagnie N↔N Avion via Achat

### 5. Update Navigation (components/main-nav.tsx)

Ensure TP dropdown contains:
- Schema → /schema
- Questions → /questions
- Solutions → /queries

### 6. Content Theme

Replace all TP4 references (Footballeur, Equipe, joueurs) with TP5 theme:
- Aviation terminology (aircraft, pilots, airports, airlines)
- Advanced query focus (division, exists, correlated subqueries)
- French-language queries (matching original TP)

---

## SQL Concepts Covered (TP5)

| Category | Topics |
|----------|--------|
| **JOINs** | Multi-table chains (4+ tables), LEFT JOIN for nulls |
| **Aggregates** | COUNT DISTINCT, SUM, AVG with GROUP BY |
| **HAVING** | Filter groups, compare to subqueries |
| **Subqueries** | IN, NOT IN, scalar, correlated |
| **EXISTS** | EXISTS, NOT EXISTS, exclusive patterns |
| **Division** | Double NOT EXISTS, GROUP BY + HAVING |
| **Patterns** | ONLY X, ALL of X, reference entity division |

---

## Aviation Schema Quick Reference

```sql
-- Core Tables
Constructeur (IdConstructeur, nom, pays)
Avion (IdAvion, nom, IdConstructeur, NbPlaces, DateConstruction)
Pilote (IdPilote, nom, nationalité)
Aéroport (IdAer, nom, ville, pays)
Compagnie (IdCompagnie, nom, pays)

-- Junction Tables
Piloter (IdPilote, IdAvion, heuresVol)
Dessert (IdAvion, IdAer, NB_Fois_Semaine)
Achat (IdCompagnie, IdAvion, Quantité, dateAchat)
```

---

## Sample Query Patterns

### Simple JOIN + Filter
```sql
SELECT DISTINCT a.IdAvion, a.nom
FROM Avion a
JOIN Piloter p ON a.IdAvion = p.IdAvion
JOIN Pilote pi ON p.IdPilote = pi.IdPilote
WHERE a.nom LIKE '%Boeing 777%'
AND pi.nationalité = 'Algérienne';
```

### NOT EXISTS (No Boeing purchases)
```sql
SELECT c.IdCompagnie, c.nom
FROM Compagnie c
WHERE NOT EXISTS (
    SELECT 1 FROM Achat ac
    JOIN Avion a ON ac.IdAvion = a.IdAvion
    WHERE ac.IdCompagnie = c.IdCompagnie
    AND a.nom LIKE '%Boeing%'
);
```

### Division (ALL Boeing aircraft)
```sql
SELECT c.IdCompagnie, c.nom
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
);
```

---

## Expected Output

A complete TP5 webapp with:
- ✅ 20 complex SQL queries with explanations
- ✅ 8 lessons covering advanced query patterns
- ✅ 8 challenges with progressive difficulty
- ✅ 35 flashcards for concept review
- ✅ Complete aviation schema documentation
- ✅ Interactive query testing
- ✅ Progress tracking

---

## Files to Check After Transformation

1. `package.json` - Updated name/description
2. `lib/queries-data.ts` - 20 TP5 queries
3. `lib/lessons-data.ts` - 8 lessons
4. `lib/challenges-data.ts` - 8 challenges
5. `lib/flashcards-data.ts` - 35 flashcards
6. `lib/schema-data.ts` - Aviation schema
7. `app/page.tsx` - Updated hero, stats, roadmap labels
8. `app/schema/page.tsx` - 8-table display
9. `components/main-nav.tsx` - Correct nav links

---

## Success Criteria

1. All pages load without errors
2. Schema displays 8 tables with relationships
3. 20 queries are browsable with syntax highlighting
4. Lessons contain relevant TP5 concepts
5. Flashcards cover all query patterns
6. Challenges reference correct query IDs
7. Progress tracking works across sessions
