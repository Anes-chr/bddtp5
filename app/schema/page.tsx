"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Database, Table, Link2, Key, Plane, Users, Building2, MapPin } from "lucide-react"
import CodeBlock from "@/components/code-block"
import { tp5Schema } from "@/lib/schema-data"

export default function SchemaPage() {
  const tableColors = [
    "from-blue-500 to-cyan-500",
    "from-purple-500 to-pink-500",
    "from-green-500 to-emerald-500",
    "from-orange-500 to-amber-500",
    "from-red-500 to-rose-500",
    "from-indigo-500 to-violet-500",
    "from-teal-500 to-cyan-500",
    "from-pink-500 to-rose-500",
  ]

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-linear-to-br from-purple-600 to-pink-600 mb-6">
            <Plane className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-4 gradient-text">
            Aviation Database Schema
          </h1>
          <p className="text-xl text-muted-foreground">
            Complete structure of the TP5 Aviation database - 8 interconnected tables
          </p>
        </motion.div>

        {/* Overview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <Card className="bg-linear-to-r from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 border-2 border-blue-500">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Database: TP5 Aviation</h3>
              <p className="text-lg mb-4">
                {tp5Schema.description}
              </p>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <Table className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">8 Tables</span>
                </div>
                <div className="flex items-center gap-2">
                  <Link2 className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">4 Relationships</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">3 Junction Tables</span>
                </div>
                <div className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">Complex Queries</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tables Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {tp5Schema.tables.map((table, index) => (
            <motion.div
              key={table.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full bg-linear-to-br ${tableColors[index]} flex items-center justify-center text-white font-bold`}>
                      {index + 1}
                    </div>
                    {table.name}
                    {table.primaryKey.length > 1 && (
                      <Badge variant="outline" className="ml-2">Junction</Badge>
                    )}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{table.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto rounded-lg border">
                    <table className="w-full text-sm">
                      <thead className="bg-primary text-primary-foreground">
                        <tr>
                          <th className="px-3 py-2 text-left">Column</th>
                          <th className="px-3 py-2 text-left">Type</th>
                          <th className="px-3 py-2 text-left">Key</th>
                        </tr>
                      </thead>
                      <tbody>
                        {table.columns.map((col) => (
                          <tr key={col.name} className="border-b hover:bg-secondary/50">
                            <td className="px-3 py-2 font-mono font-semibold">{col.name}</td>
                            <td className="px-3 py-2">
                              <Badge variant="secondary" className="text-xs">{col.type}</Badge>
                            </td>
                            <td className="px-3 py-2">
                              {col.constraints?.includes("PRIMARY KEY") && (
                                <Key className="w-4 h-4 text-yellow-600 inline" />
                              )}
                              {col.constraints?.includes("FOREIGN KEY") && (
                                <Link2 className="w-4 h-4 text-blue-600 inline ml-1" />
                              )}
                              {!col.constraints?.includes("KEY") && "-"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {table.foreignKeys && table.foreignKeys.length > 0 && (
                    <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-950 rounded text-xs">
                      <strong>FK:</strong> {table.foreignKeys.map(fk => 
                        `${fk.column} → ${fk.references}.${fk.refColumn}`
                      ).join(", ")}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Relationship Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">Relationships Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tp5Schema.relationships.map((rel, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="px-3 py-1 bg-primary text-primary-foreground rounded font-semibold">
                        {rel.from}
                      </div>
                      <div className="flex flex-col items-center">
                        <Link2 className="w-5 h-5 text-primary" />
                        <span className="text-xs font-semibold">{rel.type}</span>
                      </div>
                      <div className="px-3 py-1 bg-secondary rounded font-semibold">
                        {rel.to}
                      </div>
                    </div>
                    {rel.through && (
                      <Badge variant="outline" className="mb-2">via {rel.through}</Badge>
                    )}
                    <p className="text-sm text-muted-foreground">{rel.description}</p>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-blue-50 dark:bg-blue-950 rounded-lg border-2 border-blue-500 mt-6">
                <h4 className="font-bold text-lg mb-3">💡 Understanding Junction Tables</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span><strong>Piloter:</strong> Links Pilote ↔ Avion (which pilots fly which aircraft)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span><strong>Dessert:</strong> Links Avion ↔ Aéroport (which aircraft serve which airports)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span><strong>Achat:</strong> Links Compagnie ↔ Avion (which airlines bought which aircraft)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Junction tables have <strong>composite primary keys</strong> and enable many-to-many relationships</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* SQL Creation Code */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">SQL Creation Code</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-bold mb-2">Create Database:</h4>
                <CodeBlock code="CREATE DATABASE TP5_Aviation;\nUSE TP5_Aviation;" />
              </div>

              <div>
                <h4 className="font-bold mb-2">Core Tables:</h4>
                <CodeBlock code={`-- Constructeur (Manufacturers)
CREATE TABLE Constructeur (
    IdConstructeur INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    pays VARCHAR(50),
    fondation DATE
);

-- Avion (Aircraft)
CREATE TABLE Avion (
    IdAvion INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    IdConstructeur INT,
    NbPlaces INT,
    DateConstruction DATE,
    autonomie INT,
    FOREIGN KEY (IdConstructeur) REFERENCES Constructeur(IdConstructeur)
);

-- Pilote (Pilots)
CREATE TABLE Pilote (
    IdPilote INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    nationalité VARCHAR(50),
    experience INT,
    salaire DECIMAL(10,2)
);

-- Aéroport (Airports)
CREATE TABLE Aéroport (
    IdAer INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    ville VARCHAR(100),
    pays VARCHAR(50),
    code_IATA CHAR(3) UNIQUE
);

-- Compagnie (Airlines)
CREATE TABLE Compagnie (
    IdCompagnie INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    pays VARCHAR(50),
    flotte INT,
    fondation DATE
);`} />
              </div>

              <div>
                <h4 className="font-bold mb-2">Junction Tables (Many-to-Many):</h4>
                <CodeBlock code={`-- Piloter (Pilot-Aircraft assignments)
CREATE TABLE Piloter (
    IdPilote INT,
    IdAvion INT,
    dateQualification DATE,
    heuresVol INT,
    PRIMARY KEY (IdPilote, IdAvion),
    FOREIGN KEY (IdPilote) REFERENCES Pilote(IdPilote),
    FOREIGN KEY (IdAvion) REFERENCES Avion(IdAvion)
);

-- Dessert (Service routes)
CREATE TABLE Dessert (
    IdAvion INT,
    IdAer INT,
    NB_Fois_Semaine INT,
    dateDebut DATE,
    PRIMARY KEY (IdAvion, IdAer),
    FOREIGN KEY (IdAvion) REFERENCES Avion(IdAvion),
    FOREIGN KEY (IdAer) REFERENCES Aéroport(IdAer)
);

-- Achat (Purchases)
CREATE TABLE Achat (
    IdCompagnie INT,
    IdAvion INT,
    Quantité INT NOT NULL,
    dateAchat DATE,
    prix DECIMAL(15,2),
    PRIMARY KEY (IdCompagnie, IdAvion),
    FOREIGN KEY (IdCompagnie) REFERENCES Compagnie(IdCompagnie),
    FOREIGN KEY (IdAvion) REFERENCES Avion(IdAvion)
);`} />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}


