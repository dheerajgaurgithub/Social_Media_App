"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Grid3X3,
  Bookmark,
  Tag,
  Settings,
  MapPin,
  Calendar,
  Sparkles,
  Users,
  Clock,
  Trophy,
  Heart,
  MessageCircle,
} from "lucide-react"
import Image from "next/image"

const posts = [
  { id: 1, image: "/placeholder.svg?height=300&width=300&text=Post+1", likes: 234, comments: 12, type: "normal" },
  { id: 2, image: "/placeholder.svg?height=300&width=300&text=Post+2", likes: 456, comments: 23, type: "ai-enhanced" },
  {
    id: 3,
    image: "/placeholder.svg?height=300&width=300&text=Post+3",
    likes: 789,
    comments: 34,
    type: "collaborative",
  },
  { id: 4, image: "/placeholder.svg?height=300&width=300&text=Post+4", likes: 123, comments: 8, type: "time-capsule" },
  { id: 5, image: "/placeholder.svg?height=300&width=300&text=Post+5", likes: 567, comments: 19, type: "normal" },
  { id: 6, image: "/placeholder.svg?height=300&width=300&text=Post+6", likes: 890, comments: 45, type: "ai-enhanced" },
]

const savedPosts = [
  {
    id: 7,
    image: "/placeholder.svg?height=300&width=300&text=Saved+Recipe",
    likes: 1234,
    comments: 89,
    type: "normal",
    author: "chef_maria",
    caption: "Amazing pasta recipe!",
  },
  {
    id: 8,
    image: "/placeholder.svg?height=300&width=300&text=Travel+Tips",
    likes: 567,
    comments: 45,
    type: "ai-enhanced",
    author: "travel_guru",
    caption: "Best travel hacks for 2024",
  },
  {
    id: 9,
    image: "/placeholder.svg?height=300&width=300&text=Workout+Guide",
    likes: 890,
    comments: 67,
    type: "collaborative",
    author: "fitness_pro",
    caption: "30-day fitness challenge",
  },
  {
    id: 10,
    image: "/placeholder.svg?height=300&width=300&text=Art+Tutorial",
    likes: 445,
    comments: 23,
    type: "normal",
    author: "art_master",
    caption: "Digital painting basics",
  },
  {
    id: 11,
    image: "/placeholder.svg?height=300&width=300&text=Tech+News",
    likes: 678,
    comments: 34,
    type: "ai-enhanced",
    author: "tech_insider",
    caption: "Latest AI developments",
  },
  {
    id: 12,
    image: "/placeholder.svg?height=300&width=300&text=Fashion+Style",
    likes: 923,
    comments: 56,
    type: "normal",
    author: "style_icon",
    caption: "Spring fashion trends",
  },
]

const taggedPosts = [
  {
    id: 13,
    image: "/placeholder.svg?height=300&width=300&text=Group+Photo",
    likes: 567,
    comments: 34,
    type: "normal",
    author: "sarah_travels",
    caption: "Amazing weekend with friends! @john_doe_photo @mike_fitness",
  },
  {
    id: 14,
    image: "/placeholder.svg?height=300&width=300&text=Event+Photo",
    likes: 890,
    comments: 67,
    type: "collaborative",
    author: "event_planner",
    caption: "Thanks to @john_doe_photo for capturing this moment!",
  },
  {
    id: 15,
    image: "/placeholder.svg?height=300&width=300&text=Collaboration",
    likes: 1234,
    comments: 89,
    type: "ai-enhanced",
    author: "creative_studio",
    caption: "Collaboration with @john_doe_photo turned out amazing!",
  },
  {
    id: 16,
    image: "/placeholder.svg?height=300&width=300&text=Workshop",
    likes: 445,
    comments: 23,
    type: "normal",
    author: "photo_workshop",
    caption: "Great workshop led by @john_doe_photo",
  },
]

const achievements = [
  { id: 1, name: "AI Pioneer", description: "Used AI enhancement 50 times", icon: "🤖", unlocked: true },
  { id: 2, name: "Collaborator", description: "Created 10 collaborative posts", icon: "🤝", unlocked: true },
  { id: 3, name: "Time Keeper", description: "Created 5 time capsule posts", icon: "⏰", unlocked: false },
  { id: 4, name: "Community Leader", description: "Got 1000 likes in local posts", icon: "👑", unlocked: true },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("posts")

  const renderPostGrid = (postsArray: any[]) => (
    <div className="grid grid-cols-3 gap-1 md:gap-4">
      {postsArray.map((post) => (
        <div key={post.id} className="relative aspect-square group cursor-pointer">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={`Post ${post.id}`}
            fill
            className="object-cover rounded-lg"
          />

          {/* Post type indicator */}
          <div className="absolute top-2 right-2">
            {post.type === "ai-enhanced" && (
              <Badge className="bg-purple-500 hover:bg-purple-600 text-xs">
                <Sparkles className="w-3 h-3" />
              </Badge>
            )}
            {post.type === "collaborative" && (
              <Badge className="bg-blue-500 hover:bg-blue-600 text-xs">
                <Users className="w-3 h-3" />
              </Badge>
            )}
            {post.type === "time-capsule" && (
              <Badge className="bg-orange-500 hover:bg-orange-600 text-xs">
                <Clock className="w-3 h-3" />
              </Badge>
            )}
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
            <div className="flex items-center space-x-4 text-white">
              <div className="flex items-center space-x-1">
                <Heart className="w-4 h-4" />
                <span className="font-semibold">{post.likes}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageCircle className="w-4 h-4" />
                <span className="font-semibold">{post.comments}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 max-w-4xl mx-auto px-4 py-6 md:ml-64">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-8 mb-8">
            <Avatar className="w-32 h-32 md:w-40 md:h-40">
              <AvatarImage src="/placeholder.svg?height=160&width=160" alt="Profile" />
              <AvatarFallback className="text-2xl">JD</AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
                <h1 className="text-2xl font-bold">john_doe_photo</h1>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Pro Creator
                  </Badge>
                  <Badge variant="outline">Verified</Badge>
                </div>
              </div>

              <div className="flex space-x-8 text-center md:text-left">
                <div>
                  <p className="font-bold text-lg">127</p>
                  <p className="text-sm text-muted-foreground">posts</p>
                </div>
                <div>
                  <p className="font-bold text-lg">2.5K</p>
                  <p className="text-sm text-muted-foreground">followers</p>
                </div>
                <div>
                  <p className="font-bold text-lg">892</p>
                  <p className="text-sm text-muted-foreground">following</p>
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="font-semibold">John Doe</h2>
                <p className="text-sm">📸 Professional photographer & AI enthusiast</p>
                <p className="text-sm">🌍 Capturing moments with technology</p>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Joined March 2023</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button>Edit Profile</Button>
                <Button variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <h3 className="font-semibold">Achievements</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-3 rounded-lg border text-center ${
                      achievement.unlocked ? "bg-muted/50" : "bg-muted/20 opacity-50"
                    }`}
                  >
                    <div className="text-2xl mb-1">{achievement.icon}</div>
                    <p className="font-medium text-sm">{achievement.name}</p>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="posts" className="flex items-center space-x-2">
                <Grid3X3 className="w-4 h-4" />
                <span className="hidden sm:inline">Posts</span>
              </TabsTrigger>
              <TabsTrigger value="saved" className="flex items-center space-x-2">
                <Bookmark className="w-4 h-4" />
                <span className="hidden sm:inline">Saved</span>
              </TabsTrigger>
              <TabsTrigger value="tagged" className="flex items-center space-x-2">
                <Tag className="w-4 h-4" />
                <span className="hidden sm:inline">Tagged</span>
              </TabsTrigger>
              <TabsTrigger value="capsules" className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span className="hidden sm:inline">Capsules</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="posts" className="mt-6">
              {renderPostGrid(posts)}
            </TabsContent>

            <TabsContent value="saved" className="mt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Saved Posts</h3>
                  <Badge variant="secondary">{savedPosts.length} saved</Badge>
                </div>
                {renderPostGrid(savedPosts)}
              </div>
            </TabsContent>

            <TabsContent value="tagged" className="mt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Tagged Posts</h3>
                  <Badge variant="secondary">{taggedPosts.length} tagged</Badge>
                </div>
                {renderPostGrid(taggedPosts)}
              </div>
            </TabsContent>

            <TabsContent value="capsules" className="mt-6">
              <div className="text-center py-12">
                <Clock className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No time capsules created yet</p>
                <p className="text-sm text-muted-foreground mt-2">Create posts that unlock in the future!</p>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
