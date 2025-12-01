"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Copy, Check, ChevronDown, FileCode2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cheatsheetData } from "@/lib/cheatsheet-data"
import toast from "react-hot-toast"

export default function CheatsheetPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedCategories, setExpandedCategories] = useState<string[]>(cheatsheetData.map(c => c.id))
  const [copiedItem, setCopiedItem] = useState<string | null>(null)

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const copyToClipboard = async (text: string, itemTitle: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedItem(itemTitle)
    toast.success("Copied!")
    setTimeout(() => setCopiedItem(null), 2000)
  }

  const filteredData = cheatsheetData.map(category => ({
    ...category,
    items: category.items.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.syntax.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.items.length > 0)

  const totalItems = cheatsheetData.reduce((acc, cat) => acc + cat.items.length, 0)

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-10 md:py-14 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 mb-4">
            <FileCode2 className="w-7 h-7 md:w-8 md:h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold gradient-text mb-2">SQL Cheatsheet</h1>
          <p className="text-base md:text-lg text-muted-foreground">
            {cheatsheetData.length} categories • {totalItems} commands
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-xl mx-auto mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
              type="text"
              placeholder="Search SQL commands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 py-3 text-base bg-card/50"
            />
          </div>
        </motion.div>

        {/* Quick Nav */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-1.5 mb-8"
        >
          {cheatsheetData.map((category) => (
            <Button
              key={category.id}
              variant="ghost"
              size="sm"
              onClick={() => document.getElementById(category.id)?.scrollIntoView({ behavior: 'smooth' })}
              className="text-xs h-7 px-2"
            >
              <span className="mr-1">{category.icon}</span>
              {category.title}
            </Button>
          ))}
        </motion.div>

        {/* Categories */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredData.map((category, categoryIndex) => (
              <motion.div
                key={category.id}
                id={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * categoryIndex }}
              >
                <Card className="border bg-card/50 overflow-hidden">
                  <CardHeader 
                    className="p-4 cursor-pointer hover:bg-muted/30 transition-colors"
                    onClick={() => toggleCategory(category.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                          <span className="text-xl md:text-2xl">{category.icon}</span>
                        </div>
                        <div>
                          <CardTitle className="text-base md:text-lg">{category.title}</CardTitle>
                          <p className="text-sm text-muted-foreground">{category.items.length} commands</p>
                        </div>
                      </div>
                      <ChevronDown className={`w-5 h-5 transition-transform ${expandedCategories.includes(category.id) ? 'rotate-180' : ''}`} />
                    </div>
                  </CardHeader>
                  
                  <AnimatePresence>
                    {expandedCategories.includes(category.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <CardContent className="p-4 pt-0 space-y-3">
                          {category.items.map((item) => (
                            <div
                              key={item.title}
                              className="group p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                            >
                              <div className="flex items-start justify-between gap-3 mb-2">
                                <div>
                                  <h4 className="text-base font-medium">{item.title}</h4>
                                  <p className="text-sm text-muted-foreground">{item.description}</p>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => copyToClipboard(item.syntax, item.title)}
                                  className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  {copiedItem === item.title ? (
                                    <Check className="w-4 h-4 text-green-500" />
                                  ) : (
                                    <Copy className="w-4 h-4" />
                                  )}
                                </Button>
                              </div>
                              <div className="space-y-2">
                                <div className="font-mono text-sm bg-background/50 px-3 py-2 rounded-lg border overflow-x-auto">
                                  <code className="text-cyan-400 whitespace-nowrap">{item.syntax}</code>
                                </div>
                                <div className="font-mono text-sm bg-background/50 px-3 py-2 rounded-lg border border-green-500/20 overflow-x-auto">
                                  <span className="text-muted-foreground mr-2">Ex:</span>
                                  <code className="text-green-400 whitespace-nowrap">{item.example}</code>
                                </div>
                              </div>
                            </div>
                          ))}
                        </CardContent>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* No Results */}
        {filteredData.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <p className="text-muted-foreground mb-3">No commands found for &quot;{searchQuery}&quot;</p>
            <Button variant="ghost" onClick={() => setSearchQuery("")}>Clear</Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
