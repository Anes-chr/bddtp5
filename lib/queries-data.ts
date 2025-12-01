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
    title: "Avions Boeing 777 pilotés par des pilotes algériens avant 2010",
    difficulty: "medium",
    concept: "JOIN + WHERE + LIKE + YEAR()",
    description: "Donner les avions Boeing 777 pilotés par des pilotes algériens et apparus avant 2010.",
    sql: `SELECT DISTINCT a.IdAvion, a.nom
FROM Avion a
JOIN Piloter p ON a.IdAvion = p.IdAvion
JOIN Pilote pi ON p.IdPilote = pi.IdPilote
WHERE a.nom LIKE '%Boeing 777%'
AND pi.nationalité = 'Algérienne'
AND YEAR(a.DateConstruction) < 2010;`,
    explanation: "On enchaîne Avion → Piloter → Pilote pour accéder à la nationalité. LIKE '%Boeing 777%' cherche le modèle, YEAR() extrait l'année de construction. DISTINCT évite les doublons si un avion a plusieurs pilotes algériens.",
    result: ["IdAvion: 1, nom: Boeing 777-300ER", "IdAvion: 4, nom: Boeing 777-200"]
  },
  {
    id: 2,
    title: "Avions pilotés UNIQUEMENT par des pilotes algériens",
    difficulty: "hard",
    concept: "NOT EXISTS + EXISTS",
    description: "Donner les avions qui sont pilotés uniquement par des pilotes algériens.",
    sql: `SELECT a.IdAvion, a.nom
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
);`,
    explanation: "Deux conditions: (1) NOT EXISTS vérifie qu'aucun pilote non-algérien ne pilote cet avion. (2) EXISTS vérifie qu'au moins un pilote algérien le pilote. Les deux doivent être vraies pour l'exclusivité.",
    result: ["IdAvion: 7, nom: ATR 72-600"]
  },
  {
    id: 3,
    title: "Compagnies n'ayant acheté AUCUN avion Boeing (NOT EXISTS)",
    difficulty: "medium",
    concept: "NOT EXISTS",
    description: "Donner les compagnies qui n'ont acheté aucun avion dont le nom contient Boeing - Solution avec NOT EXISTS.",
    sql: `SELECT c.IdCompagnie, c.nom
FROM Compagnie c
WHERE NOT EXISTS (
    SELECT 1
    FROM Achat ac
    JOIN Avion a ON ac.IdAvion = a.IdAvion
    WHERE ac.IdCompagnie = c.IdCompagnie
    AND a.nom LIKE '%Boeing%'
);`,
    explanation: "Pour chaque compagnie, on vérifie qu'il n'existe PAS d'achat lié à un avion dont le nom contient 'Boeing'. NOT EXISTS est performant et gère bien les NULLs.",
    result: ["IdCompagnie: 4, nom: Lufthansa", "IdCompagnie: 6, nom: Qatar Airways"]
  },
  {
    id: 4,
    title: "Compagnies n'ayant acheté AUCUN avion Boeing (NOT IN)",
    difficulty: "medium",
    concept: "NOT IN",
    description: "Donner les compagnies qui n'ont acheté aucun avion dont le nom contient Boeing - Solution avec NOT IN.",
    sql: `SELECT c.IdCompagnie, c.nom
FROM Compagnie c
WHERE c.IdCompagnie NOT IN (
    SELECT DISTINCT ac.IdCompagnie
    FROM Achat ac
    JOIN Avion a ON ac.IdAvion = a.IdAvion
    WHERE a.nom LIKE '%Boeing%'
);`,
    explanation: "La sous-requête retourne les IDs des compagnies ayant acheté Boeing. NOT IN exclut ces compagnies. Attention: NOT IN peut avoir des problèmes avec les valeurs NULL dans la sous-requête.",
    result: ["IdCompagnie: 4, nom: Lufthansa", "IdCompagnie: 6, nom: Qatar Airways"]
  },
  {
    id: 5,
    title: "Pilotes ayant piloté des avions Boeing OU Airbus",
    difficulty: "medium",
    concept: "Multiple JOINs + OR",
    description: "Donner les pilotes qui ont piloté des avions construits par Boeing ou Airbus.",
    sql: `SELECT DISTINCT pi.IdPilote, pi.nom, pi.prénom
FROM Pilote pi
JOIN Piloter p ON pi.IdPilote = p.IdPilote
JOIN Avion a ON p.IdAvion = a.IdAvion
JOIN Constructeur c ON a.IdConstructeur = c.IdConstructeur
WHERE c.nom = 'Boeing' OR c.nom = 'Airbus';`,
    explanation: "Chaîne de jointures: Pilote → Piloter → Avion → Constructeur. OR signifie qu'un pilote qualifie s'il a volé sur l'un OU l'autre constructeur. DISTINCT évite les doublons.",
    result: ["Benali Ahmed", "Dupont Jean", "Smith John", "Martinez Carlos"]
  },
  {
    id: 6,
    title: "Pilotes ayant piloté À LA FOIS Boeing ET Airbus",
    difficulty: "hard",
    concept: "Double EXISTS + AND",
    description: "Donner les pilotes qui ont piloté à la fois des avions du constructeur Boeing et Airbus.",
    sql: `SELECT DISTINCT pi.IdPilote, pi.nom, pi.prénom
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
);`,
    explanation: "Deux sous-requêtes EXISTS indépendantes liées par AND. Le pilote doit avoir AU MOINS un vol Boeing ET AU MOINS un vol Airbus pour être inclus.",
    result: ["Dupont Jean", "Martinez Carlos"]
  },
  {
    id: 7,
    title: "L'avion le plus acheté par Air-Algérie",
    difficulty: "medium",
    concept: "GROUP BY + SUM + ORDER BY + TOP",
    description: "Donner l'avion le plus acheté par Air-Algérie.",
    sql: `SELECT TOP 1 a.IdAvion, a.nom, SUM(ac.Quantité) as total_acheté
FROM Achat ac
JOIN Avion a ON ac.IdAvion = a.IdAvion
JOIN Compagnie c ON ac.IdCompagnie = c.IdCompagnie
WHERE c.nom = 'Air-Algérie'
GROUP BY a.IdAvion, a.nom
ORDER BY total_acheté DESC;`,
    explanation: "Filtrer sur Air-Algérie, grouper par avion, sommer les quantités, trier du plus au moins acheté, prendre le premier. TOP 1 avec ORDER BY DESC donne le maximum.",
    result: ["IdAvion: 2, nom: Airbus A330-200, total_acheté: 12"]
  },
  {
    id: 8,
    title: "Compagnies ayant acheté UNIQUEMENT des avions Airbus",
    difficulty: "hard",
    concept: "IN + NOT EXISTS",
    description: "Donner les compagnies qui ont acheté uniquement des avions Airbus.",
    sql: `SELECT c.IdCompagnie, c.nom
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
);`,
    explanation: "Deux conditions: (1) IN vérifie que la compagnie a fait au moins un achat. (2) NOT EXISTS vérifie qu'aucun achat n'est d'un constructeur autre qu'Airbus.",
    result: ["IdCompagnie: 4, nom: Lufthansa"]
  },
  {
    id: 9,
    title: "Quantité moyenne des achats par catégorie d'avion",
    difficulty: "easy",
    concept: "GROUP BY + AVG",
    description: "Donner le prix moyen des avions par catégorie (ici, la quantité moyenne des achats).",
    sql: `SELECT a.catégorie, AVG(CAST(ac.Quantité as FLOAT)) as quantité_moyenne
FROM Avion a
LEFT JOIN Achat ac ON a.IdAvion = ac.IdAvion
GROUP BY a.catégorie;`,
    explanation: "LEFT JOIN inclut les catégories sans achats (NULL). AVG calcule la moyenne. CAST en FLOAT assure une division décimale précise. GROUP BY crée un groupe par catégorie.",
    result: ["Long-courrier: 8.5", "Moyen-courrier: 6.2", "Court-courrier: 4.0", "Régional: NULL"]
  },
  {
    id: 10,
    title: "Aéroports desservis par ≥10 Boeing 767 par semaine",
    difficulty: "medium",
    concept: "JOIN + WHERE + Filtrage spécifique",
    description: "Donner les aéroports desservis par au moins 10 avions Boeing 767 par semaine.",
    sql: `SELECT DISTINCT aer.IdAer, aer.nom, aer.ville
FROM Aéroport aer
JOIN Dessert d ON aer.IdAer = d.IdAer
JOIN Avion a ON d.IdAvion = a.IdAvion
WHERE a.nom LIKE '%Boeing 767%'
AND d.NB_Fois_Semaine >= 10;`,
    explanation: "Jointure Aéroport → Dessert → Avion pour accéder au nom de l'avion. Filtrage sur le modèle exact ET la fréquence. DISTINCT car un aéroport peut avoir plusieurs lignes pour différents 767.",
    result: ["Aéroport Houari Boumediene, Alger", "Aéroport Charles de Gaulle, Paris"]
  },
  {
    id: 11,
    title: "Aéroports desservis par ≥10 vols Boeing (tous modèles) par semaine",
    difficulty: "medium",
    concept: "GROUP BY + SUM + HAVING",
    description: "Donner les aéroports desservis par au moins 10 avions Boeing (tous modèles) par semaine.",
    sql: `SELECT aer.IdAer, aer.nom, aer.ville, SUM(d.NB_Fois_Semaine) as total_par_semaine
FROM Aéroport aer
JOIN Dessert d ON aer.IdAer = d.IdAer
JOIN Avion a ON d.IdAvion = a.IdAvion
WHERE a.nom LIKE '%Boeing%'
GROUP BY aer.IdAer, aer.nom, aer.ville
HAVING SUM(d.NB_Fois_Semaine) >= 10;`,
    explanation: "GROUP BY par aéroport, SUM toutes les fréquences Boeing. HAVING filtre les groupes APRÈS agrégation (contrairement à WHERE qui filtre avant).",
    result: ["Aéroport Houari Boumediene: 45/semaine", "Aéroport CDG: 67/semaine", "Heathrow: 52/semaine"]
  },
  {
    id: 12,
    title: "Compagnies achetant au-dessus de la moyenne pour un avion",
    difficulty: "hard",
    concept: "Sous-requête corrélée + AVG",
    description: "Donner le nom des compagnies et le nom des avions pour les compagnies ayant acheté un avion en quantité supérieure à la moyenne des ventes de ce même avion.",
    sql: `SELECT c.nom as compagnie, a.nom as avion, ac.Quantité
FROM Achat ac
JOIN Compagnie c ON ac.IdCompagnie = c.IdCompagnie
JOIN Avion a ON ac.IdAvion = a.IdAvion
WHERE ac.Quantité > (
    SELECT AVG(CAST(ac2.Quantité as FLOAT))
    FROM Achat ac2
    WHERE ac2.IdAvion = ac.IdAvion
);`,
    explanation: "Sous-requête CORRÉLÉE: pour chaque ligne de la requête externe, elle calcule la moyenne des achats de CE même avion (ac2.IdAvion = ac.IdAvion). Compare ensuite la quantité à cette moyenne spécifique.",
    result: ["Air-Algérie, Boeing 777: 15 (moy: 8)", "Emirates, A380: 20 (moy: 12)"]
  },
  {
    id: 13,
    title: "Total des ventes par constructeur",
    difficulty: "easy",
    concept: "GROUP BY + SUM + LEFT JOIN chaîné",
    description: "Donner pour chaque constructeur: l'identificateur, le nom, le total des ventes réalisées.",
    sql: `SELECT con.IdConstructeur, con.nom, SUM(ac.Quantité) as total_ventes
FROM Constructeur con
LEFT JOIN Avion a ON con.IdConstructeur = a.IdConstructeur
LEFT JOIN Achat ac ON a.IdAvion = ac.IdAvion
GROUP BY con.IdConstructeur, con.nom;`,
    explanation: "Double LEFT JOIN pour garder tous les constructeurs, même sans avions ou sans ventes. SUM agrège les quantités. NULL pour les constructeurs sans ventes.",
    result: ["Boeing: 156", "Airbus: 203", "Embraer: 45", "Bombardier: NULL"]
  },
  {
    id: 14,
    title: "Compagnies ayant acheté >5 modèles d'avions différents",
    difficulty: "medium",
    concept: "COUNT DISTINCT + HAVING",
    description: "Donner l'identificateur, le nom et le total des achats réalisés pour les compagnies qui ont acheté plus de 5 avions différents.",
    sql: `SELECT c.IdCompagnie, c.nom, COUNT(DISTINCT ac.IdAvion) as nombre_modeles, SUM(ac.Quantité) as total_achats
FROM Compagnie c
JOIN Achat ac ON c.IdCompagnie = ac.IdCompagnie
GROUP BY c.IdCompagnie, c.nom
HAVING COUNT(DISTINCT ac.IdAvion) > 5;`,
    explanation: "COUNT(DISTINCT IdAvion) compte les modèles uniques, pas le nombre d'achats. HAVING filtre les groupes après agrégation. On affiche aussi le total des achats pour contexte.",
    result: ["Emirates: 8 modèles, 45 achats", "Air France: 7 modèles, 38 achats"]
  },
  {
    id: 15,
    title: "Compagnies ayant acheté TOUS les types Boeing (NOT EXISTS)",
    difficulty: "hard",
    concept: "Division Relationnelle - NOT EXISTS",
    description: "Donner les compagnies qui ont acheté tous les types d'avions du constructeur Boeing - Solution avec NOT EXISTS.",
    sql: `SELECT c.IdCompagnie, c.nom
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
);`,
    explanation: "Pattern de division: 'Il n'existe PAS d'avion Boeing que cette compagnie n'a PAS acheté.' Double négation = affirmation universelle. La sous-requête interne vérifie si un achat existe pour cet avion et cette compagnie.",
    result: ["Emirates"]
  },
  {
    id: 16,
    title: "Compagnies ayant acheté TOUS les types Boeing (GROUP BY)",
    difficulty: "hard",
    concept: "Division Relationnelle - GROUP BY",
    description: "Donner les compagnies qui ont acheté tous les types d'avions du constructeur Boeing - Solution avec GROUP BY.",
    sql: `SELECT c.IdCompagnie, c.nom
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
);`,
    explanation: "Compte les avions Boeing distincts achetés par chaque compagnie (HAVING COUNT(DISTINCT)). Compare au nombre total d'avions Boeing. Si égal, la compagnie les a tous achetés.",
    result: ["Emirates"]
  },
  {
    id: 17,
    title: "Avions desservant TOUS les aéroports (NOT EXISTS)",
    difficulty: "hard",
    concept: "Division Relationnelle",
    description: "Donner les avions qui desservent tous les aéroports - Solution avec NOT EXISTS.",
    sql: `SELECT a.IdAvion, a.nom
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
);`,
    explanation: "Même pattern de division: 'Il n'existe PAS d'aéroport que cet avion ne dessert PAS.' Pour chaque avion, vérifie l'absence d'aéroport non-desservi.",
    result: ["Airbus A320neo"]
  },
  {
    id: 18,
    title: "Avions desservant TOUS les aéroports (GROUP BY)",
    difficulty: "hard",
    concept: "Division Relationnelle - GROUP BY",
    description: "Donner les avions qui desservent tous les aéroports - Solution avec GROUP BY.",
    sql: `SELECT a.IdAvion, a.nom
FROM Avion a
JOIN Dessert d ON a.IdAvion = d.IdAvion
GROUP BY a.IdAvion, a.nom
HAVING COUNT(DISTINCT d.IdAer) = (SELECT COUNT(IdAer) FROM Aéroport);`,
    explanation: "Compte les aéroports distincts desservis par chaque avion. Compare au nombre total d'aéroports. Égalité = tous desservis.",
    result: ["Airbus A320neo"]
  },
  {
    id: 19,
    title: "Compagnies ayant acheté tous les produits de la compagnie 3",
    difficulty: "hard",
    concept: "Division Relationnelle avec référence",
    description: "Donner les compagnies qui ont acheté tous les produits achetés par la compagnie dont l'identificateur est 3.",
    sql: `SELECT c.IdCompagnie, c.nom
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
AND c.IdCompagnie != 3;`,
    explanation: "Pour chaque avion acheté par compagnie 3, vérifie si la compagnie courante l'a aussi acheté. 'Il n'existe pas d'avion de la compagnie 3 que cette compagnie n'a pas acheté.' Exclut la compagnie 3 elle-même.",
    result: ["Emirates", "Air France"]
  }
]
