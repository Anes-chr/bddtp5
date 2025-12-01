"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  RotateCw, 
  ChevronLeft, 
  ChevronRight, 
  Shuffle, 
  CheckCircle,
  Lightbulb,
  Code2,
  Layers
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { flashcardsData, flashcardCategories, Flashcard } from "@/lib/flashcards-data"
import { studyFlashcard, getProgress } from "@/lib/storage"

export default function FlashcardsPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [studiedCards, setStudiedCards] = useState<number[]>([])
  const [filteredCards, setFilteredCards] = useState<Flashcard[]>(flashcardsData)

  useEffect(() => {
    const progress = getProgress()
    setStudiedCards(progress.flashcardsStudied || [])
  }, [])

  useEffect(() => {
    const cards = selectedCategory === "All" 
      ? flashcardsData 
      : flashcardsData.filter(card => card.category === selectedCategory)
    setFilteredCards(cards)
    setCurrentIndex(0)
    setIsFlipped(false)
    setShowHint(false)
  }, [selectedCategory])

  const currentCard = filteredCards[currentIndex]

  const handleNext = useCallback(() => {
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setIsFlipped(false)
      setShowHint(false)
    }
  }, [currentIndex, filteredCards.length])

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
      setIsFlipped(false)
      setShowHint(false)
    }
  }, [currentIndex])

  const handleFlip = useCallback(() => {
    setIsFlipped(prev => !prev)
    if (!isFlipped && currentCard) {
      studyFlashcard(currentCard.id)
      setStudiedCards(prev => 
        prev.includes(currentCard.id) ? prev : [...prev, currentCard.id]
      )
    }
  }, [isFlipped, currentCard])

  const handleShuffle = () => {
    const shuffled = [...filteredCards].sort(() => Math.random() - 0.5)
    setFilteredCards(shuffled)
    setCurrentIndex(0)
    setIsFlipped(false)
    setShowHint(false)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft": handlePrev(); break
        case "ArrowRight": handleNext(); break
        case " ":
        case "Enter": e.preventDefault(); handleFlip(); break
        case "h": setShowHint(prev => !prev); break
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleNext, handlePrev, handleFlip])

  const progressPercentage = Math.round((studiedCards.length / flashcardsData.length) * 100)

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-10 md:py-14 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 mb-4">
            <Layers className="w-7 h-7 md:w-8 md:h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold gradient-text mb-2">Flashcards</h1>
          <p className="text-base md:text-lg text-muted-foreground">
            {studiedCards.length}/{flashcardsData.length} studied • {progressPercentage}%
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-1.5 mb-8"
        >
          <Button
            key="All"
            variant={selectedCategory === "All" ? "default" : "ghost"}
            size="sm"
            onClick={() => setSelectedCategory("All")}
            className={`text-xs h-7 px-2.5 ${selectedCategory === "All" ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white" : ""}`}
          >
            All
          </Button>
          {flashcardCategories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className={`text-xs h-7 px-2.5 ${selectedCategory === category.id ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white" : ""}`}
            >
              {category.name}
            </Button>
          ))}
        </motion.div>

        {/* Flashcard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          {currentCard && (
            <div className="cursor-pointer" onClick={handleFlip}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${currentCard.id}-${isFlipped}`}
                  initial={{ rotateY: isFlipped ? -90 : 90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: isFlipped ? 90 : -90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <Card className={`min-h-[320px] border-2 bg-card/50 overflow-hidden ${studiedCards.includes(currentCard.id) ? 'border-green-500/30' : ''}`}>
                    <CardContent className="p-8 flex flex-col items-center justify-center min-h-[320px] relative">
                      <Badge className="mb-4 bg-purple-500/20 text-purple-400 border-0 text-sm">
                        {currentCard.category}
                      </Badge>

                      {!isFlipped ? (
                        <div className="text-center">
                          <h3 className="text-xl md:text-2xl font-bold mb-3">{currentCard.question}</h3>
                          <p className="text-sm text-muted-foreground">Tap to flip</p>
                        </div>
                      ) : (
                        <div className="text-center space-y-4 w-full">
                          <p className="text-base md:text-lg text-muted-foreground">{currentCard.answer}</p>
                          {currentCard.codeExample && (
                            <div className="font-mono text-sm bg-background/50 px-4 py-3 rounded-lg border overflow-x-auto">
                              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                                <Code2 className="w-4 h-4" />
                                <span className="text-xs">Example</span>
                              </div>
                              <code className="text-green-400 whitespace-nowrap">{currentCard.codeExample}</code>
                            </div>
                          )}
                        </div>
                      )}

                      <RotateCw className={`absolute bottom-4 right-4 w-5 h-5 text-muted-foreground transition-transform ${isFlipped ? 'rotate-180' : ''}`} />
                      {studiedCards.includes(currentCard.id) && (
                        <CheckCircle className="absolute top-4 right-4 w-5 h-5 text-green-500" />
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>
          )}

          {/* Hint */}
          <AnimatePresence>
            {showHint && currentCard?.hint && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="mt-4 p-4 rounded-lg bg-amber-500/10 border border-amber-500/20"
              >
                <div className="flex items-center gap-2 text-amber-400 text-sm">
                  <Lightbulb className="w-4 h-4" />
                  <span className="font-medium">Hint:</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{currentCard.hint}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>{currentIndex + 1} / {filteredCards.length}</span>
            <span>{Math.round(((currentIndex + 1) / filteredCards.length) * 100)}%</span>
          </div>
          <div className="w-full h-2 bg-muted/30 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + 1) / filteredCards.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Button variant="outline" size="default" onClick={handlePrev} disabled={currentIndex === 0}>
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button variant="outline" size="default" onClick={() => setShowHint(prev => !prev)} disabled={!currentCard?.hint}>
            <Lightbulb className="w-5 h-5" />
          </Button>
          <Button variant="outline" size="default" onClick={handleShuffle}>
            <Shuffle className="w-5 h-5" />
          </Button>
          <Button variant="outline" size="default" onClick={handleNext} disabled={currentIndex === filteredCards.length - 1}>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Keyboard Shortcuts */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <div className="flex justify-center gap-3 flex-wrap">
            <span className="px-2 py-1 bg-muted/30 rounded">← →</span>
            <span className="px-2 py-1 bg-muted/30 rounded">Space flip</span>
            <span className="px-2 py-1 bg-muted/30 rounded">H hint</span>
          </div>
        </div>
      </div>
    </div>
  )
}
