"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  X,
  Heart,
  MessageCircle,
  Send,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react"

// Mock story data
const storyData = {
  1: {
    user: {
      username: "alex_creates",
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    stories: [
      {
        id: 1,
        type: "image",
        content: "/placeholder.svg?height=800&width=450&text=Story+1",
        timestamp: "2h ago",
        duration: 5000,
      },
      {
        id: 2,
        type: "video",
        content: "/placeholder.svg?height=800&width=450&text=Video+Story",
        timestamp: "1h ago",
        duration: 10000,
      },
      {
        id: 3,
        type: "image",
        content: "/placeholder.svg?height=800&width=450&text=Story+3",
        timestamp: "30m ago",
        duration: 5000,
      },
    ],
  },
  2: {
    user: {
      username: "sarah_travels",
      name: "Sarah Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: false,
    },
    stories: [
      {
        id: 4,
        type: "image",
        content: "/placeholder.svg?height=800&width=450&text=Travel+Story",
        timestamp: "3h ago",
        duration: 5000,
      },
      {
        id: 5,
        type: "image",
        content: "/placeholder.svg?height=800&width=450&text=Adventure",
        timestamp: "2h ago",
        duration: 5000,
      },
    ],
  },
}

export default function StoryPage() {
  const params = useParams()
  const router = useRouter()
  const storyId = params.id as string

  const [currentStoryIndex, setCurrentStoryIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [message, setMessage] = useState("")

  const story = storyData[storyId as keyof typeof storyData]

  useEffect(() => {
    if (!story || !isPlaying) return

    const currentStory = story.stories[currentStoryIndex]
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 100 / (currentStory.duration / 100)
        if (newProgress >= 100) {
          if (currentStoryIndex < story.stories.length - 1) {
            setCurrentStoryIndex((prev) => prev + 1)
            return 0
          } else {
            // Story finished, go back
            router.back()
            return 100
          }
        }
        return newProgress
      })
    }, 100)

    return () => clearInterval(interval)
  }, [currentStoryIndex, isPlaying, story, router])

  const goToPrevious = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex((prev) => prev - 1)
      setProgress(0)
    }
  }

  const goToNext = () => {
    if (currentStoryIndex < story.stories.length - 1) {
      setCurrentStoryIndex((prev) => prev + 1)
      setProgress(0)
    } else {
      router.back()
    }
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const sendMessage = () => {
    if (message.trim()) {
      console.log("Sending message:", message)
      setMessage("")
    }
  }

  if (!story) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-xl font-semibold mb-2">Story not found</h2>
          <Button variant="outline" onClick={() => router.back()}>
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  const currentStory = story.stories[currentStoryIndex]

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Story Progress Bars */}
      <div className="absolute top-4 left-4 right-4 z-10">
        <div className="flex space-x-1">
          {story.stories.map((_, index) => (
            <div key={index} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-100 ease-linear"
                style={{
                  width: `${index < currentStoryIndex ? 100 : index === currentStoryIndex ? progress : 0}%`,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Story Header */}
      <div className="absolute top-8 left-4 right-4 z-10 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10 ring-2 ring-white/50">
            <AvatarImage src={story.user.avatar || "/placeholder.svg"} alt={story.user.username} />
            <AvatarFallback className="bg-primary/20 text-primary">
              {story.user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center space-x-1">
              <span className="text-white font-semibold text-sm">{story.user.username}</span>
              {story.user.verified && (
                <Badge variant="secondary" className="w-3 h-3 p-0 flex items-center justify-center">
                  ✓
                </Badge>
              )}
            </div>
            <span className="text-white/70 text-xs">{currentStory.timestamp}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {currentStory.type === "video" && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 w-8 h-8"
                onClick={togglePlayPause}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 w-8 h-8"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </Button>
            </>
          )}
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 w-8 h-8">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20 w-8 h-8"
            onClick={() => router.back()}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Navigation Areas */}
      <div className="absolute inset-0 flex">
        <div className="flex-1 cursor-pointer" onClick={goToPrevious} />
        <div className="flex-1 cursor-pointer" onClick={goToNext} />
      </div>

      {/* Story Content */}
      <div className="relative w-full max-w-md h-full flex items-center justify-center">
        <div className="relative w-full aspect-[9/16] bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-6xl mb-4">📸</div>
              <p className="text-lg font-medium">Story Content</p>
              <p className="text-sm opacity-70">{currentStory.type === "video" ? "Video" : "Image"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {currentStoryIndex > 0 && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 w-12 h-12"
          onClick={goToPrevious}
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
      )}

      {currentStoryIndex < story.stories.length - 1 && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 w-12 h-12"
          onClick={goToNext}
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      )}

      {/* Story Actions */}
      <div className="absolute bottom-4 left-4 right-4 z-10">
        <div className="flex items-center space-x-3">
          <div className="flex-1 flex items-center space-x-2 bg-black/50 rounded-full px-4 py-2">
            <Input
              placeholder="Send message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 bg-transparent border-none text-white placeholder:text-white/70 focus-visible:ring-0 p-0"
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 w-8 h-8"
              onClick={sendMessage}
              disabled={!message.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 w-10 h-10">
            <Heart className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 w-10 h-10">
            <MessageCircle className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
