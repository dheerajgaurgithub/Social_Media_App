"use client"

import { Button } from "@/components/ui/button"

const moods = [
  { id: "all", label: "All", emoji: "🌟", color: "default" },
  { id: "happy", label: "Happy", emoji: "😊", color: "default" },
  { id: "chill", label: "Chill", emoji: "😌", color: "secondary" },
  { id: "adventure", label: "Adventure", emoji: "🏔️", color: "default" },
  { id: "creative", label: "Creative", emoji: "🎨", color: "default" },
  { id: "food", label: "Food", emoji: "🍕", color: "default" },
  { id: "fitness", label: "Fitness", emoji: "💪", color: "default" },
]

interface MoodFilterProps {
  selectedMood: string
  onMoodChange: (mood: string) => void
}

export function MoodFilter({ selectedMood, onMoodChange }: MoodFilterProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">Filter by mood:</span>
        {moods.map((mood) => (
          <Button
            key={mood.id}
            variant={selectedMood === mood.id ? "default" : "outline"}
            size="sm"
            onClick={() => onMoodChange(mood.id)}
            className="whitespace-nowrap"
          >
            <span className="mr-1">{mood.emoji}</span>
            {mood.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
