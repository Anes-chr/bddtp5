export interface SchemaTable {
  name: string;
  description: string;
  columns: {
    name: string;
    type: string;
    constraints?: string;
    description: string;
  }[];
  primaryKey: string[];
  foreignKeys?: {
    column: string;
    references: string;
    refColumn: string;
  }[];
}

export interface SchemaRelationship {
  from: string;
  to: string;
  type: "one-to-one" | "one-to-many" | "many-to-many";
  through?: string;
  description: string;
}

export const tp5Schema: {
  title: string;
  description: string;
  tables: SchemaTable[];
  relationships: SchemaRelationship[];
} = {
  title: "Aviation Database Schema (TP5)",
  description: "A comprehensive aviation database modeling aircraft, pilots, airports, airlines, and their relationships. The schema supports complex queries involving purchases, service routes, and pilot assignments.",
  tables: [
    {
      name: "Constructeur",
      description: "Aircraft manufacturers (Boeing, Airbus, etc.)",
      columns: [
        { name: "IdConstructeur", type: "INT", constraints: "PRIMARY KEY, AUTO_INCREMENT", description: "Unique manufacturer identifier" },
        { name: "nom", type: "VARCHAR(100)", constraints: "NOT NULL", description: "Manufacturer name (e.g., 'Boeing', 'Airbus')" },
        { name: "pays", type: "VARCHAR(50)", description: "Country of origin" },
        { name: "fondation", type: "DATE", description: "Date the company was founded" }
      ],
      primaryKey: ["IdConstructeur"]
    },
    {
      name: "Avion",
      description: "Aircraft models with specifications",
      columns: [
        { name: "IdAvion", type: "INT", constraints: "PRIMARY KEY, AUTO_INCREMENT", description: "Unique aircraft identifier" },
        { name: "nom", type: "VARCHAR(100)", constraints: "NOT NULL", description: "Aircraft model name (e.g., 'Boeing 777-200')" },
        { name: "IdConstructeur", type: "INT", constraints: "FOREIGN KEY", description: "Reference to manufacturer" },
        { name: "NbPlaces", type: "INT", description: "Passenger seating capacity" },
        { name: "DateConstruction", type: "DATE", description: "Manufacturing date" },
        { name: "autonomie", type: "INT", description: "Maximum flight range in kilometers" }
      ],
      primaryKey: ["IdAvion"],
      foreignKeys: [
        { column: "IdConstructeur", references: "Constructeur", refColumn: "IdConstructeur" }
      ]
    },
    {
      name: "Pilote",
      description: "Pilots with their personal information",
      columns: [
        { name: "IdPilote", type: "INT", constraints: "PRIMARY KEY, AUTO_INCREMENT", description: "Unique pilot identifier" },
        { name: "nom", type: "VARCHAR(100)", constraints: "NOT NULL", description: "Pilot's full name" },
        { name: "nationalité", type: "VARCHAR(50)", description: "Pilot's nationality (e.g., 'Algérienne', 'Française')" },
        { name: "experience", type: "INT", description: "Years of flying experience" },
        { name: "salaire", type: "DECIMAL(10,2)", description: "Annual salary" }
      ],
      primaryKey: ["IdPilote"]
    },
    {
      name: "Piloter",
      description: "Assignment of pilots to aircraft they are qualified to fly",
      columns: [
        { name: "IdPilote", type: "INT", constraints: "PRIMARY KEY, FOREIGN KEY", description: "Reference to pilot" },
        { name: "IdAvion", type: "INT", constraints: "PRIMARY KEY, FOREIGN KEY", description: "Reference to aircraft" },
        { name: "dateQualification", type: "DATE", description: "Date pilot was qualified for this aircraft" },
        { name: "heuresVol", type: "INT", description: "Hours flown on this aircraft type" }
      ],
      primaryKey: ["IdPilote", "IdAvion"],
      foreignKeys: [
        { column: "IdPilote", references: "Pilote", refColumn: "IdPilote" },
        { column: "IdAvion", references: "Avion", refColumn: "IdAvion" }
      ]
    },
    {
      name: "Aéroport",
      description: "Airports around the world",
      columns: [
        { name: "IdAer", type: "INT", constraints: "PRIMARY KEY, AUTO_INCREMENT", description: "Unique airport identifier" },
        { name: "nom", type: "VARCHAR(100)", constraints: "NOT NULL", description: "Airport name (e.g., 'Aéroport d'Alger')" },
        { name: "ville", type: "VARCHAR(100)", description: "City where airport is located" },
        { name: "pays", type: "VARCHAR(50)", description: "Country" },
        { name: "code_IATA", type: "CHAR(3)", constraints: "UNIQUE", description: "3-letter IATA code (e.g., 'ALG')" }
      ],
      primaryKey: ["IdAer"]
    },
    {
      name: "Dessert",
      description: "Service routes - which aircraft serve which airports",
      columns: [
        { name: "IdAvion", type: "INT", constraints: "PRIMARY KEY, FOREIGN KEY", description: "Reference to aircraft" },
        { name: "IdAer", type: "INT", constraints: "PRIMARY KEY, FOREIGN KEY", description: "Reference to airport" },
        { name: "NB_Fois_Semaine", type: "INT", description: "Number of flights per week" },
        { name: "dateDebut", type: "DATE", description: "When service started" }
      ],
      primaryKey: ["IdAvion", "IdAer"],
      foreignKeys: [
        { column: "IdAvion", references: "Avion", refColumn: "IdAvion" },
        { column: "IdAer", references: "Aéroport", refColumn: "IdAer" }
      ]
    },
    {
      name: "Compagnie",
      description: "Airlines that purchase aircraft",
      columns: [
        { name: "IdCompagnie", type: "INT", constraints: "PRIMARY KEY, AUTO_INCREMENT", description: "Unique airline identifier" },
        { name: "nom", type: "VARCHAR(100)", constraints: "NOT NULL", description: "Airline name (e.g., 'Air Algérie')" },
        { name: "pays", type: "VARCHAR(50)", description: "Country of registration" },
        { name: "flotte", type: "INT", description: "Total fleet size" },
        { name: "fondation", type: "DATE", description: "Date company was founded" }
      ],
      primaryKey: ["IdCompagnie"]
    },
    {
      name: "Achat",
      description: "Aircraft purchases by airlines",
      columns: [
        { name: "IdCompagnie", type: "INT", constraints: "PRIMARY KEY, FOREIGN KEY", description: "Reference to airline" },
        { name: "IdAvion", type: "INT", constraints: "PRIMARY KEY, FOREIGN KEY", description: "Reference to aircraft model" },
        { name: "Quantité", type: "INT", constraints: "NOT NULL", description: "Number of units purchased" },
        { name: "dateAchat", type: "DATE", description: "Date of purchase" },
        { name: "prix", type: "DECIMAL(15,2)", description: "Purchase price per unit" }
      ],
      primaryKey: ["IdCompagnie", "IdAvion"],
      foreignKeys: [
        { column: "IdCompagnie", references: "Compagnie", refColumn: "IdCompagnie" },
        { column: "IdAvion", references: "Avion", refColumn: "IdAvion" }
      ]
    }
  ],
  relationships: [
    {
      from: "Constructeur",
      to: "Avion",
      type: "one-to-many",
      description: "One manufacturer builds many aircraft models"
    },
    {
      from: "Pilote",
      to: "Avion",
      type: "many-to-many",
      through: "Piloter",
      description: "Pilots can fly multiple aircraft; aircraft can be flown by multiple pilots"
    },
    {
      from: "Avion",
      to: "Aéroport",
      type: "many-to-many",
      through: "Dessert",
      description: "Aircraft serve multiple airports; airports are served by multiple aircraft"
    },
    {
      from: "Compagnie",
      to: "Avion",
      type: "many-to-many",
      through: "Achat",
      description: "Airlines purchase multiple aircraft models; models are bought by multiple airlines"
    }
  ]
};

export const schemaQueries = [
  {
    question: "How do I find all aircraft from a specific manufacturer?",
    sql: `SELECT a.* FROM Avion a
JOIN Constructeur c ON a.IdConstructeur = c.IdConstructeur
WHERE c.nom = 'Boeing';`,
    explanation: "Join Avion with Constructeur and filter by manufacturer name"
  },
  {
    question: "How do I find pilots qualified to fly a specific aircraft?",
    sql: `SELECT p.* FROM Pilote p
JOIN Piloter pi ON p.IdPilote = pi.IdPilote
WHERE pi.IdAvion = 1;`,
    explanation: "Use Piloter as the bridge table between Pilote and Avion"
  },
  {
    question: "How do I find which airlines bought a specific aircraft?",
    sql: `SELECT c.nom, a.Quantité, a.dateAchat
FROM Compagnie c
JOIN Achat a ON c.IdCompagnie = a.IdCompagnie
WHERE a.IdAvion = 1;`,
    explanation: "Achat links Compagnie to Avion with purchase details"
  },
  {
    question: "How do I count aircraft per manufacturer?",
    sql: `SELECT c.nom, COUNT(*) as nb_avions
FROM Constructeur c
JOIN Avion a ON c.IdConstructeur = a.IdConstructeur
GROUP BY c.nom;`,
    explanation: "GROUP BY manufacturer and COUNT the joined aircraft"
  }
];
