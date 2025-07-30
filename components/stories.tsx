"use client"

import { useState } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"

const storiesData = [
  {
    id: "your-story",
    username: "Your Story",
    avatar: "/placeholder.svg?height=60&width=60",
    isYourStory: true,
    hasStory: false,
  },
  {
    id: "1",
    username: "alex_creates",
    avatar: "/placeholder.svg?height=60&width=60",
    hasStory: true,
    viewed: false,
    storyCount: 3,
  },
  {
    id: "2",
    username: "sarah_travels",
    avatar: "/placeholder.svg?height=60&width=60",
    hasStory: true,
    viewed: true,
    storyCount: 1,
  },
  {
    id: "3",
    username: "mike_fitness",
    avatar: "/placeholder.svg?height=60&width=60",
    hasStory: true,
    viewed: false,
    storyCount: 2,
  },
  {
    id: "4",
    username: "emma_art",
    avatar: "/placeholder.svg?height=60&width=60",
    hasStory: true,
    viewed: true,
    storyCount: 4,
  },
  {
    id: "5",
    username: "david_music",
    avatar: "/placeholder.svg?height=60&width=60",
    hasStory: true,
    viewed: false,
    storyCount: 1,
  },
  {
    id: "6",
    username: "lisa_food",
    avatar: "/placeholder.svg?height=60&width=60",
    hasStory: true,
    viewed: true,
    storyCount: 2,
  },
]

export function Stories() {
  const [stories] = useState(storiesData)

  return (
    <Card className="mb-6 border-primary/20">
      <CardContent className="p-4">
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {stories.map((story) => (
            <div key={story.id} className="flex-shrink-0">
              {story.isYourStory ? (
                <Link href="/create/story" className="block">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="relative">
                      <Avatar className="w-16 h-16 ring-2 ring-muted">
                        <AvatarImage src={story.avatar || "/placeholder.svg"} alt={story.username} />
                        <AvatarFallback>You</AvatarFallback>
                      </Avatar>
                      <Button
                        size="icon"
                        className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary hover:bg-primary/90"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    <span className="text-xs text-center max-w-[70px] truncate">{story.username}</span>
                  </div>
                </Link>
              ) : (
                <Link href={`/story/${story.id}`} className="block">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="relative">
                      <div className={cn("w-16 h-16 rounded-full p-0.5", story.viewed ? "bg-muted" : "story-ring")}>
                        <Avatar className="w-full h-full ring-2 ring-background">
                          <AvatarImage src={story.avatar || "/placeholder.svg"} alt={story.username} />
                          <AvatarFallback>
                            {story.username
                              .split("_")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      {story.storyCount > 1 && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                          {story.storyCount}
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-center max-w-[70px] truncate">{story.username}</span>
                  </div>
                </Link>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
