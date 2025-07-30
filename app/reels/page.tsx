"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
  Play,
  Volume2,
  VolumeX,
  Sparkles,
  Users,
  Music,
} from "lucide-react"

const reels = [
  {
    id: 1,
    user: {
      username: "alex_creates",
      avatar: "/placeholder.svg?height=40&width=40",
      isVerified: true,
    },
    video: "/placeholder.svg?height=800&width=450&text=Reel+1",
    caption: "Creating magic with AI enhancement ✨ #AIArt #Creative",
    likes: 15420,
    comments: 892,
    shares: 234,
    music: "Original Audio - alex_creates",
    duration: "0:15",
    aiEnhanced: true,
    collaborative: false,
  },
  {
    id: 2,
    user: {
      username: "sarah_dances",
      avatar: "/placeholder.svg?height=40&width=40",
      isVerified: false,
    },
    video: "/placeholder.svg?height=800&width=450&text=Reel+2",
    caption: "Dance challenge with friends! Who's next? 💃 #DanceChallenge",
    likes: 23100,
    comments: 1456,
    shares: 567,
    music: "Trending Song - Various Artists",
    duration: "0:30",
    aiEnhanced: false,
    collaborative: true,
  },
  {
    id: 3,
    user: {
      username: "chef_marco",
      avatar: "/placeholder.svg?height=40&width=40",
      isVerified: true,
    },
    video: "/placeholder.svg?height=800&width=450&text=Reel+3",
    caption: "60-second pasta recipe that'll blow your mind! 🍝 #Cooking #QuickRecipes",
    likes: 18750,
    comments: 634,
    shares: 892,
    music: "Cooking Vibes - Chef Marco",
    duration: "1:00",
    aiEnhanced: true,
    collaborative: false,
  },
]

export default function ReelsPage() {
  const [currentReel, setCurrentReel] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [likedReels, setLikedReels] = useState<number[]>([])
  const [savedReels, setSavedReels] = useState<number[]>([])

  const toggleLike = (reelId: number) => {
    setLikedReels((prev) => (prev.includes(reelId) ? prev.filter((id) => id !== reelId) : [...prev, reelId]))
  }

  const toggleSave = (reelId: number) => {
    setSavedReels((prev) => (prev.includes(reelId) ? prev.filter((id) => id !== reelId) : [...prev, reelId]))
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 md:ml-64">
          {/* Mobile-first vertical scroll layout */}
          <div className="relative h-[calc(100vh-4rem)] overflow-hidden">
            <div className="flex flex-col h-full snap-y snap-mandatory overflow-y-scroll">
              {reels.map((reel, index) => (
                <div key={reel.id} className="relative h-full flex-shrink-0 snap-start">
                  {/* Video Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-pink-900/20 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg opacity-70">Video Player</p>
                      <p className="text-sm opacity-50">{reel.duration}</p>
                    </div>
                  </div>

                  {/* Play/Pause Overlay */}
                  <div
                    className="absolute inset-0 flex items-center justify-center cursor-pointer"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {!isPlaying && (
                      <div className="w-20 h-20 bg-black/50 rounded-full flex items-center justify-center">
                        <Play className="w-10 h-10 text-white ml-1" />
                      </div>
                    )}
                  </div>

                  {/* Top Controls */}
                  <div className="absolute top-4 right-4 z-10">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20"
                      onClick={() => setIsMuted(!isMuted)}
                    >
                      {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </Button>
                  </div>

                  {/* Right Side Actions */}
                  <div className="absolute right-4 bottom-20 flex flex-col space-y-4 z-10">
                    <div className="flex flex-col items-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/20 w-12 h-12 rounded-full"
                        onClick={() => toggleLike(reel.id)}
                      >
                        <Heart
                          className={`w-6 h-6 ${likedReels.includes(reel.id) ? "fill-red-500 text-red-500" : ""}`}
                        />
                      </Button>
                      <span className="text-white text-xs font-medium mt-1">
                        {(reel.likes + (likedReels.includes(reel.id) ? 1 : 0)).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex flex-col items-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/20 w-12 h-12 rounded-full"
                      >
                        <MessageCircle className="w-6 h-6" />
                      </Button>
                      <span className="text-white text-xs font-medium mt-1">{reel.comments.toLocaleString()}</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/20 w-12 h-12 rounded-full"
                      >
                        <Send className="w-6 h-6" />
                      </Button>
                      <span className="text-white text-xs font-medium mt-1">{reel.shares}</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/20 w-12 h-12 rounded-full"
                        onClick={() => toggleSave(reel.id)}
                      >
                        <Bookmark className={`w-6 h-6 ${savedReels.includes(reel.id) ? "fill-white" : ""}`} />
                      </Button>
                    </div>

                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 w-12 h-12 rounded-full">
                      <MoreHorizontal className="w-6 h-6" />
                    </Button>

                    {/* Profile Avatar */}
                    <div className="relative">
                      <Avatar className="w-12 h-12 border-2 border-white">
                        <AvatarImage src={reel.user.avatar || "/placeholder.svg"} alt={reel.user.username} />
                        <AvatarFallback>{reel.user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                        <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">+</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Content */}
                  <div className="absolute bottom-4 left-4 right-20 z-10">
                    <div className="space-y-3">
                      {/* User Info */}
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-semibold">@{reel.user.username}</span>
                        {reel.user.isVerified && <Badge className="bg-blue-500 text-white text-xs px-1 py-0">✓</Badge>}
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-white border-white hover:bg-white hover:text-black bg-transparent"
                        >
                          Follow
                        </Button>
                      </div>

                      {/* Caption */}
                      <p className="text-white text-sm leading-relaxed">{reel.caption}</p>

                      {/* Music Info */}
                      <div className="flex items-center space-x-2">
                        <Music className="w-4 h-4 text-white" />
                        <span className="text-white text-sm opacity-80">{reel.music}</span>
                      </div>

                      {/* Special Badges */}
                      <div className="flex items-center space-x-2">
                        {reel.aiEnhanced && (
                          <Badge className="bg-purple-500/80 text-white">
                            <Sparkles className="w-3 h-3 mr-1" />
                            AI Enhanced
                          </Badge>
                        )}
                        {reel.collaborative && (
                          <Badge className="bg-blue-500/80 text-white">
                            <Users className="w-3 h-3 mr-1" />
                            Collab
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
