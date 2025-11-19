"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Database, Table, Link2, Key } from "lucide-react"
import CodeBlock from "@/components/code-block"

export default function SchemaPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 mb-6">
            <Database className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-4 gradient-text">
            Database Schema
          </h1>
          <p className="text-xl text-muted-foreground">
            Complete structure of the Football database
          </p>
        </motion.div>

        {/* Overview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 border-2 border-blue-500">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Database: Tp4</h3>
              <p className="text-lg mb-4">
                This database manages football teams and their players. It demonstrates a classic one-to-many relationship
                where one team can have multiple players.
              </p>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Table className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">2 Tables</span>
                </div>
                <div className="flex items-center gap-2">
                  <Link2 className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">1:N Relationship</span>
                </div>
                <div className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">26 Total Rows</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Equipe Table */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white">
                    1
                  </div>
                  Equipe (Team)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto rounded-lg border">
                  <table className="w-full">
                    <thead className="bg-primary text-primary-foreground">
                      <tr>
                        <th className="px-4 py-3 text-left">Column</th>
                        <th className="px-4 py-3 text-left">Type</th>
                        <th className="px-4 py-3 text-left">Key</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:bg-secondary/50">
                        <td className="px-4 py-3 font-mono font-bold">IdEqui</td>
                        <td className="px-4 py-3"><Badge>INT</Badge></td>
                        <td className="px-4 py-3"><Key className="w-4 h-4 text-yellow-600" /></td>
                      </tr>
                      <tr className="border-b hover:bg-secondary/50">
                        <td className="px-4 py-3 font-mono font-bold">Nom</td>
                        <td className="px-4 py-3"><Badge variant="secondary">VARCHAR(50)</Badge></td>
                        <td className="px-4 py-3">-</td>
                      </tr>
                      <tr className="hover:bg-secondary/50">
                        <td className="px-4 py-3 font-mono font-bold">Ville</td>
                        <td className="px-4 py-3"><Badge variant="secondary">VARCHAR(50)</Badge></td>
                        <td className="px-4 py-3">-</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 space-y-2">
                  <h4 className="font-bold">Column Descriptions:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li><strong>IdEqui:</strong> Unique team identifier (Primary Key)</li>
                    <li><strong>Nom:</strong> Team name (e.g., "MC Alger")</li>
                    <li><strong>Ville:</strong> City where team is based</li>
                  </ul>
                </div>

                <div className="mt-4 p-3 bg-green-50 dark:bg-green-950 rounded">
                  <p className="text-sm"><strong>Sample Data:</strong> 6 teams (MC Alger, USM Alger, etc.)</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Footballeur Table */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
                    2
                  </div>
                  Footballeur (Player)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto rounded-lg border">
                  <table className="w-full">
                    <thead className="bg-primary text-primary-foreground">
                      <tr>
                        <th className="px-4 py-3 text-left">Column</th>
                        <th className="px-4 py-3 text-left">Type</th>
                        <th className="px-4 py-3 text-left">Key</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:bg-secondary/50">
                        <td className="px-4 py-3 font-mono font-bold">IdFoot</td>
                        <td className="px-4 py-3"><Badge>INT</Badge></td>
                        <td className="px-4 py-3"><Key className="w-4 h-4 text-yellow-600" /></td>
                      </tr>
                      <tr className="border-b hover:bg-secondary/50">
                        <td className="px-4 py-3 font-mono font-bold">Nom</td>
                        <td className="px-4 py-3"><Badge variant="secondary">VARCHAR(50)</Badge></td>
                        <td className="px-4 py-3">-</td>
                      </tr>
                      <tr className="border-b hover:bg-secondary/50">
                        <td className="px-4 py-3 font-mono font-bold">Poste</td>
                        <td className="px-4 py-3"><Badge variant="secondary">VARCHAR(50)</Badge></td>
                        <td className="px-4 py-3">-</td>
                      </tr>
                      <tr className="border-b hover:bg-secondary/50">
                        <td className="px-4 py-3 font-mono font-bold">DateDeb</td>
                        <td className="px-4 py-3"><Badge variant="secondary">DATE</Badge></td>
                        <td className="px-4 py-3">-</td>
                      </tr>
                      <tr className="border-b hover:bg-secondary/50">
                        <td className="px-4 py-3 font-mono font-bold">Salaire</td>
                        <td className="px-4 py-3"><Badge variant="secondary">DECIMAL(10,2)</Badge></td>
                        <td className="px-4 py-3">-</td>
                      </tr>
                      <tr className="hover:bg-secondary/50">
                        <td className="px-4 py-3 font-mono font-bold">IdEqui</td>
                        <td className="px-4 py-3"><Badge>INT</Badge></td>
                        <td className="px-4 py-3"><Link2 className="w-4 h-4 text-blue-600" /></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 space-y-2">
                  <h4 className="font-bold">Column Descriptions:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li><strong>IdFoot:</strong> Unique player identifier (Primary Key)</li>
                    <li><strong>Nom:</strong> Player name</li>
                    <li><strong>Poste:</strong> Position (Attaquant, Defenseur, etc.)</li>
                    <li><strong>DateDeb:</strong> Contract start date</li>
                    <li><strong>Salaire:</strong> Player salary in DA</li>
                    <li><strong>IdEqui:</strong> Team ID (Foreign Key → Equipe)</li>
                  </ul>
                </div>

                <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-950 rounded">
                  <p className="text-sm"><strong>Sample Data:</strong> 20 players across 6 teams</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
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
              <CardTitle className="text-3xl">Relationship Diagram</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center gap-8 p-8">
                <div className="text-center">
                  <div className="w-32 h-32 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold text-xl mb-4 shadow-lg">
                    Equipe
                  </div>
                  <Badge>1 (One)</Badge>
                </div>

                <div className="flex flex-col items-center">
                  <Link2 className="w-12 h-12 text-primary" />
                  <div className="text-sm font-semibold mt-2">1:N</div>
                  <div className="text-xs text-muted-foreground">One to Many</div>
                </div>

                <div className="text-center">
                  <div className="w-32 h-32 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl mb-4 shadow-lg">
                    Footballeur
                  </div>
                  <Badge>N (Many)</Badge>
                </div>
              </div>

              <div className="p-6 bg-blue-50 dark:bg-blue-950 rounded-lg border-2 border-blue-500 mt-6">
                <h4 className="font-bold text-lg mb-3">💡 Understanding the Relationship</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>One team (Equipe) can have <strong>many players</strong> (Footballeur)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Each player belongs to <strong>exactly one team</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>The <code className="px-2 py-1 bg-background rounded">IdEqui</code> in Footballeur references <code className="px-2 py-1 bg-background rounded">IdEqui</code> in Equipe</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>This is called a <strong>Foreign Key relationship</strong></span>
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
                <CodeBlock code="CREATE DATABASE Tp4;\nUSE Tp4;" />
              </div>

              <div>
                <h4 className="font-bold mb-2">Create Equipe Table:</h4>
                <CodeBlock code={`CREATE TABLE Equipe (
    IdEqui INT PRIMARY KEY,
    Nom VARCHAR(50),
    Ville VARCHAR(50)
);`} />
              </div>

              <div>
                <h4 className="font-bold mb-2">Create Footballeur Table:</h4>
                <CodeBlock code={`CREATE TABLE Footballeur (
    IdFoot INT PRIMARY KEY,
    Nom VARCHAR(50),
    Poste VARCHAR(50),
    DateDeb DATE,
    Salaire DECIMAL(10,2),
    IdEqui INT,
    FOREIGN KEY (IdEqui) REFERENCES Equipe(IdEqui)
);`} />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}


